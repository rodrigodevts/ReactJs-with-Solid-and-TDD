import Footer from '@/presentation/components/footer';
import Header from '@/presentation/components/login-header';
import Spinner from '@/presentation/components/spinner';
import './login-styles.scss';

function Login() {
  return (
    <div className="login">
      <Header />
      <form action="" className="form">
        <h2>Login</h2>
        <div className="inputWrap">
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <span className="status">✅</span>
        </div>
        <div className="inputWrap">
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <span className="status">✅</span>
        </div>
        <button className="buttonSubmit" type="submit">
          {/* Entrar */}
          <Spinner />
        </button>
        <div className="errorWrap">
          <span className="error">Erro</span>
        </div>
        <span className="createCountLink">Criar conta</span>
      </form>
      <Footer />
    </div>
  );
}

export default Login;
