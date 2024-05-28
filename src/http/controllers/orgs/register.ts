import { DataAlreadyExists } from "@/services/errors/data-already-exists";
import { makeRegisterService } from "@/services/factories/make-register-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodyScheme = z.object({
    name: z.string(),
    email: z.string().email(),
    cep: z.string(),
    address: z.string(),
    phone_whatsapp: z.string(),
    password: z.string().min(6),
  });

  const { name, email, cep, address, phone_whatsapp, password } =
    registerBodyScheme.parse(req.body);

  try {
    const registerService = makeRegisterService();

    await registerService.handleRegister({
      name,
      email,
      cep,
      address,
      phone_whatsapp,
      password,
    });
  } catch (e) {
    if (e instanceof DataAlreadyExists) {
      return res.status(409).send({ message: e.message });
    }
  }

  return res.status(201).send();
}
