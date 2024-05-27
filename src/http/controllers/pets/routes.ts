import { FastifyInstance } from "fastify";
import { create } from "./create";
import { VerifyJWT } from "@/http/middlewares/verify-jwt";
import { petsByCEP } from "./petsByCEP";
import { petsByAttributes } from "./fetchByAttributes";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/new_pets", { onRequest: [VerifyJWT] }, create);
  app.get("/pets/:cityCep", petsByCEP);
  app.get("/pets/filter/:cityCep", petsByAttributes);
}
