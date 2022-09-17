import prismaClient from "../../prisma";

interface CategoryRequest {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    // if (name === "") {
    //   throw new Error("Name invalid");
    // }

    const validators = [
      {
        condition: name.length === 0,
        message: "valor inválido",
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
