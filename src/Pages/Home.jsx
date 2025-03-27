import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

export default function Home() {
  const {name} = useContext(AppContext);
  return (
    <>
      <h1 className="title">Puntos de reciclaje de {name}</h1>
    </>
  );
}
