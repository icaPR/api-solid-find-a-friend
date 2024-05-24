import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePetService } from "../create-pet";

export function makeCreatePetService() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const service = new CreatePetService(prismaPetsRepository);

  return service;
}
