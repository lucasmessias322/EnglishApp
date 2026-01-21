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
interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
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
  const [questions] = useState<Question[]>([
    {
      id: 1,
      question: "Why did the narrator wake up early on Saturday?",
      options: [
        "Because he had to work",
        "Because he was excited about the weekend adventure",
        "Because he could not sleep",
        "Because he was traveling alone",
      ],
      correctIndex: 1,
    },
    {
      id: 2,
      question: "Where did the family go hiking?",
      options: [
        "At the beach",
        "In a park",
        "In the nearby mountains",
        "In the city",
      ],
      correctIndex: 2,
    },
  ]);

  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

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
      console.log(res[0]);
      
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
        word,
      )}`,
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
        console.log(response[0]);
        
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
      localStorage.getItem("completed_texts") || "[]",
    );

    setIsCompleted(completed.includes(text._id));
  }, [text._id]);

  function toggleCompleted() {
    if (!text._id) return;

    const completed: string[] = JSON.parse(
      localStorage.getItem("completed_texts") || "[]",
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
  function handleAnswer(questionId: number, optionIndex: number) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  }

  function handleSubmitQuestions(e: React.FormEvent) {
    e.preventDefault();

    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        correct++;
      }
    });

    setScore(correct);
    setSubmitted(true);
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
               memoTextAndNews={memoTextAndNews}
              Addflashcardverificationtoggle={Addflashcardverificationtoggle}
              token={token}
            />
          )}
          <HeaderComponent
            textPage
            bgcolor="#1C1F2D"
            fixed
            backbtn="/textslist"
          >
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

          <QuestionForm onSubmit={handleSubmitQuestions}>
            <h2>Perguntas de Compreensão</h2>

            {questions.map((q) => (
              <fieldset key={q.id}>
                <legend>{q.question}</legend>

                {q.options.map((opt, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={index}
                      disabled={submitted}
                      checked={answers[q.id] === index}
                      onChange={() => handleAnswer(q.id, index)}
                    />
                    <span className="custom-radio" />
                    <span className="option-text">{opt}</span>
                  </label>
                ))}
              </fieldset>
            ))}

            {!submitted ? (
              <button type="submit">Enviar respostas</button>
            ) : (
              <Result>
                Você acertou {score} de {questions.length} perguntas.
              </Result>
            )}
          </QuestionForm>

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

const Result = styled.div`
  margin-top: 15px;
  font-weight: bold;
`;
const QuestionForm = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;

  fieldset {
    border: 1px solid #444;
    padding: 15px;
    border-radius: 8px;
  }

  legend {
    font-weight: bold;
    margin-bottom: 10px;
  }

  label {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    margin-bottom: 10px;
    position: relative;

    input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }

    .custom-radio {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid #6c73ff;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .custom-radio::before {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #6c73ff;
      transform: scale(0);
      transition: transform 0.2s ease;
    }

    input:checked + .custom-radio::before {
      transform: scale(1);
    }

    input:checked + .custom-radio {
      border-color: #6c73ff;
    }

    input:disabled + .custom-radio {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .option-text {
      user-select: none;
    }

    &:hover .custom-radio {
      border-color: #9aa0ff;
    }
  }

  button {
    padding: 10px;
    font-weight: bold;
    cursor: pointer;
  }
`;
