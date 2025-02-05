const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
router.get("/category/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({ categoryId });

    if (products.length === 0) {
      return res.status(404).json({
        error: "No products found for the specified category",
      });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      data: savedProduct,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const createdBy = req.user.id;

    const deletedProduct = await Product.findOneAndDelete({
      _id: id,
      createdBy: createdBy,
    });

    if (!deletedProduct) {
      return res.status(404).json({
        error:
          "Product not found or you are not authorized to delete this product",
      });
    }

    res.json({
      message: "Product deleted successfully",
      products: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const createdBy = req.user.id;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, createdBy: createdBy },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        error:
          "Product not found or you are not authorized to update this product",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
