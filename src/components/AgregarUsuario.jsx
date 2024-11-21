import React, { useState } from "react";
import "../styles/AgregarUsuario.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function AgregarUsuario({ setMostrarFormulario }) {
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState("");
  const [rol] = useState("cliente");
  const [favoritos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Índice de las imágenes mostradas

  // Lista de imágenes disponibles (todas las imágenes dentro de la carpeta public/assets/img/pfp/)
  const imagenesDisponibles = [
    "user1.jpg",
    "user2.jpg",
    "user3.jpg",
    "user4.jpg",
    "user5.jpg",
    "user6.jpg",
  ];

  // Función para manejar el clic en la imagen
  const manejarSeleccionImagen = (imagenSeleccionada) => {
    setImagen(imagenSeleccionada);
  };

  // Función para manejar el envío del formulario
  const manejarSubmit = (e) => {
    e.preventDefault();
    const nuevoUsuario = {
      nombre,
      rol,
      imagen,
      favoritos,
    };
    console.log("Nuevo usuario agregado:", nuevoUsuario);

    // Aquí puedes agregar el nuevo usuario a un estado global o enviarlo al backend

    // Cerrar el formulario al agregar el usuario
    setMostrarFormulario(false);
  };

  // Función para mover las imágenes hacia la izquierda
  const moverIzquierda = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0)); // No permitir mover fuera de los límites
  };

  // Función para mover las imágenes hacia la derecha
  const moverDerecha = () => {
    setCurrentIndex(
      (prevIndex) => Math.min(prevIndex + 1, imagenesDisponibles.length - 4) // No permitir mover fuera de los límites
    );
  };

  return (
    <div className="formularioAgregarUsuario">
      <h3>Agregar Nuevo Usuario</h3>
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
          <label className="textoSlectorImagen">
            Selecciona una Imagen de Perfil:
          </label>
          <div className="carouselContainer">
            <button
              type="button"
              className="flecha izquierda"
              onClick={moverIzquierda}
              disabled={currentIndex === 0} // Desactivar si está en el primer índice
            >
              <i class="bi bi-chevron-left"></i>
            </button>

            <div className="carouselImagenes">
              {imagenesDisponibles
                .slice(currentIndex, currentIndex + 4) // Mostrar solo 4 imágenes a la vez
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
              onClick={moverDerecha}
              disabled={currentIndex >= imagenesDisponibles.length - 4} // Desactivar si está en el último índice
            >
              <i class="bi bi-chevron-compact-right"></i>
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
