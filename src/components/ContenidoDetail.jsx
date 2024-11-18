import React, { useState } from "react";
import "../styles/ContenidoDetail.css";
import Reproductor from "./Reproductor";

function Contenido({ contenido }) {
  const [showReproductor, setShowReproductor] = useState(false); // Estado para mostrar el reproductor
  const isSerie = contenido.tipo.toLowerCase() === "serie";

  // Mostramos el reproductor cuando pulsamos REPRODUCIR en el contenido q no sea serie
  const handleReproducir = () => {
    setShowReproductor(true);
  };

  // Oculta el reproductor
  const handleCerrarReproductor = () => {
    setShowReproductor(false); 
  };

  return (
    <div className="contenido-container">
      <div className="contenido">
        <div className="contenido-image">
          <img src={`/assets/img/${contenido.imagen}`} alt={contenido.titulo} />
        </div>
        <div className="contenido-info">
          <h1>{contenido.titulo} </h1>
          <h2>{contenido.tipo}</h2>
          <p><strong>Sinopsis:</strong> {contenido.sinopsis}</p>
          <p><strong>Director:</strong> {contenido.director}</p>
          <p><strong>Elenco:</strong> {contenido.elenco}</p>
          <p><strong>Duración:</strong> {contenido.duracion} min</p>
          <p><strong>Género:</strong> {contenido.genero}</p>
          <p><strong>Tipo:</strong> {contenido.tipo}</p>
        </div>
        <div className="contenido-actions">
          {isSerie ? (
            <button
              className="contenido-button temporadas"
              onClick={() => handleShowTemporadas(contenido.id_contenido)}
            >
              Ver Temporadas
            </button>
          ) : (
            <button className="contenido-button play" onClick={handleReproducir}>
              Reproducir Contenido
            </button>
          )}
        </div>
      </div>

      {/* Mostrar el reproductor como superposición si showReproductor es verdadero */}
      {showReproductor && (
        <div className="overlay">
          <Reproductor contenido={contenido} onClose={handleCerrarReproductor} />
        </div>
      )}
    </div>
  );
}

function handleShowTemporadas(idContenido) {
  console.log(`Navigate to temporadas of contenido ID: ${idContenido}`);
}

export default Contenido;
