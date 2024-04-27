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
    let paragrafo = document.getElementById(`${audioIndex}`);

    if (audioIndex == paragrafo.id) {
      paragrafo.classList.add("SelectedP");
    }

    if (audioIndex >= 1) {
      let previousParagraph = document.getElementById(`${calc}`);
      previousParagraph.classList.remove("SelectedP");
    }
    if (audioIndex === 0) {
      let previousParagraph = document.getElementById(`${dataLen}`);
      previousParagraph.classList.remove("SelectedP");
    }
  }, [audioIndex, dataTextoAudio]);

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
    /* padding: 0px 5px; */
    text-align: center;
  }
`;
