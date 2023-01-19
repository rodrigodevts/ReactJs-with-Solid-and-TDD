import { useEffect, useState } from 'react';
import LoginHeader from '@/presentation/components/login-header';
import Input from '@/presentation/components/input';
import FormStatus from '@/presentation/components/form-status';
import Footer from '@/presentation/components/footer';
import { FormContext } from '@/presentation/contexts/formContext';

import './signup-styles.scss';

import Spinner from '@/presentation/components/spinner';
import { Validation } from '@/presentation/protocols/validation';
import { AddAccount } from '@/domain/useCases/add-account';

type SignUpProps = {
  validation: Validation;
  addAccount: AddAccount;
};

function Signup({ validation, addAccount }: SignUpProps) {
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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (
        state.isLoading ||
        state.nameError ||
        state.emailError ||
        state.passwordError ||
        state.passwordConfirmationError
      ) {
        return;
      }
      setState({ ...state, isLoading: true });
      await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
      });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message,
      });
    }
  };

  return (
    <div className="signup">
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="login-form" className="form" onSubmit={handleSubmit}>
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
            disabled={
              !!state.nameError ||
              !!state.emailError ||
              !!state.passwordError ||
              !!state.passwordConfirmationError
            }
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
