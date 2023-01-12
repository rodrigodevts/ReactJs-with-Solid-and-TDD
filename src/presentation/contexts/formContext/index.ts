import { LoginStateProps } from '@/presentation/pages/Login';
import { createContext } from 'react';

type FormContextTypes = {
  state: LoginStateProps;
  setState: (props: LoginStateProps) => void;
};

export const FormContext = createContext<FormContextTypes>(null);
