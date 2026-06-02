import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import DeckComponent from "../../Components/MemoListComponents/DeckComponent";
import { Link, useParams } from "react-router-dom";
import { getOneEspecific } from "../../Apis/englishplusApi";
import { AuthContext } from "../../Context/AuthContext";
import { PiCardsFill } from "react-icons/pi";
import { FaBook, FaRedo } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

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
  const progress =
    totalCards > 0 ? Math.min(100, (reviewedTotal / totalCards) * 100) : 0;

  return (
    <Container>
      <AppBar>
        <IconLink to="/memorizelists" title="Voltar para decks">
          <IoIosArrowBack />
        </IconLink>

        <AppTitle>
          <span>Memorizacao</span>
          <strong>{memo?.title || "Deck"}</strong>
        </AppTitle>

        <IconLink to={`/learn/${memoid}`} title="Modo aprender">
          <FaBook />
        </IconLink>
      </AppBar>

      <Content>
        <SessionHeader>
          <TopLabel>Deck ativo</TopLabel>
          <h1>{memo?.title || "Carregando deck"}</h1>

          <ProgressBlock>
            <ProgressTop>
              <span>
                {reviewedTotal}/{totalCards} cards
              </span>
              <strong>{accuracy}%</strong>
            </ProgressTop>
            <ProgressTrack aria-hidden="true">
              <ProgressFill $progress={progress} />
            </ProgressTrack>
          </ProgressBlock>

          <StatsRail>
            <StatPill>
              <PiCardsFill className="icon" />
              <div>
                <strong>{totalCards}</strong>
                <span>flashcards</span>
              </div>
            </StatPill>
            <StatPill>
              <strong>{reviewedTotal}</strong>
              <span>vistos</span>
            </StatPill>
            <StatPill>
              <strong>{accuracy}%</strong>
              <span>acerto</span>
            </StatPill>
          </StatsRail>
        </SessionHeader>

        <DeckStage>
          {showResults ? (
            <ResultsContainer>
              <span className="eyebrow">Sessao finalizada</span>
              <h2>Resumo da revisao</h2>
              <ResultGrid>
                <ResultPill className="hits">
                  <strong>{correctCount}</strong>
                  <span>Conheco</span>
                </ResultPill>
                <ResultPill className="misses">
                  <strong>{incorrectCount}</strong>
                  <span>Revisar</span>
                </ResultPill>
              </ResultGrid>
              <p>
                Voce revisou {totalCards} cards com {accuracy}% de acerto.
              </p>

              <ActionsRow>
                <RestartButton onClick={restartSession}>
                  <FaRedo />
                  Reiniciar
                </RestartButton>
                <BackLink to="/memorizelists">Voltar para decks</BackLink>
              </ActionsRow>
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

const AppBar = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 90;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  padding: calc(env(safe-area-inset-top) + 10px) 14px 10px;
  border-bottom: 1px solid rgba(76, 85, 125, 0.24);

  backdrop-filter: blur(14px);
`;

const IconLink = styled(Link)`
  width: 44px;
  height: 44px;
  border: 1px solid rgba(76, 85, 125, 0.45);
  border-radius: 16px;
  background: rgba(24, 27, 40, 0.86);
  color: #f5f7ff;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.2rem;
  }
`;

const AppTitle = styled.div`
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

const Content = styled.main`
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 88px 14px 28px;

  @media (max-width: 560px) {
    padding: 84px 10px 22px;
  }
`;

const SessionHeader = styled.section`
  padding: 6px 2px 0;

  h1 {
    color: #f7f9ff;
    font-size: clamp(1.7rem, 5vw, 2.2rem);
    line-height: 1.12;
    letter-spacing: 0;
    font-family: "Google Sans", "Poppins", sans-serif;
  }

  @media (max-width: 560px) {
    h1 {
      font-size: 1.48rem;
      line-height: 1.15;
    }
  }
`;

const TopLabel = styled.span`
  display: inline-flex;
  margin-bottom: 8px;
  color: #8fe5d0;
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0;

  @media (max-width: 560px) {
    font-size: 0.72rem;
  }
`;

const ProgressBlock = styled.div`
  margin-top: 16px;
  padding: 14px;
  border-radius: 20px;
  border: 1px solid rgba(76, 85, 125, 0.42);
  background: rgba(24, 27, 40, 0.86);
`;

const ProgressTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  color: #aeb8d8;
  font-size: 0.84rem;
  font-weight: 700;

  strong {
    color: #8fe5d0;
  }
`;

const ProgressTrack = styled.div`
  height: 7px;
  overflow: hidden;
  margin-top: 10px;
  border-radius: 999px;
  background: rgba(76, 85, 125, 0.34);
`;

const ProgressFill = styled.div<{ $progress: number }>`
  width: ${(props) => Math.min(100, Math.max(0, props.$progress))}%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #4968ec, #8fe5d0);
  transition: width 0.2s ease;
`;

const StatsRail = styled.div`
  display: grid;
  grid-template-columns: 1.2fr repeat(2, 0.9fr);
  gap: 8px;
  margin-top: 10px;
`;

const StatPill = styled.div`
  min-height: 58px;
  min-width: 0;
  border: 1px solid rgba(76, 85, 125, 0.36);
  border-radius: 18px;
  padding: 10px;
  background: rgba(33, 36, 51, 0.72);
  display: flex;
  align-items: center;
  gap: 9px;

  .icon {
    flex-shrink: 0;
    font-size: 1.2rem;
    color: #29aa8b;
  }

  strong {
    display: block;
    color: #f5f7ff;
    font-size: 1.05rem;
    line-height: 1;
  }

  span {
    color: #99a4c8;
    font-size: 0.72rem;
    line-height: 1.2;
  }

  @media (max-width: 360px) {
    min-height: 54px;
    border-radius: 15px;
    padding: 8px;
  }
`;

const DeckStage = styled.section`
  margin-top: 14px;

  @media (max-width: 560px) {
    margin-top: 12px;
  }
`;

const ResultsContainer = styled.div`
  padding: 22px 16px;
  border-radius: 24px;
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
    font-size: 0.78rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0;
  }

  h2 {
    font-size: 1.55rem;
    line-height: 1.15;
  }

  p {
    margin-top: 14px;
    color: #a9b4d8;
    line-height: 1.75;
  }

  @media (max-width: 560px) {
    border-radius: 20px;
  }
`;

const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 18px;
`;

const ResultPill = styled.span`
  min-height: 82px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 18px;
  font-size: 0.86rem;

  strong {
    font-size: 1.55rem;
    line-height: 1;
  }

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
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 24px;

  @media (max-width: 360px) {
    grid-template-columns: 1fr;
  }
`;

const RestartButton = styled.button`
  min-height: 50px;
  border: none;
  padding: 12px 14px;
  border-radius: 16px;
  background: linear-gradient(135deg, #29aa8b, #8fe5d0);
  color: #07121b;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 800;
  cursor: pointer;
`;

const BackLink = styled(Link)`
  min-height: 50px;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid rgba(76, 85, 125, 0.45);
  background: rgba(33, 36, 51, 0.76);
  color: #eef1ff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
`;
