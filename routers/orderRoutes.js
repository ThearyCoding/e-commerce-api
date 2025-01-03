const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../Middleware/auth-middlewar");
const Product = require("../models/Product");
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
    .populate("user", "name email") 
    .populate("items.product", "name price category");

  res.status(200).json({
    success: true,
    data: orders,
  });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    const userId = req.user.id;
    let totalAmount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          error: 'Product not found'
        });
      }
      totalAmount += product.price * item.quantity;
    }
    const order = new Order({
      user: userId,
      items: items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
      shippingAddress,
    });
    const savedOrder = await order.save();
    res
      .status(201)
      .json({ message: "Order created successfully", data: savedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
