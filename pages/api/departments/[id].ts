import { NextApiHandler } from "next";
import prisma from "../../../libs/prisma";

const handlerGet: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  const department = await prisma.department.findUnique({
    where: {
      id: id as string,
    },
    select: {
      name: true,
    },
  });

  if (!department) {
    res.status(404).json({ message: `Department with id ${id} not found` });
    return;
  }

  res.status(200).json(department);
};

const handlerPost: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  const { name} = req.body;

  let data: {
    name?: string;
  } = {};

  if (name) {
    data.name = name;
  }

  const updatedDepartment = await prisma.department.update({
    where: {
      id: id as string,
    },
    data,
  });

  if (updatedDepartment) {
    res.status(200).json(updatedDepartment);
  } else {
    res.json({ error: `Department with id ${id} not found` });
  }
};

const handlerDelete: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  try {
    const deletedDepartment = await prisma.department.delete({
      where: {
        id: id as string,
      },
    });

    res.status(200).json(deletedDepartment);
  } catch (error) {
    res.status(404).json({ message: `Department with id ${id} not found` });
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
