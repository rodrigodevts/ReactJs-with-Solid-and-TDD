import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '@/presentation/pages';
import { ValidationSpy } from '@/presentation/test/mock-validation';

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
