import styled from "styled-components";
import HeaderComponent from "../../Components/HeaderComponent";
import { useEffect, useRef, useState } from "react";
import { getTexts } from "../../Apis/englishplusApi";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaCheck,
  FaFilter,
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

const textLevels = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default function TextsListPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [levels, setLevels] = useState<Text[]>([]);
  const [completedTexts, setCompletedTexts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);
  const selectedLevelKey = selectedLevels.join(",");

  useEffect(() => {
    if (!hasMore || isFetchingRef.current) return;

    let isCancelled = false;
    isFetchingRef.current = true;
    setIsLoading(true);
    const requestedLevels = selectedLevelKey
      ? selectedLevelKey.split(",")
      : undefined;

    getTexts({
      page: currentPage,
      limit: 6,
      levels: requestedLevels,
    })
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
  }, [currentPage, hasMore, selectedLevelKey]);

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

  useEffect(() => {
    const closeFilterOnOutsideClick = (event: MouseEvent) => {
      if (!filterRef.current?.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", closeFilterOnOutsideClick);

    return () => {
      document.removeEventListener("mousedown", closeFilterOnOutsideClick);
    };
  }, []);

  const isTextCompleted = (id: string) => completedTexts.includes(id);

  const resetTextsPagination = () => {
    setLevels([]);
    setCurrentPage(1);
    setHasMore(true);
  };

  const handleLevelFilter = (level: string) => {
    setSelectedLevels((prev) => {
      const nextLevels = prev.includes(level)
        ? prev.filter((selectedLevel) => selectedLevel !== level)
        : [...prev, level];

      return textLevels.filter((textLevel) => nextLevels.includes(textLevel));
    });
    resetTextsPagination();
  };

  const handleClearLevels = () => {
    if (!selectedLevels.length) return;

    setSelectedLevels([]);
    resetTextsPagination();
  };

  const visibleTexts =
    selectedLevels.length === 0
      ? levels
      : levels.filter(
          (text) => selectedLevels.includes(text.level.trim().toUpperCase()),
        );

  const selectedLevelLabel = selectedLevels.length
    ? selectedLevels.join(", ")
    : "Todos os niveis";

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
      <HeaderComponent showBackButton="/" fixed />

      <Content>
        <SectionHeader>
          <div>
            <span>Selecione um texto</span>
            <h2>Escolha sua proxima leitura</h2>
          </div>

          <FilterPanel ref={filterRef}>
            <FilterLabel>
              <FaFilter size={13} />
              Nivel
            </FilterLabel>

            <DropdownButton
              type="button"
              aria-expanded={isFilterOpen}
              aria-haspopup="menu"
              onClick={() => setIsFilterOpen((isOpen) => !isOpen)}
            >
              <span>{selectedLevelLabel}</span>
              <FaChevronDown size={12} />
            </DropdownButton>

            {isFilterOpen && (
              <FilterMenu role="menu" aria-label="Filtrar textos por dificuldade">
                <AllLevelsButton
                  type="button"
                  $active={selectedLevels.length === 0}
                  onClick={handleClearLevels}
                >
                  Todos os niveis
                </AllLevelsButton>

                {textLevels.map((level) => (
                  <LevelOption key={level}>
                    <input
                      type="checkbox"
                      checked={selectedLevels.includes(level)}
                      onChange={() => handleLevelFilter(level)}
                    />
                    <span>{level}</span>
                  </LevelOption>
                ))}
              </FilterMenu>
            )}
          </FilterPanel>
        </SectionHeader>

        {visibleTexts.length === 0 && !isLoading && !hasMore ? (
          <EmptyState>
            Nenhum texto encontrado para esse nivel no momento.
          </EmptyState>
        ) : (
          <TextListWrapper>
            {visibleTexts.map((text) => {
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
        )}

        {hasMore && (
          <LoadingWrapper ref={loaderRef}>
            {isLoading && (
              <>
                <MutatingDots
                  visible
                  height="100"
                  width="100"
                  color="var(--primary-soft)"
                  secondaryColor="var(--accent)"
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
  gap: 18px;
  flex-wrap: wrap;

  > div > span {
    display: inline-flex;
    margin-bottom: 8px;
    color: var(--accent-soft);
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  h2 {
    font-size: clamp(1.5rem, 3vw, 2.2rem);
  }
`;

const FilterPanel = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
`;

const FilterLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: var(--muted);
  font-size: 0.86rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const DropdownButton = styled.button`
  min-width: 178px;
  min-height: 40px;
  padding: 8px 14px;
  border-radius: 14px;
  border: 1px solid rgba(var(--primary-strong-rgb), 0.32);
  background: var(--control-bg);
  color: var(--text);
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    border-color: rgba(var(--primary-strong-rgb), 0.7);
  }

  &:focus {
    outline: none;
    border-color: rgba(var(--primary-strong-rgb), 0.82);
    box-shadow: 0 0 0 3px rgba(var(--primary-strong-rgb), 0.16);
  }
`;

const FilterMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 5;
  min-width: 178px;
  padding: 8px;
  border-radius: 16px;
  border: 1px solid rgba(var(--primary-strong-rgb), 0.28);
  background: var(--glass-bg);
  box-shadow: 0 18px 42px rgba(7, 10, 20, 0.28);
`;

const AllLevelsButton = styled.button<{ $active: boolean }>`
  width: 100%;
  min-height: 38px;
  padding: 8px 10px;
  border: 0;
  border-radius: 10px;
  background: ${(props) =>
    props.$active
      ? "rgba(var(--primary-strong-rgb), 0.18)"
      : "transparent"};
  color: ${(props) => (props.$active ? "var(--primary-soft)" : "var(--text)")};
  font: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: rgba(var(--primary-strong-rgb), 0.14);
    color: var(--primary-soft);
  }
`;

const LevelOption = styled.label`
  min-height: 38px;
  padding: 8px 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: rgba(var(--primary-strong-rgb), 0.12);
  }

  input {
    width: 16px;
    height: 16px;
    accent-color: var(--primary-soft);
  }
`;

const TextListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  padding: 0;
`;

const EmptyState = styled.div`
  width: 100%;
  padding: 28px;
  border-radius: 24px;
  border: 1px solid rgba(var(--primary-strong-rgb), 0.24);
  background: var(--glass-bg);
  color: var(--muted);
  text-align: center;
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
          ? "rgba(var(--accent-rgb), 0.55)"
          : "rgba(var(--primary-strong-rgb), 0.26)"};
    background:
      linear-gradient(180deg, rgba(var(--primary-strong-rgb), 0.08), transparent 45%),
      var(--glass-bg);
    box-shadow: 0 22px 45px rgba(7, 10, 20, 0.2);
    transition:
      transform 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  a:hover {
    transform: translateY(-4px);
    border-color: rgba(var(--primary-strong-rgb), 0.7);
    box-shadow: 0 28px 50px rgba(7, 10, 20, 0.28);
  }

  h3 {
    font-size: 1.3rem;
    line-height: 1.3;
    color: var(--text);
  }

  p {
    color: var(--muted);
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
  background: rgba(var(--primary-strong-rgb), 0.15);
  color: var(--primary-soft);
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
    props.$hasAudio
      ? "rgba(var(--primary-strong-rgb), 0.15)"
      : "rgba(128, 139, 170, 0.12)"};
  color: ${(props) => (props.$hasAudio ? "var(--primary-soft)" : "var(--muted)")};
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
    props.$hasQuiz
      ? "rgba(var(--accent-rgb), 0.14)"
      : "rgba(128, 139, 170, 0.12)"};
  color: ${(props) => (props.$hasQuiz ? "var(--accent-soft)" : "var(--muted)")};
  font-size: 0.84rem;
  white-space: nowrap;
`;

const CompletedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(var(--accent-rgb), 0.12);
  color: var(--accent-soft);
  font-size: 0.84rem;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: var(--text);

  span {
    font-weight: 600;
  }

  small {
    color: var(--muted);
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
  color: var(--muted);
  text-align: center;
`;
