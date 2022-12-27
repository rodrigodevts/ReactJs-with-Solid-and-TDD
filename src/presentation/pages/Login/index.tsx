import Footer from '@/presentation/components/footer';
import FormStatus from '@/presentation/components/form-status';
import Input from '@/presentation/components/input';
import Header from '@/presentation/components/login-header';
import Spinner from '@/presentation/components/spinner';
import './login-styles.scss';

function Login() {
  return (
    <div className="login">
      <Header />
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
