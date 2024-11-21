import React, { useState, useEffect } from "react";
import "../styles/AdministrarUsuarios.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function AdministrarUsuarios({ setMostrarAdministrarUsuarios }) {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaImagen, setNuevaImagen] = useState("");

  const imagenesDisponibles = [
    "user1.jpg",
    "user2.jpg",
    "user3.jpg",
    "user4.jpg",
    "user5.jpg",
    "user6.jpg",
  ];

  // Fetch usuarios al cargar el componente
  useEffect(() => {
    fetch("http://localhost:8081/usuario")
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error("Error fetching usuarios:", error));
  }, []);

  // Función para seleccionar un usuario
  const seleccionarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setNuevoNombre(usuario.nombre);
    setNuevaImagen(usuario.imagen);
  };

  // Función para manejar la eliminación de un usuario
  const eliminarUsuario = async (idUsuario) => {
    try {
      const respuesta = await fetch(
        `http://localhost:8081/usuario/{idUsuario}`,
        {
          method: "DELETE",
        }
      );

      if (respuesta.ok) {
        setUsuarios(
          usuarios.filter((usuario) => usuario.idUsuario !== idUsuario)
        );
        setUsuarioSeleccionado(null);
        console.log("Usuario eliminado con éxito.");
      } else {
        console.error("Error al eliminar el usuario.");
      }
    } catch (error) {
      console.error("Error en la solicitud DELETE:", error);
    }
  };

  // Función para manejar la actualización de un usuario
  const actualizarUsuario = async () => {
    if (!nuevoNombre.trim() || !nuevaImagen) {
      console.error("Nombre e imagen son obligatorios para actualizar.");
      return;
    }

    const usuarioActualizado = {
      ...usuarioSeleccionado,
      nombre: nuevoNombre,
      imagen: nuevaImagen,
    };

    try {
      const respuesta = await fetch(
        `http://localhost:8081/usuario/${usuarioSeleccionado.idUsuario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuarioActualizado),
        }
      );

      if (respuesta.ok) {
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
            usuario.idUsuario === usuarioSeleccionado.idUsuario
              ? usuarioActualizado
              : usuario
          )
        );
        setUsuarioSeleccionado(null);
        console.log("Usuario actualizado con éxito.");
      } else {
        console.error("Error al actualizar el usuario.");
      }
    } catch (error) {
      console.error("Error en la solicitud PUT:", error);
    }
  };

  return (
    <div className="administrarUsuarios">
      <h3>Selecciona el Usuario que quieres Editar</h3>
      <div className="listaUsuarios">
        {usuarios.map((usuario) => (
          <div
            key={usuario.idUsuario}
            className={`usuarioItem ${
              usuarioSeleccionado?.idUsuario === usuario.idUsuario
                ? "seleccionado"
                : ""
            }`}
            onClick={() => seleccionarUsuario(usuario)}
          >
            <img
              src={`/assets/img/users/${usuario.imagen}`}
              alt={`Perfil de ${usuario.nombre}`}
              className="imagenUsuario"
            />
            <p>{usuario.nombre}</p>
          </div>
        ))}
      </div>

      {usuarioSeleccionado && (
        <div className="editarUsuario">
          <h4>Editar Usuario</h4>
          <div>
            <label>Nuevo Nombre:</label>
            <input
              type="text"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
            />
          </div>
          <div>
            <label>Nueva Imagen de Perfil:</label>
            <div className="imagenesDisponibles">
              {imagenesDisponibles.map((img, index) => (
                <img
                  key={index}
                  src={`/assets/img/users/${img}`}
                  alt={`Imagen ${index + 1}`}
                  className={`imagenDisponible ${
                    nuevaImagen === img ? "seleccionada" : ""
                  }`}
                  onClick={() => setNuevaImagen(img)}
                />
              ))}
            </div>
          </div>
          <div className="botonesEdicion">
            <button onClick={actualizarUsuario}>Actualizar</button>
            <button
              onClick={() => eliminarUsuario(usuarioSeleccionado.idUsuario)}
            >
              Eliminar Usuario
            </button>
          </div>
        </div>
      )}

      <button
        className="botonCerrar"
        onClick={() => {
          setMostrarAdministrarUsuarios(false);
          setUsuarioSeleccionado(null);
        }}
      >
        Cerrar
      </button>
    </div>
  );
}

export default AdministrarUsuarios;
