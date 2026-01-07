import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import HeaderComponent from "../../Components/HeaderComponent";
import DeckComponent from "../../Components/MemoListComponents/DeckComponent";
import { Link, useParams } from "react-router-dom";
import { DeletMemorize, getOneEspecific } from "../../Apis/englishplusApi";
import { AuthContext } from "../../Context/AuthContext";
import { PiCardsFill } from "react-icons/pi";
import { FaBook } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";

interface MemoListTypes {
  isFlipped?: boolean;
}

interface CardType {
  frontContent: string;
  backContent: string;
}
interface memotypes {
  _id: string;
  title: string;
  flashcards: [];
}

export default function MemoList() {
  const { memoid } = useParams();

  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState<CardType[]>([
    { frontContent: "Carregando..", backContent: "Carregando.." },
  ]);
  const [Memo, setMemo] = useState<memotypes>();
  const [currentIndexCard, setCurrentIndexCard] = useState(0);
  const [cardsReviewed, setCardsReviewed] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { token } = useContext(AuthContext);

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCorrect = () => {
    setIsFlipped(false);
    setCorrectCount(correctCount + 1);
    changeCard();
  };

  const handleIncorrect = () => {
    setIsFlipped(false);
    setIncorrectCount(incorrectCount + 1);
    changeCard();
  };

  const changeCard = () => {
    setIsFlipped(false);
    setCurrentIndexCard((prevIndex) => {
      if (prevIndex < cards.length - 1) {
        setCardsReviewed(prevIndex + 1);
      } else {
        // displayResults();
        // setCardsReviewed(0);
        // setCorrectCount(0);
        // setIncorrectCount(0);
        setShowResults(true);
      }
      return (prevIndex + 1) % cards.length;
    });
  };

  useEffect(() => {
    getOneEspecific(memoid, token).then((res) => {
      // console.log(res[0]);
      setMemo(res[0]);

      setCards(res[0].flashcards);
    });
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

  function HandleDeleteMemorize(memoID: string) {
    DeletMemorize(memoID, token);
  }

  return (
    <Container>
      <HeaderComponent fixed loginSignin />
      <SectionOne>
        <h2>{Memo?.title}</h2>

        <LearningOptions>
          {/* <LearningOption>
            <Link to="">
              <PiCardsFill className="icon" />
              <h4>Cartões</h4>
            </Link>
          </LearningOption> */}
          <LearningOption>
            <Link to={`/learn/${memoid}`}>
              <FaBook className="icon" />
              <h4>Aprender</h4>
            </Link>
          </LearningOption>
          {/* <LearningOption>
            <Link to="">
              <IoDocuments className="icon" />
              <h4>Avaliar</h4>
            </Link>
          </LearningOption> */}
        </LearningOptions>

        <DeckContainer>
          {showResults ? (
            <ResultsContainer>
              <h3>Resultados</h3>
              <span className="hits">Conheço a palavra: {correctCount}</span>
              <span className="misses">Ainda Aprendendo: {incorrectCount}</span>
              <p>FlashCards Revisados {cardsReviewed + 1}</p>
            </ResultsContainer>
          ) : (
            <DeckComponent
              handleCardFlip={handleCardFlip}
              isFlipped={isFlipped}
              cards={cards}
              currentIndexCard={currentIndexCard}
              handleCorrect={handleCorrect}
              handleIncorrect={handleIncorrect}
              cardsReviewed={cardsReviewed}
            />
          )}
        </DeckContainer>
      </SectionOne>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
`;

const SectionOne = styled.section`
  max-width: 800px;

  padding: 15px 50px;
  width: 100%;
  margin: 80px auto;

  h2 {
    text-align: left;
    padding: 0px;
  }

  @media (max-width: 500px) {
    padding: 15px;
  }
`;

const LearningOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0px;
`;

const LearningOption = styled.div`
  margin: 5px;

  a {
    width: 100%;
    max-width: 200px;
    background-color: #353a52;

    border-radius: 10px;
    padding: 15px;

    cursor: pointer;
    display: flex;
    align-items: center;
    .icon {
      font-size: 25px;
      margin-right: 10px;
      color: #29aa8b;
    }
  }

  @media (max-width: 600px) {
    max-width: 400px;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const DeckContainer = styled.div`
  width: 100%;
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
