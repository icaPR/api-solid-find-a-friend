import { makeAuthenticateService } from "@/services/factories/make-authenticate-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodyScheme = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodyScheme.parse(req.body);

  try {
    const authenticate = makeAuthenticateService();

    const { org } = await authenticate.hanldeAuthenticate({
      email,
      password,
    });

    const token = await res.jwtSign({}, { sign: { sub: org.id } });
    return res.status(200).send({ token });
  } catch (e) {
    throw e;
  }
}
