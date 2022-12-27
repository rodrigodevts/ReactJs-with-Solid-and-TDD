import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  Spinner,
} from '@/presentation/components';

import './login-styles.scss';

function Login() {
  return (
    <div className="login">
      <LoginHeader />
      <form action="" className="form">
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button className="buttonSubmit" type="submit">
          {/* Entrar */}
          <Spinner />
        </button>
        <FormStatus />
        <span className="createCountLink">Criar conta</span>
      </form>
      <Footer />
    </div>
  );
}

export default Login;
