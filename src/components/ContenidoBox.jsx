import React from "react";
import "../styles/ContenidoBox.css";

function ContenidoBox({ contenido }) {
  return (
    <div className="contenido-box">
      <div className="contenido-image">
        {/* <img src={contenido.imagen || "placeholder.jpg"} alt={contenido.titulo} /> */}
        {/* <img src="/assets/img/FRIENDS.jpg" alt="Breaking Bad" /> */}
        {/* IMPORTANTE: HAY QUE ESTANDARIZAR EL NOMBRE DE 'IMAGEN' EN LA BASE DE DATOS */}
        <img src={`/assets/img/${contenido.imagen}`} alt={`${contenido.imagen}`} />
      

      </div>
      <div className="contenido-info">
        <h3 className="contenido-title">{contenido.titulo}</h3>
        <p className="contenido-sinopsis">{contenido.sinopsis}</p>
      </div>
    </div>
  );
}

export default ContenidoBox;
