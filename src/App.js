// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContentList from './components/ContentList';
import ContentDetail from './components/ContentDetail';

function App() {
    return (
      
        <Router>
          <h1>NETFLIX</h1>
            <Routes>
                <Route path="/" element={<ContentList />} />
                <Route path="/content/:id" element={<ContentDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
