// UsuarioBox.js
import React from "react";

function UsuarioBox({ nombre, imagen }) {
  return (
    <div style={styles.box}>
      <img
        src={"assets/img/users/user1.jpg"}
        alt={`${nombre}'s profile picture`}
        style={styles.imagen}
      />
      <p style={styles.nombre}>{nombre}</p>
    </div>
  );
}

const styles = {
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100px",
    padding: "10px",
    margin: "10px",
    cursor: "pointer",
    borderRadius: "10px",
    backgroundColor: "#f2f2f2",
  },
  imagen: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
  },
  nombre: {
    marginTop: "10px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
  },
};

export default UsuarioBox;
