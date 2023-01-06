import React, { useContext } from 'react';
import { FormContext } from '@/presentation/contexts/formContext';
import './form-status-styles.scss';

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext);
  const { mainError } = state;

  return (
    <div data-testid="error-wrap" className="errorWrap">
      {mainError && (
        <span data-testid="main-error" className="error">
          {mainError}
        </span>
      )}
    </div>
  );
};

export default FormStatus;
