import React, { useEffect, useState } from "react";
import axios from "axios";

function ContenidoList({ vistaId, onContenidoSelect }) {
  const [contenidos, setContenidos] = useState([]);

  useEffect(() => {
    if (vistaId) {
      // Cargar los contenidos asociados a la vista seleccionada
      axios
        .get(`/vista/${vistaId}`) // Cambiar a la ruta real del backend
        .then((response) => setContenidos(response.data.contenidos))
        .catch((error) => console.error("Error fetching contenidos:", error));
    }
  }, [vistaId]);

  if (!vistaId) {
    return <p>Selecciona una vista para ver sus contenidos.</p>;
  }

  return (
    <div>
      <h2>Contenidos</h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {contenidos.map((contenido) => (
          <div
            key={contenido.idcontenido}
            onClick={() => onContenidoSelect(contenido.idcontenido)}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "8px",
              width: "200px",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3>{contenido.titulo}</h3>
            <p>{contenido.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContenidoList;
