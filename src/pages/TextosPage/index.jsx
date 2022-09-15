import React, { useContext } from "react";
import TextoComponent from "../../components/TextoComponent";
import { AuthContext } from "../../Context/AuthContext";

export default function Textos() {
  const { thema, texto } = useContext(AuthContext);

  return <TextoComponent texto={texto} />;
}
