import styled from "styled-components";
import { FaRegBookmark, FaVolumeHigh } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { FaBookmark } from "react-icons/fa";

interface TranslatedWord {
  frontContent: string;
  backContent: string;
}

interface MemoFlashcard {
  frontContent: string;
  backContent: string;
}

interface MemoTextAndNews {
  flashcards: MemoFlashcard[];
}

interface WordPopUpTypes {
  translatedWord?: TranslatedWord;
  handleTextToSpeech?: (word: string) => void;
  setSelectedWord?: (word: string) => void;
  AddFlashCard?: () => void;
  memoTextAndNews?: MemoTextAndNews;
  Addflashcardverificationtoggle?: boolean;
  token?: string;
}

export default function WordPopUpComponent({
  translatedWord,
  handleTextToSpeech,
  setSelectedWord,
  AddFlashCard,
  memoTextAndNews,
  Addflashcardverificationtoggle,
  token,
}: WordPopUpTypes) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [wordAlreadyExists, setWordAlreadyExists] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setSelectedWord?.("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setSelectedWord]);

  useEffect(() => {
    const alreadySaved =
      memoTextAndNews?.flashcards?.some(
        (elem) => elem?.frontContent === translatedWord?.frontContent,
      ) || false;

    setWordAlreadyExists(alreadySaved);
  }, [memoTextAndNews, translatedWord, Addflashcardverificationtoggle]);

  return (
    <Container>
      <WordPopUp ref={popupRef} token={token}>
        <TopArea>
          <ActionIcon
            type="button"
            onClick={() => handleTextToSpeech?.(translatedWord?.frontContent || "")}
          >
            <FaVolumeHigh />
          </ActionIcon>

          <WordInfo>
            <span>Word selected</span>
            <h4>{translatedWord?.frontContent}</h4>
          </WordInfo>

          {wordAlreadyExists ? (
            <BookmarkState
              title="Essa palavra ja esta salva na lista de memorizacao."
            >
              <FaBookmark />
            </BookmarkState>
          ) : (
            <ActionIcon
              type="button"
              title={
                token
                  ? "Adicionar a lista de memorizacao"
                  : "Faca login para salvar este card"
              }
              disabled={!token}
              onClick={() => {
                if (token) {
                  AddFlashCard?.();
                }
              }}
            >
              <FaRegBookmark />
            </ActionIcon>
          )}
        </TopArea>

        <TranslationCard>
          <span>Traducao</span>
          <strong>{translatedWord?.backContent}</strong>
        </TranslationCard>
      </WordPopUp>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background: rgba(10, 12, 20, 0.72);
  backdrop-filter: blur(10px);
`;

const WordPopUp = styled.div<{ token?: string }>`
  width: 100%;
  max-width: 380px;
  border-radius: 28px;
  padding: 22px;
  border: 1px solid rgba(var(--primary-strong-rgb), 0.26);
  background:
    linear-gradient(145deg, rgba(var(--primary-strong-rgb), 0.14), transparent 38%),
    var(--glass-bg-strong);
  box-shadow: 0 28px 60px rgba(7, 10, 20, 0.34);
`;

const TopArea = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 14px;
`;

const ActionIcon = styled.button`
  width: 46px;
  height: 46px;
  border-radius: 16px;
  border: 1px solid rgba(var(--primary-strong-rgb), 0.28);
  background: var(--control-bg);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const WordInfo = styled.div`
  span {
    display: block;
    color: var(--accent-soft);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  h4 {
    margin-top: 4px;
    font-size: 1.4rem;
    line-height: 1.2;
  }
`;

const BookmarkState = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 16px;
  border: 1px solid rgba(var(--accent-rgb), 0.32);
  background: rgba(var(--accent-rgb), 0.12);
  color: var(--accent-soft);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TranslationCard = styled.div`
  margin-top: 18px;
  padding: 18px;
  border-radius: 22px;
  border: 1px solid rgba(var(--primary-strong-rgb), 0.26);
  background: var(--control-bg);

  span {
    display: block;
    margin-bottom: 8px;
    color: var(--accent-soft);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  strong {
    font-size: 1.2rem;
    color: var(--text);
  }
`;
