import styled from "styled-components";
import HeaderComponent from "../../Components/HeaderComponent";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getMemorizes, getUserMemorizes } from "../../Apis/englishplusApi";
import { AuthContext } from "../../Context/AuthContext";
import LoadingComp from "../../Components/LoadingComp";

interface MemoType {
  _id: string;
  title: string;
  flashcards: [];
}

export default function MemorizeLists() {
  const [memoList, setMemoList] = useState<MemoType[]>([]);
  const [memoTextAndNews, setMemoTextAndNews] = useState<MemoType[]>([]);
  const [publicMemos, setPublicMemos] = useState<MemoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token, userId } = useContext(AuthContext);

  useEffect(() => {
    if (!token || !userId) {
      setIsLoading(false);
      return;
    }

    let isCancelled = false;

    async function getAllMemos() {
      try {
        setIsLoading(true);

        const [publicResponse, userResponse] = await Promise.all([
          getMemorizes(token),
          getUserMemorizes(userId, token),
        ]);

        if (isCancelled) return;

        setPublicMemos(publicResponse);
        setMemoTextAndNews(userResponse);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    getAllMemos();

    return () => {
      isCancelled = true;
    };
  }, [token, userId]);

  useEffect(() => {
    const uniqueMemoMap = new Map<string, MemoType>();
    [...memoTextAndNews, ...publicMemos].forEach((memo) => {
      uniqueMemoMap.set(memo._id, memo);
    });

    setMemoList(Array.from(uniqueMemoMap.values()));
  }, [memoTextAndNews, publicMemos]);

  const userMemoIds = new Set(memoTextAndNews.map((memo) => memo._id));

  const decks = memoList.filter((item) => item.flashcards.length > 0);

  return (
    <Container>
      <HeaderComponent showlogo fixed bgcolor="#161616" />

      <Content>
        <HeroSection>
          <span className="eyebrow">Memorizacao ativa</span>
          <h1>Treine vocabulario em decks com um visual mais limpo e focado.</h1>
          <p>
            Seus cards ficam organizados em um espaco mais claro, com acesso
            rapido para revisar palavras vindas dos textos ou de listas publicas.
          </p>

          <HeroStats>
            <div>
              <strong>{decks.length}</strong>
              <span>decks disponiveis</span>
            </div>
            <div>
              <strong>{memoTextAndNews.length}</strong>
              <span>listas pessoais</span>
            </div>
            <div>
              <strong>{publicMemos.length}</strong>
              <span>listas compartilhadas</span>
            </div>
          </HeroStats>
        </HeroSection>

        {isLoading ? (
          <LoadingState>
            <LoadingComp />
          </LoadingState>
        ) : (
          <DecksSection>
            <SectionLabel>
              <span>Suas listas</span>
              <h2>Escolha um deck para revisar agora</h2>
            </SectionLabel>

            <DecksList>
              {decks.map((item) => (
                <DeckItem key={item._id} personal={userMemoIds.has(item._id)}>
                  <Link to={`/memolist/${item._id}`}>
                    <TopRow>
                      <SourceTag personal={userMemoIds.has(item._id)}>
                        {userMemoIds.has(item._id) ? "Seu deck" : "Compartilhado"}
                      </SourceTag>
                      <span className="count">{item.flashcards.length} cards</span>
                    </TopRow>

                    <h3>{item.title}</h3>
                    <p>
                      Revise palavras em rodadas curtas e acompanhe o que ja esta
                      firme e o que ainda precisa voltar.
                    </p>

                    <BottomRow>
                      <strong>Abrir deck</strong>
                      <small>Memorizacao guiada</small>
                    </BottomRow>
                  </Link>
                </DeckItem>
              ))}
            </DecksList>
          </DecksSection>
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

const HeroSection = styled.section`
  padding: 28px;
  border-radius: 32px;
  border: 1px solid rgba(var(--primary-strong-rgb), 0.26);
  background:
    linear-gradient(145deg, rgba(var(--accent-rgb), 0.12), transparent 40%),
    var(--glass-bg);
  box-shadow: 0 26px 52px rgba(7, 10, 20, 0.28);

  .eyebrow {
    display: inline-flex;
    margin-bottom: 10px;
    color: var(--accent-soft);
    font-size: 0.88rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  h1 {
    max-width: 760px;
    font-size: clamp(2rem, 4vw, 3.1rem);
    line-height: 1.08;
    font-family: "Google Sans", "Poppins", sans-serif;
  }

  p {
    max-width: 640px;
    margin-top: 12px;
    color: var(--muted);
    line-height: 1.8;
  }
`;

const HeroStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 24px;

  div {
    padding: 18px;
    border-radius: 22px;
    background: var(--control-bg);
    border: 1px solid rgba(var(--primary-strong-rgb), 0.24);
  }

  strong {
    display: block;
    font-size: 1.6rem;
  }

  span {
    color: var(--muted);
    font-size: 0.95rem;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const LoadingState = styled.div`
  padding: 28px 0;
`;

const DecksSection = styled.section`
  margin-top: 34px;
`;

const SectionLabel = styled.div`
  margin-bottom: 18px;

  span {
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

const DecksList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  padding: 0;
`;

const DeckItem = styled.li<{ personal?: boolean }>`
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
        props.personal
          ? "rgba(var(--accent-rgb), 0.52)"
          : "rgba(var(--primary-strong-rgb), 0.26)"};
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent 45%),
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
  }

  p {
    color: var(--muted);
    line-height: 1.7;
    flex: 1;
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;

  .count {
    color: var(--text);
    font-size: 0.9rem;
  }
`;

const SourceTag = styled.span<{ personal?: boolean }>`
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: ${(props) =>
    props.personal
      ? "rgba(var(--accent-rgb), 0.12)"
      : "rgba(var(--primary-strong-rgb), 0.12)"};
  color: ${(props) =>
    props.personal ? "var(--accent-soft)" : "var(--primary-soft)"};
  font-size: 0.84rem;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  strong {
    color: var(--text);
  }

  small {
    color: var(--muted);
  }
`;
