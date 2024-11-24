import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/ContenidoDetail.css";
import Reproductor from "./Reproductor";
import API_CONFIG from "../config/api";
import { FaHeart } from "react-icons/fa";

function ContenidoDetail({ setUsuarioSeleccionado }) {
  const { state } = useLocation();
  const contenido = state?.contenido;
  const [error, setError] = useState(null);
  const [mostrarTemporadas, setMostrarTemporadas] = React.useState(false);
  const [temporadas, setTemporadas] = useState([]);
  const [cargandoTemporadas, setCargandoTemporadas] = useState(false);
  const [mostrarEpisodios, setMostrarEpisodios] = React.useState(false);
  const [episodios, setEpisodios] = useState([]);
  const [cargandoEpisodios, setCargandoEpisodios] = useState(false);
  const [usuarioSeleccionado] = useState(
    JSON.parse(localStorage.getItem("usuarioSeleccionado"))
  );
  const [isFavorito, setIsFavorito] = useState(false);

  useEffect(() => {
    if (usuarioSeleccionado && contenido) {
      setIsFavorito(
        usuarioSeleccionado.contenidosfavoritos.includes(contenido.id_contenido)
      );
    }
  }, [usuarioSeleccionado, contenido]);

  const handleFavorito = async () => {
    if (isFavorito) {
      await eliminarFavorito();
    } else {
      await addFavorito();
    }
  };

  const addFavorito = async () => {
    try {
      const response = await fetch(
        `${API_CONFIG.USUARIOS}/${usuarioSeleccionado.idusuario}/${contenido.id_contenido}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuarioSeleccionado),
        }
      );
      if (response.status === 200) {
        setIsFavorito(true);
        // Actualizar contenidosFavoritos en usuarioSeleccionado
        setUsuarioSeleccionado(usuarioSeleccionado);
        localStorage.setItem(
          "usuarioSeleccionado",
          JSON.stringify({
            ...usuarioSeleccionado,
            contenidosfavoritos: [
              ...usuarioSeleccionado.contenidosfavoritos,
              contenido.id_contenido,
            ],
          })
        );
      }
    } catch (error) {
      console.error("Error al añadir a favoritos:", error);
      setError("No se pudo añadir a favoritos");
    }
  };

  const eliminarFavorito = async () => {
    try {
      const response = await fetch(
        `${API_CONFIG.USUARIOS}/${usuarioSeleccionado.idusuario}/${contenido.id_contenido}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        setIsFavorito(false);
        // Actualizar contenidosFavoritos en usuarioSeleccionado
        setUsuarioSeleccionado(usuarioSeleccionado);
        localStorage.setItem(
          "usuarioSeleccionado",
          JSON.stringify({
            ...usuarioSeleccionado,
            contenidosfavoritos: usuarioSeleccionado.contenidosfavoritos.filter(
              (id) => id !== contenido.id_contenido
            ),
          })
        );
      }
    } catch (error) {
      console.error("Error al eliminar de favoritos:", error);
      setError("No se pudo eliminar de favoritos");
    }
  };

  const handleShowTemporadas = async (id_contenido) => {
    if (mostrarTemporadas) {
      setMostrarTemporadas(false);
      return;
    } else {
      if (temporadas.length > 0) {
        setMostrarTemporadas(true);
        return;
      }
      setCargandoTemporadas(true);
      setError(null);

      try {
        const respuesta = await axios.get(
          `${API_CONFIG.CONTENIDOS}/${id_contenido}/Temporadas`
        );
        setTemporadas(respuesta.data);
        setMostrarTemporadas(true);
      } catch (err) {
        setError("Error al cargar las temporadas");
      } finally {
        setCargandoTemporadas(false);
      }
    }
  };

  const handleShowEpisodios = async (id_contenido, numero) => {
    if (mostrarEpisodios[numero])
      setMostrarEpisodios((prevState) => ({
        ...prevState,
        [numero]: false,
      }));
    else {
      if (episodios[numero]?.length > 0) {
        setMostrarEpisodios((prevState) => ({
          ...prevState,
          [numero]: true,
        }));
        return;
      }
      setCargandoEpisodios(true);
      setError(null);

      try {
        const respuesta = await axios.get(
          `${API_CONFIG.CONTENIDOS}/${id_contenido}/${numero}/ListaEpisodios`
        );
        setEpisodios((prevState) => ({
          ...prevState,
          [numero]: respuesta.data, // Agregar episodios solo para esta temporada
        }));
        setMostrarEpisodios((prevState) => ({
          ...prevState,
          [numero]: true,
        }));
      } catch (err) {
        setError("Error al cargar los episodios");
      } finally {
        setCargandoEpisodios(false);
      }
    }
  };

  // Unconditionally define the state
  const [showReproductor, setShowReproductor] = React.useState(false);

  if (!contenido) {
    // Render an error message if contenido is null
    return <p>Error: No se encontró el contenido</p>;
  }

  const isSerie = contenido.tipo.toLowerCase() === "serie";

  const handleReproducir = () => {
    setShowReproductor(true);
  };

  const handleCerrarReproductor = () => {
    setShowReproductor(false);
  };

  return (
    <div className="contenido-container">
      <div className="contenido">
        <div className="contenido-detail-image">
          <img src={`/assets/img/${contenido.imagen}`} alt={contenido.titulo} />
        </div>
        <div className="contenido-info">
          <div className="contenido-data">
            <h1>{contenido.titulo}</h1>
            {usuarioSeleccionado ? (
              <div className="Like">
                <FaHeart
                  size={45}
                  color={isFavorito ? "white" : "gray"} // Cambia el color según el estado
                  onClick={handleFavorito} // Llama a la función correspondiente
                  style={{ cursor: "pointer" }} // Cambia el cursor para indicar que es clickeable
                />
              </div>
            ) : (
              <p>inicia sesion para poder añadir a favoritos</p>
            )}
          </div>
          <h2>{contenido.tipo}</h2>
          <p>
            <strong>Sinopsis:</strong> {contenido.sinopsis}
          </p>
          <p>
            <strong>Director:</strong> {contenido.director}
          </p>
          <p>
            <strong>Elenco:</strong> {contenido.elenco}
          </p>
          <p>
            <strong>Duración:</strong> {contenido.duracion} min
          </p>
          <p>
            <strong>Género:</strong> {contenido.genero}
          </p>
        </div>
        <div className="contenido-actions">
          {isSerie ? (
            <button
              className="contenido-button temporadas"
              onClick={() => handleShowTemporadas(contenido.id_contenido)}
            >
              {mostrarTemporadas ? "Ocultar Temporadas" : "Ver Temporadas"}
            </button>
          ) : (
            <button
              className="contenido-button play"
              onClick={handleReproducir}
            >
              Reproducir Contenido
            </button>
          )}
        </div>

        <div>
          {mostrarTemporadas ? (
            <div>
              {cargandoTemporadas && <p>Cargando temporadas...</p>}
              {mostrarTemporadas && (
                <div>
                  {temporadas && temporadas.length > 0 ? (
                    temporadas.map((temporada) => (
                      <div key={temporada.idtemporada}>
                        <div className="contenido-temporadas">
                          <h3>Temporada {temporada.numero}</h3>
                          <button
                            className="contenido-button episodios"
                            onClick={() =>
                              handleShowEpisodios(
                                contenido.id_contenido,
                                temporada.numero
                              )
                            }
                          >
                            {mostrarEpisodios[temporada.numero]
                              ? "Ocultar Episodios"
                              : "Ver Episodios"}
                          </button>
                        </div>
                        {mostrarEpisodios[temporada.numero] ? (
                          <div>
                            {cargandoEpisodios && <p>Cargando episodios...</p>}
                            {mostrarEpisodios[temporada.numero] && (
                              <div className="contenido-episodios">
                                {episodios[temporada.numero] &&
                                episodios[temporada.numero].length > 0 ? (
                                  episodios[temporada.numero].map(
                                    (episodio) => (
                                      <div
                                        key={episodio.id_episodio}
                                        className="contenido-episodios-box"
                                        onClick={handleReproducir}
                                      >
                                        <div className="contenido-episodio-image">
                                          {/* <img src={contenido.imagen || "placeholder.jpg"} alt={contenido.titulo} /> */}
                                          {/* <img src="/assets/img/FRIENDS.jpg" alt="Breaking Bad" /> */}
                                          {/* IMPORTANTE: HAY QUE ESTANDARIZAR EL NOMBRE DE 'IMAGEN' EN LA BASE DE DATOS */}
                                          <img
                                            src={`/assets/img/${contenido.imagen}`}
                                            alt={`${contenido.imagen}`}
                                          />
                                        </div>
                                        <div className="contenido-episodios-box-info">
                                          <div className="info-ep-titulo">
                                            <p>{episodio.titulo}</p>
                                          </div>
                                          <div className="info-ep">
                                            <p>{episodio.numero}</p>
                                            <p>{episodio.duracion} min</p>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )
                                ) : (
                                  <span className="contenido-vacio">
                                    Aún no hay episodios
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        ) : null}
                      </div>
                    ))
                  ) : (
                    <span className="contenido-vacio">
                      Aún no hay temporadas
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {showReproductor && (
        <div className="overlay">
          <Reproductor
            contenido={contenido}
            onClose={handleCerrarReproductor}
          />
        </div>
      )}
    </div>
  );
}

export default ContenidoDetail;
