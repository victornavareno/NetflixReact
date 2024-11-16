import React, { useEffect, useState } from "react";
import axios from "axios";

function ContenidoList({ vistaId, onContenidoSelect }) {
  const [contenidos, setContenidos] = useState([]);

  useEffect(() => {
    if (vistaId) {
      // Cargar los contenidos asociados a la vista seleccionada
      axios.get(`/vista/${vistaId}`) // Cambiar a la ruta real del backend
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
      <ul>
        {contenidos.map((contenido) => (
          <li key={contenido.idcontenido} onClick={() => onContenidoSelect(contenido.idcontenido)}>
            {contenido.titulo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContenidoList;
