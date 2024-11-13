// src/components/ContentList.js
import React, { useEffect, useState } from 'react';
import { getAllContents } from '../services/api';
import { useNavigate } from 'react-router-dom';

function ContentList() {
    const [contents, setContents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const data = await getAllContents();
            setContents(data);
        }
        fetchData();
    }, []);

    const handleContentClick = (id) => {
        navigate(`/content/${id}`);
    };

    return (
        <div>
            <h1>Contenidos</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {contents.map((content) => (
                    <div
                        key={content.idContenido}
                        onClick={() => handleContentClick(content.idContenido)}
                        style={{
                            width: '200px',
                            height: '300px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div style={{ height: '60%', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${content.imagen})` }}></div>
                        <div style={{ padding: '10px' }}>
                            <h3 style={{ margin: '0' }}>{content.titulo}</h3>
                            <p style={{ fontSize: '0.9em', color: '#666' }}>{content.sinopsis}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContentList;
