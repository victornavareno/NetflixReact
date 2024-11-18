import React from "react";
import "../styles/Reproductor.css";
import Contenido from "./ContenidoDetail";

function Reproductor({ contenido }) {
  return (
    <div className="reproductor">
      <div className="reproductor-thumbnail">
        <img
          src={`/assets/img/${contenido.imagen}`}
          alt={contenido.imagen}
        />
        {/* Play button on top */}
        <button className="play-button">
                ▶
          <i className="fas fa-play"></i> {/* FontAwesome play icon */}
        </button>
      </div>
    </div>
  );
}

export default Reproductor;
