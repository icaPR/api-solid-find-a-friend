import request from "supertest";
import { app } from "@/app";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate ", async () => {
    await request(app.server).post("/orgs").send({
      name: "org",
      email: "orgs@email.com",
      cep: "123456",
      address: "Rua test",
      phone_whatsapp: "00000000",
      password: "123456",
    });
    const response = await request(app.server).post("/sessions").send({
      email: "orgs@email.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
  });
});
