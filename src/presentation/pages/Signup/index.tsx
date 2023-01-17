import { Link } from 'react-router-dom';

import LoginHeader from '@/presentation/components/login-header';
import Input from '@/presentation/components/input';
import FormStatus from '@/presentation/components/form-status';
import Footer from '@/presentation/components/footer';

import './signup-styles.scss';
import { FormContext } from '@/presentation/contexts/formContext';
import { useState } from 'react';

function Signup() {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  });

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
          <button className="buttonSubmit" type="submit">
            Cadastrar
          </button>
          <FormStatus />
          <Link to="/login" className="createCountLink">
            Voltar para o Login
          </Link>
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
}

export default Signup;
