import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from '@/presentation/router';
import { makeLogin } from './factories/pages/login/login-factory';

import '@/presentation/styles/global.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router MakeLogin={makeLogin} />
  </React.StrictMode>
);
