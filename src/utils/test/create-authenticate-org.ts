import request from "supertest";
import { FastifyInstance } from "fastify";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function CreateAndAuthenticateOrg(app: FastifyInstance) {
  const org = await prisma.org.create({
    data: {
      id: "exampleId",
      name: "name test",
      email: "email@test.com",
      cep: "123456",
      address: "Rua test",
      phone_whatsapp: "00000000",
      password_hash: await hash("123456", 5),
    },
  });

  const authResponse = await request(app.server)
    .post("/sessions")
    .send({ email: "email@test.com", password: "123456" });
  const { token } = authResponse.body;

  return { token, org };
}
