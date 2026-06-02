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
  const title = text?.title?.replace("(Sem Audio)", "").trim();
  const paragraphCount = text?.content.length || 0;
  const audioProgress =
    paragraphCount > 0 ? ((audioIndex + 1) / paragraphCount) * 100 : 0;
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
        <h2>{title}</h2>

        <ReadingMeta>
          <MetaPill>{paragraphCount} parágrafos</MetaPill>
          <MetaPill>{hasAudio ? "Áudio disponível" : "Leitura silenciosa"}</MetaPill>
        </ReadingMeta>
      </TitleBlock>

      <ReadingCard>
        {hasAudio && (
          <AudioTimeline aria-hidden="true">
            <AudioTimelineFill $progress={audioProgress} />
          </AudioTimeline>
        )}

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
  max-width: 680px;
  margin: 0 auto;
  padding: 28px 14px 12px;

  @media (max-width: 560px) {
    padding: 18px 10px 12px;
  }

  @media (max-width: 360px) {
    padding-inline: 6px;
  }
`;

const TitleBlock = styled.div`
  margin-bottom: 16px;

  span {
    display: inline-flex;
    margin-bottom: 8px;
    color: #8fe5d0;
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  h2 {
    color: #f7f9ff;
    font-size: clamp(1.7rem, 3vw, 2.35rem);
    line-height: 1.15;
    letter-spacing: 0;
  }

  @media (max-width: 560px) {
    margin-bottom: 12px;

    span {
      font-size: 0.72rem;
    }

    h2 {
      font-size: 1.45rem;
      line-height: 1.2;
    }
  }
`;

const ReadingMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
`;

const MetaPill = styled.small`
  min-height: 30px;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid rgba(76, 85, 125, 0.44);
  padding: 6px 11px;
  color: #c8d0ec;
  background: rgba(33, 36, 51, 0.72);
  font-size: 0.76rem;
  font-weight: 600;
`;

const ReadingCard = styled.article`
  overflow: hidden;
  padding: 12px;
  border-radius: 28px;
  border: 1px solid rgba(76, 85, 125, 0.42);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 25%),
    rgba(24, 27, 40, 0.88);
  box-shadow: 0 24px 50px rgba(7, 10, 20, 0.24);

  @media (max-width: 560px) {
    padding: 8px;
    border-radius: 22px;
  }

  @media (max-width: 360px) {
    padding: 6px;
  }
`;

const AudioTimeline = styled.div`
  height: 5px;
  overflow: hidden;
  margin: 2px 4px 10px;
  border-radius: 999px;
  background: rgba(76, 85, 125, 0.34);
`;

const AudioTimelineFill = styled.div<{ $progress: number }>`
  width: ${(props) => Math.min(100, Math.max(0, props.$progress))}%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #29aa8b, #8fe5d0);
  transition: width 0.24s ease;
`;

const Paragraph = styled.p`
  padding: 18px 16px;
  margin-top: 8px;
  border: 1px solid transparent;
  border-radius: 18px;
  color: #dce2fb;
  line-height: 1.95;
  font-size: 1.05rem;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

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

  @media (max-width: 560px) {
    padding: 14px 12px;
    margin-top: 6px;
    border-radius: 14px;
    font-size: 1rem;
    line-height: 1.78;
  }

  @media (max-width: 360px) {
    padding: 12px 8px;
    font-size: 0.95rem;
    line-height: 1.8;
  }
`;

const WordContainer = styled.span`
  border-radius: 7px;
  padding: 1px 2px;
  margin-inline: -2px;
  touch-action: manipulation;
  transition:
    color 0.18s ease,
    background-color 0.18s ease;

  &:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: #37406e;
  }
`;
