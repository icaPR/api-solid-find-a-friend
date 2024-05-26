import request from "supertest";
import { app } from "@/app";

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { CreateAndAuthenticateOrg } from "@/utils/test/create-authenticate-org";

describe("Create pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a pet", async () => {
    const { token } = await CreateAndAuthenticateOrg(app);

    const data = {
      orgId: "exeampleId",
      name: "Pet",
      about: "Nice dog.",
      age: "PUPPY",
      size: "SMALL",
      energy_level: "VERY_LOW_ENERGY",
      independence: "LOW",
      ambient: "WIDE",
      photo: [
        "https://example.com/images/pet1.jpg",
        "https://example.com/images/pet2.jpg",
      ],
      requirement: [
        "Espaço para correr",
        "Brinquedos para morder",
        "Companhia frequente",
      ],
    };

    const response = await request(app.server)
      .post("/new_pets")
      .set("Authorization", `Bearer ${token}`)
      .send(data);
    expect(response.statusCode).toEqual(201);
  });
});
