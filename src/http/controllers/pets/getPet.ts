import { makeGetPetService } from "@/services/factories/make-get-pet";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPet(req: FastifyRequest, res: FastifyReply) {
  const fetchByCEPParamsScheme = z.object({
    id: z.string(),
  });

  const { id } = fetchByCEPParamsScheme.parse(req.params);

  const fetchByCEPService = makeGetPetService();
  const { pet } = await fetchByCEPService.hanldeGetPet({
    id,
  });
  return res.status(200).send({ pet });
}
