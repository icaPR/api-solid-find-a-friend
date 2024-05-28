import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { CreateAndAuthenticateOrg } from "@/utils/test/create-authenticate-org";
import { prisma } from "@/lib/prisma";

describe("Get pet by Id (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should get a pet", async () => {
    const { token, org } = await CreateAndAuthenticateOrg(app);

    await prisma.pet.create({
      data: {
        id: "123456789",
        orgId: org.id,
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
      },
    });

    const response = await request(app.server)
      .get(`/pet/${123456789}`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.statusCode).toEqual(200);
    expect(response.body.pet.about).toEqual(expect.any(String));
  });
});
