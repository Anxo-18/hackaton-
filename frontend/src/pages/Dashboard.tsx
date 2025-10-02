import React, { useEffect, useState } from 'react'

export default function Dashboard(){
  const [user, setUser] = useState<any>(null)
  const [msg, setMsg] = useState('')

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token){ setMsg('No autenticado'); return }
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer '+token } })
      .then(r=>r.json())
      .then(data=> setUser(data.user))
      .catch(()=> setMsg('Error cargando usuario'))
  },[])

  return (
    <div className="card">
      <h2>Dashboard</h2>
      {msg && <div style={{color:'red'}}>{msg}</div>}
      {user ? (
        <div>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Nombre:</strong> {user.name}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}