import React, { useState } from "react";
import "../styles/AgregarUsuario.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function AgregarUsuario({ setMostrarFormulario, actualizarUsuarios }) {
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState("");
  const [rol] = useState("cliente");
  const [favoritos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  const imagenesDisponibles = [
    "user1.jpg",
    "user2.jpg",
    "user3.jpg",
    "user4.jpg",
    "user5.jpg",
    "user6.jpg",
  ];

  const manejarSeleccionImagen = (imagenSeleccionada) => {
    setImagen(imagenSeleccionada);
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !imagen) {
      console.error("Nombre e imagen son obligatorios.");
      return;
    }

    const nuevoUsuario = {
      nombre,
      rol,
      imagen,
      contenidosfavoritos: favoritos,
    };

    console.log("Datos enviados al servidor:", nuevoUsuario);

    try {
      const respuesta = await fetch("http://localhost:8081/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuario),
      });

      if (respuesta.ok) {
        const data = await respuesta.json();
        console.log("Usuario agregado con éxito:", data);
        setSuccessMessage(`Usuario ${data.nombre} creado con éxito`);
        actualizarUsuarios(data); // Actualiza la lista en el componente padre
      } else {
        const error = await respuesta.json();
        console.error("Error al agregar el usuario:", error);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="formularioAgregarUsuario">
      <h3>Agregar Nuevo Usuario</h3>
      {successMessage && <div className="successMessage">{successMessage}</div>}
      <form onSubmit={manejarSubmit}>
        <div>
          <label>Nombre del Usuario:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="selectorImagen">
          <label className="textoSelectorImagen">
            Selecciona una Imagen de Perfil:
          </label>
          <div className="carouselContainer">
            <button
              type="button"
              className="flecha izquierda"
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <div className="carouselImagenes">
              {imagenesDisponibles
                .slice(currentIndex, currentIndex + 4)
                .map((img, index) => (
                  <div
                    key={index}
                    className={`imagenItem ${
                      imagen === img ? "seleccionada" : ""
                    }`}
                    onClick={() => manejarSeleccionImagen(img)}
                  >
                    <img
                      src={`/assets/img/users/${img}`}
                      alt={`Imagen de perfil ${index + 1}`}
                      className="imagenCarousel"
                    />
                  </div>
                ))}
            </div>
            <button
              type="button"
              className="flecha derecha"
              onClick={() =>
                setCurrentIndex((prev) =>
                  Math.min(prev + 1, imagenesDisponibles.length - 4)
                )
              }
              disabled={currentIndex >= imagenesDisponibles.length - 4}
            >
              <i className="bi bi-chevron-compact-right"></i>
            </button>
          </div>
        </div>

        <button type="submit" disabled={!imagen}>
          Agregar Usuario
        </button>
        <button type="button" onClick={() => setMostrarFormulario(false)}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default AgregarUsuario;
