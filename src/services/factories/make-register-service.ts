import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { RegisterService } from "../orgs-register";

export function makeRegisterService() {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const service = new RegisterService(prismaOrgsRepository);

  return service;
}
