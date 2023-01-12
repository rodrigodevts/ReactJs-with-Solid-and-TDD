import React, { useState, useEffect } from 'react';
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  Spinner,
} from '@/presentation/components';

import { FormContext } from '@/presentation/contexts/formContext';

import { Validation } from '@/presentation/protocols/validation';
import { Authentication } from '@/domain/useCases';

import './login-styles.scss';
import { Link, useNavigate } from 'react-router-dom';

type LoginProps = {
  validation: Validation;
  authentication: Authentication;
};

export type LoginStateProps = {
  isLoading: boolean;
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  mainError: string;
};

function Login({ validation, authentication }: LoginProps) {
  const [state, setState] = useState<LoginStateProps>({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    });
  }, [state.email, state.password]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return;
      }

      setState({ ...state, isLoading: true });

      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });

      localStorage.setItem('react-solid@accessToken', account.token);
      navigate('/', { replace: true });
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message });
    }
  };

  return (
    <div className="login">
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="login-form" className="form" onSubmit={handleSubmit}>
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
          <Link data-testid="signup" to="/signup" className="createCountLink">
            Criar conta
          </Link>
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
}

export default Login;
