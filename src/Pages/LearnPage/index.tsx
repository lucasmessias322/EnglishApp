import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { getOneEspecific } from "../../Apis/englishplusApi";
import { AuthContext } from "../../Context/AuthContext";
import { FaBook } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import handleTextToSpeech from "../../utils/TextToSpeech";
import HeaderComponent from "../../Components/HeaderComponent";

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
    if (!memoid || !token) return;

    let isCancelled = false;

    getOneEspecific(memoid, token).then((res) => {
      if (isCancelled) return;
      setMemo(res[0]);
    });

    return () => {
      isCancelled = true;
    };
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
  const answeredCards = finishedAllRounds
    ? totalCards
    : Math.min(currentCardIndex + (isCorrect !== null ? 1 : 0), totalCards);
  const overallProgress =
    totalCards > 0 ? Math.round((answeredCards / totalCards) * 100) : 0;
  const activeRoundStep = Math.min(roundProgress + 1, cardsPerRound);
  const currentFrontContent =
    memo && memo.flashcards[currentCardIndex]
      ? memo.flashcards[currentCardIndex].frontContent
      : "";

  return (
    <Container>
      <PageHeader>
        <CloseLink to={`/memolist/${memoid}`} title="Voltar para o deck">
          <IoIosArrowBack size={25} />
        </CloseLink>
        <RoundBadge>
          {currentRound > 0 ? `Round ${currentRound}` : "Fim"}
        </RoundBadge>
        <HeaderTitle>
          <span>Aprender</span>
          <strong>{memo?.title || "Preparando treino"}</strong>
        </HeaderTitle>
      </PageHeader>

      <SectionWrapper>
        <StudyStatus>
          <StatusTop>
            <div>
              <span className="eyebrow">Treino guiado</span>
              <strong>
                {answeredCards}/{totalCards || 0} cards
              </strong>
            </div>
            <ProgressValue>{overallProgress}%</ProgressValue>
          </StatusTop>

          <ProgressTrack aria-hidden="true">
            <ProgressFill $progress={overallProgress} />
          </ProgressTrack>

          <QuickStats>
            <span>
              <strong>{correctAnswers}</strong>
              Acertos
            </span>
            <span>
              <strong>{incorrectAnswers}</strong>
              Erros
            </span>
            <span>
              <strong>{totalCards}</strong>
              Deck
            </span>
          </QuickStats>
        </StudyStatus>

        {!roundFinished && !finishedAllRounds && memo && totalCards > 0 && (
          <TrainingCard>
            <PromptCard>
              <PromptTop>
                <span>
                  <FaBook size={13} />
                  Palavra da vez
                </span>
                <small>
                  {activeRoundStep}/{cardsPerRound}
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
              <span>Escolha a traducao</span>
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

        {memo && totalCards === 0 && (
          <EmptyState>
            <span className="eyebrow">Deck vazio</span>
            <h2>Nenhum card para treinar ainda.</h2>
            <Link to={`/memolist/${memoid}`}>Voltar para o deck</Link>
          </EmptyState>
        )}

        {showNextButton && (
          <ActionDock>
            <NextButton type="button" onClick={handleNextCard}>
              Proximo card
            </NextButton>
          </ActionDock>
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
  padding: calc(env(safe-area-inset-top) + 76px) 12px 96px;
`;

const PageHeader = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  display: grid;
  grid-template-columns: minmax(44px, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  padding: calc(env(safe-area-inset-top) + 10px) 12px 10px;
  border-bottom: 1px solid rgba(76, 85, 125, 0.24);

  backdrop-filter: blur(16px);
`;

const CloseLink = styled(Link)`
  width: 44px;
  height: 44px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(24, 27, 40, 0.86);
  border: 1px solid rgba(76, 85, 125, 0.45);
  color: #f5f7ff;
`;

const HeaderTitle = styled.div`
  min-width: 0;
  justify-self: end;
  text-align: right;

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

const RoundBadge = styled.span`
  min-width: 44px;
  height: 44px;
  padding: 0 12px;
  border-radius: 16px;
  justify-self: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(73, 104, 236, 0.14);
  border: 1px solid rgba(110, 136, 204, 0.32);
  color: #bdd0ff;
  font-size: 0.86rem;
  font-weight: 800;
`;

const SectionWrapper = styled.main`
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  display: grid;
  gap: 14px;
`;

const StudyStatus = styled.section`
  padding: 16px;
  border-radius: 24px;
  border: 1px solid rgba(76, 85, 125, 0.45);
  background:
    linear-gradient(145deg, rgba(41, 170, 139, 0.12), transparent 40%),
    rgba(24, 27, 40, 0.9);
  box-shadow: 0 18px 36px rgba(7, 10, 20, 0.22);

  .eyebrow {
    display: block;
    color: #8fe5d0;
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
  }
`;

const StatusTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  strong {
    display: block;
    margin-top: 4px;
    color: #f5f7ff;
    font-size: 1.05rem;
    line-height: 1.2;
  }
`;

const ProgressValue = styled.span`
  min-width: 52px;
  height: 38px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 18, 28, 0.56);
  color: #bdd0ff;
  font-size: 0.9rem;
  font-weight: 800;
`;

const ProgressTrack = styled.div`
  height: 8px;
  margin-top: 14px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(76, 85, 125, 0.34);
`;

const ProgressFill = styled.div<{ $progress: number }>`
  width: ${(props) => Math.min(100, Math.max(0, props.$progress))}%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #29aa8b, #8fe5d0);
  transition: width 0.2s ease;
`;

const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 14px;

  span {
    min-width: 0;
    min-height: 58px;
    border: 1px solid rgba(76, 85, 125, 0.32);
    border-radius: 18px;
    padding: 9px 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
    color: #99a4c8;
    background: rgba(33, 36, 51, 0.64);
    font-size: 0.76rem;
    font-weight: 700;
    text-align: center;
  }

  strong {
    color: #f5f7ff;
    font-size: 1.05rem;
  }
`;

const TrainingCard = styled.section`
  padding: 0;
  border-radius: 26px;
  border: 1px solid rgba(76, 85, 125, 0.42);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 25%),
    rgba(24, 27, 40, 0.88);
  box-shadow: 0 18px 36px rgba(7, 10, 20, 0.2);
  overflow: hidden;
`;

const PromptCard = styled.div`
  padding: 18px;
  border-bottom: 1px solid rgba(76, 85, 125, 0.36);
  background:
    radial-gradient(
      circle at top right,
      rgba(41, 170, 139, 0.14),
      transparent 34%
    ),
    rgba(33, 36, 51, 0.88);
`;

const PromptTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  span {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: #8fe5d0;
    text-transform: uppercase;
    font-size: 0.72rem;
    font-weight: 800;
  }

  small {
    min-width: 52px;
    min-height: 30px;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(15, 18, 28, 0.48);
    color: #9ea9cc;
    font-weight: 800;
  }
`;

const FrontContent = styled.div`
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  margin-top: 18px;

  .speaker {
    width: 54px;
    height: 54px;
    padding: 14px;
    border-radius: 19px;
    color: #07121b;
    background: linear-gradient(135deg, #29aa8b, #8fe5d0);
    cursor: pointer;
    box-shadow: 0 14px 28px rgba(41, 170, 139, 0.18);
  }

  h2 {
    min-width: 0;
    color: #f5f7ff;
    font-size: 2rem;
    line-height: 1.15;
    overflow-wrap: anywhere;
  }
`;

const AnswerOptionsContainer = styled.div`
  padding: 18px;

  span {
    color: #d7def9;
    font-size: 0.88rem;
    font-weight: 800;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px 0 0;
  }
`;

const AnswerOption = styled.li<AnswerOptionProps>`
  min-height: 58px;
  padding: 14px 16px;
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
  display: flex;
  align-items: center;
  overflow-wrap: anywhere;
  font-size: 0.96rem;
  font-weight: 700;
  line-height: 1.35;
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

const ActionDock = styled.div`
  position: fixed;
  left: 50%;
  bottom: max(12px, env(safe-area-inset-bottom));
  z-index: 30;
  width: min(100% - 24px, 430px);
  transform: translateX(-50%);
`;

const NextButton = styled.button`
  width: 100%;
  min-height: 56px;
  border: none;
  background: linear-gradient(135deg, #29aa8b, #8fe5d0);
  color: #07121b;
  font-weight: 800;
  font-size: 0.98rem;
  border-radius: 19px;
  padding: 14px 22px;
  cursor: pointer;
  box-shadow: 0 18px 32px rgba(41, 170, 139, 0.24);
`;

const RoundSummary = styled.section`
  display: grid;
  gap: 14px;
`;

const ResultsContainer = styled.div`
  padding: 22px 18px;
  border-radius: 26px;
  border: 1px solid rgba(76, 85, 125, 0.42);
  background:
    linear-gradient(145deg, rgba(41, 170, 139, 0.08), transparent 38%),
    rgba(24, 27, 40, 0.88);
  box-shadow: 0 18px 36px rgba(7, 10, 20, 0.2);
  text-align: center;

  .eyebrow {
    display: inline-flex;
    margin-bottom: 10px;
    color: #8fe5d0;
    font-size: 0.76rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  h3 {
    font-size: 1.45rem;
  }

  p {
    margin-top: 14px;
    color: #a9b4d8;
  }
`;

const ResultPill = styled.span`
  display: block;
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
  width: 100%;
  min-height: 54px;
  border: none;
  padding: 14px 20px;
  border-radius: 19px;
  background: linear-gradient(135deg, #29aa8b, #8fe5d0);
  color: #07121b;
  font-weight: 800;
  cursor: pointer;
`;

const ReviewedList = styled.div`
  padding: 18px;
  border-radius: 26px;
  border: 1px solid rgba(76, 85, 125, 0.42);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 25%),
    rgba(24, 27, 40, 0.88);
  box-shadow: 0 18px 36px rgba(7, 10, 20, 0.2);

  h3 {
    margin-bottom: 14px;
    font-size: 1.05rem;
  }

  ul {
    list-style: none;
    display: grid;
    gap: 12px;
    padding: 0;
  }

  li {
    min-height: 58px;
    padding: 13px 14px;
    border-radius: 18px;
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
  padding: 24px 18px;
  border-radius: 26px;
  border: 1px solid rgba(76, 85, 125, 0.42);
  background:
    linear-gradient(145deg, rgba(73, 104, 236, 0.1), transparent 38%),
    rgba(24, 27, 40, 0.88);
  box-shadow: 0 18px 36px rgba(7, 10, 20, 0.2);
  text-align: center;

  .eyebrow {
    display: inline-flex;
    margin-bottom: 10px;
    color: #8fe5d0;
    font-size: 0.76rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  h2 {
    font-size: 1.5rem;
  }

  p {
    margin: 14px auto 0;
    color: #a9b4d8;
    line-height: 1.8;
  }
`;

const ActionsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-top: 24px;

  a,
  button {
    min-height: 52px;
    padding: 14px 18px;
    border-radius: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
  }

  a {
    border: 1px solid rgba(76, 85, 125, 0.45);
    background: rgba(33, 36, 51, 0.76);
    color: #eef1ff;
  }

  button {
    border: none;
    background: linear-gradient(135deg, #29aa8b, #8fe5d0);
    color: #07121b;
    cursor: pointer;
  }
`;

const EmptyState = styled.div`
  padding: 24px 18px;
  border-radius: 26px;
  border: 1px solid rgba(76, 85, 125, 0.42);
  background: rgba(24, 27, 40, 0.88);
  text-align: center;

  .eyebrow {
    color: #8fe5d0;
    font-size: 0.76rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  h2 {
    margin-top: 10px;
    font-size: 1.4rem;
  }

  a {
    min-height: 52px;
    margin-top: 18px;
    padding: 14px 18px;
    border-radius: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #29aa8b, #8fe5d0);
    color: #07121b;
    font-weight: 800;
  }
`;
