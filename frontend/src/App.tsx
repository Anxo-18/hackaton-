import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Questions from './pages/Questions'

export default function App(){
  return (
    <div>
      <nav className="topnav">
        <div className="brand">Blogeamos Carros</div>
        <div className="links">
          <Link to="/">Inicio</Link>
          <Link to="/questions">Preguntas</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/questions" element={<Questions/>} />
        </Routes>
      </main>
      <footer className="footer">© Blogeamos Carros</footer>
    </div>
  )
}