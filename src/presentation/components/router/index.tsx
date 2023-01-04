import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '@/presentation/pages';
import { ValidationStub } from '@/presentation/test/mock-validation';

const Router: React.FC = () => {
  const validationStub = new ValidationStub();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login validation={validationStub} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
