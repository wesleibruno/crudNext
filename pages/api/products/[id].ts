import { NextApiHandler } from "next";
import prisma from "../../../libs/prisma";

const handlerGet: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  const product = await prisma.product.findUnique({
    where: {
      id: id as string,
    },
    select: {
      name: true,
    },
  });

  if (!product) {
    res.status(404).json({ message: `User with id ${id} not found` });
    return;
  }

  res.status(200).json(product);
};

const handlerPost: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  const { name, active, quantity, price } = req.body;

  let data: {
    name?: string;
    active?: boolean;
    quantity?: number;
    price?: number;
  } = {};

  if (name) {
    data.name = name;
  }
  if (quantity) {
    data.quantity = Number(quantity);
  }
  if (price) {
    data.price = Number(price);
  }

  if (active) {
    switch (active) {
      case "true":
      case "1":
        data.active = true;
        break;
      case "false":
      case "0":
        data.active = false;
        break;
      default:
        res.status(400).json({ message: "Invalid active value" });
        return;
    }
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id: id as string,
    },
    data,
  });

  if (updatedProduct) {
    res.status(200).json(updatedProduct);
  } else {
    res.json({ error: `User with id ${id} not found` });
  }
};

const handlerDelete: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: id as string,
      },
    });

    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(404).json({ message: `User with id ${id} not found` });
  }
};

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      return handlerGet(req, res);
    case "POST":
      return handlerPost(req, res);
    case "DELETE":
      return handlerDelete(req, res);
  }
};

export default handler;
