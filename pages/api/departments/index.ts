import { NextApiHandler } from "next";
import prisma from "../../../libs/prisma";

//Getting all users
const handlerGet: NextApiHandler = async (req, res) => {
  const { name } = req.body;
  const { page } = req.query;

  //Items per page
  // const limit = 2;

  //Page number
  // let offset = 0;
  // if (page) {
  //   offset = (Number(page) - 1) * limit;
  // }

  const departments = await prisma.department.findMany({
    // skip: offset,
    // take: limit,
    where: {
      name: {
        equals: req.body.name,
      },
    },
    select: {
      name: true,
      id: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  res.json(departments);
};
//Creating a new user
const handlerPost: NextApiHandler = async (req, res) => {
  const { name, typeProduct } = req.body;

  let newDepartment = await prisma.department.findUnique({
    where: {
      name,
    },
  });

  if (newDepartment) {
    res.status(200).json({ message: "Department already exists" });
  } else {
    newDepartment = await prisma.department.create({
      data: {
        name: name.toLowerCase(),
      },
    });
    res.status(200).json({ message: "Department created successfully" });
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
