import React, { useContext } from 'react';
import { FormContext } from '@/presentation/contexts/formContext';
import './form-status-styles.scss';

const FormStatus: React.FC = () => {
  const { errorMessage } = useContext(FormContext);
  return (
    <div data-testid="error-wrap" className="errorWrap">
      {errorMessage && <span className="error">{errorMessage}</span>}
    </div>
  );
};

export default FormStatus;
