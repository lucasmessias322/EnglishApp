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
      <Card onClick={handleCardFlip} isFlipped={isFlipped}>
        <Front>
          <CardLabel>English</CardLabel>
          <CardContent>{currentCard.frontContent}</CardContent>
          <CardHint>Toque para ver a traducao</CardHint>
        </Front>

        <Back>
          <CardLabel>Meaning</CardLabel>
          <CardContent>{currentCard.backContent}</CardContent>
          <CardHint>Marque se voce ja conhece ou quer revisar depois</CardHint>
        </Back>
      </Card>

      <ButtonContainer>
        {isFlipped && (
          <ActionButton type="button" onClick={handleCorrect}>
            <FaCheck />
            Conheco
          </ActionButton>
        )}

        <ProgressPill>
          {cardsReviewed + 1} / {cards.length}
        </ProgressPill>

        {isFlipped && (
          <ActionButton type="button" onClick={handleIncorrect}>
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

const Card = styled.div<{ isFlipped?: boolean }>`
  width: 100%;
  min-height: 360px;
  border-radius: 28px;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
  transform: ${(props) =>
    props.isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

const CardFace = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 28px;
  padding: 24px;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  border: 1px solid rgba(76, 85, 125, 0.42);
  box-shadow: 0 30px 60px rgba(7, 10, 20, 0.3);
`;

const Front = styled(CardFace)`
  background:
    radial-gradient(circle at top right, rgba(73, 104, 236, 0.2), transparent 35%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent 40%),
    rgba(33, 36, 51, 0.96);
`;

const Back = styled(CardFace)`
  background:
    radial-gradient(circle at top right, rgba(41, 170, 139, 0.18), transparent 35%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent 40%),
    rgba(33, 36, 51, 0.96);
  transform: rotateY(180deg);
`;

const CardLabel = styled.span`
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: #cdd7fb;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const CardContent = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  line-height: 1.2;
  color: #f5f7ff;
  padding: 0 8px;
`;

const CardHint = styled.span`
  color: #99a4c8;
  line-height: 1.6;
  font-size: 0.94rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding-top: 22px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: 999px;
  border: 1px solid rgba(76, 85, 125, 0.45);
  background: rgba(33, 36, 51, 0.85);
  color: #eef1ff;
  cursor: pointer;

  svg {
    font-size: 1.1rem;
  }
`;

const ProgressPill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 118px;
  padding: 12px 18px;
  border-radius: 999px;
  border: 1px solid rgba(110, 136, 204, 0.3);
  background: rgba(73, 104, 236, 0.12);
  color: #d7def9;
  font-weight: 600;
`;
