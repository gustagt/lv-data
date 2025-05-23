import { Station } from "@/generated/prisma";
import prisma from "../prisma/client";

class StationRepository {
  async findAll(): Promise<Station[]> {
    return prisma.station.findMany();
  }

  async findById(id: number): Promise<Station | null> {
    return prisma.station.findUnique({ where: { id } });
  }

  async create(data: Omit<Station, "id">): Promise<Station> {
    const existingStation = await prisma.station.findFirst({
      where: {
        OR: [
          { computer: data.computer },
          { monitor1: data.monitor1 },
          { monitor2: data.monitor2 },
        ],
      },
    });

    if (existingStation) {
      if (existingStation.computer === data.computer) {
        throw new Error("Já existe um cadastro com esse computador.");
      }

      if (existingStation.monitor1 === data.monitor1) {
        throw new Error("Já existe um cadastro com esse monitor 1.");
      }
      if (existingStation.monitor2 === data.monitor2) {
        throw new Error("Já existe um cadastro com esse monitor 2.");
      }
    }

    return prisma.station.create({ data });
  }

  async update(id: number, data: Partial<Station>): Promise<Station> {
    const existingStation = await prisma.station.findUnique({
      where: { id },
    });

    if (!existingStation) {
      throw new Error("Station not found");
    }
    return prisma.station.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Station> {
    const existingStation = await prisma.station.findUnique({
      where: { id },
    });
    if (!existingStation) {
      throw new Error("Station not found");
    }
    return prisma.station.delete({ where: { id } });
  }
}

const stationRepository = new StationRepository();
export default stationRepository;
