import { NextApiHandler } from "next";
import prisma from "../../../libs/prisma";

//Getting all users
const handlerGet: NextApiHandler = async (req, res) => {
  const { name } = req.body;
  const { page } = req.query;

  //Items per page
  const limit = 2;

  //Page number
  let offset = 0;
  if (page) {
    offset = (Number(page) - 1) * limit;
  }

  const products = await prisma.product.findMany({
    skip: offset,
    take: limit,
    where: {
      name: {
        equals: req.body.name,
      },
    },
    select: {
      // id: true,
      name: true,
      TypeProduct: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
  res.json(products);
};
//Creating a new user
const handlerPost: NextApiHandler = async (req, res) => {
  const { name, typeProductId } = req.body;

  let newProduct = await prisma.product.findUnique({
    where: {
      name,
    },
  });

  if (newProduct) {
    res.status(200).json({ message: "Product already exists" });
  } else {
    newProduct = await prisma.product.create({
      data: {
        name: name.toLowerCase(),
        typeProductId,
      },
      include: {
        TypeProduct: true,
      },
    });
    res.status(200).json({ message: "User created successfully" });
  }
};

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      return handlerGet(req, res);
    case "POST":
      return handlerPost(req, res);
  }
};

export default handler;
