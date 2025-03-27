# RECICLANDO.ME - CLIENTE

## PARTE 1: REGISTRO Y LOGIN/LOGOUT
Aplicación web SPA (Single Page Application) creada con React-Router-DOM y TailwindCSS v3.
---
### 1. CREAR PROYECTO
1. Comandos usados para la instalación:
`npm create vite@latest laravel-api-react` -> `react` -> `javascript`,
`npm install`,
`npm install -D tailwindcss@3 postcss autoprefixer`,
`npx tailwindcss init -p`,
`npm install react-router-dom`
2. Configurar TailwindCSS añadiendo los directorios a tailwind.config.js (podemos omitir .ts y .tsx).
3. Borrar src/index.css. Borrar el contenido y copiar el contenido de [las clases personalizadas usadas para las pruebas iniciales](https://github.com/JonVadar/YouTube_videos/blob/main/tailwind_classes.css) que también contienen las directivas de Tailwind, en src/App.css.
4. En src/App.jsx borramos todos los import excepto el de App.css y borramos el useState y todo el contenido del return, dejando sólo un hola mundo. Además como sólo tenemos una función, borramos el export y en la declaración de la función incluimos export default.
5. En src/main.jsx borramos el import de index.css y el StrictMode.
6. Borrar el directorio src/assets con su contenido.
