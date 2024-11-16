import React, { useEffect, useState } from "react";
import axios from "axios";

function ContenidoDetail({ contenidoId }) {
  const [contenido, setContenido] = useState(null);

  useEffect(() => {
    if (contenidoId) {
      // Cargar los detalles del contenido seleccionado
      axios.get(`/contenido/${contenidoId}`) // Cambiar a la ruta real del backend
        .then((response) => setContenido(response.data))
        .catch((error) => console.error("Error fetching contenido:", error));
    }
  }, [contenidoId]);

  if (!contenidoId) {
    return <p>Selecciona un contenido para ver los detalles.</p>;
  }

  if (!contenido) {
    return <p>Cargando detalles del contenido...</p>;
  }

  return (
    <div>
      <h2>Detalles del Contenido</h2>
      <p><strong>Título:</strong> {contenido.titulo}</p>
      <p><strong>Sinopsis:</strong> {contenido.sinopsis}</p>
      <p><strong>Duración:</strong> {contenido.duracion} minutos</p>
      <p><strong>Género:</strong> {contenido.genero}</p>
      <p><strong>Director:</strong> {contenido.director}</p>
      <p><strong>Elenco:</strong> {contenido.elenco}</p>
    </div>
  );
}

export default ContenidoDetail;
