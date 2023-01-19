import { BrowserRouter, Routes, Route } from 'react-router-dom';

type Factory = {
  MakeLogin: React.FC;
  MakeSignUp: React.FC;
};

const Router: React.FC<Factory> = ({ MakeLogin, MakeSignUp }: Factory) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<MakeLogin />} />
        <Route path="/signup" element={<MakeSignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
