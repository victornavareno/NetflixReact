import React, { useEffect, useState } from "react";
import axios from "axios";
import ContenidoBox from "./ContenidoBox";
import "../styles/Vista.css";

function Vista({ vista }) {
  const [contenidos, setContenidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener información detallada de cada contenido en la vista
    const fetchContenidos = async () => {
      try {
        const contenidoDetails = await Promise.all(
          vista.contenidos_ids.map((idContenido) =>
            axios.get(`http://127.0.0.1:8080/contenido/${idContenido}`).then((res) => res.data)
          )
        );
        setContenidos(contenidoDetails);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchContenidos();
  }, [vista.contenidos_ids]);

  if (loading) return <p>Cargando contenidos...</p>;
  if (error) return <p>Error al cargar contenidos: {error}</p>;

  return (
    <div className="vista">
      <h2>{vista.nombre_vista}</h2>
      <div className="contenidos-grid">
        {contenidos.map((contenido) => (
          <ContenidoBox key={contenido.idcontenido} contenido={contenido} />
        ))}
      </div>
    </div>
  );
}

export default Vista;
