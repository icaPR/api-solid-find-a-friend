import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FetchPetByCEPService } from "../fetch-pet-cep";

export function makeFetchPetByCEPService() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const service = new FetchPetByCEPService(prismaPetsRepository);

  return service;
}
