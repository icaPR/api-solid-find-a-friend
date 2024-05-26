import { makeFetchPetByCEPService } from "@/services/factories/make-fetch-pet-cep-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function petsByCEP(req: FastifyRequest, res: FastifyReply) {
  const fetchByCEPBParamsScheme = z.object({
    cityCep: z.string(),
  });

  const { cityCep } = fetchByCEPBParamsScheme.parse(req.params);

  const fetchByCEPService = makeFetchPetByCEPService();
  const pets = await fetchByCEPService.hanldeFetchPetCEP({
    cityCep,
  });
  return res.status(200).send({ pets });
}
