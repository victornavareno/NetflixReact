import React, { useEffect, useState } from "react";
import axios from "axios";

function VistaList({ onVistaSelect }) {
  const [vistas, setVistas] = useState([]);

  useEffect(() => {
    // Cargar la lista de vistas desde el backend
    axios.get("/vista") // Cambiar a la ruta real del backend
      .then((response) => setVistas(response.data))
      .catch((error) => console.error("Error fetching vistas:", error));
  }, []);

  return (
    <div>
      <h2>Vistas</h2>
      <ul>
        {vistas.map((vista) => (
          <li key={vista.id_vista} onClick={() => onVistaSelect(vista.id_vista)}>
            {vista.nombre_vista}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VistaList;
