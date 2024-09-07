import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';

const Perfil = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/registrar"); // Redireciona para a página de login
  };

  return (
    <div>
      <h1 id="titulo">Bem-vindo ao seu perfil!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Perfil;
