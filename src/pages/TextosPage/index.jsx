import React, { useContext, useEffect, useState } from "react";
import TextoComponent from "../../components/TextoComponent";
import { AuthContext } from "../../Context/AuthContext";
import { getTextos, getUnicTexto } from "../../services/Api";
import { useParams } from "react-router-dom";

const DadosDoTexto = {
  titulo: "Carregando",
  textos: [
    {
      AudioPathData: "",
      AudioText: "Carregando...",
      Translate: "Carregando...",
    },
    {
      AudioPathData: "",
      AudioText: "",
      Translate: "",
    },
  ],

  fraseAFraseDoTexto: [
    { FraseInIngles: "Carregando...", FraseInPortuguese: "" },
  ],
};
const DadosDoTextos = [
  {
    titulo: "Carregando",
    textos: [
      {
        AudioPathData: "",
        AudioText: "Carregando...",
        Translate: "Carregando...",
      },
      {
        AudioPathData: "",
        AudioText: "",
        Translate: "",
      },
    ],

    fraseAFraseDoTexto: [
      { FraseInIngles: "Carregando...", FraseInPortuguese: "" },
    ],
  },
];

export default function Textos() {
  const [DataTexto, setDataTexto] = useState(DadosDoTexto);
  const [Alltextos, setAllTextos] = useState(DadosDoTextos);
  const indexTexto = useParams().indexTexto;

  useEffect(() => {
    getTextos().then((textos) => {
      setAllTextos(textos);
      console.log(textos);
    });
    getUnicTexto(indexTexto).then((texto) => {
      setDataTexto(texto);
      console.log(texto);
    });
  }, [indexTexto]);

  return (
    <TextoComponent
      Alltextos={Alltextos}
      setAllTextos={setAllTextos}
      DataTexto={DataTexto}
      setDataTexto={setDataTexto}
    />
  );
}
