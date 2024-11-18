import React from "react";
import "../styles/ContenidoDetail.css"; 


function ContenidoDetail({ contenido }) {
  // Mock para pruebas (carga cuando el parametro input contenido es null)
  const mockContenido = contenido || {
    titulo: "Breaking Bad",
    sinopsis: "Un profesor de química se convierte en fabricante de metanfetaminas.",
    director: "Vince Gilligan",
    elenco: "Bryan Cranston, Aaron Paul",
    duracion: 60,
    genero: "Drama",
    tipo: "Serie",
    imagen: "breaking_bad.jpeg",
  };

  return (
    <div className="contenido">
      <div className="contenido-image">
        <img src={`/assets/img/${mockContenido.imagen}`} alt={mockContenido.titulo} />
      </div>
      <div className="contenido-info">
      
        <h1>{mockContenido.titulo} </h1>
        <h2>{mockContenido.tipo}</h2>
        <p><strong>Sinopsis:</strong> {mockContenido.sinopsis}</p>
        <p><strong>Director:</strong> {mockContenido.director}</p>
        <p><strong>Elenco:</strong> {mockContenido.elenco}</p>
        <p><strong>Duración:</strong> {mockContenido.duracion} min</p>
        <p><strong>Género:</strong> {mockContenido.genero}</p>
        <p><strong>Tipo:</strong> {mockContenido.tipo}</p>
      </div>
    </div>
  );
}

export default ContenidoDetail;
