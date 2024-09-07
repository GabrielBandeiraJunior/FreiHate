import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth'; // Importe o contexto
import Home from './Home';
import Login from './Login';
import Register from './Registerss';
import App from './App';
import Registrar from './Registrar';
import Perfil from './Perfil';
import './perfil.css'

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/" />;
};

const RoutesComponent = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<App />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/perfil" element={<ProtectedRoute element={<Perfil />} />} />
        {/* Outras rotas podem ser adicionadas aqui */}
      </Routes>
    </BrowserRouter>
  </AuthProvider>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoutesComponent />
  </React.StrictMode>
)
