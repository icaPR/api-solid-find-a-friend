import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface FetchByAttributesServiceRequest {
  age?: "PUPPY" | "ADULT" | "ELDERLY";
  size?: "SMALL" | "AVERAGE" | "BIG";
  energy_level?:
    | "VERY_LOW_ENERGY"
    | "LOW_ENERGY"
    | "MODERATE_ENERGY"
    | "HIGH_ENERGY"
    | "VERY_HIGH_ENERGY";
  independence?: "LOW" | "AVERAGE" | "HIGH";
  cityCep: string;
}

interface FetchByAttributesServiceResponse {
  pets: Pet[];
}

export class FetchByAttributesService {
  constructor(private petsRepository: PetsRepository) {}

  async hanldeFetchByAttributes({
    age,
    size,
    energy_level,
    independence,
    cityCep,
  }: FetchByAttributesServiceRequest): Promise<FetchByAttributesServiceResponse> {
    const pets = await this.petsRepository.fetchByAttributes(
      {
        age,
        size,
        energy_level,
        independence,
      },
      cityCep
    );

    if (!pets) {
      throw new Error("Error");
    }

    return { pets };
  }
}
