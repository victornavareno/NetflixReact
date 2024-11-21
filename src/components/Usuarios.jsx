import React, { useState } from "react";
import UsuarioBox from "./UsuarioBox";
import AgregarUsuario from "./AgregarUsuario";
import "../styles/Usuarios.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Usuarios() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const usuarios = [
    {
      idUsuario: 1,
      nombre: "Victor",
      rol: "administrador",
      imagen: "user1.jpg",
      favoritos: [1, 2, 3],
    },
    {
      idUsuario: 2,
      nombre: "Jesus",
      rol: "cliente",
      imagen: "user2.jpg",
      favoritos: [1, 3, 2],
    },
    {
      idUsuario: 3,
      nombre: "Maria",
      rol: "cliente",
      imagen: "user3.jpg",
      favoritos: [1, 3, 5],
    },
    {
      idUsuario: 4,
      nombre: "Laura",
      rol: "cliente",
      imagen: "user4.jpg",
      favoritos: [4, 7, 8],
    },
  ];

  const manejarAgregarUsuario = () => {
    setMostrarFormulario(true);
  };

  return (
    <div className="contenedor">
      <div className="usuarios">
        <h2 className="titulo">¿Quién eres? Elige tu usuario</h2>
        <div className="perfiles">
          {usuarios.map((usuario) => (
            <UsuarioBox key={usuario.idUsuario} usuario={usuario} />
          ))}
          {/* Agregar Usuario Button */}
          <div className="botonAgregar" onClick={manejarAgregarUsuario}>
            <i className="bi bi-plus-square-fill"></i>
            <p>Agregar Usuario</p>
          </div>
        </div>
        <button className="botonAdministrar">Administrar Usuarios</button>
      </div>

      {/* Mostrar el formulario solo si mostrarFormulario es true */}
      {mostrarFormulario && (
        <div className="overlay">
          <AgregarUsuario setMostrarFormulario={setMostrarFormulario} />
        </div>
      )}
    </div>
  );
}

export default Usuarios;
