import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Play from './pages/Play' // 1. Importamos el componente real del juego

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta de la Landing Page */}
        <Route path="/" element={<Home />} />
        
        {/* 2. Cambiamos el placeholder por el componente Play real */}
        <Route path="/play" element={<Play />} />
      </Routes>
    </Router>
  )
}