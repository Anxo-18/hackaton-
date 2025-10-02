import React, { useEffect, useState } from 'react'

type Q = { id:number, title:string, body:string, author?:string, date?:string }

export default function Questions(){
  const [questions, setQuestions] = useState<Q[]>([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(()=>{ fetch('/api/questions').then(r=>r.json()).then(data=>setQuestions(data)) },[])

  const create = async () => {
    if(!title) return
    const res = await fetch('/api/questions', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({title,body}) })
    if(res.ok){
      const q = await res.json()
      setQuestions(prev=>[q,...prev])
      setTitle(''); setBody('')
    }
  }

  const remove = async (id:number) => {
    await fetch('/api/questions/'+id, { method:'DELETE' })
    setQuestions(prev=>prev.filter(p=>p.id!==id))
  }

  return (
    <div>
      <div className="card" style={{marginBottom:18}}>
        <h3 style={{marginTop:0}}>Crear pregunta</h3>
        <div className="form-group"><input placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} /></div>
        <div className="form-group"><textarea placeholder="Cuerpo" value={body} onChange={e=>setBody(e.target.value)} /></div>
        <button className="btn" onClick={create}>Crear</button>
      </div>

      <div className="questions-list">
        {questions.map(q=>(
          <div className="q-card" key={q.id}>
            <div className="q-meta"><div>{q.author || 'Usuario anónimo'}</div><div>{q.date || ''}</div></div>
            <h3 className="q-title">{q.title}</h3>
            <p className="q-body">{q.body}</p>
            <div style={{marginTop:10, display:'flex', gap:8}}>
              <button className="btn" onClick={()=>remove(q.id)} style={{background:'#999'}}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}