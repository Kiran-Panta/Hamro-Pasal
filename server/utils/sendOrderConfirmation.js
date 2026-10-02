import { createTransport } from "nodemailer";

const sendOrderConfirmation = async ({
  email,
  subject,
  orderId,
  products,
  totalAmount,
  status,
  paymentMethod,
}) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const productsHtml = products
    .map(
      (product) => `
        <tr>
          <td style="
            padding: 10px;
            border: 1px solid #ddd;
          ">
            ${product.name}
          </td>

          <td style="
            padding: 10px;
            border: 1px solid #ddd;
          ">
            ${product.quantity}
          </td>

          <td style="
            padding: 10px;
            border: 1px solid #ddd;
          ">
            Rs${product.price}
          </td>
        </tr>
      `
    )
    .join("");

  let title = "Order Placed";

  let message = `
    Your order has been successfully placed.
  `;

  let statusColor = "#f59e0b";

  // ============================================
  // COD
  // ============================================

  if (paymentMethod === "Cash on Delivery") {
    title = "Order Placed Successfully";

    message = `
      Your Cash on Delivery order has been successfully placed.
      Payment will be collected when your order is delivered.
    `;

    statusColor = "#f59e0b";
  }

  // ============================================
  // ESEWA
  // ============================================

  if (
    paymentMethod === "eSewa" &&
    status === "Paid"
  ) {
    title = "Payment Successful";

    message = `
      Your eSewa payment has been successfully verified
      and your order has been confirmed.
    `;

    statusColor = "#22c55e";
  }

  const html = `
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>

<title>${title}</title>

</head>

<body
  style="
    margin: 0;
    padding: 30px;
    background: #f5f5f5;
    font-family: Arial, sans-serif;
  "
>

<div
  style="
    max-width: 600px;
    margin: auto;
    background: white;
    padding: 30px;
    border-radius: 10px;
  "
>

<h1
  style="
    color: ${statusColor};
    text-align: center;
  "
>
  ${title}
</h1>

<p>
  Dear Customer,
</p>

<p>
  ${message}
</p>

<p>
  <strong>Order ID:</strong>
  ${orderId}
</p>

<p>
  <strong>Payment Method:</strong>
  ${paymentMethod}
</p>

<p>
  <strong>Order Status:</strong>
  ${status}
</p>

<table
  style="
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  "
>

<thead>

<tr>

<th
  style="
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  "
>
Product
</th>

<th
  style="
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  "
>
Quantity
</th>

<th
  style="
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  "
>
Price
</th>

</tr>

</thead>

<tbody>

${productsHtml}

</tbody>

</table>

<p
  style="
    font-size: 18px;
    font-weight: bold;
    margin-top: 20px;
  "
>
Total Amount: Rs${totalAmount}
</p>

<p>
Thank you for shopping with us!
</p>

</div>

</body>

</html>
`;

  await transport.sendMail({
    from: process.env.GMAIL,
    to: email,
    subject,
    html,
  });
};

export default sendOrderConfirmation;
