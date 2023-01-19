import { RemoteAddAccount } from '@/data/useCases/add-account/remote-add-account';
import { AddAccount } from '@/domain/useCases/add-account';
import { makeApiUrl } from '@/main/factories/http/api-url-factory';
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory';

const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient());
};

export { makeRemoteAddAccount };
