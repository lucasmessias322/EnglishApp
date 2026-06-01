import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { getOneEspecific } from "../../Apis/englishplusApi";
import { AuthContext } from "../../Context/AuthContext";
import { FaBook, FaWindowClose } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import handleTextToSpeech from "../../utils/TextToSpeech";

interface Flashcard {
  frontContent: string;
  backContent: string;
}

interface MemoType {
  _id: string;
  title: string;
  flashcards: Flashcard[];
}

export default function LearnPage() {
  const { memoid } = useParams();
  const { token } = useContext(AuthContext);

  const [memo, setMemo] = useState<MemoType | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);
  const [reviewedWords, setReviewedWords] = useState<Flashcard[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(
    null,
  );
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const [roundFinished, setRoundFinished] = useState<boolean>(false);
  const [roundProgress, setRoundProgress] = useState<number>(0);
  const [finishedAllRounds, setFinishedAllRounds] = useState<boolean>(false);

  const cardsPerRound = 10;

  useEffect(() => {
    getOneEspecific(memoid, token).then((res) => {
      setMemo(res[0]);
    });
  }, [memoid, token]);

  useEffect(() => {
    if (!memo || memo.flashcards.length === 0) return;

    const otherFlashcards = memo.flashcards.filter(
      (_, index) => index !== currentCardIndex,
    );
    const shuffledFlashcards = shuffleArray(otherFlashcards).slice(0, 3);
    const allOptions = shuffledFlashcards.map(
      (flashcard) => flashcard.backContent,
    );

    allOptions.push(memo.flashcards[currentCardIndex].backContent);
    setAnswerOptions(shuffleArray(allOptions));
  }, [memo, currentCardIndex]);

  const playSound = (soundPath: string) => {
    const audio = new Audio(soundPath);
    audio.play();
  };

  const handleOptionClick = (index: number) => {
    if (!memo || isCorrect !== null) return;

    setSelectedOption(index);

    const currentBackContent = memo.flashcards[currentCardIndex].backContent;
    const isHit = currentBackContent === answerOptions[index];

    if (isHit) {
      setIsCorrect(true);
      setCorrectAnswers((prevCount) => prevCount + 1);
      playSound("/soundEffects/rightanswer.mp3");
    } else {
      setIsCorrect(false);
      setCorrectAnswerIndex(
        answerOptions.findIndex((option) => option === currentBackContent),
      );
      setIncorrectAnswers((prevCount) => prevCount + 1);
      playSound("/soundEffects/error.wav");
    }

    setShowNextButton(true);
  };

  const handleNextCard = () => {
    if (!memo || isCorrect === null) return;

    const currentWord = memo.flashcards[currentCardIndex];
    setReviewedWords((prev) => [...prev, currentWord]);

    setRoundProgress((prevProgress) => {
      const nextProgress = prevProgress + 1;

      if (nextProgress >= cardsPerRound) {
        setRoundFinished(true);
        return 0;
      }

      return nextProgress;
    });

    if (currentCardIndex + 1 >= memo.flashcards.length) {
      setRoundFinished(false);
      setFinishedAllRounds(true);
      setCurrentRound(0);
    } else {
      setCurrentCardIndex((prev) => prev + 1);
    }

    setSelectedOption(null);
    setIsCorrect(null);
    setCorrectAnswerIndex(null);
    setShowNextButton(false);
  };

  const handleNextRound = () => {
    setCurrentRound((prev) => prev + 1);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setReviewedWords([]);
    setRoundFinished(false);
  };

  const totalCards = memo?.flashcards.length ?? 0;
  const currentFrontContent =
    memo && memo.flashcards[currentCardIndex]
      ? memo.flashcards[currentCardIndex].frontContent
      : "";

  return (
    <Container>
      <PageHeader>
        <HeaderBadge>
          <FaBook className="icon" />
          Aprender
        </HeaderBadge>

        <RoundBadge>
          {currentRound > 0 ? `Rodada ${currentRound}` : "Treino concluido"}
        </RoundBadge>

        <CloseLink to={`/memolist/${memoid}`}>
          <FaWindowClose />
        </CloseLink>
      </PageHeader>

      <SectionWrapper>
        <IntroCard>
          <div className="copy">
            <span className="eyebrow">Treino guiado</span>
            <h1>{memo?.title || "Preparando atividade"}</h1>
            <p>
              Escute a palavra, escolha a traducao certa e avance em rodadas
              curtas para manter o estudo leve.
            </p>
          </div>

          <ProgressGrid>
            <ProgressCard>
              <strong>{totalCards}</strong>
              <span>cards no deck</span>
            </ProgressCard>
            <ProgressCard>
              <strong>{correctAnswers}</strong>
              <span>acertos na rodada</span>
            </ProgressCard>
            <ProgressCard>
              <strong>{incorrectAnswers}</strong>
              <span>erros na rodada</span>
            </ProgressCard>
          </ProgressGrid>
        </IntroCard>

        {!roundFinished && !finishedAllRounds && memo && totalCards > 0 && (
          <TrainingCard>
            <PromptCard>
              <PromptTop>
                <span>Palavra da vez</span>
                <small>
                  Card {currentCardIndex + 1} de {totalCards}
                </small>
              </PromptTop>

              <FrontContent>
                <HiSpeakerWave
                  className="speaker"
                  size={28}
                  onClick={() => handleTextToSpeech(currentFrontContent)}
                />
                <h2>{currentFrontContent}</h2>
              </FrontContent>
            </PromptCard>

            <AnswerOptionsContainer>
              <span>Selecione a traducao correspondente:</span>
              <ul>
                {answerOptions.map((option, index) => (
                  <AnswerOption
                    key={`${option}-${index}`}
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
                    {option}
                  </AnswerOption>
                ))}
              </ul>
            </AnswerOptionsContainer>
          </TrainingCard>
        )}

        {showNextButton && (
          <NextButton type="button" onClick={handleNextCard}>
            Proximo card
          </NextButton>
        )}

        {roundFinished && (
          <RoundSummary>
            <ResultsContainer>
              <span className="eyebrow">Fim da rodada</span>
              <h3>Resumo rapido</h3>
              <ResultPill className="hits">
                Conheco a palavra: {correctAnswers}
              </ResultPill>
              <ResultPill className="misses">
                Ainda aprendendo: {incorrectAnswers}
              </ResultPill>
              <p>
                Palavras estudadas {currentCardIndex}/{memo?.flashcards.length}
              </p>
            </ResultsContainer>

            <NextRoundButton type="button" onClick={handleNextRound}>
              Proxima rodada
            </NextRoundButton>

            <ReviewedList>
              <h3>Palavras vistas nesta rodada</h3>
              <ul>
                {reviewedWords.map((elem, index) => (
                  <li key={`${elem.frontContent}-${index}`}>
                    <div className="frontContent">
                      <HiSpeakerWave
                        className="speaker"
                        size={24}
                        onClick={() => handleTextToSpeech(elem.frontContent)}
                      />
                      <span>{elem.frontContent}</span>
                    </div>
                    <span className="translation">{elem.backContent}</span>
                  </li>
                ))}
              </ul>
            </ReviewedList>
          </RoundSummary>
        )}

        {finishedAllRounds && (
          <FinishedCard>
            <span className="eyebrow">Treino encerrado</span>
            <h2>Todos os cards foram finalizados.</h2>
            <p>
              Voce completou o deck inteiro. Agora pode revisar novamente ou
              voltar para escolher outro conjunto de palavras.
            </p>
            <ActionsRow>
              <Link to={`/memolist/${memoid}`}>Voltar para o deck</Link>
              <button type="button" onClick={() => window.location.reload()}>
                Treinar outra vez
              </button>
            </ActionsRow>
          </FinishedCard>
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

interface AnswerOptionProps {
  selected?: boolean;
  correct?: boolean;
  incorrect?: boolean;
  disabled?: boolean;
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px 16px 48px;
`;

const PageHeader = styled.header`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 8px 0 18px;
  flex-wrap: wrap;
`;

const HeaderBadge = styled.h2`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 18px;
  background: rgba(33, 36, 51, 0.88);
  border: 1px solid rgba(76, 85, 125, 0.45);
  font-size: 1rem;

  .icon {
    color: #29aa8b;
  }
`;

const RoundBadge = styled.span`
  padding: 12px 16px;
  border-radius: 18px;
  background: rgba(73, 104, 236, 0.14);
  border: 1px solid rgba(110, 136, 204, 0.32);
  color: #d7def9;
  font-weight: 600;
`;

const CloseLink = styled(Link)`
  width: 48px;
  height: 48px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(33, 36, 51, 0.88);
  border: 1px solid rgba(76, 85, 125, 0.45);
  color: #29aa8b;
  font-size: 1.6rem;
`;

const SectionWrapper = styled.main`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
`;

const IntroCard = styled.section`
  padding: 28px;
  border-radius: 32px;
  border: 1px solid rgba(76, 85, 125, 0.45);
  background:
    linear-gradient(145deg, rgba(73, 104, 236, 0.12), transparent 40%),
    rgba(24, 27, 40, 0.9);
  box-shadow: 0 26px 52px rgba(7, 10, 20, 0.28);

  .copy .eyebrow {
    display: inline-flex;
    margin-bottom: 10px;
    color: #8fe5d0;
    font-size: 0.88rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .copy h1 {
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.08;
    font-family: "Google Sans", "Poppins", sans-serif;
  }

  .copy p {
    max-width: 620px;
    margin-top: 12px;
    color: #a9b4d8;
    line-height: 1.8;
  }
`;

const ProgressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 24px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const ProgressCard = styled.div`
  padding: 18px;
  border-radius: 22px;
  background: rgba(33, 36, 51, 0.76);
  border: 1px solid rgba(76, 85, 125, 0.38);

  strong {
    display: block;
    font-size: 1.6rem;
  }

  span {
    color: #99a4c8;
    font-size: 0.95rem;
  }
`;

const TrainingCard = styled.section`
  margin-top: 28px;
  padding: 24px;
  border-radius: 32px;
  border: 1px solid rgba(76, 85, 125, 0.42);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 25%),
    rgba(24, 27, 40, 0.88);
  box-shadow: 0 26px 52px rgba(7, 10, 20, 0.24);
`;

const PromptCard = styled.div`
  padding: 22px;
  border-radius: 26px;
  border: 1px solid rgba(76, 85, 125, 0.4);
  background:
    radial-gradient(circle at top right, rgba(41, 170, 139, 0.14), transparent 34%),
    rgba(33, 36, 51, 0.88);
`;

const PromptTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  span {
    color: #8fe5d0;
    text-transform: uppercase;
    font-size: 0.82rem;
    letter-spacing: 0.06em;
  }

  small {
    color: #9ea9cc;
  }
`;

const FrontContent = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 22px;

  .speaker {
    color: #eef1ff;
    cursor: pointer;
  }

  h2 {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    line-height: 1.15;
  }
`;

const AnswerOptionsContainer = styled.div`
  margin-top: 24px;

  span {
    color: #d7def9;
    font-weight: 600;
  }

  ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    padding: 18px 0 0;
  }

  @media (max-width: 720px) {
    ul {
      grid-template-columns: 1fr;
    }
  }
`;

const AnswerOption = styled.li<AnswerOptionProps>`
  padding: 16px 18px;
  border-radius: 18px;
  border: 1px solid
    ${(props) =>
      props.selected
        ? "#7583ff"
        : props.correct
          ? "#4CAF50"
          : props.incorrect
            ? "#F44336"
            : "rgba(76, 85, 125, 0.45)"};
  background: ${(props) =>
    props.correct
      ? "rgba(76, 175, 80, 0.14)"
      : props.incorrect
        ? "rgba(244, 67, 54, 0.12)"
        : props.selected
          ? "rgba(117, 131, 255, 0.12)"
          : "rgba(33, 36, 51, 0.76)"};
  color: #eef1ff;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    transform: ${(props) => (props.disabled ? "none" : "translateY(-2px)")};
    border-color: ${(props) =>
      props.disabled ? "inherit" : "rgba(110, 136, 204, 0.7)"};
  }
`;

const NextButton = styled.button`
  margin-top: 18px;
  border: none;
  background: linear-gradient(135deg, #29aa8b, #6eccba);
  color: white;
  font-weight: 700;
  font-size: 0.98rem;
  border-radius: 18px;
  padding: 14px 22px;
  cursor: pointer;
  box-shadow: 0 18px 32px rgba(41, 170, 139, 0.24);
`;

const RoundSummary = styled.section`
  margin-top: 28px;
  display: grid;
  gap: 20px;
`;

const ResultsContainer = styled.div`
  padding: 28px;
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

  h3 {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
  }

  p {
    margin-top: 14px;
    color: #a9b4d8;
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

const NextRoundButton = styled.button`
  width: fit-content;
  border: none;
  padding: 14px 20px;
  border-radius: 18px;
  background: linear-gradient(135deg, #4968ec, #6e88cc);
  color: white;
  font-weight: 700;
  cursor: pointer;
`;

const ReviewedList = styled.div`
  padding: 26px;
  border-radius: 32px;
  border: 1px solid rgba(76, 85, 125, 0.42);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 25%),
    rgba(24, 27, 40, 0.88);
  box-shadow: 0 26px 52px rgba(7, 10, 20, 0.24);

  h3 {
    margin-bottom: 18px;
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
    display: grid;
    gap: 12px;
    padding: 0;
  }

  li {
    padding: 16px 18px;
    border-radius: 20px;
    border: 1px solid rgba(76, 85, 125, 0.4);
    background: rgba(33, 36, 51, 0.76);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .frontContent {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .speaker {
    cursor: pointer;
    color: #eef1ff;
  }

  .translation {
    color: #99a4c8;
  }
`;

const FinishedCard = styled.div`
  margin-top: 28px;
  padding: 30px;
  border-radius: 32px;
  border: 1px solid rgba(76, 85, 125, 0.42);
  background:
    linear-gradient(145deg, rgba(73, 104, 236, 0.1), transparent 38%),
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
    max-width: 620px;
    margin: 14px auto 0;
    color: #a9b4d8;
    line-height: 1.8;
  }
`;

const ActionsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 24px;

  a,
  button {
    padding: 12px 18px;
    border-radius: 16px;
    font-weight: 600;
  }

  a {
    border: 1px solid rgba(76, 85, 125, 0.45);
    background: rgba(33, 36, 51, 0.76);
    color: #eef1ff;
  }

  button {
    border: none;
    background: linear-gradient(135deg, #29aa8b, #6eccba);
    color: white;
    cursor: pointer;
  }
`;
