import { FormContext } from '@/presentation/contexts/formContext';
import { ReactNode, useContext } from 'react';
import Spinner from '../spinner';
import './submit-button-styles.scss';

type Props = {
  children: ReactNode;
};

const SubmitButton = ({ children }: Props) => {
  const { state } = useContext(FormContext);
  return (
    <button
      data-testid="button-submit"
      disabled={state.isFormInvalid}
      className="buttonSubmit"
      type="submit"
    >
      {state.isLoading ? <Spinner /> : children}
    </button>
  );
};

export { SubmitButton };
