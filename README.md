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
3. Pintar dichos errores para que el usuario pueda verlos. Para ello creamos un useState errors en Register.jsx inicialmente con un objeto vacío, y en caso de que data tenga la propiedad errors (que es un objeto) se actualize con setErrors. Esto lo ejecutamos con una sentencia if-else justo debajo de la línea donde cogemos data (si errors es true, setErrors con el objeto errors, y si no, ejecuta el console.log). Mostrar los errores bajo cada campo de entrada (comprobando antes si hay error y concatenando con &&). Copiar y pegar bajo cada campo de entrada del formulario simplemente cambiando la propiedad (excepto para la confirmación del password, claro).
    - Nota: los valores de los errores están en un array, así que hay que incluir la posición.
4. En el proyecto servidor, `php artisan migrate:fresh` y de vuelta al formulario, registrar un usuario y ver que tenemos en consola un objeto con el usuario y otro objeto con el token. Hay que guardar dicho token en el localStorage, porque si lo guardamos en un estado, se perderá al recargar la página. En Inspeccionar ir a Aplicación>Almacenamiento local>nuestro dominio (localhost por ahora) para ver dónde hay que guardar el par clave-valor, pero hay que comparar esa información con la base de datos en vez del almacenamiento local porque si no, la seguridad sería muy baja. Vamos a solucionar esto.
5. En Register.jsx crear un hook useNavigate para que en el else (si la respuesta de handleRegister es exitosa) al registrarse el usuario, redirija a home ('/'). También aquí en el else guardamos el token en almacenamiento local. Para manejar el estado logueado del usuario vamos a usar React context. Allá vamos.
    - [Artículo sobre el uso del hook useNavigate](https://www-geekster-in.translate.goog/articles/usenavigate-in-react-router-dom/?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=rq#:~:text=useNavigate%20in%20React%20Router%20v6,and%20enhances%20overall%20developer%20productivity.)
6. En src crear el directorio "Context" y dentro el archivo AppContext.jsx. Dentro usamos createContext() que permite presentar información bajo cierto contexto. Para ver cómo funciona, crear la función AppProvider() que devuelve el objeto contextualizado que hemos creado. Como el value por convención es un objeto, dentro de las llaves ponemos otras llaves con la propiedad name. Anidado dentro de este elemento usamos el prop especial children que viene a decir que esperamos otros componentes dentro de este componente. De esta manera podemos envolver toda la app en ese Provider.
    - [Documentación del hook useContext](https://es.react.dev/reference/react/useContext)
7. En main.jsx anidamos App en nuestro AppProvider. Usando React DevTools inspeccionamos la página usando la pestaña Components para ver el árbol de componentes. Orservar que App está envuelto en Context.Provider en el que al pinchar vemos el value que pusimos al declarar la etiqueta AppContext.Provider. Ahora todos los componentes heredan esa propiedad que pusimos. Vamos a ver cómo acceder a ella.
8. En Home.jsx usamos desestructuración para acceder a la propiedad metiendo el AppContext por parámetro al hook useContext y lo mostramos junto al texto del h1. Ahora al acceder a Home vemos el valor en el texto. Comentar esto en Home porque era sólo para la demostración. Continuemos con el registro.
9. En AppContext.jsx creamos un useState para el token que recoja el valor inicial desde el almacenamiento local. Ahora en la etiqueta AppContent.Provider donde teníamos el value de prueba, ponemos de value token y setToken, exponiendo el token a toda la aplicación.
10. En Register.jsx en el else bajo la línea que guarda el token en local storage, usamos setToken para capturar el token. Ahora a modo de prueba comentamos la línea que redirige a Home y por ejemplo bajo el h1 hacemos que se renderice  el token. Hacemos un registro y se verá en pantalla el token. Verlo también en el almacenamiento local. Comentamos la renderización del token y el token en useContext, y descomentamos el navigate a Home. Sólo era una demostración. Con esto ya tenemos el token en el estado de la aplicación, y también en el almacenamiento local.
    - Nota: No estaba enviando bien el token desde el controlador en el Backend (AuthController.php->función register), y me he vuelto loco para pillar bien el token en el lado cliente (ver también README.md del Backend, parte 2, 1.4).

### 4. AUTORIZACIÓN
1. En el punto actual hemos conseguido **autenticar** al usuario. Ahora lo vamos a **autorizar**. Para ello creamos otro useState "user" en AppContext.jsx con un objeto vacío como estado inicial.
2. Crear también la función asíncrona "getUser()" , y dentro:
    - Un const para la respuesta de un fetch al endpoint `api/user` que nos dará al usuario autenticado. Recordar que esa ruta está protegida por el middleware Sanctum, por tanto requerirá el token, así que incluimos headers con la clave Authorization y de valor un string vacío para ver qué ocurre.
    - Recogemos el dato como JSON como siempre.
    - Lo mostramos en consola.
3. Como queremos que esta función se ejecute siempre que el token se actualice, creamos un hook useEffect que la llame. Dicho hook tendrá como primer argumento una función flecha, y como segundo argumento el hook token (el useState) entre corchetes (este argumento ha de ser un array) de manera que el hook se ejecutará si el hook token cambia de valor. En la función flecha ejecutamos un console.log para observar el funcionamiento. Vemos que ya aparece el mensaje en consola. Ahora si registramos otro usuario, vemos en consola el objeto creado (data) por el fetch de getUser(), además de el mensaje enviado otra vez por el hook useEffect.
    - Nota: Como recordatorio, si el segundo argumento del hook useEffect fuese un array vacío, el useEffect sólo se ejecutaría una vez al ejecutarse la función AppProvider donde se encuentra.
    - [Documentación del hook useEffect](https://es.react.dev/reference/react/useEffect)
4. Evidentemente en vez de un console.log, queremos el useEffect para que ejecute la función getUser(), pero para evitar desperdiciar una llamada a la API cuando el token no exista usamos un if. Ahora tenemos en consola el mensaje 'Unauthenticated' que envía nuestro Backend, y si borramos manualmente el token del almacenamiento local, no recibimos mensaje alguno porque no se ejecuta getUser().
5. Ahora en el header del fetch de getUser() ponemos el token como valor de Authorization, precedido de Bearer. Registramos un usuario para ver el objeto en consola. Comentamos el console.log de getUser() y añadimos que actualize el hook user con data (`setUser(data)`).
6. En el value de la etiqueta AppContext.Provider añadimos user para exponer el dato a toda la aplicación.
