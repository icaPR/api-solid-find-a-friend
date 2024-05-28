import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { CreateAndAuthenticateOrg } from "@/utils/test/create-authenticate-org";
import { prisma } from "@/lib/prisma";

describe("Fetch pet by CEP (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should look for a pet based on the attribute", async () => {
    const { token, org } = await CreateAndAuthenticateOrg(app);

    await prisma.pet.create({
      data: {
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
    await prisma.pet.create({
      data: {
        orgId: org.id,
        name: "Pet2",
        about: "Nice dog.",
        age: "ADULT",
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
      .get(`/pets/filter/${1234}`)
      .query({ age: "ADULT" })
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(1);
  });
});
