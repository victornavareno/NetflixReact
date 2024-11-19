import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Vista from "./components/Vista";
import ContenidoDetail from "./components/ContenidoDetail";
import "./styles/App.css";

function App() {
  document.title = "NETFLIX";
  const [vistas, setVistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8082/vista")
      .then((response) => {
        setVistas(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading views...</p>;
  if (error) return <p>Error loading views: {error}</p>;

  return (
    <Router>
      <div className="background">
        <header className="header">
          <h1>NETFLIX</h1>
          <div className="header-buttons">
            <button className="perfiles-button">Perfiles</button>
            <button className="login-button">Login</button>
          </div>
        </header>
        <div className="welcome-text">
          <h2>Explora los mejores contenidos creados para ti!</h2>
        </div>
        <main className="content">
          {vistas.map((vista) => (
            <Vista key={vista.id_vista} vista={vista} />
          ))}
        </main>
        <Routes>
          <Route path="/contenido/:id" element={<ContenidoDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// TRABAJANDO EN ContenidoDetail
// function App() {
//   const mockContenidoSerie = {
//     titulo: "Breaking Bad",
//     sinopsis:
//       "Un profesor de química se convierte en fabricante de metanfetaminas.",
//     director: "Vince Gilligan",
//     elenco: "Bryan Cranston, Aaron Paul",
//     duracion: 60,
//     genero: "Drama",
//     tipo: "Serie",
//     imagen: "breaking_bad.jpeg",
//     id_contenido: 1,
//   };

//   const mockContenidoPelicula = {
//     titulo: "El Camino",
//     sinopsis: "Un fugitivo busca redención en el desierto.",
//     director: "Vince Gilligan",
//     elenco: "Aaron Paul, Jesse Plemons",
//     duracion: 122,
//     genero: "Drama",
//     tipo: "Pelicula",
//     imagen: "el_camino.jpg",
//     id_contenido: 2,
//   };

//   return (
//     <div className="App">
//       // Test both cases:
//       <Contenido contenido={mockContenidoSerie} />
//       :
//       <Contenido contenido={mockContenidoPelicula} />:{/* <Contenido /> */}
//       {/* <Reproductor contenido={mockContenidoSerie} /> */}
//     </div>
//   );
// }

// export default App;
