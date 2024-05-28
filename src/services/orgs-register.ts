import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAlreadyExists } from "./errors/user-already-exists";

interface RegisterServiceRequest {
  name: string;
  email: string;
  cep: string;
  address: string;
  phone_whatsapp: string;
  password: string;
}

interface RegisterServiceResponse {
  org: Org;
}

export class RegisterService {
  constructor(private orgsRepository: OrgsRepository) {}

  async handleRegister({
    name,
    email,
    cep,
    address,
    phone_whatsapp,
    password,
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const password_hash = await hash(password, 5);

    const orgWithSamePhone = await this.orgsRepository.findByPhone(
      phone_whatsapp
    );
    const orgWithSameEmail = await this.orgsRepository.findByPhone(email);

    if (orgWithSameEmail) {
      throw new UserAlreadyExists();
    }
    if (orgWithSamePhone) {
      throw new UserAlreadyExists();
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      cep,
      address,
      phone_whatsapp,
      password_hash,
    });

    return { org };
  }
}
