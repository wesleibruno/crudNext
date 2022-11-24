import { NextApiHandler } from "next";
import prisma from "../../../libs/prisma";

const handlerGet: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  const user = await prisma.user.findUnique({
    where: {
      id: id as string,
    },
    select: {
      id: true,
      name: true,
      email: true,
      Department: true,
    },
  });

  if (!user) {
    res.status(404).json({ message: `User with id ${id} not found` });
    return;
  }

  res.json(user);
};

const handlerPost: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  const { name, email, departmentId } = req.body;

  let data: {
    name?: string;
    email?: string;
    departmentId?: string;
  } = {};

  if (name) {
    data.name = name;
  }
  if (email) {
    data.email = email;
  }

  if (departmentId) {
    data.departmentId = String(departmentId);
  }

  // if (isDeleted) {
  //   switch (isDeleted) {
  //     case "true":
  //     case "1":
  //       data.isDeleted = true;
  //       break;
  //     case "false":
  //     case "0":
  //       data.isDeleted = false;
  //       break;
  //     default:
  //       res.status(400).json({ message: "Invalid active value" });
  //       return;
  //   }
  // }

  const updatedUser = await prisma.user.update({
    where: {
      id: id as string,
    },
    data,
  });

  if (updatedUser) {
    res.json(updatedUser);
  }

  res.json({ error: `User with id ${id} not found` });
};

const handlerPut: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  const { name, email, departmentId } = req.body;

  let data: {
    name?: string;
    email?: string;
    departmentId?: string;
  } = {};

  if (name) {
    data.name = name;
  }
  if (email) {
    data.email = email;
  }

  if (departmentId) {
    data.departmentId = String(departmentId);
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: id as string,
    },
    data,
  });

  if (updatedUser) {
    res.json(updatedUser);
  }

  res.json({ error: `User with id ${id} not found` });
};


// const handlerDelete: NextApiHandler = async (req, res) => {
//   const { id } = req.query;

//   try {
//     const deletedUser = await prisma.user.delete({
//       where: {
//         id: id as string,
//       },
//     });

//     res.status(200).json(deletedUser);
//   } catch (error) {
//     res.status(404).json({ message: `User with id ${id} not found` });
//   }
// };

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
    // case "DELETE":
    //   return handlerDelete(req, res);

    case "PUT":
      return handlerPut(req, res);
    case "PATCH":
      return handlerPatch(req, res);
  }
};

export default handler;
