import { User } from "@/generated/prisma";
import prisma from "../prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserRepository {
  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async login(data: {
    username: string;
    password: string;
  }): Promise<User | null> {
    const { username, password } = data;
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordValid) {
      throw new Error("Usuário nao encontrado.");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || "secreta", 
      { expiresIn: "1d" }
    );

    const res = await prisma.user.update({
      where: { id: user.id },
      data: { token },
    });

    return res;
  }

  async create(data: Omit<User, "id">): Promise<User> {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }],
      },
    });

    if (existingUser) {
      throw new Error("Já existe um usuário com esse username.");
    }

    if (data.password.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userPass: Omit<User, "id"> = {
      ...data,
      password: hashedPassword,
    };

    return prisma.user.create({ data: userPass });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new Error("Usuário não encontrado.");
    }
    return prisma.user.update({ where: { id }, data });
  }
}

const userRepository = new UserRepository();
export default userRepository;
