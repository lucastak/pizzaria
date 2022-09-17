import prismaClient from "../../prisma";

interface CategoryRequest {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    const listAlreadyExists = await prismaClient.category.findFirst({
      where: {
        name: name,
      },
    });

    const validators = [
      {
        condition: name.length === 0,
        message: "Category invalid",
      },
      {
        condition: listAlreadyExists,
        message: "Category already exist",
      },
    ];

    for (const validador of validators) {
      if (validador.condition) {
        throw new Error(validador.message);
      }
    }

    const category = await prismaClient.category.create({
      data: {
        name: name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return category;
  }
}

export { CreateCategoryService };
