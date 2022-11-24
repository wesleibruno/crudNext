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

  const typeProducts = await prisma.typeProduct.findMany({
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
    },
    orderBy: {
      name: "asc",
    },
  });
  res.json(typeProducts);
};
//Creating a new user
const handlerPost: NextApiHandler = async (req, res) => {
  const { name } = req.body;

  let newTypeProduct = await prisma.typeProduct.findUnique({
    where: {
      name,
    },
  });

  if (newTypeProduct) {
    res.json({ message: "Type Product already exists" });
  } else {
    newTypeProduct = await prisma.typeProduct.create({
      data: {
        name: name.toLowerCase(),
      },
    });
    res.status(200).json({ message: "Type Product created successfully" });
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
