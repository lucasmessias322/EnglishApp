import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  PutMemorize,
  getUserMemorizes,
  getSingleText,
} from "../../Apis/englishplusApi";
import { FaCheck, FaPause, FaPlay } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import WordPopUpComponent from "../../Components/TextPageComponents/WordPopUp";
import TextWrapperComponent from "../../Components/TextPageComponents/TextWrapperComponent";
import { AuthContext } from "../../Context/AuthContext";

import handleTextToSpeech from "../../utils/TextToSpeech";
import LoadingComp from "../../Components/LoadingComp";
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
  const [memoTextAndNews, setmemoTextAndNews] = useState<MemoTextAndNews>({
    flashcards: [],
  });
  const [Addflashcardverificationtoggle, setAddflashcardverificationtoggle] =
    useState<boolean>(false);
  const { id: textid, textindex } = useParams<{
    id: string;
    textindex: string;
  }>();
  const currentTextIndex = textindex;
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
  }, [currentTextIndex]);

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
        setmemoTextAndNews(response?.[0] || { flashcards: [] });
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
  const answeredCount = questions.filter((q) => answers[q._id]).length;
  const quizProgress =
    questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;
  const textHasAudio = text.content.some((paragraph) =>
    Boolean(paragraph.audiotexturl?.trim()),
  );
  const cleanTitle = text.title.replace("(Sem Audio)", "").trim();

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
                type="button"
                className="backbtn"
                onClick={() => navigate("/textslist")}
                title="Voltar para textos"
              >
                <IoIosArrowBack size={25} />
              </BackBtn>
              <HeaderTitle>
                <span>Texto</span>
                <strong>{cleanTitle}</strong>
              </HeaderTitle>
              {textHasAudio && (
                <AudioButton
                  type="button"
                  id="PlayPauseButton"
                  onClick={() => setIsPlaying(!isPlaying)}
                  title={isPlaying ? "Pausar reprodução" : "Iniciar reprodução"}
                >
                  {isPlaying ? (
                    <FaPause size={16} />
                  ) : (
                    <FaPlay size={16} />
                  )}
                </AudioButton>
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
              <QuizHeader>
                <QuizEyebrow>Quiz</QuizEyebrow>
                <h2>Perguntas de compreensão</h2>
                <QuizProgressRow>
                  <span>
                    {answeredCount}/{questions.length} respondidas
                  </span>
                  <QuizProgressTrack aria-hidden="true">
                    <QuizProgressFill $progress={quizProgress} />
                  </QuizProgressTrack>
                </QuizProgressRow>
              </QuizHeader>

              {questions.map((q, questionIndex) => (
                <QuestionCard key={q._id}>
                  <QuestionNumber>Questão {questionIndex + 1}</QuestionNumber>
                  <legend>{q.question}</legend>

                  <OptionsList>
                    {optionKeys.map((key) => (
                      <OptionLabel
                        key={key}
                        $selected={answers[q._id] === key}
                        $correct={submitted && key === q.correctAnswer}
                        $wrong={
                          submitted &&
                          answers[q._id] === key &&
                          key !== q.correctAnswer
                        }
                        $disabled={quizPassed}
                      >
                        <input
                          type="radio"
                          name={`question-${q._id}`}
                          checked={answers[q._id] === key}
                          onChange={() => handleAnswer(q._id, key)}
                          value={key}
                          disabled={quizPassed}
                        />
                        <OptionMarker>{key}</OptionMarker>
                        <span className="option-text">
                          {q.alternatives[key]}
                        </span>
                        <OptionStatus>
                          {submitted && key === q.correctAnswer && <FaCheck />}
                          {submitted &&
                            answers[q._id] === key &&
                            key !== q.correctAnswer && <IoClose />}
                        </OptionStatus>
                      </OptionLabel>
                    ))}
                  </OptionsList>
                </QuestionCard>
              ))}

              <QuizButton
                type="submit"
                disabled={quizPassed || !allQuestionsAnswered}
              >
                {quizPassed
                  ? "Quiz concluído"
                  : submitted
                    ? "Atualizar respostas"
                    : "Enviar respostas"}
              </QuizButton>
              {!allQuestionsAnswered && !submitted && (
                <Result $status="info">
                  Responda todas as perguntas para enviar o quiz.
                </Result>
              )}

              {submitted && (
                <Result $status={quizPassed ? "success" : "error"}>
                  {quizPassed
                    ? `Você acertou ${score} de ${questions.length}. Texto concluído.`
                    : `Você acertou ${score} de ${questions.length}. Corrija para continuar.`}
                </Result>
              )}
            </QuestionForm>
          )}

          <CompletionDock>
            <CompletionButton
              type="button"
              onClick={toggleCompleted}
              disabled={!canMarkAsCompleted}
              $completed={isCompleted}
            >
              <FaCheck />
              <span>
                {isCompleted
                  ? "Texto concluído"
                  : hasQuiz
                    ? "Concluir após o quiz"
                    : "Marcar como concluído"}
              </span>
            </CompletionButton>
          </CompletionDock>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px);
  padding-top: 76px;
  padding-bottom: 24px;
`;

const Result = styled.div<{ $status: "info" | "success" | "error" }>`
  border: 1px solid
    ${(props) =>
      props.$status === "success"
        ? "rgba(41, 170, 139, 0.36)"
        : props.$status === "error"
          ? "rgba(243, 91, 91, 0.36)"
          : "rgba(243, 129, 47, 0.36)"};
  border-radius: 16px;
  padding: 13px 14px;
  color: ${(props) =>
    props.$status === "success"
      ? "#8fe5d0"
      : props.$status === "error"
        ? "#ffb4b4"
        : "#ffc878"};
  background: ${(props) =>
    props.$status === "success"
      ? "rgba(41, 170, 139, 0.1)"
      : props.$status === "error"
        ? "rgba(243, 91, 91, 0.1)"
        : "rgba(243, 129, 47, 0.1)"};
  font-size: 0.92rem;
  font-weight: 700;
`;

const QuestionForm = styled.form`
  width: 100%;
  max-width: 680px;
  margin: 24px auto 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0 14px;

  @media (max-width: 560px) {
    margin-top: 18px;
    padding: 0 10px;
  }
`;

const QuizHeader = styled.div`
  padding: 18px;
  border: 1px solid rgba(76, 85, 125, 0.42);
  border-radius: 24px;
  background:
    linear-gradient(145deg, rgba(73, 104, 236, 0.14), transparent 42%),
    rgba(24, 27, 40, 0.9);

  h2 {
    margin-top: 4px;
    font-size: 1.3rem;
    line-height: 1.25;
    letter-spacing: 0;
  }
`;

const QuizEyebrow = styled.span`
  color: #8fe5d0;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
`;

const QuizProgressRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
  color: #aeb8d8;
  font-size: 0.82rem;
  font-weight: 700;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const QuizProgressTrack = styled.div`
  height: 7px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(76, 85, 125, 0.34);
`;

const QuizProgressFill = styled.div<{ $progress: number }>`
  width: ${(props) => Math.min(100, Math.max(0, props.$progress))}%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #4968ec, #8fe5d0);
  transition: width 0.2s ease;
`;

const QuestionCard = styled.fieldset`
  min-width: 0;
  border: 1px solid rgba(76, 85, 125, 0.42);
  border-radius: 24px;
  padding: 16px;
  background: rgba(24, 27, 40, 0.88);

  legend {
    width: 100%;
    padding: 0;
    color: #f5f7ff;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.45;
  }

  @media (max-width: 420px) {
    padding: 14px;
    border-radius: 20px;
  }
`;

const QuestionNumber = styled.span`
  display: inline-flex;
  margin-bottom: 8px;
  color: #8fe5d0;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
`;

const OptionsList = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 14px;
`;

const OptionLabel = styled.label<{
  $selected: boolean;
  $correct: boolean;
  $wrong: boolean;
  $disabled: boolean;
}>`
  min-height: 54px;
  display: grid;
  grid-template-columns: 34px 1fr 24px;
  align-items: center;
  gap: 10px;
  position: relative;
  border: 1px solid
    ${(props) =>
      props.$correct
        ? "rgba(41, 170, 139, 0.58)"
        : props.$wrong
          ? "rgba(243, 91, 91, 0.58)"
          : props.$selected
            ? "rgba(110, 136, 204, 0.72)"
            : "rgba(76, 85, 125, 0.34)"};
  border-radius: 18px;
  padding: 10px;
  color: #dce2fb;
  background: ${(props) =>
    props.$correct
      ? "rgba(41, 170, 139, 0.12)"
      : props.$wrong
        ? "rgba(243, 91, 91, 0.12)"
        : props.$selected
          ? "rgba(73, 104, 236, 0.16)"
          : "rgba(33, 36, 51, 0.68)"};
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.$disabled && !props.$selected ? 0.72 : 1)};
  transition:
    border-color 0.18s ease,
    background-color 0.18s ease,
    transform 0.18s ease;

  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .option-text {
    min-width: 0;
    color: inherit;
    font-size: 0.92rem;
    font-weight: 600;
    line-height: 1.35;
    user-select: none;
    overflow-wrap: anywhere;
  }

  &:hover {
    transform: ${(props) => (props.$disabled ? "none" : "translateY(-1px)")};
    border-color: ${(props) =>
      props.$correct || props.$wrong
        ? undefined
        : "rgba(143, 229, 208, 0.5)"};
  }
`;

const OptionMarker = styled.span`
  width: 34px;
  height: 34px;
  border-radius: 13px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #eef1ff;
  background: rgba(15, 18, 28, 0.56);
  font-size: 0.82rem;
  font-weight: 800;
`;

const OptionStatus = styled.span`
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
`;

const QuizButton = styled.button`
  min-height: 52px;
  border: none;
  border-radius: 18px;
  padding: 13px 16px;
  color: #07121b;
  background: linear-gradient(135deg, #29aa8b, #8fe5d0);
  box-shadow: 0 16px 30px rgba(41, 170, 139, 0.18);
  font-size: 0.98rem;
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    color: #aab2c9;
    background: rgba(76, 85, 125, 0.28);
    box-shadow: none;
    cursor: not-allowed;
  }
`;

const BackBtn = styled.button`
  width: 44px;
  height: 44px;
  border: 1px solid rgba(76, 85, 125, 0.45);
  border-radius: 16px;
  background: rgba(24, 27, 40, 0.86);
  color: #f5f7ff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const HeaderBTNsContainer = styled.div`
  max-width: 680px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  padding: calc(env(safe-area-inset-top) + 10px) 14px 10px;
  border-bottom: 1px solid rgba(76, 85, 125, 0.24);

  backdrop-filter: blur(14px);
  z-index: 999999;
`;

const HeaderTitle = styled.div`
  min-width: 0;

  span {
    display: block;
    color: #8fe5d0;
    font-size: 0.68rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  strong {
    display: block;
    margin-top: 2px;
    color: #f5f7ff;
    font-size: 0.96rem;
    line-height: 1.15;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const AudioButton = styled.button`
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 16px;
  color: #07121b;
  background: linear-gradient(135deg, #29aa8b, #8fe5d0);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 14px 28px rgba(41, 170, 139, 0.18);
`;

const CompletionDock = styled.div`
  position: sticky;
  bottom: 12px;
  width: 100%;
  max-width: 680px;
  margin: 16px auto 0;
  padding: 0 14px;
  z-index: 20;

  @media (max-width: 560px) {
    padding: 0 10px;
  }
`;

const CompletionButton = styled.button<{ $completed: boolean }>`
  width: 100%;
  min-height: 54px;
  border: 1px solid
    ${(props) =>
      props.$completed
        ? "rgba(41, 170, 139, 0.42)"
        : "rgba(76, 85, 125, 0.45)"};
  border-radius: 19px;
  color: ${(props) => (props.$completed ? "#8fe5d0" : "#f5f7ff")};
  background: ${(props) =>
    props.$completed
      ? "rgba(14, 59, 68, 0.92)"
      : "rgba(33, 36, 51, 0.94)"};
  backdrop-filter: blur(12px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 18px 38px rgba(7, 10, 20, 0.28);
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    color: #8993b3;
    cursor: not-allowed;
    opacity: 0.82;
  }
`;
