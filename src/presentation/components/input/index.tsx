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
  console.log(error);

  return (
    <div
      data-testid={`${props.name}-wrap`}
      className="inputWrap"
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        placeholder=" "
        data-testid={props.name}
        title={error}
        readOnly
        onFocus={(e) => (e.target.readOnly = false)}
        onChange={(e) =>
          setState({
            ...state,
            [e.target.name]: e.target.value,
          })
        }
      />
      <label data-testid={`${props.name}-label`} title={error}>
        {props.placeholder}
      </label>
    </div>
  );
};

export default Input;
