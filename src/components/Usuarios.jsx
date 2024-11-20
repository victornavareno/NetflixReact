// Usuarios.js
import React from "react";
import UsuarioBox from "./UsuarioBox";

function Usuarios() {
  const usuarios = [
    { nombre: "Pedro", imagen: "url_de_imagen_de_pedro.png" },
    { nombre: "Usuario 1", imagen: "url_de_imagen_usuario1.png" },
    { nombre: "Usuario 2", imagen: "url_de_imagen_usuario2.png" },
    { nombre: "Añadir perfil", imagen: "url_de_icono_de_añadir_perfil.png" },
  ];

  return (
    <div style={styles.contenedor}>
      <h2 style={styles.titulo}>¿Quién eres? Elige tu perfil</h2>
      <div style={styles.perfiles}>
        {usuarios.map((usuario, index) => (
          <UsuarioBox
            key={index}
            nombre={usuario.nombre}
            imagen={usuario.imagen}
          />
        ))}
      </div>
      <button style={styles.botonAdministrar}>Administrar Perfiles</button>
    </div>
  );
}

const styles = {
  contenedor: {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#000",
    padding: "20px",
  },
  titulo: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  perfiles: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  botonAdministrar: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#333",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Usuarios;
