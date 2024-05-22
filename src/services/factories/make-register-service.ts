import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { RegisterService } from "../orgs-register";

export function makeRegisterService() {
  const prismaUsersRepository = new PrismaOrgsRepository();
  const service = new RegisterService(prismaUsersRepository);

  return service;
}
