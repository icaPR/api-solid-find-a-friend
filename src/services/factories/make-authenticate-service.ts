import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateService } from "../orgs-authenticate";

export function makeAuthenticateService() {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const service = new AuthenticateService(prismaOrgsRepository);

  return service;
}
