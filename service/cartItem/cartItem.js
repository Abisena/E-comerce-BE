// src/controllers/cartItemController.js
import { prisma } from "../../config/prisma.js";

export const addToCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId, quantity } = req.body;

    const product = await prisma.product.findUnique({
      where: { productId: parseInt(productId, 10) },
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cart: { userId: parseInt(userId, 10) },
        productId: parseInt(productId, 10),
      },
    });

    if (existingCartItem) {
      const updatedCartItem = await prisma.cartItem.update({
        where: { cartItemId: existingCartItem.cartItemId },
        data: { quantity: existingCartItem.quantity + parseInt(quantity, 10) },
      });

      return res.status(200).json({
        msg: "Product quantity updated in cart",
        data: updatedCartItem,
      });
    } else {
      const userCart = await prisma.cart.findUnique({
        where: { userId: parseInt(userId, 10) },
      });

      const newCartItem = await prisma.cartItem.create({
        data: {
          cartId: userCart.cartId,
          productId: parseInt(productId, 10),
          quantity: parseInt(quantity, 10),
        },
      });

      return res
        .status(201)
        .json({ msg: "Product added to cart", data: newCartItem });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to add product to cart", error: error.message });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.user;

    const cart = await prisma.cart.findUnique({
      where: { userId: parseInt(userId, 10) },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    res
      .status(200)
      .json({ msg: "Success to get cart items", data: cart.items });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to get cart items", error: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    const updatedCartItem = await prisma.cartItem.update({
      where: { cartItemId: parseInt(cartItemId, 10) },
      data: { quantity: parseInt(quantity, 10) },
    });

    res
      .status(200)
      .json({ msg: "Cart item updated successfully", data: updatedCartItem });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to update cart item", error: error.message });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    await prisma.cartItem.delete({
      where: { cartItemId: parseInt(cartItemId, 10) },
    });

    res.status(200).json({ msg: "Cart item removed successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to remove cart item", error: error.message });
  }
};

export const getTotalPrice = async (req, res) => {
  try {
    const { userId } = req.user;

    const cart = await prisma.cart.findUnique({
      where: { userId: parseInt(userId, 10) },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    const totalPrice = cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    res.status(200).json({ msg: "Success to get total price", totalPrice });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to get total price", error: error.message });
  }
};
