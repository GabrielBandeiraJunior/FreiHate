import React from "react";
import Register from "./Registerss";
import Login from "./Login";
import "./Registrarcss.css"; // Importa o arquivo CSS

function Registrar() {
  return (
    <div className="MainContainer"> {/* Contêiner principal */}
      <div className="Container">
        <Login />
      </div>
      <div className="Container">
        <Register />
      </div>
    </div>
  );
}

export default Registrar;
