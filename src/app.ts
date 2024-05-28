import fastify from "fastify";
import { orgsRoutes } from "./http/controllers/orgs/routes";
import { petsRoutes } from "./http/controllers/pets/routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m", //10 minutes
  },
});
app.register(fastifyCookie);
app.register(orgsRoutes);
app.register(petsRoutes);
