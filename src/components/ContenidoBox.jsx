import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ContenidoBox.css";

function ContenidoBox({ contenido }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/contenido/${contenido.idcontenido}`, { state: { contenido } });
  };

  return (
    <div className="contenido-box" onClick={handleNavigate}>
      <div className="contenido-box-image">
        {/* <img src={contenido.imagen || "placeholder.jpg"} alt={contenido.titulo} /> */}
        {/* <img src="/assets/img/FRIENDS.jpg" alt="Breaking Bad" /> */}
        {/* IMPORTANTE: HAY QUE ESTANDARIZAR EL NOMBRE DE 'IMAGEN' EN LA BASE DE DATOS */}
        <img
          src={`/assets/img/${contenido.imagen}`}
          alt={`${contenido.imagen}`}
        />
      </div>
      <div className="contenido-box-info">
        <h3 className="contenido-box-title">{contenido.titulo}</h3>
        <p className="contenido-box-sinopsis">{contenido.sinopsis}</p>
      </div>
    </div>
  );
}

export default ContenidoBox;
