import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";

interface RegisterServiceProps {
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
  }: RegisterServiceProps): Promise<RegisterServiceResponse> {
    const password_hash = await hash(password, 5);

    const orgWiithSamePhone = await this.orgsRepository.findByPhone(
      phone_whatsapp
    );
    const orgWiithSameEmail = await this.orgsRepository.findByPhone(email);

    if (orgWiithSamePhone) {
      throw new Error();
    }
    if (orgWiithSameEmail) {
      throw new Error();
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
