import React, { useState, useEffect } from 'react';
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
    emailError: '',
    passwordError: '',
    mainError: '',
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    });
  }, [state.email, state.password]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    setState({ ...state, isLoading: true });
  };

  return (
    <div className="login">
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form className="form" onSubmit={handleSubmit}>
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
            disabled={!!(state.emailError || state.passwordError)}
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
