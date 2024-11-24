import React, { useState, useEffect } from "react";
import axios from "axios";
import ContenidoBox from "./ContenidoBox"; // Importar el componente ContenidoBox
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "../styles/ContenidoList.css"; // Opcional: añadir estilos
import API_CONFIG from "../config/api";

function ContenidoList() {
  const [contenidos, setContenidos] = useState([]);
  const [filteredContenidos, setFilteredContenidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    tipo: "",
    genero: "",
  });

  const navigate = useNavigate(); // Initialize navigate

  // Función para manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Realizar la solicitud al endpoint
    axios
      .get(API_CONFIG.CONTENIDOS) // Cambia la URL según sea necesario
      .then((response) => {
        setContenidos(response.data); // Guardar los contenidos en el estado
        setFilteredContenidos(response.data); // Inicialmente todos los contenidos están filtrados
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message); // Manejo de errores
        setLoading(false);
      });
  }, []);

  // Filtrar los contenidos según los filtros seleccionados
  useEffect(() => {
    const filtered = contenidos.filter((contenido) => {
      const matchesTipo = filters.tipo ? contenido.tipo === filters.tipo : true;
      const matchesGenero = filters.genero
        ? contenido.genero === filters.genero
        : true;
      return matchesTipo && matchesGenero;
    });
    setFilteredContenidos(filtered);
  }, [filters, contenidos]);

  if (loading) return <p>Loading contenidos...</p>;
  if (error) return <p>Error loading contenidos: {error}</p>;

  return (
    <div className="contenido-list">
      <h2>Lista de Contenidos</h2>

      {/* Barra de búsqueda */}
      <div className="search-filters">
        <label>
          Tipo:
          <select
            name="tipo"
            value={filters.tipo}
            onChange={handleFilterChange}
          >
            <option value="">Todos</option>
            <option value="serie">Serie</option>
            <option value="pelicula">Película</option>
            <option value="corto">Corto</option>
            <option value="documental">Documental</option>
          </select>
        </label>

        <label>
          Género:
          <select
            name="genero"
            value={filters.genero}
            onChange={handleFilterChange}
          >
            <option value="">Todos</option>
            <option value="horror">Horror</option>
            <option value="aventura">Aventura</option>
            <option value="comedia">Comedia</option>
            <option value="thriller">Thriller</option>
            <option value="drama">Drama</option>
            <option value="romance">Romance</option>
            <option value="fantasia">Fantasía</option>
            <option value="ciencia ficcion">Ciencia Ficción</option>
          </select>
        </label>
        {/* Botón de "Go Back" */}
        <button className="go-back-button" onClick={() => navigate("/")}>
          Volver a la Página Principal
        </button>
      </div>

      {/* Mostrar los contenidos filtrados */}
      <div className="contenido-list-grid">
        {filteredContenidos.map((contenido) => (
          <ContenidoBox key={contenido.idContenido} contenido={contenido} />
        ))}
      </div>
    </div>
  );
}

export default ContenidoList;
