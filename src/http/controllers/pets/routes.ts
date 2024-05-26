import { FastifyInstance } from "fastify";
import { create } from "./create";
import { VerifyJWT } from "@/http/middlewares/verify-jwt";
import { petsByCEP } from "./petsByCEP";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/new_pets", { onRequest: [VerifyJWT] }, create);
  app.get("/pets/:cityCep", petsByCEP);
}
