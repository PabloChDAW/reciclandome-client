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
2. Configurar Vite con vite.config.js añadiendo el servidor como proxy, con la URL y los headers. Esto reducirá el código cada vez que tengamos que implementar un fetch (sólo habrá que poner api/user, api/points, etc).
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
7. En main.jsx anidamos App en nuestro AppProvider. Usando React DevTools inspeccionamos la página usando la pestaña Components para ver el árbol de componentes. Observar que App está envuelto en Context.Provider en el que al pinchar vemos el value que pusimos al declarar la etiqueta AppContext.Provider. Ahora todos los componentes heredan esa propiedad que pusimos. Vamos a ver cómo acceder a ella.
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
7. En Layout.jsx capturamos el hook user (`const {user} = useContext(AppContext);`) y hacemos que el div que muestra los links sea condicional. Se mostrará el nombre de usuario sólo si hay un usuario logueado, y si no, se mostrarán los links Login y Register.
8. Poner en el div del true el mensaje de Welcome Back (nombre) de layout.jsx en un párrafo con estilos.
9. En este punto, aún con un usuario logueado, si escribimos /register en la URL podemos acceder a la página de registro. Para solucionarlo, en App.jsx nos llevamos el estado de user y le asignamos el `useContext(appContext);` para poder encerrar en un ternario las rutas usando user como condición.

### 5. LOGIN
1. Copiar todo el código de Register.jsx y pegarlo en Login.jsx sustituyendo el codigo que contiene.
2. Cambiar el nombre de la función Register por Login. En el hook formData quitar name y password_confirmation. Cambiar el nombre de la función handleRegister por handleLogin, cambiar el endpoint por /api/login y comentar el console.log (ya de paso comentar también el de Register.jsx). En el h1 cambiar el mensaje. En el form cambiar la función. Borrar los div de los inputs de name y confirm password. Cambiar el texto del botón.
3. Borrar el token manualmente del almacenamiento local, porque no puede existir cuando estamos en la página de Login, y recargar la página. Veremos que lo único que ha cambiado es que ya no se ve el nombre del usuario. Esto se debe a que fue un error poner un objeto vacío como estado inicial del hook user en AppContext.jsx. Cambiarlo a null para que user pueda ser false.
4. En Login.jsx en la función handleLogin, comentar la redirección a Home y bajo la declaración de data, hacerle un console.log para hacer la siguiente prueba:
5. Si vamos a Login y pulsamos el botón de Login sin rellenar los campos, recibimos los mensajes de error. Si añadimos un email que no está en la BD nos muestra "The selected email is invalid", lo cual es correcto. Si ponemos un email que sí está, pero la contraseña es incorrecta, recibimos el mensaje "The provided credentials are incorrect", **pero la key es `message`** y en la UI no aparece ese mensaje. Dentro hay otra key, **`errors`**. En este caso en Login.jsx se ejecuta el else, y si miramos el almacenamiento local se ha guardado un token undefined. Para arreglar esto vamos al controlador AuthController.php en la API. En el return donde se envía dicho mensaje (función login()), cambiamos el mensaje por un array "errors" con un elemento con clave "email" y el mensaje de error (como vimos en el mensaje que envió). Ahora al hacer login con un email correcto pero una contraseña incorrecta, aparecerá el mensaje "The provided credentials are incorrect.".
6. En Login.jsx, en handleLogin() volver a descomentar el navigate a Home, y comentar el console.log bajo la declaración de data.
    - Nota: En AuthController.php, tanto en la función login() como en register() estaba devolviendo el token como un objeto. Lo he solucionado aplicándole plainTextToken al token en el return de ambas funciones.
7. Ahora el login funciona, pero si por ejemplo manipulamos el valor del token en almacenamiento local, recibimos un 401 en consola, y sólo vemos el texto welcome back, sin el nombre. Para solucionarlo, en AppContext.jsx en la función getUser() metemos el setUser(data) en un if que se ejecute sólo si la respuesta es ok. Ahora no aparece el welcome back sino los enlaces Login y Register (porque ya no hay user) y si volvemos a poner el valor del token correcto se produce el login correctamente. Ahora vamos a la funcionalidad Logout.

### 6. LOGOUT
1. En Layout.jsx vamos a añadir la funcionalidad de Logout. Bajo la línea que renderiza el mensaje de Welcome back, poner un form, borrar el action y ponerle dentro un botón con el texto Logout. A la etiqueta form ponerle un evento onSubmit que ejecute la función handleLogout.
2. Crear en Layout.jsx la función asíncrona handleLogout con el evento por parámetro:
    - Evitar la recarga (preventDefault()).
    - Crear el response con un fetch al endpoint /api/logout. Recordar que este endpoint está protegido requiriendo un token, así que lo incluimos en la cabecera (headers), y para acceder a él, lo incluimos en el hook useContext declarado arriba en la función Layout().
    - Capturar la respuesta en json con el await como siempre, y mostrarla en consola.
    - En caso de que la respuesta sea ok, queremos resetear el token y el user state, borrar el token del almacenamiento local y redireccionar a Home, porque si autenticación debe redireccionarse a Home. Así que primero declaramos el hook useNavigate "navigate", y en la función logout() actualizamos el user y el token con setUser y setToken a null, borramos el elemento del local storage y redirigimos a Home. Ir a AppContext para exponer setUser en el value (es el que faltaba de los 4).
3. Presionamos en Logout y recibimos el mensaje 405 en consola (Method Not Allowed) porque el método no puede ser GET, sino POST. Arreglarlo en el fetch.

## PARTE 2: CRUD (CREATE - READ - UPDATE - DELETE)
La primera funcionalidad va a ser que el usuario pueda realizar un CRUD básico de coordenadas, que se listarán en la pantalla principal. Se podrá acceder a cada punto pero sólo el usuario que haya registrado el punto podrá actualizar sus valores o eliminarlo.
---
### 7. CREAR PUNTO
1. Registrar un nuevo usuario. Una vez estamos logueados con el token,
2. En src/Pages crear la carpeta Points, y dentro crear Create.jsx. Dentro crear la función principal.
3. En el return de la función poner el título en un h1 y debajo, un form sin action, y dentro un div con un input tipo number con 5 decimales y con placeholder. Debajo del div poner otro div, y dentro otro input igual. Bajo este segundo div, poner un botón con el texto Crear.
4. En Layout.jsx, en la parte del return correspondiente al usuario autenticado, copiar uno de los links y pegarlo bajo la línea que renderiza el welcome back cambiándole el path a /create y poniéndole el texto Nuevo punto.
5. En App.jsx, copiar la ruta al login y pegarla debajo de ésta. Así estará protegida (si user es true, renderiza el componente Create, y si no, Login). Ya podemos ver el link Nuevo punto y pinchar en él.
6. En Create.jsx, crear el hook useState formData cuyo valor inicial será un objeto con las propiedades longitude y latitude con valor 0.
7. Crear la función asíncrona para crear points:
    - preventDefault al evento.
    - console.log de formData.
    - En la etiqueta del form, evento onSubmit que la ejecute.
    - En la etiqueta input de la latitud, capturar con value la latitud, y con un listener onChange ejecutar el setter del hook formData (setFormData()). Éste setter acepta por parámetro un objeto con una copia (usando spread) de formData, y el valor de latitude. Luego copiar esas dos líneas (value y onChange) Y pegárselas al longitude cambiando la propiedad en ambas líneas. Ahora al pulsar el botón Crear obtenemos en consola el objeto con los valores iniciales a 0, o lo que introduzcamos.
    - Crear el fetch con el endpoint /api/points con el método post y el headers con el token del usuario logueado ya que al haber relación entre users y points, debemos saber quién creó el point. Por tanto, debemos importar el hook useContext(AppContext) arriba del todo de la función principal para poder obtener el bearer token guardado en el 
    LocalStorage. Usualmente, en los métodos de crear y actualizar se necesita pasar en el cuerpo de la petición 
    los datos con los que se crea o actualiza nuestro dato (el point). Esto se consigue en el fetch a través de la 
    key 'body' y pasamos los datos del formulario que se almacenan en el estado formData.
    - Como siempre, se captura la respuesta en el await y se hace un console.log para probar.
8. Ahora al pulsar Crear con los campos vacíos obtenemos los errores de validación correspondientes de nuestra API. Para usarlos, bajo el useState formData crear el useState de errors con un objeto vacío de estado inicial. Dentro de la función handleCreate, ponemos un if que ejecute el setter de errors cuando haya errores, y en el else redirija a Home. Declarar este navigate (el hook useNavigate de siempre) sobre el useContext.
9. Para mostrar los errores, bajo la etiqueta input de cada campo, renderizar los errores usando un renderizado condicional de elementos usando el operador &&. En javascript los operadores && y || no devuelve valores booleanos, sino que devuelven el primer operando o segundo operando dependiendo de si estos son truthy o falsy. En el caso del operador && devuelve el primer operando si este es falsy y el segundo si el primero es truthy. React funciona de manera qeu devolver algo lo hace renderizar (dentro del return). Es por estos motivos que al poner el operador &&, se establece un punto de cortocircuito, de manera que si la condición existe, entonces se devuelve el siguiente elemento que como es un elemento HTML, se renderiza. 
Recordar que errors es un array, así que hay que especificar que queremos renderizar el texto (elemento 0). Copiar esta línea y pegar en el otro input cambiando latitude por longitude. Ahora al pulsar Create con los inputs vacíos observamos los correspondientes mensajes de error.
10. Ahora creamos un point y lo vemos en consola. Tenemos los datos del point, y lo guardamos bien en la BD, pero no tenemos el nombre del usuario que lo ha escrito. Para ello hacemos unos cambios en PointController.php. En la función store() tenemos en el return el $point. Lo cambiamos por un array con clave 'point' y valor $point, y añadimos clave 'user' con valor $point->user (usando la relación Eloquent que devuelve el usuario al que pertenece el point). Ahora creamos un point para ver que obtenemos en consola un objeto con dos propiedades (point y user). Hacer este cambio también en los return de show() y update(). Ya podemos comentar el console.log que muestra el point al crearse.

### 7. MOSTRAR TODOS LOS POINTS
1. En Home.jsx, definir la función asíncrona getPoints() que contiene un fetch al endpoint /api/points por GET (no hace falta ponerlo) y usa data para recoger la respuesta en JSON. Mostrarla en un console.log.
2. Queremos ejecutar esta función cuando se monte el componente, así que lo hacemos en un useEffect con dos argumentos, el callback, la función get, y un array vacío. Ir a Home para ver en consola los points que haya en la BD pero sin mostrar los usuarios. Solucionarlo en PointController.php cambiando el return usando el método with con la relación (user) aplicándole latest() (para ordenarlos descendentemente en el tiempo) y luego get(). El método with User permite
la carga del usuario al mismo tiempo que se van recogiendo los puntos, lo que evita tener que hacer múltiples queries para obtener cada usuario de cada punto, lo que podría causar un problema de rendimiento. Esto se conoce como Eager loading o carga ansiosa. Omitirlo sería lazy loading o carga perezosa. Obviamente hacerlo de esta manera es mejor ya que es más óptimo a nivel de rendimiento.
Ahora vemos que en la respuesta se incluye toda la información del usuario que crea cada point.
1. Para mostrar los points en Home.jsx, crear el hook useState points con un array vacío como estado inicial. Luego dentro de un if en el getPoints() para cuando la respuesta sea ok, actualizar el estado de points con los datos de la respuesta (data) y comentar el console.log.
2.  En el return bajo el h1, usando un ternario para cuando haya points (points.length > 0) mapear data para mostrarlos (esto se hace mediante un div y asignandole una key, que normalmente se requiere que sea un campo identificativo. React usa este dato para decidir cuando volver a renderizar y qué datos son los que han cambiado. No usar key o usar un campo no identificativo como por ejemplo latitud + longitud o el argumento index del bucle causaría problemas de mostrado en el front), y si no hay ninguno, mostrar un párrafo diciéndolo. Al mostrarlos usar un h2 para el título, un small para el usuario que lo creó y la fecha de creación usando la clase Date con el método toLocaleTimeString(), y otro párrafo para el body del point. Esta clase y método muestran la fecha en nuestra zona horaria.
3. Probar hacer logout, registrar un nuevo usuario y crear un nuevo point. Lo siguiente es crear páginas individuales para cada point.

### 8. MOSTRAR UN POINT CONCRETO
1. Crear un Link (de react-router-dom) dentro de cada point con el texto Ver más. Ponerte el atributo to con la ruta (`/points/${point.id}`). Ahora si pinchamos en alguno de estos links, nos muestra en la url el id de ese point. Ahora toca crear el componente y la ruta.
2. En la carpeta Points crear el archivo Show.jsx con la función principal que por ahora simplemente devolverá un texto para probar que funciona.
3. En App.jsx crear la ruta, que va a ser pública, por lo que no tiene que estar protegida. Para ello, copiar la ruta Home y pegarla debajo de la de Create cambiando el index por el path a la ruta que será dinámica, por tanto, será así: "/points/:id" de manera que aplicamos el nombre "id" para que luego podamos llamarla usando dicho nombre. Cambiamos el elemento por Show y ya estaría.
4. Ahora en Show.jsx poner un console.log con el hook useParams() para ver qué obtenemos al pulsar en algún botón Read more. Vemos que se muestra el texto de prueba de Show.jsx, la url correcta (con el id del point) y en consola el id del point. Si escribimos ahora lo que sea en la url se mostrará en consola (así es como funciona el hook useParams()). Ahora lo que queremos es capturar esa id en una variable.
    - [Documentación del hook useParams](https://api.reactrouter.com/v7/functions/react_router.useParams.html)
5. De vuelta en Show.jsx, comentar el console.log y declarar el hook useParams id y usarlo para hacer un fetch a un point en particular.
6. Copiar la función getPoints de Home.jsx y pegarla en Show.jsx porque va a ser muy parecida. Cambiarle el nombre por getPoint() y la url por la url dinámica `/api/points/${id}`. Comentar el if y primero hacer un console.log de data para ver qué recibimos de la API.
7. Para llamar a dicha función usamos el useEffect igual que la última vez (para que se ejecute al montar el componente). Ahora volver a Home y pinchar en un point para ver en consola que devuelve la información relativa a ese point. Mostremos esa información.
8. declarar el useState point con valor inicial null. Ahora descomentar el if que va a actualizar el valor del hook con data.point y comentar el console.log.
9. Copiar todo el return de Home.jsx para pegarlo en el return de Show.jsx. Borrar el h1. En la condición ahora queremos comprobar simplemente si point es true, y ya no necesitamos mapear nada, porque sólo mostraremos dicho point, así que borramos la línea del map y abajo los dos paréntesis que sobran. Borramos también el Link. En el else ahora ponemos de texto Punto no encontrado. Cambiar algún estilo.

Ya sólo queda hacer las funcionalidades de actualizar y eliminar, que conllevan una dificultad añadida, porque el usuario no sólo debe estar autenticado, sino también autorizado para que sólo pueda actuar sobre sus points y no los de otro usuario.

### 9. ACTUALIZAR UN POINT
1. Añadir un botón en cada página de point individual para actualizarlo. Para ello, en Show.jsx bajo el párrafo del div que contiene la información del punto, crear un div que dentro tenga un Link de react-router-dom que mandará al componente encargado de actualizar. Añadirle un atributo como hicimos con el Link Show, que contenga la ruta acabada en el id del point.
2. No queremos que aparezca este botón si el usuario no es dueño del point. Para ello, en AppContext.jsx recordemos que el useState "user" guarda la instancia del usuario que nos da la BD **si el token existe**. Por tanto la comprobación que vamos a hacer es que el id del usuario autenticado sea el mismo que el id del usuario del point (y que el usuario autenticado existe para evitar errores). Así que en Show.jsx bajo el hook useParamas declaramos un useContext user con AppContext como argumento. Ahora ya tenemos acceso tanto al user logueado como al point (que tiene los datos de su user propietario).
3. Ahora aplicamos los operadores && para realizar el render condicionado cortocircuitado de manera que solo se producirá el render si el usuario logueado existe, y este, además, es el mismo que el usuario que creó el punto. Recordar que esta declaración sería algo como "compara las ids y (&&) si son iguales, renderiza lo que sigue".
    - Nota: Recordar que si en este punto no hubiera un usuario logueado, la aplicación petaría porque user.id sería null. Esto hay que arreglarlo. (Esto es arreglado en la etapa 10.2)
Ahora vamos a crear el componente para actualizar.
1. En la carpeta Points crear el archivo Update.jsx con la función principal que devuelva un texto de prueba.
2. En App.jsx crear la correspondiente ruta para este nuevo archivo. Para ello copiar la ruta de Create y pegarla la última, cambiando el path por "/points/update/:id" y el componente Create por Update. Comprobar que el link Update funciona mostrando el texto de prueba.
3. Copiar todo el código de Create.jsx y pegarlo en Update.jsx sustituyendo lo que haya. Cambiar el nombre de la función principal por Update y de la función handleCreate por handleUpdate. Cambiar el endpoint en el fetch por un string vacío por ahora. Cambiar el método del fetch por "put". Descomentar el log de data en handleUpdate() para ver cualquier error inesperado. En el Markup (return de la función principal) cambiar el h1 por "Modifica tu punto" y cambiar la función del onSubmit por handleUpdate. Por último cambiar el texto del botón por Actualizar.
4. Ahora debemos coger el id del point desde la URL. Para ello volvemos a usar el hook useParams declarándolo arriba del todo de la función principal en Update.jsx.
5. En el fetch de handleUpdate() ponemos la URL dinámica `/api/points/${id}` donde id es el hook useParams que hemos creado.
6. Volviendo a Show.jsx copiamos la función getPoint() y la pegamos en Update.jsx bajo las declaraciones de hooks, y en el if cambiamos el setPoint(data.point) por setFormData() para que recoja el objeto con las propiedades del formulario que vendrían a ser latitud y longitud.
    - Nota: Esto es muy **refactorizable**. De hecho estaría bien separar todas las peticiones en un archivo aparte.
7.  Queremos que ésta función getPoint() de Update.jsx sea ejecutada al montar el componente. Por tanto lo haremos como siempre con un useEffect al final de la función principal, justo antes del return. Ahora si le damos a update en un point veremos los campos rellenados con la información actual de dicho point. Ya podemos actualizarlo y vemos el resultado en consola. Ahora el problema es que si accedemos a un point que no corresponde al usuario logueado, y manualmente modificamos la URL añadiéndole update antes del id, podemos intentar hackear el point ajeno y actualizarlo, pero en el intento recibiremos un error 403 (Forbidden), ya que las políticas implementadas en Laravel no lo permitirán y veremos en consola el mensaje "You do not own this point". Esto está bien pero es mejor todavía si evitamos que el usuario pueda acceder a esa URL. Hagámoslo.
8.  Primero importamos el usuario en Update.jsx añadiéndolo junto al token en el hook useContext.
9.  Ahora en la función getPoint() de Update.jsx al principio del if metemos otro if que compruebe si el user_id del point no coincide con el id del usuario para que en tal caso redirija a Home. Probar que funciona la casuística.

### 10. BORRAR UN POINT
1. Esta funcionalidad se producirá en el componente Show.jsx así que en dicho archivo en el return principal bajo el Link, añadir un form con un listener onSubmit que ejecute la función handleDelete, y dentro un botón con el texto "Eliminar". Vamos a crear la función.
2. En Show.jsx bajo la función getPoint creamos dicha función que será asíncrona, con el evento por parámetro y que contiene:
    - El correspondiente preventDefault().
    ...Un momento. Si en este punto mostramos un point del usuario logueado ya vemos el botón, pero al recargar la página la vista peta, porque está buscando un id de user que ahora mismo es null. Para evitar esto, en el ternario que compara el id del usuario con el user_id del point (que es justo donde se produce el null) añadimos antes la condición de que dicho usuario exista. Continuamos con la función.
    - El request a nuestra API (el fetch de siempre) con el mismo endpoint dinámico que usamos para el update.
    - El método "delete" y el header con el token (añadir el token al hook useContext para poder leerlo en Show.jsx).
    - la propiedad data con la respuesta en JSON como siempre.
    - Hacemos console.log del data (estas dos últimas líneas no son necesarias pero bueno).
    - Todo esto se supone que va a ocurrir sólo si el usuario existe y es dueño del point, así que justo bajo el preventDefault lo controlamos con un if y metemos todo lo siguiente de la función dentro.
    - Por último, dentro del if pero al final de éste ponemos otro if para que si la respuesta es ok rediriga a Home con navigate (recuerda antes declarar arriba el correspondiente hook useNavigate).
Probar borrar un point.

## NOTAS ADICIONALES
- Hay mucho que refactorizar en esta aplicación. Por ejemplo las peticiones a la API podrían separarse en un archivo aparte.
- También sería interesante mostrar los mensajes que nos da la API en mensajes Toastr.
- Prestar atención a los problemillas ocultos que muestra la consola del navegador e ir solucionándolos uno a uno.
- Y muchas cosas más que ya se nos irán ocurriendo.

## TODO

### PRIORIDAD HIGH

- Incluir Mapa de crear en actualizar (Rafa)
- Hacer componente de mapa de show (Rafa) [HECHO]
- Hacer pagina de show con: 
- {
  - Mapa con todos los puntos 
  - Panel al hacer click con la información siguiente:
  - Contacto, dirección, y el botón ver más que tiene la funcionalidad actual
- } (Jesús)
- Hacer Figma con las mejoras propuestas (Iván)

### PRIORIDAD MEDIUM
- Peticiones api a un archivo api.js y refactorizar código (Rafa/Jesus)
- Componente mapa con puntos del usuario 
- Página de Perfil Mostrando eso y más detalles por definir en perfil
- Ir implementado estilos por defecto en el archivo de directivas App.css
- Página de profile (Puntos que pertenecen al usuario) Tiene que tener todos los puntos
  en mapa en chincheta y que cuando pique se abra el mismo panel con show con los botones de
  ver más y también el botón de editar que lleve a la página de actualizar dicho punto.
  (Rafa/Jesús)
- Implementar que la chincheta arrastrable, al ser soltada, de igual forma actualice las coordenadas en inputs

### PRIORIDAD LOW
- Mostrar mensajes de confirmación de login (o fallo) en la página
- Puntos favoritos
- Implementar Rol moderador 
- Implementar petición de creación de punto (en lugar de crearlo directamente)
- Hacer que los mensajes de confirmación o fallo funcionen Toastr
- Funcionalidad: Encontrar puntos cerca de mi
- Funcionalidad: Encontrar mi ubicación actual para setear esos puntos por defecto al
- crear punto
- Hacer que los inputs sean componentes independientes
- Implementar aviso de coordenadas inválidas o mapa por defecto
- En lugar de borrar directamente, cuadro de dialogo que pida por confirmación
- ...................


### 11. AÑADIR IMPORTACIONES (ESTÁN YA PUESTA, SOLO HAY QUE INSTALARLAS)

- npm install react-router-dom react-icons
- npm install react-icons
- npm install framer-motion
- npm install lucide-react 