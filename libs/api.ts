import prisma from "./prisma";

export default {
  getAllUsers: async (page: number) => {
    //Items per page
    const take = 20000;

    //Page number
    let skip = 0;
    if (page) {
      skip = (Number(page) - 1) * take;
    }

    const users = await prisma.user.findMany({
      skip,
      take,
      where: {
        name: {
          // equals: req.body.name1,
        },
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        Department: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        name: "desc",
      },
    });

    return users;
  },
};
