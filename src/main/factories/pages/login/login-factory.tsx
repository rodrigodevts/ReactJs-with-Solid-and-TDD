import { makeLoginValidation } from './login-validation-factory';
import { Login } from '@/presentation/pages';
import { makeRemoteAuthentication } from '@/main/factories/useCases/authentication/remote-authentication-factory';

const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  );
};

export { makeLogin };
