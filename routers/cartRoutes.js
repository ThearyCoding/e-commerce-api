const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { items } = req.body;
    const user = req.user.id;

    if (!user || !items || !items[0].product || !items[0].quantity) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    let cart = await Cart.findOne({ user });

    if (cart) {
      // Check if product already exists in the cart
      const productIndex = cart.items.findIndex(
        (item) => item.product.toString() === items[0].product
      );

      if (productIndex > -1) {
        // Product exists, update quantity
        cart.items[productIndex].quantity += items[0].quantity;
      } else {
        // Product doesn't exist, add new item
        cart.items.push({
          product: items[0].product,
          quantity: items[0].quantity,
        });
      }
    } else {
      cart = new Cart({
        user,
        items: [
          {
            product: items[0].product,
            quantity: items[0].quantity,
          },
        ],
      });
    }

    const savedCart = await cart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating/updating cart", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const user = req.user.id;

    const cart = await Cart.findOne({ user }).populate("items.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart items: ", error);
    res
      .status(500)
      .json({ message: "Error fetching cart items", error: error.message });
  }
});
router.patch("/:cartId/items/:itemId", async (req, res) => {
  try {
    const { cartId, itemId } = req.params;
    const { quantity } = req.body;

    if (quantity == null || typeof quantity !== "number" || quantity <= 0) {
      return res.status(400).json({
        message: "Invalid payload: quantity must be a positive number",
      });
    }
    let cart = await Cart.findById(cartId);

    if (cart) {
      // Find the item in the cart by itemId
      const itemIndex = cart.items.findIndex(
        (item) => item._id.toString() === itemId
      );

      if (itemIndex > -1) {
        // Item exists in the cart, update the quantity
        cart.items[itemIndex].quantity = quantity;

        // Save the updated cart
        const updatedCart = await cart.save();
        res
          .status(200)
          .json({ message: "Quantity updated " + quantity, updatedCart });
      } else {
        // Item not found in the cart
        res.status(404).json({ message: "Item not found in the cart" });
      }
    } else {
      // Cart not found
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error("Error updating cart item:", error);
    res
      .status(500)
      .json({ message: "Error updating cart item", error: error.message });
  }
});

router.delete("/:cartId/items/:itemId", async (req, res) => {
  try {
    const { cartId, itemId } = req.params;

    if (!cartId || !itemId) {
      return res
        .status(400)
        .json({ message: "Cart ID and Item ID are required" });
    }
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      return res
        .status(200)
        .json({ message: "Item removed successfully", cart });
    } else {
      return res.status(404).json({ message: "Item not found in the cart" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting cart item", error: error.message });
  }
});

module.exports = router;
