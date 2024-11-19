import React, { useState } from "react";
import ContenidoBox from "./ContenidoBox";
import "../styles/Vista.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Vista({ vista }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const contenidosPorVista = 5; // Número de contenidos visibles por vista
  const totalVistas = Math.ceil(vista.contenidos.length / contenidosPorVista);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, totalVistas - 1));
  };

  return (
    <div className="vista">
      {/* AQUI SE MUESTRA EL NOMBRE DE LA VISTA */}
      <h2>{vista.nombre_vista}</h2>
      <div className="carousel-container">
        <button className="carousel-button prev" onClick={handlePrev}>
          <i class="bi bi-chevron-left"></i>
        </button>
        <div className="carousel">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {vista.contenidos.map((contenido, index) => (
              <div
                key={contenido.id_contenido}
                className="carousel-item"
                style={{ flex: `0 0 calc(100% / ${contenidosPorVista})` }}
              >
                <ContenidoBox contenido={contenido} />
              </div>
            ))}
          </div>
        </div>
        <button className="carousel-button next" onClick={handleNext}>
          <i class="bi bi-chevron-compact-right"></i>
        </button>
      </div>
    </div>
  );
}

export default Vista;
