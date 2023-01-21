import { FormContext } from '@/presentation/contexts/formContext';
import React, { useContext } from 'react';
import './input-styles.scss';

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext);
  const error = state[`${props.name}Error`];

  return (
    <div className="inputWrap">
      <input
        {...props}
        placeholder=" "
        data-testid={props.name}
        readOnly
        onFocus={(e) => (e.target.readOnly = false)}
        onChange={(e) =>
          setState({
            ...state,
            [e.target.name]: e.target.value,
          })
        }
      />
      <label>{props.placeholder}</label>
      <span
        data-testid={`${props.name}-status`}
        title={error || 'Tudo certo!'}
        className="status"
      >
        {error ? '🛑' : '✅'}
      </span>
    </div>
  );
};

export default Input;
