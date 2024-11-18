import React from "react";
import "../styles/Reproductor.css";

function Reproductor({ contenido, onClose }) {
  return (
    <div className="reproductor">
      <div className="reproductor-thumbnail">
        <img
          src={`/assets/img/${contenido.imagen}`}
          alt={contenido.imagen}
        />
        {/* Botón de reproducción */}
        <button className="play-button">
          ▶ <i className="fas fa-play"></i> {/* Icono de reproducción */}
        </button>
      </div>

      {/* Botón para salir del reproductor */}
      <button className="close-button" onClick={onClose}>
        {/* ✖️ Salir */}
        Volver
      </button>
    </div>
  );
}

export default Reproductor;
