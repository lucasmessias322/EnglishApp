import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import HeaderComponent from "../../Components/HeaderComponent";
import DeckComponent from "../../Components/MemoListComponents/DeckComponent";
import { Link, useParams } from "react-router-dom";
import { getOneEspecific } from "../../Apis/englishplusApi";
import { AuthContext } from "../../Context/AuthContext";
import { PiCardsFill } from "react-icons/pi";
import { FaBook } from "react-icons/fa";

interface CardType {
  frontContent: string;
  backContent: string;
}

interface MemoType {
  _id: string;
  title: string;
  flashcards: CardType[];
}

export default function MemoList() {
  const { memoid } = useParams();
  const { token } = useContext(AuthContext);

  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState<CardType[]>([
    { frontContent: "Carregando...", backContent: "Carregando..." },
  ]);
  const [memo, setMemo] = useState<MemoType>();
  const [currentIndexCard, setCurrentIndexCard] = useState(0);
  const [cardsReviewed, setCardsReviewed] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    getOneEspecific(memoid, token).then((res) => {
      const memoResponse = res[0];
      const shuffledCards = shuffleCards(memoResponse.flashcards);

      setMemo(memoResponse);
      setCards(shuffledCards);
    });
  }, [memoid, token]);

  const handleCardFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleCorrect = () => {
    setIsFlipped(false);
    setCorrectCount((prev) => prev + 1);
    changeCard();
  };

  const handleIncorrect = () => {
    setIsFlipped(false);
    setIncorrectCount((prev) => prev + 1);
    changeCard();
  };

  const changeCard = () => {
    setCurrentIndexCard((prevIndex) => {
      if (prevIndex < cards.length - 1) {
        setCardsReviewed(prevIndex + 1);
        return prevIndex + 1;
      }

      setShowResults(true);
      return prevIndex;
    });
  };

  function restartSession() {
    setShowResults(false);
    setIsFlipped(false);
    setCurrentIndexCard(0);
    setCardsReviewed(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setCards((prev) => shuffleCards(prev));
  }

  const reviewedTotal = showResults
    ? cards.length
    : Math.min(cardsReviewed + 1, cards.length);
  const totalCards = cards.length;
  const accuracy =
    correctCount + incorrectCount > 0
      ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
      : 0;

  return (
    <Container>
      <HeaderComponent fixed showlogo bgcolor="#161616" />

      <Content>
        <HeroCard>
          <TopLabel>Deck de memorizacao</TopLabel>
          <h1>{memo?.title || "Carregando deck"}</h1>
          <p>
            Vire os cards, marque o que voce ja conhece e deixe a revisao mais
            objetiva com um visual mais focado.
          </p>

          <MetricsGrid>
            <MetricCard>
              <PiCardsFill className="icon" />
              <div>
                <strong>{totalCards}</strong>
                <span>flashcards</span>
              </div>
            </MetricCard>
            <MetricCard>
              <strong>{reviewedTotal}</strong>
              <span>cards vistos</span>
            </MetricCard>
            <MetricCard>
              <strong>{accuracy}%</strong>
              <span>acerto da sessao</span>
            </MetricCard>
          </MetricsGrid>

          <LearningOptions>
            <LearningOption to={`/learn/${memoid}`}>
              <FaBook className="icon" />
              <div>
                <strong>Modo aprender</strong>
                <span>Treino com alternativas e rodadas guiadas.</span>
              </div>
            </LearningOption>
          </LearningOptions>
        </HeroCard>

        <DeckStage>
          {showResults ? (
            <ResultsContainer>
              <span className="eyebrow">Sessao finalizada</span>
              <h2>Resumo da revisao</h2>
              <ResultPill className="hits">
                Conheco a palavra: {correctCount}
              </ResultPill>
              <ResultPill className="misses">
                Ainda aprendendo: {incorrectCount}
              </ResultPill>
              <p>
                Voce revisou {totalCards} cards com {accuracy}% de acerto.
              </p>

              <ActionsRow>
                <RestartButton onClick={restartSession}>
                  Reiniciar sessao
                </RestartButton>
                <BackLink to="/memorizelists">Voltar para decks</BackLink>
              </ActionsRow>
            </ResultsContainer>
          ) : (
            <DeckShell>
              <DeckComponent
                handleCardFlip={handleCardFlip}
                isFlipped={isFlipped}
                cards={cards}
                currentIndexCard={currentIndexCard}
                handleCorrect={handleCorrect}
                handleIncorrect={handleIncorrect}
                cardsReviewed={cardsReviewed}
              />
            </DeckShell>
          )}
        </DeckStage>
      </Content>
    </Container>
  );
}

function shuffleCards(cards: CardType[]) {
  return [...cards].sort(() => Math.random() - 0.5);
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.main`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 108px 16px 48px;

  @media (max-width: 560px) {
    padding: 82px 10px 28px;
  }
`;

const HeroCard = styled.section`
  padding: 28px;
  border-radius: 32px;
  border: 1px solid rgba(76, 85, 125, 0.45);
  background:
    linear-gradient(145deg, rgba(73, 104, 236, 0.12), transparent 40%),
    rgba(24, 27, 40, 0.9);
  box-shadow: 0 26px 52px rgba(7, 10, 20, 0.28);

  h1 {
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.08;
    font-family: "Google Sans", "Poppins", sans-serif;
  }

  p {
    max-width: 640px;
    margin-top: 12px;
    color: #a9b4d8;
    line-height: 1.8;
  }

  @media (max-width: 560px) {
    padding: 18px;
    border-radius: 22px;

    h1 {
      font-size: 1.65rem;
      line-height: 1.15;
    }

    p {
      margin-top: 8px;
      font-size: 0.9rem;
      line-height: 1.55;
    }
  }

  @media (max-width: 340px) {
    padding: 16px;
  }
`;

const TopLabel = styled.span`
  display: inline-flex;
  margin-bottom: 10px;
  color: #8fe5d0;
  font-size: 0.88rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;

  @media (max-width: 560px) {
    margin-bottom: 8px;
    font-size: 0.72rem;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 24px;

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-top: 18px;
  }

  @media (max-width: 340px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const MetricCard = styled.div`
  padding: 18px;
  border-radius: 22px;
  background: rgba(33, 36, 51, 0.76);
  border: 1px solid rgba(76, 85, 125, 0.38);
  display: flex;
  align-items: center;
  gap: 14px;

  .icon {
    font-size: 1.8rem;
    color: #29aa8b;
  }

  strong {
    display: block;
    font-size: 1.5rem;
  }

  span {
    color: #99a4c8;
    font-size: 0.95rem;
  }

  @media (max-width: 720px) {
    min-height: 86px;
    padding: 14px;
    border-radius: 16px;
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;

    &:first-child {
      grid-column: 1 / -1;
      min-height: auto;
      flex-direction: row;
      align-items: center;
    }

    .icon {
      font-size: 1.35rem;
    }

    strong {
      font-size: 1.28rem;
      line-height: 1;
    }

    span {
      display: block;
      margin-top: 4px;
      font-size: 0.76rem;
      line-height: 1.3;
    }
  }

  @media (max-width: 340px) {
    min-height: auto;
    flex-direction: row;
    align-items: center;
  }
`;

const LearningOptions = styled.div`
  margin-top: 20px;

  @media (max-width: 560px) {
    margin-top: 14px;
  }
`;

const LearningOption = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  width: fit-content;
  padding: 16px 20px;
  border-radius: 20px;
  border: 1px solid rgba(76, 85, 125, 0.45);
  background: rgba(33, 36, 51, 0.76);
  color: #eef1ff;

  .icon {
    font-size: 1.5rem;
    color: #29aa8b;
  }

  strong {
    display: block;
    margin-bottom: 4px;
  }

  span {
    color: #99a4c8;
    font-size: 0.92rem;
  }

  @media (max-width: 560px) {
    width: 100%;
    padding: 14px;
    border-radius: 16px;
    gap: 12px;

    .icon {
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    strong {
      font-size: 0.86rem;
    }

    span {
      font-size: 0.76rem;
      line-height: 1.45;
    }
  }
`;

const DeckStage = styled.section`
  margin-top: 28px;

  @media (max-width: 560px) {
    margin-top: 18px;
  }
`;

const DeckShell = styled.div`
  padding: 22px;
  border-radius: 32px;
  border: 1px solid rgba(76, 85, 125, 0.42);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 25%),
    rgba(24, 27, 40, 0.88);
  box-shadow: 0 26px 52px rgba(7, 10, 20, 0.24);

  @media (max-width: 560px) {
    padding: 14px;
    border-radius: 22px;
  }

  @media (max-width: 340px) {
    padding: 10px;
  }
`;

const ResultsContainer = styled.div`
  padding: 32px;
  border-radius: 32px;
  border: 1px solid rgba(76, 85, 125, 0.42);
  background:
    linear-gradient(145deg, rgba(41, 170, 139, 0.08), transparent 38%),
    rgba(24, 27, 40, 0.88);
  box-shadow: 0 26px 52px rgba(7, 10, 20, 0.24);
  text-align: center;

  .eyebrow {
    display: inline-flex;
    margin-bottom: 10px;
    color: #8fe5d0;
    font-size: 0.88rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  h2 {
    font-size: clamp(1.7rem, 3vw, 2.4rem);
  }

  p {
    margin-top: 14px;
    color: #a9b4d8;
    line-height: 1.75;
  }

  @media (max-width: 560px) {
    padding: 22px 16px;
    border-radius: 22px;
  }
`;

const ResultPill = styled.span`
  display: block;
  max-width: 320px;
  margin: 14px auto 0;
  padding: 12px 18px;
  border-radius: 999px;
  font-size: 1rem;

  &.hits {
    background: rgba(14, 59, 68, 0.85);
    color: #8fe5d0;
  }

  &.misses {
    background: rgba(70, 32, 31, 0.85);
    color: #f4a061;
  }
`;

const ActionsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 24px;
`;

const RestartButton = styled.button`
  border: none;
  padding: 12px 18px;
  border-radius: 16px;
  background: linear-gradient(135deg, #4968ec, #6e88cc);
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const BackLink = styled(Link)`
  padding: 12px 18px;
  border-radius: 16px;
  border: 1px solid rgba(76, 85, 125, 0.45);
  background: rgba(33, 36, 51, 0.76);
  color: #eef1ff;
  font-weight: 600;
`;
