import TryCatch from "../utils/TryCatch.js";
import { Cart } from "../models/Cart.js";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import sendOrderConfirmation from "../utils/sendOrderConfirmation.js";
// import Stripe from "stripe";
import crypto from "crypto";
import axios from "axios";

export const newOrderCod = TryCatch(async (req, res) => {
  const { phone, address } = req.body;

  const cart = await Cart.find({
    user: req.user._id,
  }).populate({
    path: "product",
    select: "title price stock",
  });

  // Remove deleted/null products
  const validCart = cart.filter((item) => item.product);

  if (!validCart.length) {
    return res.status(400).json({
      message: "Cart is empty",
    });
  }

  let subTotal = 0;

  const items = validCart.map((item) => {
    const itemSubtotal =
      Number(item.product.price) *
      Number(item.quauntity);

    subTotal += itemSubtotal;

    return {
      product: item.product._id,
      name: item.product.title,
      price: item.product.price,
      quantity: item.quauntity,
    };
  });

  // Create COD order
  const order = await Order.create({
    items,
    method: "cod",
    user: req.user._id,
    phone,
    address,
    subTotal,
    status: "Pending",
  });

  // Reduce stock for COD
  for (const item of order.items) {
    const product = await Product.findById(item.product);

    if (product) {
      product.stock -= item.quantity;
      product.sold += item.quantity;

      await product.save();
    }
  }

  // Clear cart
  await Cart.deleteMany({
    user: req.user._id,
  });

  /*
   * COD order is successfully placed,
   * but payment is NOT completed yet.
   */
  await sendOrderConfirmation({
    email: req.user.email,
    subject: "COD Order Placed",
    orderId: order._id,
    products: items,
    totalAmount: subTotal,
    status: "Pending",
    paymentMethod: "Cash on Delivery",
  });

  return res.json({
    success: true,
    message: "COD order placed successfully",
    order,
  });
});


export const getAllOrders = TryCatch(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json({ orders: orders.reverse() });
});

export const getAllOrdersAdmin = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({
      message: "you are not admin",
    });

  const orders = await Order.find().populate("user").sort({ createdAt: -1 });

  res.json(orders);
});

export const getMyOrder = TryCatch(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("items.product")
    .populate("user");

  res.json(order);
});

// export const updateStatus = TryCatch(async (req, res) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({
//       message: "you are not admin",
//     });
//   }

//   const order = await Order.findById(req.params.id);

//   const { status } = req.body;

//   order.status = status;

//   await order.save();

//   res.json({
//     message: "order status updated",
//     order,
//   });
// });

export const updateStatus = TryCatch(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "you are not admin",
    });
  }

  const order = await Order.findById(req.params.id).populate("user");

  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  const { status } = req.body;

  const statusOrder = {
    Pending: 1,
    Paid: 2,
    Processing: 3,
    Shipped: 4,
    Delivered: 5,
  };

  const currentStatus = order.status;

  // Same status
  if (currentStatus === status) {
    return res.json({
      message: "Order status is already " + status,
      order,
    });
  }

  // Prevent moving backwards
  if (
    status !== "Cancelled" &&
    statusOrder[status] < statusOrder[currentStatus]
  ) {
    return res.status(400).json({
      message: `Cannot change order status from ${currentStatus} back to ${status}`,
    });
  }

  // Delivered orders cannot be changed
  if (currentStatus === "Delivered") {
    return res.status(400).json({
      message: "Delivered orders cannot be changed",
    });
  }

  // Cancelled orders cannot be changed
  if (currentStatus === "Cancelled") {
    return res.status(400).json({
      message: "Cancelled orders cannot be changed",
    });
  }

  order.status = status;

  await order.save();

  await sendOrderConfirmation({
    email: order.user.email,
    subject: `Order Status Updated - ${status}`,
    orderId: order._id,
    products: order.items,
    totalAmount: order.subTotal,
    status: order.status,
    paymentMethod:
      order.method === "online"
        ? "eSewa"
        : "Cash on Delivery",
    emailType: "statusUpdate",
  });

  res.json({
    message: "order status updated",
    order,
  });
});

export const getStats = TryCatch(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "you are not admin",
    });
  }
  const cod = await Order.find({ method: "cod" }).countDocuments();
  const online = await Order.find({ method: "online" }).countDocuments();

  const products = await Product.find();

  // const data = products.map((prod) => ({
  //   name: prod.title,
  //   sold: prod.sold,
  // }));

  const data = products.map((prod) => ({
  name: prod.title,
  sold: prod.sold || 0,
  remaining: prod.stock || 0,
}));

  res.json({
    cod,
    online,
    data,
  });
});

import dotenv from "dotenv";

dotenv.config();

// const stripe = new Stripe(process.env.Stripe_Secret_Key);

// export const newOrderOnline = async (req, res) => {
//   try {
//     const { method, phone, address } = req.body;

//     // ✅ RESTORE THIS (IMPORTANT)
//     const cart = await Cart.find({ user: req.user._id }).populate("product");

//     if (!cart.length) {
//       return res.status(400).json({
//         message: "Cart is empty",
//       });
//     }

//     const validCart = cart.filter((i) => i.product);

//     if (!validCart.length) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     const subTotal = validCart.reduce(
//       (total, item) => total + item.product.price * item.quauntity,
//       0
//     );

//     const lineItems = validCart.map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.product.title,
//           images: [item.product.images?.[0]?.url || ""],
//         },
//         unit_amount: Math.round(item.product.price * 100),
//       },
//       quantity: item.quauntity,
//     }));

//     const sesssion = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: `${process.env.Frontend_Url}/ordersuccess?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.Frontend_Url}/cart`,
//       metadata: {
//         userId: req.user._id.toString(),
//         method,
//         phone,
//         address,
//         subTotal,
//       },
//     });

//     res.json({
//       url: sesssion.url,
//     });

//   } catch (error) {
//     console.log("Error creating Stripe session:", error.message);
//     res.status(500).json({
//       message: "Failed to create payment session",
//     });
//   }
// }; 

export const newOrderOnline = async (req, res) => {
  try {
    const { phone, address } = req.body;

    // ============================================
    // 1. GET USER CART
    // ============================================

    const cart = await Cart.find({
      user: req.user._id,
    }).populate("product");

    if (!cart.length) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Remove deleted/null products
    const validCart = cart.filter((item) => item.product);

    if (!validCart.length) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // ============================================
    // 2. CALCULATE TOTAL ON SERVER
    // ============================================

    const subTotal = validCart.reduce(
      (total, item) =>
        total +
        Number(item.product.price) *
          Number(item.quauntity),
      0
    );

    const totalAmount = Number(subTotal.toFixed(2));

    // ============================================
    // 3. GET ESEWA CONFIG
    // ============================================

    const productCode =
      process.env.ESEWA_PRODUCT_CODE;

    const secretKey =
      process.env.ESEWA_SECRET_KEY;

    if (!productCode) {
      return res.status(500).json({
        message:
          "eSewa product code is not configured",
      });
    }

    if (!secretKey) {
      return res.status(500).json({
        message:
          "eSewa secret key is not configured",
      });
    }

    // ============================================
    // 4. ESEWA OFFICIAL TEST SIGNATURE
    // ============================================
    //
    // This does NOT affect the real payment.
    // It only confirms that your secret key and
    // HMAC-SHA256 implementation are correct.
    //

    const testMessage =
      "total_amount=110,transaction_uuid=241028,product_code=EPAYTEST";

    const testSignature = crypto
      .createHmac(
        "sha256",
        secretKey
      )
      .update(testMessage, "utf8")
      .digest("base64");

    console.log(
      "========== ESEWA TEST =========="
    );

    console.log(
      "Test message:",
      testMessage
    );

    console.log(
      "Test signature:",
      testSignature
    );

    console.log(
      "================================"
    );

    // ============================================
    // 5. CREATE TRANSACTION UUID
    // ============================================

    const transactionUuid =
      `ORDER-${Date.now()}-${req.user._id
        .toString()
        .slice(-6)}`;

    // ============================================
    // 6. SIGNED FIELDS
    // ============================================

    const signedFieldNames =
      "total_amount,transaction_uuid,product_code";

    // ============================================
    // 7. CREATE EXACT MESSAGE TO SIGN
    // ============================================

    const message =
      `total_amount=${totalAmount},` +
      `transaction_uuid=${transactionUuid},` +
      `product_code=${productCode}`;

    // ============================================
    // 8. GENERATE ESEWA SIGNATURE
    // ============================================

    const signature = crypto
      .createHmac(
        "sha256",
        secretKey
      )
      .update(message, "utf8")
      .digest("base64");

    // ============================================
    // 9. SIGNATURE DEBUG
    // ============================================

    console.log(
      "========== ESEWA SIGNATURE DEBUG =========="
    );

    console.log(
      "Secret key loaded:",
      !!secretKey
    );

    console.log(
      "Secret key length:",
      secretKey.length
    );

    console.log(
      "Product code:",
      productCode
    );

    console.log(
      "Signed field names:",
      signedFieldNames
    );

    console.log(
      "Total amount:",
      totalAmount
    );

    console.log(
      "Transaction UUID:",
      transactionUuid
    );

    console.log(
      "Message:",
      message
    );

    console.log(
      "Generated signature:",
      signature
    );

    console.log(
      "==========================================="
    );

    // ============================================
    // 10. SAVE ORDER ITEMS
    // ============================================

    const items = validCart.map(
      (item) => ({
        product: item.product._id,
        name: item.product.title,
        price: item.product.price,
        quantity: item.quauntity,
      })
    );

    // ============================================
    // 11. CREATE PENDING ORDER
    // ============================================

    const order = await Order.create({
      items,
      method: "online",
      user: req.user._id,
      phone,
      address,
      subTotal: totalAmount,
      status: "Pending",

      // Store transaction UUID
      paymentInfo: transactionUuid,
    });

    // ============================================
    // 12. CREATE ESEWA PAYMENT DATA
    // ============================================

    const paymentData = {
      amount: String(totalAmount),

      tax_amount: "0",

      total_amount: String(totalAmount),

      transaction_uuid:
        transactionUuid,

      product_code:
        productCode,

      product_service_charge: "0",

      product_delivery_charge: "0",

      success_url:
        `${process.env.Frontend_Url}/payment-success`,

      failure_url:
        `${process.env.Frontend_Url}/payment-failed`,

      signed_field_names:
        signedFieldNames,

      signature,
    };

    // ============================================
    // 13. FINAL PAYMENT DEBUG
    // ============================================

    console.log(
      "========== ESEWA PAYMENT =========="
    );

    console.log(
      "Order ID:",
      order._id.toString()
    );

    console.log(
      "Amount:",
      totalAmount
    );

    console.log(
      "Transaction UUID:",
      transactionUuid
    );

    console.log(
      "Product Code:",
      productCode
    );

    console.log(
      "Signed Fields:",
      signedFieldNames
    );

    console.log(
      "Message:",
      message
    );

    console.log(
      "Signature:",
      signature
    );

    console.log(
      "Success URL:",
      paymentData.success_url
    );

    console.log(
      "==================================="
    );

    // ============================================
    // 14. SEND PAYMENT DATA TO FRONTEND
    // ============================================

    return res.status(201).json({
      success: true,
      paymentData,
      orderId: order._id,
    });

  } catch (error) {
    console.error(
      "eSewa payment creation error:",
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        "Failed to create eSewa payment",
    });
  }
};


export const verifyEsewaPayment = async (req, res) => {
  try {
    const {
      status,
      signature,
      transaction_code,
      total_amount,
      transaction_uuid,
      product_code,
      signed_field_names,
    } = req.body;

    // ============================================
    // 1. BASIC VALIDATION
    // ============================================

    if (!transaction_uuid) {
      return res.status(400).json({
        message: "Transaction UUID is required",
      });
    }

    if (!signature) {
      return res.status(400).json({
        message: "Payment signature is missing",
      });
    }

    if (!signed_field_names) {
      return res.status(400).json({
        message: "Signed fields are missing",
      });
    }

    const secretKey = process.env.ESEWA_SECRET_KEY;

    if (!secretKey) {
      return res.status(500).json({
        message: "eSewa secret key is not configured",
      });
    }

    // ============================================
    // 2. FIND PENDING ORDER
    // ============================================

    const order = await Order.findOne({
      paymentInfo: transaction_uuid,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found for this transaction",
      });
    }

    // ============================================
    // 3. PREVENT DUPLICATE VERIFICATION
    // ============================================

    if (order.status === "Paid") {
      return res.json({
        success: true,
        message: "Payment already verified",
        order,
      });
    }

    // ============================================
    // 4. CHECK PRODUCT CODE
    // ============================================

    if (
      product_code !==
      process.env.ESEWA_PRODUCT_CODE
    ) {
      return res.status(400).json({
        message: "Invalid eSewa product code",
      });
    }

    // ============================================
    // 5. CHECK AMOUNT
    // ============================================

    if (
      Number(total_amount) !==
      Number(order.subTotal)
    ) {
      return res.status(400).json({
        message:
          "Payment amount does not match order amount",
      });
    }

    // ============================================
    // 6. VERIFY SIGNATURE
    // ============================================

    const signedFields =
      signed_field_names.split(",");

    const message = signedFields
      .map((field) => {
        return `${field}=${req.body[field]}`;
      })
      .join(",");

    const generatedSignature = crypto
      .createHmac("sha256", secretKey)
      .update(message, "utf8")
      .digest("base64");

    const receivedBuffer =
      Buffer.from(signature);

    const generatedBuffer =
      Buffer.from(generatedSignature);

    if (
      receivedBuffer.length !==
        generatedBuffer.length ||
      !crypto.timingSafeEqual(
        receivedBuffer,
        generatedBuffer
      )
    ) {
      console.error(
        "Invalid eSewa signature"
      );

      return res.status(400).json({
        message: "Invalid eSewa signature",
      });
    }

    // ============================================
    // 7. CHECK ESEWA RESPONSE STATUS
    // ============================================

    if (status !== "COMPLETE") {
      return res.status(400).json({
        message: "Payment was not completed",
        status,
      });
    }

    // ============================================
    // 8. VERIFY WITH ESEWA SERVER
    // ============================================

    const statusUrl =
      process.env.ESEWA_STATUS_URL ||
      "https://rc.esewa.com.np/api/epay/transaction/status/";

    const { data: statusResponse } =
      await axios.get(statusUrl, {
        params: {
          product_code,
          total_amount,
          transaction_uuid,
        },
      });

    console.log(
      "eSewa transaction status:",
      statusResponse
    );

    // ============================================
    // 9. ESEWA MUST SAY COMPLETE
    // ============================================

    if (
      statusResponse.status !==
      "COMPLETE"
    ) {
      return res.status(400).json({
        message:
          "Payment not completed by eSewa",
        status: statusResponse.status,
      });
    }

    // ============================================
    // 10. VERIFY AMOUNT AGAIN
    // ============================================

    const verifiedAmount = Number(
      statusResponse.total_amount ??
        statusResponse.totalAmount
    );

    if (
      Number.isNaN(verifiedAmount) ||
      verifiedAmount !==
        Number(order.subTotal)
    ) {
      return res.status(400).json({
        message:
          "Verified eSewa amount does not match order amount",
      });
    }

    // ============================================
    // 11. MARK ORDER AS PAID
    // ============================================

    order.status = "Paid";
    order.paidAt = new Date();

    order.paymentReference =
      transaction_code ||
      statusResponse.ref_id ||
      statusResponse.refId ||
      null;

    await order.save();

    // ============================================
    // 12. REDUCE STOCK
    // ============================================

    for (const item of order.items) {
      const product =
        await Product.findById(item.product);

      if (product) {
        product.stock -= item.quantity;
        product.sold += item.quantity;

        await product.save();
      }
    }

    // ============================================
    // 13. CLEAR CART
    // ============================================

    await Cart.deleteMany({
      user: order.user,
    });

    // ============================================
    // 14. GET USER + PRODUCTS
    // ============================================

    const populatedOrder =
      await Order.findById(order._id)
        .populate("items.product")
        .populate("user");

    if (!populatedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const products =
      populatedOrder.items
        .filter((item) => item.product)
        .map((item) => ({
          product: item.product._id,
          name:
            item.name ||
            item.product.title,
          price: item.price,
          quantity: item.quantity,
        }));

    // ============================================
    // 15. SEND EMAIL ONLY AFTER PAYMENT SUCCESS
    // ============================================

    await sendOrderConfirmation({
      email: populatedOrder.user.email,

      subject:
        "Payment Successful - Order Confirmed",

      orderId: order._id,

      products,

      totalAmount: order.subTotal,

      status: "Paid",

      paymentMethod: "eSewa",
    });

    // ============================================
    // 16. RESPONSE
    // ============================================

    return res.json({
      success: true,

      message:
        "Payment verified and order confirmed successfully",

      order: populatedOrder,
    });

  } catch (error) {
    console.error(
      "eSewa verification error:",
      error
    );

    return res.status(500).json({
      message:
        "Payment verification failed",
    });
  }
};


