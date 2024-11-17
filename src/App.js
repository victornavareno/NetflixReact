import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import global styles

function App() {
  const [vistas, setVistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Llamar al endpoint para obtener las vistas
    axios
      .get("http://127.0.0.1:8082/vista") // Cambia esta URL si el puerto o dominio varían
      .then((response) => {
        setVistas(response.data); // Guardar las vistas en el estado
        setLoading(false); // Cambiar el estado de carga
      })
      .catch((err) => {
        setError(err.message); // Manejar errores
        setLoading(false);
      });
  }, []);

  // Mostrar mientras se cargan las vistas o si ocurre un error
  // if (loading) return <p>Cargando vistas...</p>;
  // if (error) return <p>Error al cargar vistas: {error}</p>;

  return (
    <div>
      <h1>NETFLIX</h1>
      <h2>Bienvenido de nuevo, (usuario)</h2>
      <div className="vistas">
        {vistas.map((vista) => (
          <div key={vista.id_vista} className="vista-item">
            <h2>{vista.nombre_vista}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
