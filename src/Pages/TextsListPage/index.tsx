import styled from "styled-components";
import HeaderComponent from "../../Components/HeaderComponent";
import { useEffect, useRef, useState } from "react";
import { getTexts } from "../../Apis/englishplusApi";
import { Link } from "react-router-dom";
import {
  FaCheck,
  FaQuestionCircle,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import { MutatingDots } from "react-loader-spinner";

interface Text {
  _id: string;
  level: string;
  title: string;
  resume: string;
  hasAudios?: boolean | string;
  hasQuiz?: boolean | string;
  content?: { paragraph: string; audiotexturl?: string | null }[];
  quizzes?: unknown[];
}

export default function TextsListPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [levels, setLevels] = useState<Text[]>([]);
  const [completedTexts, setCompletedTexts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    //if (!hasMore || isFetchingRef.current) return;

    let isCancelled = false;
    isFetchingRef.current = true;
    setIsLoading(true);

    getTexts({ page: currentPage, limit: 6 })
      .then((res) => {
        if (isCancelled) return;

        const texts = res.data || [];

        setLevels((prev) => {
          const ids = new Set(prev.map((text) => text._id));
          const filtered = texts.filter((text: Text) => !ids.has(text._id));
          return [...prev, ...filtered];
        });

        if (texts.length < 6) {
          setHasMore(false);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setHasMore(false);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
          isFetchingRef.current = false;
        }
      });

    return () => {
      isCancelled = true;
      isFetchingRef.current = false;
    };
  }, [currentPage, hasMore]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingRef.current) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0,
      },
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore]);

  useEffect(() => {
    const completed = JSON.parse(
      localStorage.getItem("completed_texts") || "[]",
    );
    setCompletedTexts(completed);
  }, []);

  const isTextCompleted = (id: string) => completedTexts.includes(id);

  const textHasAudio = (text: Text) => {
    if (typeof text.hasAudios === "boolean") {
      return text.hasAudios;
    }

    if (typeof text.hasAudios === "string") {
      const normalizedValue = text.hasAudios.trim().toLowerCase();

      if (["true", "sim", "yes", "1"].includes(normalizedValue)) {
        return true;
      }
    }

    return (
      text.content?.some((paragraph) =>
        Boolean(paragraph.audiotexturl?.trim()),
      ) ?? false
    );
  };

  const textHasQuiz = (text: Text) => {
    if (typeof text.hasQuiz === "boolean") {
      return text.hasQuiz;
    }

    if (typeof text.hasQuiz === "string") {
      const normalizedValue = text.hasQuiz.trim().toLowerCase();

      if (["true", "sim", "yes", "1"].includes(normalizedValue)) {
        return true;
      }
    }

    return Boolean(text.quizzes?.length);
  };

  return (
    <Container>
      <HeaderComponent showBackButton fixed />

      <Content>
        <SectionHeader>
          <div>
            <span>Selecione um texto</span>
            <h2>Escolha sua proxima leitura</h2>
          </div>
        </SectionHeader>

        <TextListWrapper>
          {levels.map((text) => {
            const completed = isTextCompleted(text._id);
            const hasAudio = textHasAudio(text);
            const hasQuiz = textHasQuiz(text);

            return (
              <TextItem key={text._id} $completed={completed}>
                <Link to={`/text/${text._id}`}>
                  <CardTop>
                    <LevelBadge>{text.level}</LevelBadge>
                    <BadgeGroup>
                      <AudioBadge $hasAudio={hasAudio}>
                        {hasAudio ? (
                          <FaVolumeUp size={12} />
                        ) : (
                          <FaVolumeMute size={12} />
                        )}
                        {hasAudio ? "Com audio" : "Sem audio"}
                      </AudioBadge>
                      <QuizBadge $hasQuiz={hasQuiz}>
                        <FaQuestionCircle size={12} />
                        {hasQuiz ? "Com quiz" : "Sem quiz"}
                      </QuizBadge>
                      {completed && (
                        <CompletedBadge>
                          <FaCheck size={12} />
                          Concluido
                        </CompletedBadge>
                      )}
                    </BadgeGroup>
                  </CardTop>

                  <h3>{text.title}</h3>
                  <p>{text.resume}</p>

                  <CardFooter>
                    <span>Ler agora</span>
                    <small>
                      {completed ? "Pronto para revisar" : "Novo para estudar"}
                    </small>
                  </CardFooter>
                </Link>
              </TextItem>
            );
          })}
        </TextListWrapper>

        {hasMore && (
          <LoadingWrapper ref={loaderRef}>
            {isLoading && (
              <>
                <MutatingDots
                  visible
                  height="100"
                  width="100"
                  color="#a0bbdb"
                  secondaryColor="#29aa8b"
                  radius="12.5"
                  ariaLabel="mutating-dots-loading"
                />
                <span>Carregando mais textos para voce...</span>
              </>
            )}
          </LoadingWrapper>
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.main`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 70px 16px 48px;
`;

const SectionHeader = styled.div`
  margin: 34px 0 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    display: inline-flex;
    margin-bottom: 8px;
    color: #8fe5d0;
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  h2 {
    font-size: clamp(1.5rem, 3vw, 2.2rem);
  }
`;

const TextListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  padding: 0;
`;

const TextItem = styled.li<{ $completed?: boolean }>`
  list-style: none;

  a {
    min-height: 260px;
    height: 100%;
    padding: 22px;
    border-radius: 28px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    border: 1px solid
      ${(props) =>
        props.$completed
          ? "rgba(41, 170, 139, 0.55)"
          : "rgba(76, 85, 125, 0.45)"};
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent 45%),
      rgba(24, 27, 40, 0.86);
    box-shadow: 0 22px 45px rgba(7, 10, 20, 0.2);
    transition:
      transform 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  a:hover {
    transform: translateY(-4px);
    border-color: rgba(110, 136, 204, 0.7);
    box-shadow: 0 28px 50px rgba(7, 10, 20, 0.28);
  }

  h3 {
    font-size: 1.3rem;
    line-height: 1.3;
    color: #eef1ff;
  }

  p {
    color: #9ea9cc;
    line-height: 1.7;
    flex: 1;
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
`;

const BadgeGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex-wrap: wrap;
`;

const LevelBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(73, 104, 236, 0.15);
  color: #bdd0ff;
  font-size: 0.86rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const AudioBadge = styled.span<{ $hasAudio: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: ${(props) =>
    props.$hasAudio ? "rgba(73, 104, 236, 0.15)" : "rgba(128, 139, 170, 0.12)"};
  color: ${(props) => (props.$hasAudio ? "#bdd0ff" : "#aeb7d4")};
  font-size: 0.84rem;
  white-space: nowrap;
`;

const QuizBadge = styled.span<{ $hasQuiz: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: ${(props) =>
    props.$hasQuiz ? "rgba(253, 190, 85, 0.15)" : "rgba(128, 139, 170, 0.12)"};
  color: ${(props) => (props.$hasQuiz ? "#ffd38a" : "#aeb7d4")};
  font-size: 0.84rem;
  white-space: nowrap;
`;

const CompletedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(41, 170, 139, 0.12);
  color: #8fe5d0;
  font-size: 0.84rem;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: #d7def9;

  span {
    font-weight: 600;
  }

  small {
    color: #8390b7;
  }
`;

const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 28px 0 8px;
  color: #99a4c8;
  text-align: center;
`;
