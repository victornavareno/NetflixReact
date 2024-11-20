import React from "react";
import styles from "../styles/UsuarioBox.css"; // Importando como módulo de CSS

function UsuarioBox({ usuario }) {
  return (
    <div className="box">
      <img
        src={`/assets/img/users/${usuario.imagen}`}
        alt={`${usuario.nombre}`}
        className={styles.imagen} // Clase para la imagen
      />
      <h3 className="nombre">{usuario.nombre}</h3> {/* Clase para el nombre */}
    </div>
  );
}

export default UsuarioBox;
