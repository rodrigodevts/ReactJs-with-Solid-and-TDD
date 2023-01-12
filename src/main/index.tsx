import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from '@/presentation/components';
import '@/presentation/styles/global.scss';
import { makeLogin } from './factories/pages/login/login-factory';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router MakeLogin={makeLogin} />
  </React.StrictMode>
);
