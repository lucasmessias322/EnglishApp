import { useEffect } from "react";
import styled from "styled-components";

interface Text {
  title: string;
  content: { paragraph: string; audiotexturl: string }[];
}

interface TextWrapperComponentProps {
  text?: Text;
  handleClickWord?: (word: string) => void;
  handleTextToSpeech: (word: string) => void;
  audioIndex: number;
  dataTextoAudio: { paragraph: string; audiotexturl: string }[];
  hasAudio: boolean;
}

export default function TextWrapperComponent({
  text,
  handleClickWord,
  handleTextToSpeech,
  audioIndex,
  dataTextoAudio,
  hasAudio,
}: TextWrapperComponentProps) {
  const dataLen = dataTextoAudio.length - 1;
  const calc = audioIndex - 1;
  const shouldUseAudioHighlight =
    hasAudio &&
    dataTextoAudio.some((paragraph) => Boolean(paragraph.audiotexturl?.trim()));

  useEffect(() => {
    if (!shouldUseAudioHighlight) return;

    const paragraphs = document.querySelectorAll(".SelectedP");
    paragraphs.forEach((paragraph) => {
      paragraph.classList.remove("SelectedP");
    });

    const currentParagraph = document.getElementById(`${audioIndex}`);
    if (currentParagraph) {
      currentParagraph.classList.add("SelectedP");
    }

    if (audioIndex > 0) {
      const previousParagraph = document.getElementById(`${calc}`);
      if (previousParagraph) {
        previousParagraph.classList.remove("SelectedP");
      }
    }

    if (audioIndex === 0 && dataLen >= 0) {
      const lastParagraph = document.getElementById(`${dataLen}`);
      if (lastParagraph) {
        lastParagraph.classList.remove("SelectedP");
      }
    }
  }, [audioIndex, dataTextoAudio, shouldUseAudioHighlight, calc, dataLen]);

  useEffect(() => {
    if (!shouldUseAudioHighlight) return;

    const paragraphs = document.querySelectorAll(".SelectedP");
    paragraphs.forEach((paragraph) => {
      paragraph.classList.remove("SelectedP");
    });

    const firstParagraph = document.getElementById("0");
    if (firstParagraph) {
      firstParagraph.classList.add("SelectedP");
    }
  }, [text, shouldUseAudioHighlight]);

  return (
    <Container>
      <TitleBlock>
        <span>Reading mode</span>
        <h2>{text?.title?.split("(Sem Audio)")}</h2>
      </TitleBlock>

      <ReadingCard>
        {text?.content.map((paragraph, index) => (
          <Paragraph
            key={index}
            id={`${index}`}
            className={
              shouldUseAudioHighlight && index === audioIndex ? "SelectedP" : ""
            }
          >
            {paragraph.paragraph.split(/\s+/).map((word, wordIndex) => (
              <WordContainer
                className="word"
                key={`${word}-${wordIndex}`}
                onClick={() => {
                  handleClickWord?.(word);
                  handleTextToSpeech(word);
                }}
              >
                {word}{" "}
              </WordContainer>
            ))}
          </Paragraph>
        ))}
      </ReadingCard>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  padding: 32px 16px 12px;
`;

const TitleBlock = styled.div`
  margin-bottom: 18px;

  span {
    display: inline-flex;
    margin-bottom: 8px;
    color: #8fe5d0;
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  h2 {
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    line-height: 1.15;
  }
`;

const ReadingCard = styled.article`
  padding: 26px;
  border-radius: 32px;
  border: 1px solid rgba(76, 85, 125, 0.42);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 25%),
    rgba(24, 27, 40, 0.88);
  box-shadow: 0 26px 52px rgba(7, 10, 20, 0.24);
`;

const Paragraph = styled.p`
  padding: 18px 16px;
  margin-top: 12px;
  border-radius: 20px;
  color: #dce2fb;
  line-height: 2;
  font-size: 1.05rem;
  transition: background-color 0.2s ease;

  &:first-child {
    margin-top: 0;
  }

  &.SelectedP {
    background: rgba(110, 136, 204, 0.12);
    border: 1px solid rgba(110, 136, 204, 0.22);
  }

  &.SelectedP span {
    color: #fff3c3;
  }
`;

const WordContainer = styled.span`
  border-radius: 8px;
  transition:
    color 0.18s ease,
    background-color 0.18s ease;

  &:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: #37406e;
  }
`;
