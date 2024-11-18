import React from "react";
import "../styles/ContenidoDetail.css";

function Contenido({ contenido }) {
  const isSerie = contenido.tipo.toLowerCase() === "serie";

  return (
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
          <button className="contenido-button play">Reproducir Contenido</button>
        )}
      </div>
    </div>
  );
}

function handleShowTemporadas(idContenido) {
  // This function will handle navigation to the temporadas list.
  console.log(`Navigate to temporadas of contenido ID: ${idContenido}`);
  // Example: You can use a router to navigate to a new page.
}

export default Contenido;

