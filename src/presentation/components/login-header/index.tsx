import { memo } from 'react';
import Logo from '../logo';
import './login-header-styles.scss';

const LoginHeader: React.FC = () => {
  return (
    <header className="header">
      <Logo />
      <h1>4Dev - Enquetes para programadores</h1>
    </header>
  );
};

export default memo(LoginHeader);
