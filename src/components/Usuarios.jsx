import React, { useState, useEffect } from "react";
import UsuarioBox from "./UsuarioBox";
import AgregarUsuario from "./AgregarUsuario";
import "../styles/Usuarios.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState(""); // Para mostrar mensajes dinámicos
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8081/usuario")
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error("Error fetching usuarios:", error));
  }, []);

  const handleMostrarMensaje = (texto) => {
    setMensaje(texto); // Actualiza el texto del mensaje
    setMostrarMensaje(true); // Muestra el mensaje
    setFadeOut(false); // Reinicia la animación

    // Inicia el fade-out después de 1.5 segundos
    setTimeout(() => {
      setFadeOut(true);
    }, 2000);
  };

  const agregarNuevoUsuario = (usuario) => {
    setUsuarios((prevUsuarios) => [...prevUsuarios, usuario]); // Actualiza la lista
    setMostrarFormulario(false); // Cierra el formulario
    handleMostrarMensaje(`Usuario ${usuario.nombre} creado con éxito.`); // Llama a handleMostrarMensaje
  };

  const manejarSeleccionUsuario = (nombre) => {
    handleMostrarMensaje(`Usuario seleccionado: ${nombre}`); // Llama a handleMostrarMensaje
  };

  return (
    <div className="contenedor">
      <div className="usuarios">
        <h2 className="titulo">¿Quién eres? Elige tu usuario</h2>
        <div className="perfiles">
          {usuarios.map((usuario) => (
            <div
              key={usuario.idUsuario}
              onClick={() => manejarSeleccionUsuario(usuario.nombre)}
            >
              <UsuarioBox usuario={usuario} />
            </div>
          ))}
          <div
            className="botonAgregar"
            onClick={() => setMostrarFormulario(true)}
          >
            <i className="bi bi-plus-square-fill"></i>
            <p>Agregar Usuario</p>
          </div>
        </div>
      </div>

      {mostrarMensaje && (
        <div className={`overlayMensaje ${fadeOut ? "fadeOut" : ""}`}>
          <p>{mensaje}</p>
        </div>
      )}

      {mostrarFormulario && (
        <div className="overlay">
          <AgregarUsuario
            setMostrarFormulario={setMostrarFormulario}
            actualizarUsuarios={agregarNuevoUsuario}
          />
        </div>
      )}
    </div>
  );
}

export default Usuarios;
