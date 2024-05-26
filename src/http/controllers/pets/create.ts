import { makeCreatePetService } from "@/services/factories/make-create-pet-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, res: FastifyReply) {
  const registerBodyScheme = z.object({
    name: z.string(),
    about: z.string(),
    age: z.enum(["PUPPY", "ADULT", "ELDERLY"]).default("ADULT"),
    size: z.enum(["SMALL", "AVERAGE", "BIG"]).default("AVERAGE"),
    energy_level: z
      .enum([
        "VERY_LOW_ENERGY",
        "LOW_ENERGY",
        "MODERATE_ENERGY",
        "HIGH_ENERGY",
        "VERY_HIGH_ENERGY",
      ])
      .default("MODERATE_ENERGY"),
    independence: z.enum(["LOW", "AVERAGE", "HIGH"]).default("AVERAGE"),
    ambient: z.enum(["NARROW", "WIDE"]).default("WIDE"),
    photo: z.string().array(),
    requirement: z.string().array(),
  });

  const {
    name,
    about,
    age,
    size,
    energy_level,
    independence,
    ambient,
    photo,
    requirement,
  } = registerBodyScheme.parse(req.body);

  const registerService = makeCreatePetService();
  console.log(req.user.sub);
  await registerService.handleCreate({
    orgId: req.user.sub,
    name,
    about,
    age,
    size,
    energy_level,
    independence,
    ambient,
    photo,
    requirement,
  });

  return res.status(201).send();
}
