const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()
const PORT = process.env.PORT || 4000
const SECRET = process.env.SECRET || 'change_this_secret_for_prod'

app.use(cors())
app.use(bodyParser.json())

// In-memory "database" for demo
let users = [
  { id:1, email:'test@blogeamos.com', password:'$2b$10$wYJpQjz2gF6e6q2eC1sGdOxjz6a8h1Y9r8y1Kqz1Vw9vD1Z0x5kGa', name:'Test User' }
]
// password is "password" hashed - only for demo
let questions = [
  { id:1, title:'¿Cuál es el mejor auto eléctrico del 2025?', body:'Comparte tu opinión sobre rendimiento, autonomía y diseño.'},
  { id:2, title:'¿Ferrari o Lamborghini?', body:'¿Qué marca prefieres y por qué?'},
  { id:3, title:'¿Vale la pena comprar un auto híbrido hoy?', body:'Ventajas y desventajas en 2025.'},
  { id:4, title:'¿Qué opinas del nuevo Porsche 911 Turbo S?', body:'Comentarios sobre experiencias y revisiones.'}
]
let qid = 5

// Register - for testing (not exposed in frontend UI, but available)
app.post('/api/auth/register', async (req,res)=>{
  const {email,password,name} = req.body
  if(!email || !password) return res.status(400).json({message:'email y password requeridos'})
  const exists = users.find(u=>u.email===email)
  if(exists) return res.status(400).json({message:'usuario existe'})
  const hash = await bcrypt.hash(password, 10)
  const user = { id: users.length+1, email, password:hash, name: name||'' }
  users.push(user)
  res.json({message:'ok'})
})

// Login
app.post('/api/auth/login', async (req,res)=>{
  const {email,password} = req.body
  const user = users.find(u=>u.email===email)
  if(!user) return res.status(401).json({message:'credenciales invalidas'})
  const ok = await bcrypt.compare(password, user.password)
  if(!ok) return res.status(401).json({message:'credenciales invalidas'})
  const token = jwt.sign({id:user.id}, SECRET, {expiresIn:'2h'})
  res.json({token})
})

// Me
app.get('/api/auth/me', (req,res)=>{
  const auth = req.headers.authorization
  if(!auth) return res.status(401).json({message:'no autorizado'})
  const token = auth.split(' ')[1]
  try{
    const data = jwt.verify(token, SECRET)
    const user = users.find(u=>u.id===data.id)
    if(!user) return res.status(401).json({message:'no autorizado'})
    res.json({user:{id:user.id,email:user.email,name:user.name}})
  }catch(e){
    res.status(401).json({message:'token invalido'})
  }
})

// Questions CRUD
app.get('/api/questions', (req,res)=> res.json(questions))
app.post('/api/questions', (req,res)=>{
  const {title,body,author} = req.body
  const q = { id: qid++, title: title||'sin titulo', body: body||'', author: author||'Usuario anónimo', date: new Date().toISOString().slice(0,10) }
  questions.unshift(q)
  res.json(q)
})
app.delete('/api/questions/:id', (req,res)=>{
  const id = Number(req.params.id)
  questions = questions.filter(q=>q.id!==id)
  res.json({ok:true})
})

app.listen(PORT, ()=> console.log('Server listening on', PORT))