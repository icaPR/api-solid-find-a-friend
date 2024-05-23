import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { compare } from "bcryptjs";

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  org: Org;
}

export class AuthenticateService {
  constructor(private orgsRepository: OrgsRepository) {}

  async hanldeAuthenticate({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      throw new Error();
    }

    const doesPasswordMatches = await compare(password, org.password_hash);
    if (!doesPasswordMatches) {
      throw new Error();
    }
    return { org };
  }
}
