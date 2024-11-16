import React, { useEffect, useState } from "react";
import axios from "axios";

function VistaConContenidos() {
  const [vistas, setVistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Llamar al endpoint para obtener todas las vistas
    axios
      .get("http://127.0.0.1:8082/vista")
      .then((response) => {
        setVistas(response.data); // Guardar las vistas en el estado
        setLoading(false); // Cambiar estado de carga
      })
      .catch((err) => {
        setError(err.message); // Manejar errores
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando vistas...</p>;
  if (error) return <p>Error al cargar vistas: {error}</p>;

  return (
    <div>
      <h1>NETFLIX</h1>
      {vistas.map((vista) => (
        <div key={vista.id_vista} style={{ marginBottom: "2rem" }}>
          <h2>{vista.nombre_vista}</h2>
          <ul>
            {vista.contenidos_ids.map((contenidoId) => (
              <li key={contenidoId}>
                Contenido ID: {contenidoId}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default VistaConContenidos;
