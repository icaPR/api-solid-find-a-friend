import { Pet, Prisma } from "@prisma/client";

interface FilterProps {
  age?: "PUPPY" | "ADULT" | "ELDERLY";
  size?: "SMALL" | "AVERAGE" | "BIG";
  energy_level?:
    | "VERY_LOW_ENERGY"
    | "LOW_ENERGY"
    | "MODERATE_ENERGY"
    | "HIGH_ENERGY"
    | "VERY_HIGH_ENERGY";

  independence?: "LOW" | "AVERAGE" | "HIGH";
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findByCEP(cityCep: string): Promise<Pet[]>;
  fetchByAttributes(attribute: FilterProps, cityCep: string): Promise<Pet[]>;
}
