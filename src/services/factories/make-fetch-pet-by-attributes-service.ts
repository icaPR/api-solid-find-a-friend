import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FetchByAttributesService } from "../fetch-by-attributes";

export function makeFetchByAttributesService() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const service = new FetchByAttributesService(prismaPetsRepository);

  return service;
}
