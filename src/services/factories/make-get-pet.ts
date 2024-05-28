import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetService } from "../get-pet";

export function makeGetPetService() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const service = new GetPetService(prismaPetsRepository);

  return service;
}
