// src/components/ContentDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getContentById } from '../services/api';

function ContentDetail() {
    const { id } = useParams();
    const [content, setContent] = useState(null);

    useEffect(() => {
        async function fetchContent() {
            const data = await getContentById(id);
            setContent(data);
        }
        fetchContent();
    }, [id]);

    if (!content) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{content.titulo}</h1>
            <img src={content.imagen} alt={content.titulo} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
            <p><strong>Tipo:</strong> {content.tipo}</p>
            <p><strong>Sinopsis:</strong> {content.sinopsis}</p>
            <p><strong>Duración:</strong> {content.duracion} minutos</p>
            <p><strong>Género:</strong> {content.genero}</p>
            <p><strong>Director:</strong> {content.director}</p>
            <p><strong>Elenco:</strong> {content.elenco}</p>
        </div>
    );
}

export default ContentDetail;
