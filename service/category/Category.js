// src/controllers/categoryController.js
import { prisma } from "../../config/prisma.js";

export const createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    const category = await prisma.category.create({
      data: { category_name },
    });

    res.status(201).json({ msg: "Category created successfully", category });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to create category", error: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();

    res
      .status(200)
      .json({ msg: "Success To Get All Categories", data: categories });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed To Get All Categories", error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await prisma.category.findUnique({
      where: { categoryId: parseInt(categoryId, 10) },
      include: { products: true },
    });

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.status(200).json({ msg: "Success To Get Category", data: category });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed To Get Category", error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { category_name } = req.body;

    const category = await prisma.category.update({
      where: { categoryId: parseInt(categoryId, 10) },
      data: { category_name },
    });

    res.status(200).json({ msg: "Category updated successfully", category });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed To Update Category", error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    await prisma.category.delete({
      where: { categoryId: parseInt(categoryId, 10) },
    });

    res.status(200).json({ msg: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed To Delete Category", error: error.message });
  }
};
