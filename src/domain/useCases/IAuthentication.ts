import { AccountModel } from "../models/AccountModel";

type IAuthenticationParams = {
  email: string;
  password: string;
}

interface IAuthentication {
  auth(params: IAuthenticationParams): Promise<AccountModel>;
}

export { IAuthentication }