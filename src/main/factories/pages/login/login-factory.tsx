import { makeLoginValidation } from './login-validation-factory';
import { makeRemoteAuthentication } from '@/main/factories/useCases/authentication/remote-authentication-factory';
import { makeLocalSaveAccessToken } from '@/main/factories/useCases/save-access-token/local-save-access-token-factory';
import Login from '@/presentation/pages/Login';

const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
};

export { makeLogin };
