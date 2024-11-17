import React, { useState, useEffect } from "react";
import axios from "axios";
import ContenidoList from "./components/ContenidoList";
import VistaList from "./components/VistaList";
import "./App.css"; // For global styles

function App() {
  document.title = "NETFLIX";
  return (
    <div>
      <h1>NETFLIX</h1>
      <h2>Bienvenido de nuevo, (usuario)</h2>
      <h2>Recomendaciones</h2>
    </div>
  );
}

export default App;
