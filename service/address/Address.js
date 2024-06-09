
import { prisma } from "../../config/prisma.js";

export const addAddress = async (req, res) => {
  try {
    const { street, city, state, postalCode, country } = req.body;
    const { userId } = req.user;

    const newAddress = await prisma.address.create({
      data: {
        userId: parseInt(userId, 10),
        street,
        city,
        state,
        postalCode,
        country,
      },
    });

    res
      .status(201)
      .json({ msg: "Address added successfully", data: newAddress });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to add address", error: error.message });
  }
};

export const getAddressesByUserId = async (req, res) => {
  try {
    const { userId } = req.user;

    const addresses = await prisma.address.findMany({
      where: { userId: parseInt(userId, 10) },
    });

    res.status(200).json({ msg: "Success to get addresses", data: addresses });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to get addresses", error: error.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { street, city, state, postalCode, country } = req.body;

    const updatedAddress = await prisma.address.update({
      where: { addressId: parseInt(addressId, 10) },
      data: {
        street,
        city,
        state,
        postalCode,
        country,
      },
    });

    res
      .status(200)
      .json({ msg: "Address updated successfully", data: updatedAddress });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to update address", error: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    await prisma.address.delete({
      where: { addressId: parseInt(addressId, 10) },
    });

    res.status(200).json({ msg: "Address deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to delete address", error: error.message });
  }
};
