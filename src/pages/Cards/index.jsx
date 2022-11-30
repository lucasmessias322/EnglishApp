import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as C from "./style";
import { FaVolumeDown } from "react-icons/fa";
import { TbRotate360 } from "react-icons/tb";
import { SpeakForExame } from "../../components/Speaker";

export default function Cards() {
  const listData = JSON.parse(useParams().listData);

  const [cards, setCards] = useState([
    { WordInEng: "Carregando...", WordInPt: "Carregando..." },
  ]);
  const [currentCard, setCurrentCard] = useState(0);
  const nextBtn = useRef(null);
  const previousBtn = useRef(null);
  const WordInPt = useRef(null);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  useEffect(() => {
    shuffleArray(listData);
    setCards(listData);
  }, []);

  useEffect(() => {
    console.log(currentCard);
    console.log(cards.length);

    if (currentCard > 0 && currentCard >= cards.length - 1) {
      nextBtn.current.style.color = "grey";
    } else {
      nextBtn.current.style.color = "white";
    }

    if (currentCard == 0 && currentCard <= 0) {
      previousBtn.current.style.color = "grey";
    } else {
      previousBtn.current.style.color = "white";
    }
  }, [currentCard]);

  function nextCard() {
    if (currentCard >= cards.length - 1) {
      setCurrentCard(cards.length - 1);
    } else {
      WordInPt.current.classList.add("hideAnswer");
      setCurrentCard((c) => c + 1);
      SpeakForExame(cards[currentCard + 1].WordInEng);
    }
  }

  function previousCard() {
    if (currentCard <= 0) {
      setCurrentCard(0);
    } else {
      setCurrentCard((c) => c - 1);
      SpeakForExame(cards[currentCard - 1].WordInEng);
    }
  }

  function showAnswer() {
    WordInPt.current.classList.toggle("hideAnswer");
  }

  return (
    <C.Container>
      <C.Stack>
        <C.Card>
          <div className="topCardIcons">
            <span
              className="iconVolumeDonw"
              onClick={() => SpeakForExame(cards[currentCard].WordInEng)}
            >
              <FaVolumeDown size={16} />
            </span>
          </div>
          <div className="text">
            <span>{cards[currentCard].WordInEng}</span>
            <hr />
            <span ref={WordInPt} className="hideAnswer">
              {cards[currentCard].WordInPt}
            </span>
          </div>
        </C.Card>
        <C.BtnCardContainer>
          <C.BtnCard onClick={previousCard} ref={previousBtn}>
            Anterior
          </C.BtnCard>
          <C.BtnCard onClick={showAnswer}>Mostrar</C.BtnCard>
          <C.BtnCard onClick={() => nextCard()} ref={nextBtn}>
            Proximo
          </C.BtnCard>
        </C.BtnCardContainer>
      </C.Stack>
    </C.Container>
  );
}
