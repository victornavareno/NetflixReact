// src/App.js
import React from 'react';
import ContentList from './components/ContentList';
import ContentDetail from './components/ContentDetail';

function App() {
  return (
      <div className="App">
          <h1>Aplicación de Contenidos</h1>
          <ContentList />
          {/* Prueba con un ID específico para ver el detalle */}
          <ContentDetail id={1} /> 
      </div>
  );
}

export default App;