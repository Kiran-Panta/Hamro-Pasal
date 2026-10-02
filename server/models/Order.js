import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    items: [
      {
        quantity: {
          type: Number,
          required: true,
        },

        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        name: {
          type: String,
        },

        price: {
          type: Number,
        },
      },
    ],

    method: {
      type: String,
      required: true,
      enum: ["cod", "online"],
    },

    // Keep our own eSewa transaction UUID
    paymentInfo: {
      type: String,
    },

    // eSewa's returned reference/transaction code
    paymentReference: {
      type: String,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    paidAt: {
      type: Date,
    },

    subTotal: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", schema);