import { useEffect, useState } from 'react';
import LoginHeader from '@/presentation/components/login-header';
import Input from '@/presentation/components/input';
import FormStatus from '@/presentation/components/form-status';
import Footer from '@/presentation/components/footer';
import { FormContext } from '@/presentation/contexts/formContext';

import './signup-styles.scss';

import Spinner from '@/presentation/components/spinner';
import { Validation } from '@/presentation/protocols/validation';

type SignUpProps = {
  validation: Validation;
};

function Signup({ validation }: SignUpProps) {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: '',
    mainError: '',
  });

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate(
        'passwordConfirmation',
        state.passwordConfirmation
      ),
    });
  }, [state.name, state.email, state.password, state.passwordConfirmation]);

  return (
    <div className="signup">
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form className="form">
          <h2>SignUp</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />
          <button
            data-testid="submit"
            disabled
            className="buttonSubmit"
            type="submit"
          >
            {state.isLoading ? <Spinner /> : 'Cadastrar'}
          </button>
          <FormStatus />
          <span className="createCountLink">Voltar para o Login</span>
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
}

export default Signup;
