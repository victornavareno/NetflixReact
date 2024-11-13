// src/components/ContentDetail.js
import React, { useEffect, useState } from 'react';
import { getContentById } from '../services/api';

function ContentDetail({ id }) {
    const [content, setContent] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getContentById(id);
            setContent(data);
        }
        fetchData();
    }, [id]);

    if (!content) return <p>Cargando...</p>;

    return (
        <div>
            <h2>{content.titulo}</h2>
            <p>{content.sinopsis}</p>
            <p>Género: {content.genero}</p>
            <p>Director: {content.director}</p>
            {/* Agrega más detalles según sea necesario */}
        </div>
    );
}

export default ContentDetail;
