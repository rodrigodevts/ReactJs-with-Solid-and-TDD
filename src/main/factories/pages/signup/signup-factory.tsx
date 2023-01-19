import Signup from '@/presentation/pages/Signup';
import { makeRemoteAddAccount } from '../../useCases/add-account/remote-add-account';
import { makeLocalSaveAccessToken } from '../../useCases/save-access-token/local-save-access-token-factory';
import { makeSignUpValidation } from './signup-validation-factory';

const makeSignUp = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessTokenMock={makeLocalSaveAccessToken()}
    />
  );
};

export { makeSignUp };
