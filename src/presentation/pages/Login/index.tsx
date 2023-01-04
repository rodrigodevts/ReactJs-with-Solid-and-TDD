import { useState, useEffect } from 'react';
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  Spinner,
} from '@/presentation/components';

import { FormContext } from '@/presentation/contexts/formContext';

import './login-styles.scss';
import { Validation } from '@/presentation/protocols/validation';

type LoginProps = {
  validation: Validation;
};

function Login({ validation }: LoginProps) {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainError: '',
  });

  useEffect(() => {
    validation.validate('email', state.email);
  }, [state.email]);

  useEffect(() => {
    validation.validate('password', state.password);
  }, [state.password]);

  return (
    <div className="login">
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
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
