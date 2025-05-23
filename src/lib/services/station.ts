
import api from "../config/axios";
import { IStation } from "../interfaces/Station";





const endpoint = '/stations';

const stationService = {
  // Create
  create(station: IStation) {
    return api.post(endpoint, station);
  },

  // Read all
  getAll() {
    return api.get<IStation[]>(endpoint);
  },

  // Read one
  getById(id: number) {
    return api.get<IStation>(`${endpoint}/${id}`);
  },

  // Update
  update(id: number, station: Partial<IStation>) {
    return api.put(`${endpoint}/${id}`, station);
  },

  // Delete
  delete(id: number) {
    return api.delete(`${endpoint}/${id}`);
  },
};

export default stationService;
