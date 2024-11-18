import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/ContenidoDetail.css";
import Reproductor from "./Reproductor";

function ContenidoDetail() {
  const { state } = useLocation();
  const contenido = state?.contenido;

  // Unconditionally define the state
  const [showReproductor, setShowReproductor] = React.useState(false);

  if (!contenido) {
    // Render an error message if contenido is null
    return <p>Error: No se encontró el contenido</p>;
  }

  const isSerie = contenido.tipo.toLowerCase() === "serie";

  const handleReproducir = () => {
    setShowReproductor(true);
  };

  const handleCerrarReproductor = () => {
    setShowReproductor(false);
  };

  return (
    <div className="contenido-container">
      <div className="contenido">
        <div className="contenido-detail-image">
          <img src={`/assets/img/${contenido.imagen}`} alt={contenido.titulo} />
        </div>
        <div className="contenido-info">
          <h1>{contenido.titulo}</h1>
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
              onClick={() => handleShowTemporadas(contenido.idcontenido)}
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

export default ContenidoDetail;
