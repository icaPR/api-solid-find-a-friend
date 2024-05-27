import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PetsRepository } from "../pets-repository";

interface FilterProps {
  size: "SMALL" | "AVERAGE" | "BIG";
  age?: "PUPPY" | "ADULT" | "ELDERLY";
  energy_level?:
    | "VERY_LOW_ENERGY"
    | "LOW_ENERGY"
    | "MODERATE_ENERGY"
    | "HIGH_ENERGY"
    | "VERY_HIGH_ENERGY";

  independence?: "LOW" | "AVERAGE" | "HIGH";
}

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data });
    return pet;
  }
  async findByCEP(cityCep: string) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          cep: {
            startsWith: cityCep,
          },
        },
      },
      include: {
        org: true,
      },
    });

    return pets;
  }

  async fetchByAttributes(
    { age, size, energy_level, independence }: FilterProps,
    cityCep: string
  ) {
    const filterAttributes: { [key: string]: any } = {
      org: {
        cep: {
          startsWith: cityCep,
        },
      },
    };

    if (age) filterAttributes.age = age;
    if (size) filterAttributes.size = size;
    if (energy_level) filterAttributes.energy_level = energy_level;
    if (independence) filterAttributes.independence = independence;
    const pets = await prisma.pet.findMany({
      where: filterAttributes,
      include: {
        org: true,
      },
    });

    return pets;
  }
}
