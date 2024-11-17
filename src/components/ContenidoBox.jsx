import React from "react";
import "../styles/ContenidoBox.css";

function ContenidoBox({ contenido }) {
  return (
    <div className="contenido-box">
      <div className="contenido-image">
        <img src={contenido.imagen || "placeholder.jpg"} alt={contenido.titulo} />
      </div>
      <div className="contenido-info">
        <h3 className="contenido-title">{contenido.titulo}</h3>
        <p className="contenido-sinopsis">{contenido.sinopsis}</p>
      </div>
    </div>
  );
}

export default ContenidoBox;
