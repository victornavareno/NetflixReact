import React from "react";
import UsuarioBox from "./UsuarioBox";
import styles from "../styles/Usuarios.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Usuarios() {
  const usuarios = [
    {
      idUsuario: 1,
      nombre: "Maria",
      imagen: "user1.jpg",
      contenidosFavoritos: [1, 2, 3],
      rol: "administrador",
    },
    {
      idUsuario: 2,
      nombre: "Juan",
      imagen: "user2.jpg",
      contenidosFavoritos: [4, 5, 6],
      rol: "cliente",
    },
    {
      idUsuario: 3,
      nombre: "Ana",
      imagen: "user3.jpg",
      contenidosFavoritos: [7, 8, 9],
      rol: "cliente",
    },
    {
      idUsuario: 4,
      nombre: "Luis",
      imagen: "user4.jpg",
      contenidosFavoritos: [7, 10],
      rol: "cliente",
    },
  ];

  return (
    <div className="contenedor">
      <div className="usuarios">
        <h2 className="titulo">¿Quién eres? Elige tu usuario</h2>
        <div className="perfiles">
          {usuarios.map((usuario) => (
            <UsuarioBox key={usuario.idUsuario} usuario={usuario} />
          ))}
          {/* Agregar Usuario Button */}
          <div className="botonAgregar">
            <i className="bi bi-plus-square-fill"></i>
            <p>Agregar Usuario</p>
          </div>
        </div>
        <button className="botonAdministrar">Administrar Usuarios</button>
      </div>
    </div>
  );
}

export default Usuarios;
