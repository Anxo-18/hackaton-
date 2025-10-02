import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const nav = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try{
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email, password})
      })
      const data = await res.json()
      if(res.ok){
        localStorage.setItem('token', data.token)
        nav('/dashboard')
      } else {
        setMsg(data.message || 'Error')
      }
    }catch(err){
      setMsg('Error de conexión')
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <h2 style={{marginTop:0, color:'#111'}}>Iniciar sesión</h2>
        <p style={{color:'#666', marginTop:6}}>Accede para participar en la comunidad de Blogeamos Carros.</p>
        {msg && <div style={{color:'red', marginTop:8}}>{msg}</div>}
        <form onSubmit={handleSubmit} style={{marginTop:14}}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:12}}>
            <button className="btn" type="submit">Entrar</button>
            <a href="/register" style={{color:'#666', textDecoration:'none'}}>¿Olvidaste tu contraseña?</a>
          </div>
        </form>
      </div>
    </div>
  )
}