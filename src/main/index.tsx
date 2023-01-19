import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from '@/presentation/router';
import { makeLogin } from './factories/pages/login/login-factory';

import '@/presentation/styles/global.scss';
import { makeSignUp } from './factories/pages/signup/signup-factory';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router MakeLogin={makeLogin} MakeSignUp={makeSignUp} />
  </React.StrictMode>
);
