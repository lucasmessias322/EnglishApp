import styled from "styled-components";
import HeaderComponent from "../../Components/HeaderComponent";
import { useEffect, useRef, useState } from "react";
import { getTexts } from "../../Apis/englishplusApi";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { MutatingDots } from "react-loader-spinner";

interface Text {
  _id: string;
  level: string;
  title: string;
  resume: string;
  content: { paragrafo: string; audiotexturl: string }[];
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

        setLevels((prev) => {
          const ids = new Set(prev.map((text) => text._id));
          const filtered = res.data.filter((text: Text) => !ids.has(text._id));
          return [...prev, ...filtered];
        });

        if (res.data.length < 6) {
          setHasMore(false);
        }

        console.log(res);
        
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

  const completedCount = levels.filter((text) =>
    completedTexts.includes(text._id),
  ).length;

  const isTextCompleted = (id: string) => completedTexts.includes(id);

  return (
    <Container>
      <HeaderComponent showlogo fixed bgcolor="#161616" />

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

            return (
              <TextItem key={text._id} $completed={completed}>
                <Link to={`/text/${text._id}`}>
                  <CardTop>
                    <LevelBadge>{text.level}</LevelBadge>
                    {completed && (
                      <CompletedBadge>
                        <FaCheck size={12} />
                        Concluido
                      </CompletedBadge>
                    )}
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
  padding: 108px 16px 48px;
`;

const IntroCard = styled.section`
  padding: 28px;
  border-radius: 32px;
  border: 1px solid rgba(76, 85, 125, 0.45);
  background:
    linear-gradient(145deg, rgba(73, 104, 236, 0.12), transparent 40%),
    rgba(24, 27, 40, 0.9);
  box-shadow: 0 26px 52px rgba(7, 10, 20, 0.28);

  .eyebrow {
    display: inline-flex;
    margin-bottom: 10px;
    color: #8fe5d0;
    font-size: 0.88rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  h1 {
    max-width: 680px;
    font-size: clamp(2rem, 4vw, 3.2rem);
    line-height: 1.1;
    font-family: "Google Sans", "Poppins", sans-serif;
  }

  p {
    max-width: 620px;
    margin-top: 12px;
    color: #a9b4d8;
    line-height: 1.8;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 24px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
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
        props.$completed ? "rgba(41, 170, 139, 0.55)" : "rgba(76, 85, 125, 0.45)"};
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
