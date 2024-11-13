// src/components/ContentList.js
import React, { useEffect, useState } from 'react';
import { getAllContents } from '../services/api';

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
            <ul>
                {contents.map(content => (
                    <li key={content.idContenido}>
                        {content.titulo} - {content.tipo}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ContentList;
