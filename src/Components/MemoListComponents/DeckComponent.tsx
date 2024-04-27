// import React from "react";
// import styled from "styled-components";
// interface CardType {
//   frontContent: string;
//   backContent: string;
// }
// interface deckComponentTypes {
//   handleCardFlip?: Function;
//   isFlipped?: boolean;
//   cards?: CardType[];
//   currentIndexCard?: number;
//   handleCorrect?: Function;
//   handleIncorrect?: Function;
//   cardsReviewed?: number;
// }

// export default function DeckComponent({
//   handleCardFlip,
//   isFlipped,
//   cards,
//   currentIndexCard,
//   handleCorrect,
//   cardsReviewed,
// }: deckComponentTypes) {
//   return (
//     <DeckWrapper>
//       <Card onClick={handleCardFlip} isFlipped={isFlipped}>
//         <Front>{cards[currentIndexCard].frontContent}</Front>
//         <Back>{isFlipped && cards[currentIndexCard].backContent}</Back>
//       </Card>

//       <ButtonContainer>
//         {isFlipped && (
//           <Button onClick={handleCorrect}>
//             <FaCheck color="green" />
//           </Button>
//         )}

//         <span>
//           {cardsReviewed + 1} / {cards.length}
//         </span>
//         {isFlipped && (
//           <Button onClick={handleIncorrect}>
//             <IoClose color="red" />
//           </Button>
//         )}
//       </ButtonContainer>
//     </DeckWrapper>
//   );
// }

// const DeckWrapper = styled.div`
//   perspective: 1000px;
//   position: relative;
// `;

// const Card = styled.div<MemoListTypes>`
//   width: 100%;
//   border-radius: 10px;
//   height: 300px;
//   transition: transform 0.6s;
//   transform-style: preserve-3d;
//   cursor: pointer;
//   position: relative;
//   transform: ${(props) =>
//     props.isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
// `;

// const Front = styled.div`
//   border-radius: 10px;
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   backface-visibility: hidden;
//   background-color: #353a52;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Back = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   backface-visibility: hidden;
//   border-radius: 10px;
//   background-color: #353a52;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   transform: rotateY(180deg);
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 10px;
//   margin-top: 20px;
//   height: 50px;
// `;

// const Button = styled.button`
//   padding: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 30px;
//   color: whitesmoke;
//   margin: 0px 10px;
//   border: none;
//   border-radius: 100%;

//   background-color: transparent;
//   border: 1px solid #353a52;
//   &:hover {
//     transition: all 0.2s ease-out;
//     background-color: #353a52;
//   }
// `;
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
  return (
    <DeckWrapper>
      <Card onClick={handleCardFlip} isFlipped={isFlipped}>
        <Front>{cards[currentIndexCard].frontContent}</Front>
        <Back>{isFlipped && cards[currentIndexCard].backContent}</Back>
      </Card>

      <ButtonContainer>
        {isFlipped && (
          <Button onClick={handleCorrect}>
            <FaCheck color="green" />
          </Button>
        )}

        <span>
          {cardsReviewed + 1} / {cards.length}
        </span>
        {isFlipped && (
          <Button onClick={handleIncorrect}>
            <IoClose color="red" />
          </Button>
        )}
      </ButtonContainer>
    </DeckWrapper>
  );
};

export default DeckComponent;

const DeckWrapper = styled.div`
  perspective: 1000px;
  position: relative;
`;

const Card = styled.div<{ isFlipped?: boolean }>`
  width: 100%;
  border-radius: 10px;
  height: 300px;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
  transform: ${(props) =>
    props.isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

const Front = styled.div`
  border-radius: 10px;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: #353a52;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Back = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  background-color: #353a52;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotateY(180deg);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
  height: 50px;
`;

const Button = styled.button`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: whitesmoke;
  margin: 0px 10px;
  border: none;
  border-radius: 100%;

  background-color: transparent;
  border: 1px solid #353a52;
  &:hover {
    transition: all 0.2s ease-out;
    background-color: #353a52;
  }
`;
