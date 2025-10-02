# Blogeamos - Proyecto Fullstack (demo)

Estructura:
- frontend/  -> React + Vite + TypeScript (puedes ejecutar `npm install` y `npm run dev`)
- backend/   -> Node + Express (ejecutar `npm install` y `npm start`)

**Notas**
- El backend usa una base de datos en memoria (arrays). Para producción debes usar una DB real.
- El endpoint de autenticación devuelve un JWT; las contraseñas se guardan con bcrypt (hash).
- El frontend hace peticiones a `/api/...`. Para desarrollo con Vite está configurado el proxy en vite.config.ts

Instrucciones rápidas:
1. Backend:
   - `cd backend`
   - `npm install`
   - `npm start`
   - (Opcional) Registrar un usuario via POST /api/auth/register

2. Frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

Esta entrega se basó en la plantilla que compartiste y implementa:
- punto 1: reuse de plantilla Bootstrap (assets copiados)
- punto 2: Login e inicio de sesión (con hash)
- punto 3: HTML5/CSS3 y ESNext (TypeScript + React)
- punto 4: TypeScript (frontend)
- punto 5: React + React Router
- punto 6: Node + Express
- punto 7: Formularios (preguntas, login)
- punto 8: Manejo básico de excepciones (respuestas 4xx/5xx) y CRUD (GET/POST/DELETE)

¡Listo! Descarga el zip y ejecútalo localmente.