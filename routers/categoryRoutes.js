const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const category = new Category(req.body);
    const savedCategory = await category.save();
    res.status(201).json({
      category: savedCategory,
      status: true,
      message: "Category created successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndUpdate({ _id: id }, req.body);
    if (!category) {
      return res
        .status(404)
        .json({ status: false, error: "Category not found!" });
    }
    res.status(200).json({
      category: category,
      status: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndDelete({ _id: id });
    if (!category) {
      return res
        .status(404)
        .json({ status: false, error: "Category not found!" });
    }
    res.status(200).json({
      category: category,
      status: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "An error occurred while deleting the category.",
      error: error.message,
    });
  }
});

module.exports = router;
