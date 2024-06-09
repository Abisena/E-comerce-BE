import { prisma } from "../../config/prisma.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const product = await prisma.product.findUnique({
      where: { productId: parseInt(productId, 10) },
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const existingCartItem = await prisma.cart.findFirst({
      where: {
        userId: parseInt(userId, 10),
        productId: parseInt(productId, 10),
      },
    });

    if (existingCartItem) {
      const updatedCartItem = await prisma.cart.update({
        where: { cartId: existingCartItem.cartId },
        data: { quantity: existingCartItem.quantity + parseInt(quantity, 10) },
      });

      return res.status(200).json({
        msg: "Product quantity updated in cart",
        data: updatedCartItem,
      });
    } else {
      const newCartItem = await prisma.cart.create({
        data: {
          userId: parseInt(userId, 10),
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

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartItems = await prisma.cart.findMany({
      where: { userId: parseInt(userId, 10) },
      include: { product: true },
    });

    res.status(200).json({ msg: "Success to get cart items", data: cartItems });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to get cart items", error: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { quantity } = req.body;

    const updatedCartItem = await prisma.cart.update({
      where: { cartId: parseInt(cartId, 10) },
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
    const { cartId } = req.params;

    await prisma.cart.delete({
      where: { cartId: parseInt(cartId, 10) },
    });

    res.status(200).json({ msg: "Cart item removed successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to remove cart item", error: error.message });
  }
};
