import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { getOneEspecific } from "../../Apis/englishplusApi";
import { AuthContext } from "../../Context/AuthContext";
import { FaBook, FaWindowClose } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";

import handleTextToSpeech from "../../utils/TextToSpeech";

interface MemoType {
  _id: string;
  title: string;
  flashcards: { frontContent: string; backContent: string }[];
}

export default function LearnPage() {
  const { memoid } = useParams();
  const [memo, setMemo] = useState<MemoType | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [answerOptions, setAnswerOptions] = useState<string[] | null>([]);
  const [reviewedWords, setReviewedWords] = useState([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(
    null
  );
  const [correctAnswers, setCorrectAnswers] = useState<number>(0); // Contador de respostas corretas
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0); // Contador de respostas incorretas
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const [roundFinished, setRoundFinished] = useState<boolean>(false);
  const [RoundProgress, setRoundProgress] = useState<number>(0);
  const [finishedAllRounds, setFinishedAllRounds] = useState<boolean>(false);

  const { token } = useContext(AuthContext);
  // const cardsPerRound = 10;

  const [cardsPerRound, setCardsPerRound] = useState<number>(10);

  useEffect(() => {
    getOneEspecific(memoid, token).then((res) => {
      setMemo(res[0]);
    });
  }, []);

  useEffect(() => {
    // Verifica se há uma memória disponível
    if (memo) {
      // Filtra as cartas de memória para excluir a carta atual
      const otherFlashcards = memo.flashcards.filter(
        (_, index) => index !== currentCardIndex
      );

      // Embaralha e seleciona as três cartas restantes para as opções de resposta
      const shuffledFlashcards = shuffleArray(otherFlashcards).slice(0, 3);
      // Extrai o conteúdo de trás de cada carta embaralhada
      const allOptions = shuffledFlashcards.map(
        (flashcard) => flashcard.backContent
      );
      // Adiciona o conteúdo de trás da carta atual às opções de resposta
      allOptions.push(memo.flashcards[currentCardIndex].backContent);
      // Embaralha novamente todas as opções de resposta
      const shuffledOptions = shuffleArray(allOptions);
      // Define as opções de resposta no estado
      setAnswerOptions(shuffledOptions);
    }
  }, [memo, currentCardIndex]);

  const playSound = (soundPath: string) => {
    const audio = new Audio(soundPath);
    audio.play();
  };

  const handleOptionClick = (index: number) => {
    if (isCorrect !== null) {
      return; // Do nothing if answer has already been selected
    }

    setSelectedOption(index);
    const correctOptionIndex =
      memo!.flashcards[currentCardIndex].backContent === answerOptions[index]
        ? index
        : null;
    if (correctOptionIndex !== null) {
      setIsCorrect(true);
      setCorrectAnswers((prevCount) => prevCount + 1); // Incrementa o contador de respostas corretas
      playSound("/soundEffects/rightanswer.mp3"); // Reproduz o som de acerto
    } else {
      setIsCorrect(false);
      setCorrectAnswerIndex(
        answerOptions.findIndex(
          (option) => option === memo!.flashcards[currentCardIndex].backContent
        )
      );
      setIncorrectAnswers((prevCount) => prevCount + 1); // Incrementa o contador de respostas incorretas
      playSound("/soundEffects/error.wav"); // Reproduz o som de erro
    }
    setShowNextButton(true);
  };

  const handleNextCard = () => {
    if (isCorrect === null) {
      return; // Do nothing if answer has not been selected yet
    }

    // Se a rodada terminou, adicionamos as palavras revisadas ao array
    const currentWord = memo.flashcards[currentCardIndex];
    setReviewedWords([...reviewedWords, currentWord]);

    setRoundProgress(RoundProgress + 1);
    console.log(RoundProgress);

    if (RoundProgress + 1 >= cardsPerRound) {
      //Finalizaçao de um round
      setRoundFinished(true);
      console.log("RoundFinished");
      setRoundProgress(0);
    }

    if (currentCardIndex + 1 >= memo.flashcards.length) {
      //Terminou todas as rodadas!
      setRoundFinished(false);
      setFinishedAllRounds(true);
      setCurrentRound(0);
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
    }

    setSelectedOption(null);
    setIsCorrect(null);
    setCorrectAnswerIndex(null);
    setShowNextButton(false);
  };

  const handleNextRound = () => {
    setCurrentRound(currentRound + 1);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setReviewedWords([]);
    setRoundFinished(false);
  };

  return (
    <Container>
      <Header>
        <h2 className="learn">
          <FaBook className="icon" /> Aprender
        </h2>
        <h2>{currentRound > 0 ? `Rodada ${currentRound}` : "Finalizado"}</h2>
        <Link to={`/memolist/${memoid}`}>
          <FaWindowClose color="#29aa8b" size={30} />
        </Link>
      </Header>
      <SectionWrapper>
        {!roundFinished && !finishedAllRounds && (
          <>
            <FrontContent>
              <HiSpeakerWave
                color="white"
                className="HiSpeakerWave"
                size={25}
                onClick={() =>
                  handleTextToSpeech(
                    memo?.flashcards[currentCardIndex].frontContent
                  )
                }
              />

              <h4>{memo?.flashcards[currentCardIndex].frontContent}</h4>
            </FrontContent>
            <AnswerOptionsContainer>
              <span>Selecione a palavra correspondente:</span>
              <ul>
                {answerOptions.map((elem, index) => (
                  <AnswerOption
                    onClick={() => handleOptionClick(index)}
                    selected={selectedOption === index}
                    correct={isCorrect !== null && index === correctAnswerIndex}
                    incorrect={
                      isCorrect !== null &&
                      !isCorrect &&
                      index === selectedOption
                    }
                    disabled={isCorrect !== null}
                  >
                    {elem}
                  </AnswerOption>
                ))}
              </ul>
            </AnswerOptionsContainer>
          </>
        )}

        {showNextButton && (
          <NextButton onClick={handleNextCard}>Próximo</NextButton>
        )}

        {roundFinished && (
          <RoundSummary>
            <ResultsContainer>
              <span className="hits">Conheço a palavra:{correctAnswers}</span>
              <span className="misses">
                Ainda Aprendendo:{incorrectAnswers}
              </span>
              <p>
                Palavras estudadas {currentCardIndex}/{memo.flashcards.length}
              </p>
            </ResultsContainer>

            <NextRoundButton onClick={handleNextRound}>
              Próxima Rodada
            </NextRoundButton>
            <h3>Palavras estudados nesta rodada: </h3>
            <ul>
              {reviewedWords.map((elem, i) => (
                <li>
                  <div className="frontContent">
                    <HiSpeakerWave
                      color="white"
                      className="HiSpeakerWave"
                      size={25}
                      onClick={() => handleTextToSpeech(elem.frontContent)}
                    />
                    <span>{elem.frontContent}</span>
                  </div>

                  <span>{elem.backContent}</span>
                  <span></span>
                </li>
              ))}
            </ul>
          </RoundSummary>
        )}

        {finishedAllRounds && (
          <div>
            <h2>Todos os cards finalizados</h2>
          </div>
        )}
      </SectionWrapper>
    </Container>
  );
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const Container = styled.div`
  width: 100%;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;

  h2 {
    width: auto;
    background-color: #292944;
    border-radius: 10px;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    .icon {
      font-size: 25px;
      margin-right: 10px;

      color: #29aa8b;
    }
  }
`;

const SectionWrapper = styled.section`
  margin: auto;
  padding: 20px 10px;
  width: 100%;
  max-width: 900px;
`;

const AnswerOptionsContainer = styled.div`
  padding: 0px;
  margin: auto;
  width: 100%;
  margin-top: 50px;

  ul {
    padding: 20px 0px;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
  }
`;

interface AnswerOptionProps {
  selected?: boolean;
  correct?: boolean;
  incorrect?: boolean;
  disabled?: boolean;
}

const AnswerOption = styled.li<AnswerOptionProps>`
  width: 40%;
  border: 1px solid
    ${(props) =>
      props.selected
        ? "#7583ff"
        : props.correct
        ? "#4CAF50"
        : props.incorrect
        ? "#F44336"
        : "#353a52"};
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    border: 1px solid #51597e;
  }
`;

const NextButton = styled.button`
  /* margin-top: 20px;

 
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer; */

  border: none;
  background-color: #29aa8b;
  border: 1px solid #134e40;

  color: white;
  font-weight: bold;
  font-size: 14px;
  border-radius: 10px;
  padding: 10px 20px;

  &:hover {
    transform: scale(1.05);
  }
`;

const RoundSummary = styled.div`
  p {
    margin: 5px 0;
  }

  h3 {
    margin-top: 40px;
  }

  ul {
    padding: 20px 0px;

    list-style: none;

    li {
      background-color: #2e3856;
      margin-bottom: 10px;
      padding: 20px;
      border-radius: 5px;
      span {
        width: 200px;
      }
      .frontContent {
        display: flex;
        align-items: center;

        width: 50%;
        border-right: 1px solid #51597e;

        .HiSpeakerWave {
          &:hover {
            transform: scale(1.1);
          }
        }

        span {
          padding: 0px 10px;
        }
      }

      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

const FrontContent = styled.div`
  display: flex;
  align-items: center;
  //  color: #3cffd2;
  .HiSpeakerWave {
    margin-right: 10px;
    cursor: pointer;
    &:hover {
      color: #29aa8b;
      transform: scale(1.1);
    }
  }
`;

const ResultsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  margin: auto;
  padding-top: 50px;

  h3 {
    padding-bottom: 10px;
  }

  p {
    padding-top: 15px;
  }

  span {
    max-width: 250px;
    border-radius: 20px;
    padding: 10px 20px;
    margin: 5px;
    font-size: 16px;
  }

  span.hits {
    background-color: #0e3b44;
    color: #59e8b1;
  }
  span.misses {
    background-color: #46201f;
    color: #f3812f;
  }
`;

const NextRoundButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #7583ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
