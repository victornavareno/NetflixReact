// src/services/api.js

const API_URL_CONT = "http://127.0.0.1:8080"; // Cambia el puerto si tu API Flask usa otro

// Obtener todos los contenidos
export async function getAllContents() {
    const response = await fetch(`${API_URL_CONT}/contenido`);
    return await response.json();
}

// Obtener un contenido específico por ID
export async function getContentById(id) {
    const response = await fetch(`${API_URL_CONT}/contenido/${id}`);
    return await response.json();
}

// Obtener un episodio específico de una temporada
export async function getEpisodeBySeason(idContenido, idTemporada, idEpisodio) {
    const response = await fetch(`${API_URL_CONT}/contenido/${idContenido}/${idTemporada}/${idEpisodio}`);
    return await response.json();
}