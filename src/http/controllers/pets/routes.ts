import { FastifyInstance } from "fastify";
import { create } from "./create";
import { VerifyJWT } from "@/http/middlewares/verify-jwt";

export async function petsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", VerifyJWT);
  app.post("/pets", create);
}
