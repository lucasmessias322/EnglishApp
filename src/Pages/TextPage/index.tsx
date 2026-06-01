import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { IoIosArrowBack } from "react-icons/io";

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
  _id: string;
  question: string;
  alternatives: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
}

export default function TextPage() {
  const navigate = useNavigate();
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
  const [questions, setQuestions] = useState<Question[]>([]);
  const optionKeys = ["A", "B", "C", "D"] as const;

  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

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
      setQuestions(res[0].quizzes || []);
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
        //console.log(response[0]);
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

  function markAsCompleted() {
    if (!text._id) return;

    const completed: string[] = JSON.parse(
      localStorage.getItem("completed_texts") || "[]",
    );

    if (completed.includes(text._id)) return;

    const updated = [...completed, text._id];
    localStorage.setItem("completed_texts", JSON.stringify(updated));
    setIsCompleted(true);
  }

  
  function toggleCompleted() {
    const hasQuiz = questions.length > 0;
    const quizPassed = !hasQuiz || (submitted && score === questions.length);

    if (!quizPassed) {
      alert("Você precisa concluir o quiz e acertar todas as perguntas.");
      return;
    }

    if (isCompleted) {
      const completed: string[] = JSON.parse(
        localStorage.getItem("completed_texts") || "[]",
      );

      const updated = completed.filter((id) => id !== text._id);
      localStorage.setItem("completed_texts", JSON.stringify(updated));
      setIsCompleted(false);
    } else {
      markAsCompleted();
    }
  }

  useEffect(() => {
    const hasQuiz = questions.length > 0;

    if (hasQuiz && submitted && score === questions.length && !isCompleted) {
      markAsCompleted();
    }
  }, [submitted, score, questions.length]);

  function handleAnswer(questionId: string, option: "A" | "B" | "C" | "D") {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  }

  function handleSubmitQuestions(e: React.FormEvent) {
    e.preventDefault();

    let correct = 0;

    questions.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) {
        correct++;
      }
    });

    setScore(correct);
    setSubmitted(true);
  }
  const hasQuiz = questions.length > 0;
  const quizPassed = hasQuiz && submitted && score === questions.length;
  const canMarkAsCompleted =
    !hasQuiz || (submitted && score === questions.length);
  const allQuestionsAnswered =
    questions.length > 0 && questions.every((q) => answers[q._id]);
  const textHasAudio = text.content.some((paragraph) =>
    Boolean(paragraph.audiotexturl?.trim()),
  );

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
          <Header>
            <HeaderBTNsContainer>
              <BackBtn
                className="backbtn"
                onClick={() => navigate("/textslist")}
              >
                <IoIosArrowBack size={25} />
              </BackBtn>
              {textHasAudio && (
                <div
                  id="PlayPauseButton"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <FaPause size={20} title="Pausar reproduçao" />
                  ) : (
                    <FaPlay size={20} title="Iniciar reproduçao" />
                  )}
                </div>
              )}
            </HeaderBTNsContainer>
          </Header>
          <TextWrapperComponent
            hasAudio={textHasAudio}
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

          {questions.length > 0 && (
            <QuestionForm onSubmit={handleSubmitQuestions}>
              <h2>Perguntas de Compreensão</h2>

              {questions.map((q) => (
                <div key={q._id}>
                  <legend>{q.question}</legend>

                  {optionKeys.map((key) => (
                    <label key={key}>
                      <input
                        type="radio"
                        name={`question-${q._id}`}
                        checked={answers[q._id] === key}
                        onChange={() => handleAnswer(q._id, key)}
                        value={key}
                        disabled={quizPassed}
                      />
                      <span className="custom-radio" />
                      <span className="option-text">{q.alternatives[key]}</span>
                    </label>
                  ))}
                </div>
              ))}

              <button
                type="submit"
                disabled={quizPassed || !allQuestionsAnswered}
              >
                {submitted ? "Reenviar respostas" : "Enviar respostas"}
              </button>
              {!allQuestionsAnswered && !submitted && (
                <Result style={{ color: "orange" }}>
                  ⚠️ Responda todas as perguntas para enviar o quiz.
                </Result>
              )}

              {submitted && (
                <Result style={{ color: quizPassed ? "green" : "red" }}>
                  {quizPassed
                    ? `🎉 Você acertou ${score} de ${questions.length}. Texto concluído!`
                    : `❌ Você acertou ${score} de ${questions.length}. Corrija para continuar.`}
                </Result>
              )}
            </QuestionForm>
          )}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px);
  margin-top: 60px;
  padding-bottom: 48px;
`;

const Result = styled.div`
  margin: 15px;

  font-weight: bold;
`;
const QuestionForm = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0px 10px;

  div {
    border: 1px solid #2f334b;
    padding: 15px;
    border-radius: 8px;
  }

  legend {
    font-weight: normal;
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

const BackBtn = styled.div`
  cursor: pointer;
`;

const HeaderBTNsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  padding: 20px;
 // background-color: #161616;
  z-index: 999999;
`;
