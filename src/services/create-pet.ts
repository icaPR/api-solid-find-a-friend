import { PetsRepository } from "@/repositories/pets-repository";
import { $Enums, Pet } from "@prisma/client";

interface CreatePetServiceRequest {
  orgId: string;
  name: string;
  about: string;
  age: $Enums.Age;
  size: $Enums.Size;
  energy_level: $Enums.Energy_level;
  independence: $Enums.Independence;
  ambient: $Enums.Ambient;
  photo: string[];
  requirement: string[];
}

interface CreatePetServiceResponse {
  pet: Pet;
}

export class CreatePetService {
  constructor(private petsRepository: PetsRepository) {}

  async handleCreate({
    orgId,
    name,
    about,
    age,
    size,
    energy_level,
    independence,
    ambient,
    photo,
    requirement,
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const pet = await this.petsRepository.create({
      orgId,
      name,
      about,
      age,
      size,
      energy_level,
      independence,
      ambient,
      photo,
      requirement,
    });
    if (!pet) {
      throw new Error();
    }

    return { pet };
  }
}
