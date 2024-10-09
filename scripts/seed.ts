const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

const main = async () => {
  try {
    await db.category.createMany({
      data: [
        {
          name: "Famous People",
        },
        {
          name: "Movies & TV",
        },
        {
          name: "Musicians",
        },
        {
          name: "Horror",
        },
        {
          name: "Games",
        },
        {
          name: "Animals",
        },
        {
          name: "Action",
        },
        {
          name: "Comedy",
        },
        {
          name: "Lofi",
        },
        {
          name: "Science",
        },
        {
          name: "Romance",
        },
      ],
    });
  } catch (error) {
    console.log(`error: ${error}`);
  } finally {
    await db.$disconnect();
  }
};

main();
