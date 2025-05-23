import { User } from "@/generated/prisma";
import api from "../config/axios";



const authService = {
  login(credentials: { username: string; password: string })  {
    return api.post<User>("/auth", credentials);
  },
};

export default authService;
