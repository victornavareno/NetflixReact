// src/components/ContentList.js
import React, { useEffect, useState } from 'react';
import { getAllContents } from '../services/api';
import '../styles/ContentList.css'; // Import a CSS file for styling the boxes

// aqui lo que estoy haciendo es cargar todos los contenidos que tengo en la base de datos
// TODO: IMPLEMENTAR ESTO PERO CON MICROSERVICIO VISTAS 
// (VISTAS PUEDE ENVIAR UN ARRAY DE CONTENIDOS?)
function ContentList() {
    const [contents, setContents] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getAllContents();
            setContents(data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Contenidos</h1>
            <div className="content-list">
                {contents.map(content => (
                    <div className="content-box" key={content.idContenido}>
                        <div className="content-image">
                            <img src={content.imageURL} alt={content.titulo} />
                        </div>
                        <div className="content-info">
                            <h2>{content.titulo}</h2>
                            <p>{content.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContentList;
