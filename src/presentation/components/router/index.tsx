import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '@/presentation/pages';
import { Validation } from '@/presentation/protocols/validation';

class ValidationSpy implements Validation {
  errorMessage: string;
  fieldName: string;
  fieldValue: string;

  validate(fieldName: string, fieldValue: string) {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    return this.errorMessage;
  }
}

const Router: React.FC = () => {
  const validationSpy = new ValidationSpy();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login validation={validationSpy} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
