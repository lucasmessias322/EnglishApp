import React, { useEffect, useState } from "react";
import TextoComponent from "../../components/TextoComponent";
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
  questionsAboutText: [
    {
      question: "",
      choiceA: "",
      choiceB: "",
      choiceC: "",
      correct: "",
    },
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
    });
    getUnicTexto(indexTexto).then((texto) => {
      setDataTexto(texto);
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
