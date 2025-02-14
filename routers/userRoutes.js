const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../Middleware/auth-middlewar");
const apiSecretMiddleware = require("../Middleware/apiSecretMiddleware");
const Cart = require("../models/Cart");
const { handleValidationError } = require("../utils/errorHandler");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id;

    if (!userId || !items || !items[0].product || !items[0].quantity) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    let cart = await Cart.findOne({ user: userId });

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
      // Create new cart
      cart = new Cart({
        user: userId,
        items: [
          {
            product: items[0].product,
            quantity: items[0].quantity,
          },
        ],
      });
    }

    const savedCart = await cart.save();
    await User.findByIdAndUpdate(userId, { cart: savedCart._id });

    res.status(201).json(savedCart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating/updating cart", error: error.message });
  }
});
router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const user = new User(req.body);
    const savedUser = await user.save();

    const token = jwt.sign(
      { id: savedUser._id, role: savedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    const validationErrors = handleValidationError(error);
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", apiSecretMiddleware, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    const validationErrors = handleValidationError(error);
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userIdFromToken = req.user.id;

    if (userIdFromToken !== id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "You are not authorized to view this user" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res
    .status(200)
    .json({ message: "User have been delete sucessfully", data: user });
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    if (updatedData.name && updatedData.name.trim() === "") {
      return res.status(400).json({ error: "Name cannot be empty" });
    }

    const user = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
