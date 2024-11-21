import React, { useState, useEffect } from "react";
import UsuarioBox from "./UsuarioBox";
import AgregarUsuario from "./AgregarUsuario";
import "../styles/Usuarios.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Usuarios() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(""); // Estado para mostrar el nombre del usuario seleccionado
  const [mostrarMensaje, setMostrarMensaje] = useState(false); // Estado para controlar la visibilidad del mensaje
  const [fadeOut, setFadeOut] = useState(false); // Estado para aplicar el fade-out

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

  // Función para manejar el clic en un usuario
  const manejarSeleccionUsuario = (nombre) => {
    setUsuarioSeleccionado(nombre);
    setMostrarMensaje(true); // Mostrar el mensaje de selección
    setFadeOut(false); // Reiniciar el fadeOut antes de iniciar la animación

    // Después de 3 segundos, iniciar el fade-out
    setTimeout(() => {
      setFadeOut(true); // Aplicar fade-out
    }, 1500);
  };

  // Función para manejar el clic en el botón "Agregar Usuario"
  const manejarAgregarUsuario = () => {
    setMostrarFormulario(true);
  };

  useEffect(() => {
    if (fadeOut) {
      // Después de 5 segundos (duración de la animación), ocultamos el mensaje
      const timer = setTimeout(() => {
        setMostrarMensaje(false);
      }, 2000); // Tiempo para que la animación termine
      return () => clearTimeout(timer); // Limpiar el timer cuando el componente se desmonte
    }
  }, [fadeOut]);

  return (
    <div className="contenedor">
      <div className="usuarios">
        <h2 className="titulo">¿Quién eres? Elige tu usuario</h2>
        <div className="perfiles">
          {usuarios.map((usuario) => (
            <div
              key={usuario.idUsuario}
              onClick={() => manejarSeleccionUsuario(usuario.nombre)} // Al hacer clic, actualizamos el estado
            >
              <UsuarioBox usuario={usuario} />
            </div>
          ))}
          {/* Agregar Usuario Button */}
          <div className="botonAgregar" onClick={manejarAgregarUsuario}>
            <i className="bi bi-plus-square-fill"></i>
            <p>Agregar Usuario</p>
          </div>
        </div>
        <button className="botonAdministrar">Administrar Usuarios</button>
      </div>

      {/* Mostrar el mensaje de usuario seleccionado como overlay */}
      {mostrarMensaje && (
        <div className={`overlayMensaje ${fadeOut ? "fadeOut" : ""}`}>
          <p>Usuario seleccionado: {usuarioSeleccionado}</p>
        </div>
      )}

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
