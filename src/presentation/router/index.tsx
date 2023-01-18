import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from '@/presentation/pages/Signup';
import { AddAccountSpy } from '../test/mock-add-account';
import { ValidationStub } from '../test/mock-validation';

type Props = {
  MakeLogin: React.FC;
  MakeSignUp: React.FC;
};

const Router: React.FC<Props> = ({ MakeLogin, MakeSignUp }: Props) => {
  const addAccountSpy = new AddAccountSpy();
  const validation = new ValidationStub();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<MakeLogin />} />
        <Route
          path="/signup"
          element={
            <Signup addAccount={addAccountSpy} validation={validation} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
