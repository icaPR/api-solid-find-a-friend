import { makeFetchByAttributesService } from "@/services/factories/make-fetch-pet-by-attributes-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function petsByAttributes(req: FastifyRequest, res: FastifyReply) {
  const fetchByCEPQueryScheme = z.object({
    age: z.enum(["PUPPY", "ADULT", "ELDERLY"]).optional(),
    size: z.enum(["SMALL", "AVERAGE", "BIG"]).optional(),
    energy_level: z
      .enum([
        "VERY_LOW_ENERGY",
        "LOW_ENERGY",
        "MODERATE_ENERGY",
        "HIGH_ENERGY",
        "VERY_HIGH_ENERGY",
      ])
      .optional(),
    independence: z.enum(["LOW", "AVERAGE", "HIGH"]).optional(),
  });
  const fetchByCEPParamsScheme = z.object({
    cityCep: z.string(),
  });

  const { age, size, energy_level, independence } = fetchByCEPQueryScheme.parse(
    req.query
  );

  const { cityCep } = fetchByCEPParamsScheme.parse(req.params);
  console.log(age);
  const fetchByCEPService = makeFetchByAttributesService();
  const { pets } = await fetchByCEPService.hanldeFetchByAttributes({
    cityCep,
    age,
    size,
    energy_level,
    independence,
  });
  return res.status(200).send({ pets });
}
