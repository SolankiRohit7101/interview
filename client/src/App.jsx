import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ChangePassword from "./components/ChangePassword.jsx";

import ProtectedRoutes from "./utils/ProtectedRoutes";
import UpdateProfile from "./components/UpdateProfile.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
