import { useEffect } from "react";
import styled from "styled-components";

interface Text {
  title: string;
  content: { paragraph: string; audiotexturl: string }[];
}

interface TextWrapperComponent {
  text?: Text;
  handleClickWord?: Function;
  handleTextToSpeech: Function;
  audioIndex: number;
  dataTextoAudio: object;
}

export default function TextWrapperComponent({
  text,
  handleClickWord,
  handleTextToSpeech,
  audioIndex,
  dataTextoAudio,
}: TextWrapperComponent) {
  const dataLen = dataTextoAudio.length - 1;
  const calc = audioIndex - 1;

  useEffect(() => {
    // Limpar todas as seleções de parágrafos
    const paragraphs = document.querySelectorAll(".SelectedP");
    paragraphs.forEach((paragraph) => {
      paragraph.classList.remove("SelectedP");
    });

    // Marcar o parágrafo atual
    let currentParagraph = document.getElementById(`${audioIndex}`);
    if (currentParagraph) {
      currentParagraph.classList.add("SelectedP");
    }

    // Desmarcar o parágrafo anterior
    if (audioIndex > 0) {
      let previousParagraph = document.getElementById(`${calc}`);
      if (previousParagraph) {
        previousParagraph.classList.remove("SelectedP");
      }
    }

    // Tratar caso especial quando o índice é zero, reiniciando a seleção
    if (audioIndex === 0 && dataLen >= 0) {
      let lastParagraph = document.getElementById(`${dataLen}`);
      if (lastParagraph) {
        lastParagraph.classList.remove("SelectedP");
      }
    }
  }, [audioIndex, dataTextoAudio]);

  useEffect(() => {
    // Limpar todas as seleções de parágrafos quando o texto mudar
    const paragraphs = document.querySelectorAll(".SelectedP");
    paragraphs.forEach((paragraph) => {
      paragraph.classList.remove("SelectedP");
    });

    // Reiniciar o índice do áudio para zero e marcar o primeiro parágrafo
    // setAudioIndex(0);
    let firstParagraph = document.getElementById("0");
    if (firstParagraph) {
      firstParagraph.classList.add("SelectedP");
    }
  }, [text]);

  return (
    <Container>
      <h2>{text.title}</h2>
      {text.content.map((paragraph, index) => (
        <p key={index} id={`${index}`}>
          {paragraph.paragraph.split(/\s+/).map((word, wordIndex) => (
            <WordContainer
              className="word"
              key={wordIndex}
              onClick={() => {
                handleClickWord(word);
                handleTextToSpeech(word);
              }}
            >
              {word}{" "}
            </WordContainer>
          ))}
        </p>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 600px;
  margin: 0px auto;
  padding: 40px 10px;

  h2 {
    text-align: center;
    padding: 10px 0px;
  }
  p {
    padding: 10px;
  }
  .SelectedP {
    color: rgb(255, 255, 114);
  }
`;
const WordContainer = styled.span`
  &:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: #52043b;
    text-align: center;
  }
`;
