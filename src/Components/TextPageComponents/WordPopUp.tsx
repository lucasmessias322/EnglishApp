import styled from "styled-components";
import { FaRegBookmark, FaVolumeHigh } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { FaBookmark } from "react-icons/fa";

interface TranslatedWord {
  frontContent: string;
  backContent: string;
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

interface MemoTextAndNews {
  flashcards: any[]; // You may define a proper interface for flashcards if needed
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

  const [WordAreadiExist, setWordAreadiExist] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setSelectedWord(""); // Limpa a palavra selecionada
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (token) {
      // console.log(memoTextAndNews.flashcards);
      if (memoTextAndNews.flashcards.length > 0) {
        memoTextAndNews?.flashcards?.map((elem) => {
          // console.log("elem", elem);
          if (elem != null) {
            if (elem.frontContent === translatedWord?.frontContent) {
              // console.log("Ja existe");
              setWordAreadiExist(true);
            }
          }
        });
      }
    }
  }, [Addflashcardverificationtoggle]);

  return (
    <Container>
      <WordPopUp ref={popupRef} token={token}>
        <div>
          <FaVolumeHigh
            onClick={() => handleTextToSpeech(translatedWord?.frontContent)}
          />
          <h4>{translatedWord?.frontContent}</h4>

          {WordAreadiExist ? (
            <FaBookmark
              title="Essa palavra ja existe na lista de Memorizaçao"
              className="ico"
            />
          ) : (
            <FaRegBookmark
              title={
                token
                  ? "Adicionar a lista de Memorizaçao"
                  : "Faça login para salvar card"
              }
              className="ico"
              onClick={() => {token && AddFlashCard()}}
            
            />
          )}
        </div>

        <span>Traduçao: {translatedWord?.backContent}</span>
      </WordPopUp>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;

  background: #1a19198d;
  z-index: 9999;
  position: fixed;
  top: 0;

  /* padding: 20px 0px; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WordPopUp = styled.div<WordPopUpTypes>`
  /* width: 90%; */
  margin: auto;
  border: 5px solid #222635;
  max-width: 250px;
  border-radius: 10px;
  padding: 15px;
  background-color: #1c1f2d;
  display: flex;
  box-shadow: 5px 5px 10px #11131b;

  flex-direction: column;

  div {
    display: flex;
    padding: 5px 0px;
    margin-bottom: 10px;
    border-bottom: 1px solid gray;
    align-items: center;
    justify-content: space-around;

    .ico {
      color: ${(props) => (props.token ? "white" : "gray")};
      font-size: 16px;
    }

    h4 {
      margin: 0px 10px;
      text-align: center;
    }
  }
`;

/*

Eu tenho o memoTextAndNews cujo conteudo é assim

*/
