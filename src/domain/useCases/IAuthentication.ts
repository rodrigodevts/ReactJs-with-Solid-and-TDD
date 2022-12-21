import { AccountModel } from "@/domain/models/AccountModel";

interface IAuthenticationParams {
  email: string;
  password: string;
}

interface IAuthentication {
  auth: (params: IAuthenticationParams) => Promise<AccountModel>;
}

export { IAuthentication, IAuthenticationParams };
