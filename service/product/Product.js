import { prisma } from "../../config/prisma.js";

export const createProduct = async (req, res) => {
  try {
    const { nama_product, price, img, description, categoryId } = req.body;

    const category = await prisma.category.findUnique({
      where: { categoryId: parseInt(categoryId, 10) },
    });

    if (!category) {
      return res.status(400).json({ msg: "Invalid category ID" });
    }

    const product = await prisma.product.create({
      data: {
        nama_product,
        price: parseFloat(price),
        img,
        description,
        categoryId: parseInt(categoryId, 10),
      },
    });

    res.status(201).json({ msg: "Product created successfully", product });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to create product", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (page - 1) * limit;
    const where = search
      ? {
          OR: [
            { nama_product: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const products = await prisma.product.findMany({
      skip: parseInt(skip, 10),
      take: parseInt(limit, 10),
      where,
      include: { category: true, reviews: true },
    });

    const total = await prisma.product.count({ where });

    res.status(200).json({
      msg: "Success To Get All Products",
      data: products,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      total,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed To Get All Products", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await prisma.product.findUnique({
      where: { productId: parseInt(productId, 10) },
      include: { category: true, reviews: true },
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({ msg: "Success To Get Product", data: product });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed To Get Product", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { nama_product, price, img, description, categoryId } = req.body;

    const category = await prisma.category.findUnique({
      where: { categoryId: parseInt(categoryId, 10) },
    });

    if (!category) {
      return res.status(400).json({ msg: "Invalid category ID" });
    }

    const product = await prisma.product.update({
      where: { productId: parseInt(productId, 10) },
      data: {
        nama_product,
        price: parseFloat(price),
        img,
        description,
        categoryId: parseInt(categoryId, 10),
      },
    });

    res.status(200).json({ msg: "Product updated successfully", product });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed To Update Product", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await prisma.product.delete({
      where: { productId: parseInt(productId, 10) },
    });

    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed To Delete Product", error: error.message });
  }
};
