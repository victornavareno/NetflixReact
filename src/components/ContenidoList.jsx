import React, { useState, useEffect } from "react";
import axios from "axios";
import ContenidoBox from "./ContenidoBox"; // Importar el componente ContenidoBox
import "../styles/ContenidoList.css"; // Opcional: añadir estilos

function ContenidoList() {
  const [contenidos, setContenidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Realizar la solicitud al endpoint
    axios
      .get("http://127.0.0.1:8080/contenido") // Cambia la URL según sea necesario
      .then((response) => {
        setContenidos(response.data); // Guardar los contenidos en el estado
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message); // Manejo de errores
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading contenidos...</p>;
  if (error) return <p>Error loading contenidos: {error}</p>;

  return (
    <div className="contenido-list">
      <h2>Lista de Contenidos</h2>
      <div className="contenido-list-grid">
        {contenidos.map((contenido) => (
          <ContenidoBox key={contenido.id_contenido} contenido={contenido} />
        ))}
      </div>
    </div>
  );
}

export default ContenidoList;
