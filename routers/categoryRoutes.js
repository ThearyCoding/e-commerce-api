const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({ createdBy: req.user.id });
    res.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const categoryExisting = await Category.findOne({
      name,
      createdBy: req.user.id,
    });

    if (categoryExisting) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = new Category({
      ...req.body,
      createdBy: req.user.id,
    });

    const savedCategory = await category.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: savedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
      details: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndUpdate(
      { 
        _id: id, 
        createdBy: req.user.id 
      },
      req.body,
      { 
        new: true,
        runValidators: true 
      }
    );

    if (!category) {
      return res.status(404).json({ 
        success: false, 
        error: "Category not found or unauthorized!" 
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndDelete({ 
      _id: id,
      createdBy: req.user.id 
    });

    if (!category) {
      return res.status(404).json({ 
        success: false, 
        error: "Category not found or unauthorized!" 
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: category
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "An error occurred while deleting the category.",
      error: error.message,
    });
  }
});

module.exports = router;
