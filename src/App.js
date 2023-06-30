import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/netflix-react-js/" element={<Home />} />
          <Route path="/netflix-react-js/login" element={<Login />} />
          <Route path="/netflix-react-js/signup" element={<Signup />} />
          <Route
            path="/netflix-react-js/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          
          <Route path="/netflix-react-js/*" element={<NotFound />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
