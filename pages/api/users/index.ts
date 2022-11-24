import { NextApiHandler } from "next";
import api from '../../../libs/api';
import prisma from "../../../libs/prisma";

//Getting all users
const handlerGet: NextApiHandler = async (req, res) => {
  const { name } = req.body;
  const { page } = req.query;

  const users = await api.getAllUsers(Number(page));

  
  res.send(users);
};
//Creating a new user
const handlerPost: NextApiHandler = async (req, res) => {
  const { name, email, departmentId } = req.body;

  let newUser = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      departmentId: true,
    },
  });

  if (newUser) {
    res.status(200).json({ message: "User already exists" });
  } else {
    newUser = await prisma.user.create({
      data: {
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        departmentId,
      },
      include: {
        Department: true,
      },
    });
    res.status(200).json({ message: "User created successfully" });
  }
};

const handlerPatch: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  const { name, email, isDeleted } = req.body;

  let data: {
    name?: string;
    email?: string;
    isDeleted?: boolean;
  } = {};


  const updatedUser = await prisma.user.update({
    where: {
      id: id as string,
    },
    data: {
      name: name,
      email: email,
      isDeleted: true,
    },
  });

  if (updatedUser) {
    res.status(200).json(updatedUser);
  }

  // res.json({ error: `User with id ${id} not found` });
};

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      return handlerGet(req, res);
    case "POST":
      return handlerPost(req, res);
    case "PATCH":
      return handlerPatch(req, res);
  }
};

export default handler;
