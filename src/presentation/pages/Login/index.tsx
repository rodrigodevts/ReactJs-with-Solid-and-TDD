import { useState } from 'react';
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  Spinner,
} from '@/presentation/components';

import { FormContext } from '@/presentation/contexts/formContext';

import './login-styles.scss';

function Login() {
  const [state] = useState({
    isLoading: false,
  });
  const [errorState] = useState({
    main: '',
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
  });

  return (
    <div className="login">
      <LoginHeader />
      <FormContext.Provider value={{ state, errorState }}>
        <form action="" className="form">
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            data-testid="button-submit"
            className="buttonSubmit"
            type="submit"
            disabled
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
