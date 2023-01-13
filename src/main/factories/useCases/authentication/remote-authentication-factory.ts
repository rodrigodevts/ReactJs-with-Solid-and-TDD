import { RemoteAuthentication } from '@/data/useCases/authentication/remote-authentication';
import { Authentication } from '@/domain/useCases/Authentication';
import { makeApiUrl } from '@/main/factories/http/api-url-factory';
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory';

const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(
    makeApiUrl('/sessions'),
    makeAxiosHttpClient()
  );
};

export { makeRemoteAuthentication };
