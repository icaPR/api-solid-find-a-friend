import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface FetchPetByCEPServiceRequest {
  id: string;
}

interface FetchPetByCEPServiceResponse {
  pet: Pet;
}

export class GetPetService {
  constructor(private petsRepository: PetsRepository) {}

  async hanldeGetPet({
    id,
  }: FetchPetByCEPServiceRequest): Promise<FetchPetByCEPServiceResponse> {
    const { pet } = await this.petsRepository.findById(id);

    if (!pet) {
      throw new Error("Error");
    }

    return { pet };
  }
}
