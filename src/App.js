import React, { useState, useEffect } from "react";
import axios from "axios";
import Vista from "./components/Vista";
import "./styles/App.css";
import Contenido from "./components/ContenidoDetail";
import ContenidoDetail from "./components/ContenidoDetail";

// function App() {
//   document.title = "NETFLIX";
//   const [vistas, setVistas] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Llamar al endpoint para obtener las vistas
//     // el endpoint 8082/vista devuelve una lista con todas las vistas y tambien sus contenidos
//     axios
//       .get("http://127.0.0.1:8082/vista")
//       .then((response) => {
//         setVistas(response.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Cargando vistas...</p>;
//   if (error) return <p>Error al cargar vistas: {error}</p>;

//   return (
//     <div>
//       <h1>NETFLIX</h1>
//       {vistas.map((vista) => (
//         <Vista key={vista.id_vista} vista={vista} />
//       ))}
//     </div>
//   );
// }

// TRABAJANDO EN ContenidoDetail
function App() {
  return (
    <div className="App">
      <Contenido />
    </div>
  );
}

export default App;
