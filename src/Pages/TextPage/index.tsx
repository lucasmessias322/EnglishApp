import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  getSingleText,
  engleshPlusBaseApi,
  engleshPlusBaseApiLocal,
  PutMemorize,
  getUserMemorizes,
} from "../../Apis/englishplusApi";
import HeaderComponent from "../../Components/HeaderComponent";
import { FaPlay, FaPause } from "react-icons/fa";

import WordPopUpComponent from "../../Components/TextPageComponents/WordPopUp";
import TextWrapperComponent from "../../Components/TextPageComponents/TextWrapperComponent";
import { AuthContext } from "../../Context/AuthContext";

interface Text {
  title: string;
  content: { paragraph: string; audiotexturl: string }[];
}

interface translatedWordtype {
  backContent: string;
  frontContent: string;
}
interface MemoTextAndNews {
  flashcards: any[]; // You may define a proper interface for flashcards if needed
}
const API_BASE_URL = `${engleshPlusBaseApi}/ftp`;

export default function TextPage() {
  const [text, setText] = useState<Text>({
    title: "",
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
  const { id: textid } = useParams<{ id: string }>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const dataTextoAudio = text.content;

  const { token, userId } = useContext(AuthContext);

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
    getSingleText(textid)
      .then((res) => setText(res[0]))
      .catch((error) => console.error("Error fetching text:", error));
  }, [textid]);

  const handleClickWord = (word: string) => {
    // handleTextToSpeech(word);
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

  const handleTextToSpeech = (word: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en";
      speechSynthesis.speak(utterance);
    } else {
      console.error("Text-to-speech is not supported in this browser.");
    }
  };

  useEffect(() => {
    getUserMemorizes(userId, token).then((response) => {
      setmemoTextAndNews(response[0]);
      // console.log("SingleMemorizes", response[0]);
    });
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
        // console.log(response);
        // console.log("Novo FlashCard Adicionado", response);
        setAddflashcardverificationtoggle((e) => !e);
        setmemoTextAndNews(response.MemoList);
      });
    } else {
      console.log("Login necessario");
    }
  }

  return (
    <Container>
      {selectedWord && (
        <WordPopUpComponent
          handleTextToSpeech={handleTextToSpeech}
          translatedWord={translatedWord}
          setSelectedWord={setSelectedWord}
          AddFlashCard={AddFlashCard}
          memoTextAndNews={memoTextAndNews}
          Addflashcardverificationtoggle={Addflashcardverificationtoggle}
          token={token}
        />
      )}

      <HeaderComponent textPage fixed>
        <div id="PlayPauseButton" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? (
            <FaPause size={16} title="Pausar reproduçao" />
          ) : (
            <FaPlay size={16} title="Iniciar reproduçao" />
          )}
        </div>
      </HeaderComponent>

      <TextWrapperComponent
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
          text ? `${API_BASE_URL}/${text.content[audioIndex].audiotexturl}` : ""
        }
      />
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 60px;
`;
