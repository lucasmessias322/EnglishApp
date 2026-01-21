import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  PutMemorize,
  getUserMemorizes,
  getTexts,
  getSingleText,
} from "../../Apis/englishplusApi";
import HeaderComponent from "../../Components/HeaderComponent";
import { FaPlay, FaPause } from "react-icons/fa";

import WordPopUpComponent from "../../Components/TextPageComponents/WordPopUp";
import TextWrapperComponent from "../../Components/TextPageComponents/TextWrapperComponent";
import { AuthContext } from "../../Context/AuthContext";

import handleTextToSpeech from "../../utils/TextToSpeech";
import LoadingComp from "../../Components/LoadingComp";
import { MarkAsCompletedButton } from "./styles";

interface Text {
  _id: string;
  title: string;
  hasAudios: boolean;
  content: { paragraph: string; audiotexturl: string }[];
}

interface translatedWordtype {
  backContent: string;
  frontContent: string;
}
interface MemoTextAndNews {
  flashcards: any[]; // You may define a proper interface for flashcards if needed
}

export default function TextPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState<Text>({
    _id: "",
    title: "",
    hasAudios: false,
    content: [{ paragraph: "", audiotexturl: "" }],
  });

  const [audioIndex, setAudioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [translatedWord, setTranslatedWord] = useState<translatedWordtype>({
    backContent: "Carregando..",
    frontContent: "",
  });
  const [newflashCard, setNewsFlashCard] = useState({});
  const [memoTextAndNews, setmemoTextAndNews] = useState<MemoTextAndNews[]>([
    { flashcards: [] },
  ]);
  const [Addflashcardverificationtoggle, setAddflashcardverificationtoggle] =
    useState<boolean>(false);
  const { id: textid, textindex } = useParams<{
    id: string;
    textindex: string;
  }>();
  const [currentTextIndex, setCurrentIndex] = useState(textindex);
  const audioRef = useRef<HTMLAudioElement>(null);
  const dataTextoAudio = text.content;

  const { token, userId } = useContext(AuthContext);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (text) {
      if (audioIndex === text.content.length) {
        setAudioIndex(0);

        setIsPlaying(false);
      } else {
        if (isPlaying) {
          audioRef.current?.play();
        } else {
          audioRef.current?.pause();
        }
      }
    }
  }, [audioIndex]);

  useEffect(() => {
    setIsLoading(true);
    getSingleText(currentTextIndex).then((res) => {
      setText(res[0]);
      setIsLoading(false);
    });
  }, []);

  const handleClickWord = (word: string) => {
    fetchTranslation(word)
      .then((translation: any) => {
        setTranslatedWord(translation);
        setSelectedWord(word);
        // console.log(translation);
      })
      .catch((error) => console.error("Error translating word:", error));
  };

  const fetchTranslation = async (word: string): Promise<object> => {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(
        word
      )}`
    );
    const data = await response.json();
    const ptClean = data[0][0][0].replace(",", "").replace(".", "");
    const engClean = data[0][0][1].replace(",", "").replace(".", "");
    const translation = { backContent: ptClean, frontContent: engClean };
    return translation;
  };

  useEffect(() => {
    if (userId && token) {
      getUserMemorizes(userId, token).then((response) => {
        setmemoTextAndNews(response[0]);
      });
    }
  }, []);

  useEffect(() => {
    setNewsFlashCard({
      frontContent: translatedWord.frontContent,
      backContent: translatedWord.backContent,
    });
  }, [translatedWord]);

  function AddFlashCard() {
    if (token) {
      const data = {
        flashcards: [...memoTextAndNews.flashcards, newflashCard],
      };

      PutMemorize(userId, JSON.stringify(data), token).then((response) => {
        setAddflashcardverificationtoggle((e) => !e);
        setmemoTextAndNews(response.MemoList);
      });
    } else {
      console.log("Login necessario");
    }
  }
  useEffect(() => {
    if (!text._id) return;

    const completed = JSON.parse(
      localStorage.getItem("completed_texts") || "[]"
    );

    setIsCompleted(completed.includes(text._id));
  }, [text._id]);

  function toggleCompleted() {
    if (!text._id) return;

    const completed: string[] = JSON.parse(
      localStorage.getItem("completed_texts") || "[]"
    );

    let updated: string[];

    if (completed.includes(text._id)) {
      updated = completed.filter((id) => id !== text._id);
      setIsCompleted(false);
    } else {
      updated = [...completed, text._id];
      setIsCompleted(true);
    }

    localStorage.setItem("completed_texts", JSON.stringify(updated));
  }

  return (
    <Container>
      {isLoading ? (
        <LoadingComp />
      ) : (
        <>
          {selectedWord && (
            <WordPopUpComponent
              handleTextToSpeech={handleTextToSpeech}
              translatedWord={translatedWord}
              setSelectedWord={setSelectedWord}
              AddFlashCard={AddFlashCard}
              // memoTextAndNews={memoTextAndNews}
              Addflashcardverificationtoggle={Addflashcardverificationtoggle}
              token={token}
            />
          )}
          <HeaderComponent textPage bgcolor="#1C1F2D" fixed backbtn="/textslist">
            {text.content[0].audiotexturl && (
              <div
                id="PlayPauseButton"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <FaPause size={16} title="Pausar reproduçao" />
                ) : (
                  <FaPlay size={16} title="Iniciar reproduçao" />
                )}
              </div>
            )}
          </HeaderComponent>
          <TextWrapperComponent
            hasAudio={text.content[0].audiotexturl !== ""}
            audioIndex={audioIndex}
            dataTextoAudio={dataTextoAudio}
            handleTextToSpeech={handleTextToSpeech}
            handleClickWord={handleClickWord}
            text={text}
          />
          <audio
            id="audio"
            ref={audioRef}
            onEnded={() =>
              setAudioIndex((audioIndex) => {
                if (audioIndex >= text.content.length - 1) {
                  setIsPlaying(false);
                  return 0;
                } else {
                  return audioIndex + 1;
                }
              })
            }
            src={
              text.content[audioIndex]?.audiotexturl
                ? `data:audio/mpeg;base64,${text.content[audioIndex].audiotexturl}`
                : ""
            }
          />

          <MarkAsCompletedButton onClick={toggleCompleted}>
            <h2>{isCompleted ? "Concluído" : "Marcar como completo"}</h2>
          </MarkAsCompletedButton>
        </>
      )}
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 60px;
`;

const TextsControll = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .btn {
    padding: 10px;
    background-color: #25293b;
    border-radius: 5px;
    margin: 0px 5px;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
`;
