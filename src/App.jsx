import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ModalLoginRegister from './components/LoginRegisterModal';
import AppRoutes from './routes/AppRoutes';
import { useState } from 'react';
import { logoutUser } from './api/UserService';
import { useAuth }   from "./api/AuthContext";

function App() {
  const [isModalLoginRegisterOpen, setIsModalLoginRegisterOpen] = useState(false);
  const { logout } = useAuth();
  const openModalLoginRegister = () => {
    setIsModalLoginRegisterOpen(true);
  };

  const closeModalLoginRegister = () => {
    setIsModalLoginRegisterOpen(false);
  };

  const handleLogoutUser = async () => {
    try {
      const user = await logoutUser(logout);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <div className="App">
      <Navbar 
        openModalLoginRegister={openModalLoginRegister} 
        handleLogoutUser={handleLogoutUser} 
      />
      <div className="container">
        {/* AppRoutes to render dynamic page content */}
        <AppRoutes />
      </div>
      <ModalLoginRegister
        closeModalLoginRegister={closeModalLoginRegister}
        isModalLoginRegisterOpen={isModalLoginRegisterOpen}
      />
      <Footer />
    </div>
  );
}

export default App;
