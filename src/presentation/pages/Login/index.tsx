import Spinner from '@/presentation/components/spinner';
import './login-styles.scss';

function Login() {
  return (
    <div className="login">
      <header className="header">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAAgCAYAAAC7OlJnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPHSURBVHgB7ZzhUdtAEIWfmfxm6CBKB1BBTAWBCmIqiKkAUwGkAjsVhA5IKoAOUAckbkDZJ62ILGTdniULA/vN3MhIp9Oaed5Z7+55hA3JsuxADlMZ3/TUjYzL0WiUoiPL5XIih3nELYv9/f2zHtfr9DzHRk1DfL1ARw19wAaIIYkcfso4rJyeyOD5YziOjSsUuinh67Ho63hTUe8hEhXzLVbFXEJjxnCcAKqjScMlnr/V69FECboi5qRl2mc4TpjDlmuJjDvRW9ucRsyC1sXv0C5mkiISxrgysnKg33jXAmPi0boh1+vx8oq9Moa29y3wJ3CdMTVF/RURmAQti05QiPkgMDWV8RuOE0Bi5F+wOb+F6G8GI0FB62IWD8RP3HkfWQ7n3XAKm6gvrKJuFbQucoEwFDO/md7AcYyIXu5RZMVSw3SK+io0aW3aTm6+xv8ccxspCjGnMGLIC6/kebeQR45CbFmgyJHmNNgz0XMlO50Xj/3/931/FeqGaTqEkw1kqomJM7mvMQZ/5qGZ7JbBHPNWxOw4dVQ/RzLuDdNP0JLWWxF0JS13gjB8+JGL2ekDelwZFPUPw3Rm3BpF/SToQMGkzgKFZw6lXhwnCtHURA4zw9QEDaLOY2hjwaTkWh56jgj6jLleI32//64x/K4j+roUTfLlLDA1QZGrPtYvmNhTMVsKJvkDYsXsOJtAUcvBorWyADPmHww55ggXTMhUH+I4gyB6Y6aNuWpLaJun9CjocWAiF5vI4t/hOAOjtQ1LrvpQvPRHxtAUbJuH5rVP2C71GLDr/a8thuz6/t86B7BFEX/poS25P3Pp0XH6RPuImLAI9hEx60ZB05OlCOOidgYlso+IsTb2tDASU0+f69YZx9kaEX1EKYqaSB5pjCoLJHi+rWodvPl0qCrhS/ce7FLvwzboobekV/tFiws5WPqgU9RaL54qhRVPbemYW1t6dJxN0T4ixssbiZms9HJoPZ2xyDXCJHBROz1RqVaPDdPX9hE19kNrNXCGMAkKUUfv/XKcktg+IjYxresjGqH9QQzKZwjDxVlJtHRKRTNADBtLp5hx138nZMiYX50hv7slhumzULW6dceK3mwxPP+REDFuCscxomK2NsUFxUyCewplkQWK5mtTPd1jaseCpn7pmXvtIzLt+tYcH0WdGqZ/geOEGSPsmfOCydb6iOh9ZTxk7VzBcQKwpB3Q0cMgyQYV9V2LIVE/DOK8T9i/HBBzgqHIdCNtkyFwHCOil9sXF3PNoAs14FGNS+A4RtQxzlU/j1kPfUL/APsAtlpn2+KqAAAAAElFTkSuQmCC"
          alt="Logo the application"
        />
        <h1>4Dev - Enquetes para programadores</h1>
      </header>
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
      <footer className="footer" />
    </div>
  );
}

export default Login;
