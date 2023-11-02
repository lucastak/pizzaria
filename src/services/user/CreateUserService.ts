import { User } from "@prisma/client";
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: UserRequest): Promise<{
    name: string;
    email: string;
    id: string;
  }>
  {
    await this.validateEmail(email);
    const passwordHash = await this.hashPassword(password);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }

  private async validateEmail(email: string): Promise<void> {
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    const validators = [
      {
        condition: !email,
        message: "Email incorrect",
      },
      {
        condition: userAlreadyExists,
        message: "User already exists",
      },
    ];

    for (const validador of validators) {
      if (validador.condition) {
        throw new Error(validador.message);
      }
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return await hash(password, 8);
  }
}


export { CreateUserService };
