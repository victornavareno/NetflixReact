import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AdministrarVistas.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import API_CONFIG from "../config/api";

function AdministrarVistas({ cargarVistas }) {
    const { state } = useLocation();
    const vista = state?.vista;
    const [nuevoNombre, setNuevoNombre] = useState("");
    const [contenidos, setContenidos] = useState(vista?.contenidos || []);
    const [nuevoContenidoId, setNuevoContenidoId] = useState("");
    const navigate = useNavigate();

    const actualizarVista = async () => {
        if (!nuevoNombre.trim() || contenidos.length === 0) {
            console.error("El nombre y al menos un contenido son obligatorios.");
            return;
          }

        const vistaActualizada = {
            ...vista,
            nombre_vista: nuevoNombre,
            contenidos_ids: contenidos.map((contenido) => contenido.id_contenido),
        };

        try {
            const respuesta = await fetch(
            `${API_CONFIG.VISTAS}/${vista.id_vista}`,
            {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(vistaActualizada),
            }
            );

            if (respuesta.ok) {
            console.log("Vista actualizada con éxito.");
            cargarVistas();
            navigate("/");
            } else {
            console.error("Error al actualizar la vista.");
            }
        } catch (error) {
            console.error("Error en la solicitud PUT:", error);
        }
    };

    const eliminarVista = async () => {
        try {
          const respuesta = await fetch(`${API_CONFIG.VISTAS}/${vista.id_vista}`, {
            method: "DELETE",
          });
    
          if (!respuesta.ok) {
            const errorMensaje = await respuesta.text();
            throw new Error(`Error del servidor: ${errorMensaje}`);
          }
          console.log("vista eliminada con éxito.");
          cargarVistas();
          navigate("/");    
        } catch (error) {
          console.error("Error en la solicitud DELETE:", error);
        }
    };

    const agregarContenido = () => {
        if (!nuevoContenidoId.trim()) {
          console.error("El ID del contenido no puede estar vacío.");
          return;
        }
    
        // Evitar duplicados
        if (contenidos.some((contenido) => contenido.id_contenido === nuevoContenidoId)) {
          console.error("Este contenido ya está en la lista.");
          return;
        }
    
        // Agregar nuevo contenido
        setContenidos((prev) => [
          ...prev,
          { id_contenido: nuevoContenidoId, titulo: `Contenido ${nuevoContenidoId}`, imagen: "placeholder.jpg" },
        ]);
        setNuevoContenidoId("");
    };

    const eliminarContenido = (idContenido) => {
        setContenidos((prev) => prev.filter((contenido) => contenido.id_contenido !== idContenido));
    };

    return (
        <div>
            <div className="editarVista">
                <h4>Editar Vista {vista.nombre_vista}</h4>
                <div>
                    <label>Nuevo Nombre:</label>
                    <input
                        type="text"
                        onChange={(e) => setNuevoNombre(e.target.value)}
                    />
                </div>
                <div>
                    <label>Contenidos de la vista:</label>
                    <div className="contenidosVista">
                        {vista.contenidos.map((contenido, index) => (
                            <div key={contenido.id_contenido} className="contenidosVista-element" >
                                <div><img src={`/assets/img/${contenido.imagen}`} alt={`${contenido.imagen}`}/></div>
                                <div className="contenidosVista-element-titulo">{contenido.titulo}</div>
                                <button
                                    className="eliminarContenido-Button"
                                    onClick={() => eliminarContenido(contenido.id_contenido)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="agregarContenido">
                        <input
                            type="text"
                            placeholder="ID de nuevo contenido"
                            value={nuevoContenidoId}
                            onChange={(e) => setNuevoContenidoId(e.target.value)}
                        />
                        <button className="agregarContenido-Button" onClick={agregarContenido}>Agregar Contenido</button>
                    </div>
                </div>
                <div className="botonesEdicion">
                    <button onClick={actualizarVista}>Actualizar</button>
                    <button
                        onClick={() => eliminarVista(vista)}
                    >
                        Eliminar vista
                    </button>
                </div>
            </div>
        </div>
    );
}
    
export default AdministrarVistas;