import React, { useContext } from 'react';
import { FormContext } from '@/presentation/contexts/formContext';
import './form-status-styles.scss';

const FormStatus: React.FC = () => {
  const {
    errorState: { main },
  } = useContext(FormContext);

  return (
    <div data-testid="error-wrap" className="errorWrap">
      {main && <span className="error">{main}</span>}
    </div>
  );
};

export default FormStatus;
