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

### 2. COMENZAR A DESARROLLAR EL PROYECTO
1. Levantar la API reciclandome-api abriendo dicho proyecto y ejecutando `php artisan serve`.
2. Configurar Vite con vite.config.js añadiendo el servidor como proxy, con la URL y los headers. Esto reducirá el código cada vez que tengamos que implementar un fetch (sólo habrá que poner api/user, api/posts, etc).
3. En src/App.jsx importar BrowserRouter, Routes y Route de "react-router-dom y en el return anidamos Route (donde definiremos el layout poniendo el path al homepage y el elemento que renderizará) en Routes y en BrowserRouter. Dentro definimos la ruta a Home que será la misma que su padre ('/').
4. En src crear el directorio Pages y dentro los archivos Layout.jsx y Home.jsx
5. En Home.jsx crear la función que devuelva un simple h1 por ahora, y lo mismo en Layout.jsx pero que devuelva un header con un nav con el link a Home (usando Link de react-router-dom) y un main con el Outlet (de react-router-dom también). Importamos ambos elementos en App.jsx. Ejecutamos `npm run dev` para ver la aplicación en el navegador.
    Resumen:
    - En App.jsx tenemos definido el sistema de enrutado.
    - Layout.jsx es la pantalla principal de la aplicación donde se renderizarán los componentes cuando sean llamados a través de la ruta. Por ejemplo a través de la ruta "/" se renderiza el componente Home, que en este punto muestra un h1 con el texto "Coordenadas".
6. En src/Pages crear el directorio Auth con los archivos Register.jsx y Login.jsx dentro. Copiar la función de Home dentro de ambos, cambiar los nombres y los textos del return.
7. En Layout.jsx en el nav bajo el Link crear un div con los dos links a Register y Login, y en App.jsx las rutas a ambos componentes.

### 3. AUTENTICACIÓN
1. Crear el formulario de registro en Register.jsx con Name, Email, Password y Confirm Password. En Email dejamos el type en text para ver el error en el backend. Ponemos también el botón. Crear el hook useState formData con el valor inicial formado por un objeto con name, email, password y password_confirmation con strings vacíos. Crear también la función handleRegister(). En form poner el listener onSubmit que ejecute nuestra función, y en cada input el value con la propiedad de nuestro hook formData y un listener onChange que ejecute una función anónima con el setFormData que ejecute un objeto con un spread de formData y el name del targetValue del event. Probar que el formulario devuelve en consola el objeto que introduzcamos.
    - Recordatorio 1: Aplicamos preventDefault al argumento e (evento) para que al ejecutar el listener onSubmit en el form, dicho formulario no se comporte como por defecto se comportan los formularios.
    - Recordatorio 2: El uso del operador spread (...) aquí es una forma de crear una copia superficial del objeto formData y luego modificar una de sus propiedades. Esto es importante en React porque el estado es inmutable, lo que significa que no debes modificar el estado directamente. En su lugar, debes crear una nueva versión del estado con los cambios que deseas aplicar.
    - [Documentación del hook useState](https://es.react.dev/reference/react/useState#reference)
2. Para poder enviar dicho objeto a nuestra API, en handleSubmit hacemos un fetch al endpoint /register (gracias a la configuración que hicimos en vite.config.js ya se incluyen los headers necesarios y el resto de la URL) y hacemos que la función sea asíncrona (y ponemos el await en la sentencia fetch). En el fetch añadimos como argumento un objeto con el método (post) y el body con formData stringificado. Añadimos también el data con dicho fetch convertido en JSON (con el await, importante) y dicho data es lo que ahora queremos ver en consola (lo ponemos en el console.log). Ahora al pulsar el botón Register, la API nos devuelve en consola los objetos con los respectivos errores que las validaciones envían.
