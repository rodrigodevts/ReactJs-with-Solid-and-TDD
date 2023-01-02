import { useState } from 'react';
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  Spinner,
} from '@/presentation/components';

import './login-styles.scss';
import { FormContext } from '@/presentation/contexts/formContext';

type StateProps = {
  isLoading: boolean;
  errorMessage: string;
};

function Login() {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: '',
  });

  return (
    <div className="login">
      <LoginHeader />
      <FormContext.Provider value={state}>
        <form action="" className="form">
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            data-testid="spinner-loading"
            className="buttonSubmit"
            type="submit"
          >
            {state.isLoading ? <Spinner /> : 'Entrar'}
          </button>
          <FormStatus />
          <span className="createCountLink">Criar conta</span>
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
}

export default Login;
