export default function Register() {
  return (
    <>
      <h1 className="title">Regístrate</h1>
      <form className="w-1/2 mx-auto space-y-6">
        <div>
          <input type="text" placeholder="Nombre" />
        </div>

        <div>
          <input type="text" placeholder="Email" />
        </div>

        <div>
          <input type="password" placeholder="Contraseña" />
        </div>

        <div>
          <input type="password" placeholder="Confirmar contraseña" />
        </div>
        <button className="primary-btn">Registrarse</button>
      </form>
    </>
  );
}
