import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '@/presentation/pages';
import { ValidationStub } from '@/presentation/test/mock-validation';
import { Authentication, AuthenticationParams } from '@/domain/useCases';
import { mockAccountModel } from '@/domain/test';
import { AccountModel } from '@/domain/models';

class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    return await Promise.resolve(this.account);
  }
}

const Router: React.FC = () => {
  const validationStub = new ValidationStub();
  const authentication = new AuthenticationSpy();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              validation={validationStub}
              authentication={authentication}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
