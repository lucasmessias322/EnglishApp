import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { getOneEspecific } from "../../Apis/englishplusApi";
import { AuthContext } from "../../Context/AuthContext";
import { FaBook, FaWindowClose } from "react-icons/fa";

interface MemoType {
  _id: string;
  title: string;
  flashcards: { frontContent: string; backContent: string }[];
}

export default function LearnPage() {
  const { memoid } = useParams();
  const [memo, setMemo] = useState<MemoType | null>(null);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(
    null
  );
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const { token } = useContext(AuthContext);
  const cardsPerRound = 8;

  useEffect(() => {
    getOneEspecific(memoid, token).then((res) => {
      setMemo(res[0]);
    });
  }, []);

  useEffect(() => {
    if (memo) {
      const otherFlashcards = memo.flashcards.filter(
        (_, index) => index !== currentCardIndex
      );
      const shuffledFlashcards = shuffleArray(otherFlashcards).slice(0, 3);
      const allOptions = shuffledFlashcards.map(
        (flashcard) => flashcard.backContent
      );
      allOptions.push(memo.flashcards[currentCardIndex].backContent);
      const shuffledOptions = shuffleArray(allOptions);
      setAnswerOptions(shuffledOptions);
    }
  }, [memo, currentCardIndex]);

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
    } else {
      setIsCorrect(false);
      setCorrectAnswerIndex(
        answerOptions.findIndex(
          (option) => option === memo!.flashcards[currentCardIndex].backContent
        )
      );
    }
    setShowNextButton(true);
  };

  const handleNextCard = () => {
    if (isCorrect === null) {
      return; // Do nothing if answer has not been selected yet
    }
    if (
      currentCardIndex + 1 >= cardsPerRound ||
      currentCardIndex + 1 >= memo!.flashcards.length
    ) {
      setCurrentCardIndex(0);
      setCurrentRound(currentRound + 1);
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
    }
    setSelectedOption(null);
    setIsCorrect(null);
    setCorrectAnswerIndex(null);
    setShowNextButton(false);
  };

  return (
    <Container>
      <Header>
        <h2 className="learn">
          <FaBook className="icon" /> Aprender
        </h2>
        <h2>Rodada {currentRound}</h2>
        <Link to={`/memolist/${memoid}`}>
          <FaWindowClose color="#7583ff" size={30} />
        </Link>
      </Header>
      {memo && (
        <SectionWrapper>
          <h4 className="frontContent">
            {memo.flashcards[currentCardIndex].frontContent}
          </h4>
          <AnswerOptionsContainer>
            <span>Selecione a palavra correspondente:</span>
            <ul>
              {answerOptions.map((option, index) => (
                <AnswerOption
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  selected={selectedOption === index}
                  correct={isCorrect !== null && index === correctAnswerIndex}
                  incorrect={
                    isCorrect !== null && !isCorrect && index === selectedOption
                  }
                  disabled={isCorrect !== null}
                >
                  {option}
                </AnswerOption>
              ))}
            </ul>
          </AnswerOptionsContainer>
          {showNextButton && (
            <NextButton onClick={handleNextCard}>Próximo</NextButton>
          )}
        </SectionWrapper>
      )}
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
  padding: 20px 10px;

  h2 {
    .icon {
      font-size: 25px;
      margin-right: 10px;
      color: #7583ff;
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

  span {
  }

  ul {
    padding: 20px 0px;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
  }
`;

interface AnswerOptionProps {
  selected: boolean;
  correct: boolean;
  incorrect: boolean;
  disabled: boolean;
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
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #7583ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
