import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import LoginHeader from '@/presentation/components/login-header';
import Input from '@/presentation/components/input';
import Spinner from '@/presentation/components/spinner';
import FormStatus from '@/presentation/components/form-status';
import Footer from '@/presentation/components/footer';

import { FormContext } from '@/presentation/contexts/formContext';

import { Validation } from '@/presentation/protocols/validation';
import { Authentication } from '@/domain/useCases/authentication';
import { SaveAccessToken } from '@/domain/useCases/save-access-token';

import './login-styles.scss';

type LoginProps = {
  validation: Validation;
  authentication: Authentication;
  saveAccessToken: SaveAccessToken;
};

function Login({ validation, authentication, saveAccessToken }: LoginProps) {
  const [state, setState] = useState({
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

      await saveAccessToken.save(account.token);
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
