import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface FetchPetByCEPServiceRequest {
  cityCep: string;
}

interface FetchPetByCEPServiceResponse {
  pets: Pet[];
}

export class FetchPetByCEPService {
  constructor(private petsRepository: PetsRepository) {}

  async hanldeFetchPetCEP({
    cityCep,
  }: FetchPetByCEPServiceRequest): Promise<FetchPetByCEPServiceResponse> {
    const pets = await this.petsRepository.findByCEP(cityCep);

    if (!pets) {
      throw new Error("Error");
    }

    return { pets };
  }
}
