import { User } from "@/generated/prisma";
import api from "../config/axios";


const endpoint = '/users';

const userService = {
  

  // Create
  create(user: User) {
    return api.post(endpoint, user);
  },

  // Read all
  getAll() {
    return api.get<User[]>(endpoint);
  },

  // Read one
  getById(id: number) {
    return api.get<User>(`${endpoint}/${id}`);
  },

  // Update
  update(id: number, user: Partial<User>) {
    return api.put(`${endpoint}/${id}`, user);
  },

  // Delete
  delete(id: number) {
    return api.delete(`${endpoint}/${id}`);
  },
};

export default userService;
