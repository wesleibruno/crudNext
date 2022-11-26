import { NextApiHandler } from "next";
import prisma from "../../../libs/prisma";

const handlerGet: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  const typeProduct = await prisma.typeProduct.findUnique({
    where: {
      id: id as string,
    },
    // select: {
    //   id: true,
    //   name: true,
    //   products: {
    //     where: {
    //       id: id as string,
    //     },
    //     select: {
    //       id: true,
    //       name: true,
    //     },
    //   },
    // },
  });

  if (!typeProduct) {
    res.status(404).json({ message: `User with id ${id} not found` });
    return;
  }

  res.status(200).json(typeProduct);
};

const handlerPost: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  const { name } = req.body;

  let data: {
    name?: string;
  } = {};

  if (name) {
    data.name = name;
  }

  const updatedTypeProduct = await prisma.typeProduct.update({
    where: {
      id: id as string,
    },
    data,
  });

  if (updatedTypeProduct) {
    res.status(200).json(updatedTypeProduct);
  } else {
    res.json({ error: `User with id ${id} not found` });
  }
};

const handlerDelete: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  try {
    const deletedTypeProduct = await prisma.typeProduct.delete({
      where: {
        id: id as string,
      },
    });

    res.status(200).json(deletedTypeProduct);
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
