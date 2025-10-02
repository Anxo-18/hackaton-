import React, { useEffect, useState } from 'react'

export default function Home(){
  const [questions, setQuestions] = useState<any[]>([])
  const [idx, setIdx] = useState(0)
  const imgs = [
    '/assets/img/car1.svg',
    '/assets/img/car2.svg',
    '/assets/img/car3.svg'
  ]

  useEffect(()=>{ fetch('/api/questions').then(r=>r.json()).then(data=>setQuestions(data)) },[])

  useEffect(()=>{
    const t = setInterval(()=> setIdx(i=> (i+1)%imgs.length), 5000)
    return ()=> clearInterval(t)
  },[])

  return (
    <div>
      <div className="hero">
        <img src={imgs[idx]} alt="hero" />
        <div className="overlay">
          <div>
            <h1>Blogeamos Carros — Pasión por la velocidad</h1>
            <p>Noticias, reseñas y comunidad sobre autos clásicos y modernos.</p>
          </div>
          <div className="slider-controls">
            <div className="ctrl" onClick={()=> setIdx(i=> (i-1+imgs.length)%imgs.length)}>&lt;</div>
            <div className="ctrl" onClick={()=> setIdx(i=> (i+1)%imgs.length)}>&gt;</div>
          </div>
        </div>
      </div>

      <section>
        <h2 className="section-title">Últimas Noticias de Autos</h2>
        <div className="news-grid">
          <div className="news-card">
            <img src="/assets/img/car1.svg" alt="n1" />
            <div className="body">
              <h3>Porsche 911 Turbo S: rendimiento extremo</h3>
              <p>Analizamos las mejoras y sensaciones de la última versión.</p>
            </div>
          </div>
          <div className="news-card">
            <img src="/assets/img/car2.svg" alt="n2" />
            <div className="body">
              <h3>Tesla Model S Plaid: la era eléctrica</h3>
              <p>Comparativa de autonomía y aceleración en distintos escenarios.</p>
            </div>
          </div>
          <div className="news-card">
            <img src="/assets/img/car3.svg" alt="n3" />
            <div className="body">
              <h3>Ferrari Roma: diseño y elegancia</h3>
              <p>Estética y experiencia al volante del nuevo italiano.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-title">Galería</h2>
        <div className="gallery">
          <img src="/assets/img/car1.svg" alt="g1" />
          <img src="/assets/img/car2.svg" alt="g2" />
          <img src="/assets/img/car3.svg" alt="g3" />
          <img src="/assets/img/car4.svg" alt="g4" />
          <img src="/assets/img/car5.svg" alt="g5" />
          <img src="/assets/img/car6.svg" alt="g6" />
          <img src="/assets/img/car7.svg" alt="g7" />
          <img src="/assets/img/car8.svg" alt="g8" />
        </div>
      </section>

      <section style={{marginTop:20}}>
        <h2 className="section-title">Últimas preguntas</h2>
        <div className="questions-list">
          {questions.length === 0 && <div className="card">No hay preguntas aún, crea la primera en <a href="/questions">Preguntas</a>.</div>}
          {questions.slice(0,6).map(q=>(
            <div key={q.id} className="q-card">
              <div className="q-meta"><div>{q.author || 'Usuario anónimo'}</div><div>{q.date || ''}</div></div>
              <h3 className="q-title">{q.title}</h3>
              <p className="q-body">{q.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}