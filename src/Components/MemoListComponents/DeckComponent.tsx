import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface CardType {
  frontContent: string;
  backContent: string;
}

interface DeckComponentProps {
  handleCardFlip: () => void;
  isFlipped: boolean;
  cards: CardType[];
  currentIndexCard: number;
  handleCorrect: () => void;
  handleIncorrect: () => void;
  cardsReviewed: number;
}

const DeckComponent: React.FC<DeckComponentProps> = ({
  handleCardFlip,
  isFlipped,
  cards,
  currentIndexCard,
  handleCorrect,
  handleIncorrect,
  cardsReviewed,
}) => {
  const currentCard = cards[currentIndexCard];

  return (
    <DeckWrapper>
      <Card type="button" onClick={handleCardFlip} isFlipped={isFlipped}>
        <Front>
          <CardTop>
            <CardLabel>English</CardLabel>
            <SidePill>Frente</SidePill>
          </CardTop>
          <CardContent>{currentCard.frontContent}</CardContent>
          <CardHint>{cardsReviewed + 1} de {cards.length}</CardHint>
        </Front>

        <Back>
          <CardTop>
            <CardLabel>Meaning</CardLabel>
            <SidePill>Verso</SidePill>
          </CardTop>
          <CardContent>{currentCard.backContent}</CardContent>
          <CardHint>{cardsReviewed + 1} de {cards.length}</CardHint>
        </Back>
      </Card>

      <ButtonContainer>
        {isFlipped && (
          <ActionButton type="button" onClick={handleCorrect} $variant="known">
            <FaCheck />
            Conheco
          </ActionButton>
        )}

        <ProgressPill>
          {cardsReviewed + 1} / {cards.length}
        </ProgressPill>

        {isFlipped && (
          <ActionButton type="button" onClick={handleIncorrect} $variant="review">
            <IoClose />
            Revisar
          </ActionButton>
        )}
      </ButtonContainer>
    </DeckWrapper>
  );
};

export default DeckComponent;

const DeckWrapper = styled.div`
  width: 100%;
  perspective: 1200px;
`;

const Card = styled.button<{ isFlipped?: boolean }>`
  width: 100%;
  min-height: 390px;
  border: none;
  border-radius: 30px;
  padding: 0;
  background: transparent;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
  transform: ${(props) =>
    props.isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};

  @media (max-width: 560px) {
    min-height: min(390px, calc(100vh - 360px));
    border-radius: 24px;
  }

  @media (max-width: 340px) {
    min-height: 270px;
  }
`;

const CardFace = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 30px;
  padding: 22px;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  border: 1px solid rgba(var(--primary-strong-rgb), 0.26);
  box-shadow: 0 30px 60px rgba(7, 10, 20, 0.3);
  overflow: hidden;

  @media (max-width: 560px) {
    padding: 18px;
    border-radius: 24px;
    gap: 12px;
  }

  @media (max-width: 340px) {
    padding: 14px;
  }
`;

const Front = styled(CardFace)`
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent 40%),
    var(--glass-bg-strong);
`;

const Back = styled(CardFace)`
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent 40%),
    var(--glass-bg-strong);
  transform: rotateY(180deg);
`;

const CardTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const CardLabel = styled.span`
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(var(--primary-strong-rgb), 0.12);
  color: var(--primary-soft);
  font-size: 0.82rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0;

  @media (max-width: 560px) {
    padding: 7px 10px;
    font-size: 0.68rem;
  }
`;

const SidePill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  border-radius: 999px;
  padding: 6px 10px;
  color: var(--accent-soft);
  background: rgba(var(--accent-rgb), 0.12);
  font-size: 0.76rem;
  font-weight: 800;
`;

const CardContent = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: clamp(1.8rem, 7vw, 2.75rem);
  font-weight: 800;
  line-height: 1.2;
  color: var(--text);
  padding: 0 8px;
  overflow-wrap: anywhere;

  @media (max-width: 560px) {
    font-size: clamp(1.7rem, 9vw, 2.35rem);
    line-height: 1.18;
    padding: 0;
  }

  @media (max-width: 340px) {
    font-size: 1.35rem;
  }
`;

const CardHint = styled.span`
  align-self: center;
  min-height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 7px 12px;
  color: var(--muted);
  background: var(--subtle-bg);
  font-size: 0.82rem;
  font-weight: 700;

  @media (max-width: 560px) {
    font-size: 0.76rem;
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  padding-top: 14px;

  @media (max-width: 560px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const ActionButton = styled.button<{ $variant: "known" | "review" }>`
  min-height: 52px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 18px;
  border: 1px solid
    ${(props) =>
      props.$variant === "known"
        ? "rgba(var(--accent-rgb), 0.42)"
        : "rgba(243, 129, 47, 0.38)"};
  background: ${(props) =>
    props.$variant === "known"
      ? "linear-gradient(135deg, var(--accent), var(--accent-soft))"
      : "rgba(70, 32, 31, 0.86)"};
  color: ${(props) => (props.$variant === "known" ? "var(--bg)" : "#f4a061")};
  font-weight: 800;
  cursor: pointer;

  svg {
    font-size: 1.1rem;
  }

  @media (max-width: 560px) {
    width: 100%;
    min-height: 50px;
    border-radius: 16px;
    font-size: 0.82rem;
  }
`;

const ProgressPill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 104px;
  min-height: 52px;
  padding: 10px 14px;
  border-radius: 18px;
  border: 1px solid rgba(var(--primary-strong-rgb), 0.3);
  background: rgba(var(--primary-strong-rgb), 0.12);
  color: var(--text);
  font-weight: 800;

  @media (max-width: 560px) {
    grid-column: 1 / -1;
    order: -1;
    width: 100%;
    min-width: 0;
    min-height: 44px;
    padding: 10px 12px;
    border-radius: 16px;
    font-size: 0.86rem;
  }
`;
