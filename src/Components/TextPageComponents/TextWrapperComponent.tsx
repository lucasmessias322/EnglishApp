import { useEffect, useState } from "react";
import styled from "styled-components";

type TextParagraph = {
  paragraph: string;
  translation?: string;
  audiotexturl: string;
};

interface Text {
  title: string;
  content: TextParagraph[];
}

interface TextWrapperComponentProps {
  text?: Text;
  handleClickWord?: (word: string) => void;
  handleTextToSpeech: (word: string) => void;
  audioIndex: number;
  dataTextoAudio: TextParagraph[];
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
  const [showTranslation, setShowTranslation] = useState(false);
  const dataLen = dataTextoAudio.length - 1;
  const calc = audioIndex - 1;
  const title = text?.title?.replace("(Sem Audio)", "").trim();
  const paragraphCount = text?.content.length || 0;
  const hasTranslation = Boolean(
    text?.content.some((paragraph) => paragraph.translation?.trim()),
  );
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
          {hasTranslation && <MetaPill>Traducao disponivel</MetaPill>}
        </ReadingMeta>

        {hasTranslation && (
          <TranslationToggle
            type="button"
            onClick={() => setShowTranslation((current) => !current)}
          >
            {showTranslation ? "Ocultar traducao" : "Mostrar traducao"}
          </TranslationToggle>
        )}
      </TitleBlock>

      <ReadingCard>
        {hasAudio && (
          <AudioTimeline aria-hidden="true">
            <AudioTimelineFill $progress={audioProgress} />
          </AudioTimeline>
        )}

        {text?.content.map((paragraph, index) => (
          <ParagraphGroup key={index}>
            <Paragraph
              id={`${index}`}
              className={
                shouldUseAudioHighlight && index === audioIndex
                  ? "SelectedP"
                  : ""
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

            {showTranslation && paragraph.translation?.trim() && (
              <TranslationParagraph>
                {paragraph.translation}
              </TranslationParagraph>
            )}
          </ParagraphGroup>
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
    color: var(--accent-soft);
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  h2 {
    color: var(--text);
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
  border: 1px solid rgba(var(--primary-strong-rgb), 0.28);
  padding: 6px 11px;
  color: var(--muted);
  background: var(--control-bg);
  font-size: 0.76rem;
  font-weight: 600;
`;

const TranslationToggle = styled.button`
  min-height: 38px;
  margin-top: 14px;
  border: 1px solid rgba(var(--accent-rgb), 0.36);
  border-radius: 14px;
  padding: 9px 13px;
  color: var(--accent-soft);
  background: rgba(var(--accent-rgb), 0.1);
  font-size: 0.84rem;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    border-color: rgba(var(--accent-rgb), 0.58);
    background: rgba(var(--accent-rgb), 0.15);
  }
`;

const ReadingCard = styled.article`
  overflow: hidden;
  padding: 12px;
  border-radius: 28px;
  border: 1px solid rgba(var(--primary-strong-rgb), 0.26);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 25%),
    var(--glass-bg);
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
  background: rgba(var(--primary-strong-rgb), 0.18);
`;

const AudioTimelineFill = styled.div<{ $progress: number }>`
  width: ${(props) => Math.min(100, Math.max(0, props.$progress))}%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--accent), var(--accent-soft));
  transition: width 0.24s ease;
`;

const ParagraphGroup = styled.div`
  margin-top: 8px;

  &:first-of-type {
    margin-top: 0;
  }
`;

const Paragraph = styled.p`
  padding: 18px 16px;
  margin: 0;
  border: 1px solid transparent;
  border-radius: 18px;
  color: var(--text);
  line-height: 1.95;
  font-size: 1.05rem;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &.SelectedP {
    background: rgba(var(--primary-strong-rgb), 0.14);
    border: 1px solid rgba(var(--primary-strong-rgb), 0.28);
  }

  &.SelectedP span {
    color: var(--accent-soft);
  }

  @media (max-width: 560px) {
    padding: 14px 12px;
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

const TranslationParagraph = styled.p`
  margin: 8px 0 0;
  padding: 14px 16px;
  border-left: 3px solid rgba(var(--accent-rgb), 0.52);
  border-radius: 14px;
  color: var(--muted);
  background: rgba(var(--accent-rgb), 0.08);
  font-size: 0.98rem;
  line-height: 1.75;

  @media (max-width: 560px) {
    padding: 12px;
    font-size: 0.94rem;
    line-height: 1.65;
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
    color: var(--text);
    background-color: rgba(var(--primary-strong-rgb), 0.28);
  }
`;
