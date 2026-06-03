import { useContext, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaCheck,
  FaChevronRight,
  FaCog,
  FaHome,
  FaLayerGroup,
  FaPlay,
  FaRegNewspaper,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import { getTexts, getUserMemorizes } from "../../Apis/englishplusApi";
import { AuthContext } from "../../Context/AuthContext";
import LoadingComp from "../../Components/LoadingComp";

interface Text {
  _id: string;
  level: string;
  title: string;
  resume: string;
  hasAudios?: boolean | string;
  hasQuiz?: boolean | string;
  quizzes?: unknown[];
}

interface MemoType {
  _id: string;
  title: string;
  flashcards: { frontContent: string; backContent: string }[];
}

export default function AppDashboard() {
  const { token, userId, userData, logout } = useContext(AuthContext);
  const [texts, setTexts] = useState<Text[]>([]);
  const [decks, setDecks] = useState<MemoType[]>([]);
  const [completedTexts, setCompletedTexts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const completed = JSON.parse(
      localStorage.getItem("completed_texts") || "[]",
    );

    setCompletedTexts(completed);
  }, []);

  useEffect(() => {
    if (!token || !userId) {
      setIsLoading(false);
      return;
    }

    let isCancelled = false;

    async function loadDashboard() {
      try {
        setIsLoading(true);

        const [textsResponse, decksResponse] = await Promise.all([
          getTexts({ page: 1, limit: 4 }),
          getUserMemorizes(userId, token),
        ]);

        if (isCancelled) return;

        setTexts(textsResponse.data || []);
        setDecks(decksResponse || []);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isCancelled = true;
    };
  }, [token, userId]);

  useEffect(() => {
    if (!profileMenuOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [profileMenuOpen]);

  const firstName = userData?.name?.split(" ")[0] || "estudante";
  const fullName = userData?.name || "Estudante EnglishPlus";
  const userEmail = userData?.email || userData?.username || "Conta conectada";
  const decksWithCards = decks.filter((deck) => deck.flashcards.length > 0);
  const totalCards = decksWithCards.reduce(
    (total, deck) => total + deck.flashcards.length,
    0,
  );
  const completedVisibleTexts = texts.filter((text) =>
    completedTexts.includes(text._id),
  ).length;
  const completionPercent = texts.length
    ? Math.round((completedVisibleTexts / texts.length) * 100)
    : 0;

  const nextText = useMemo(
    () => texts.find((text) => !completedTexts.includes(text._id)) || texts[0],
    [completedTexts, texts],
  );
  const nextDeck = decksWithCards[0];

  return (
    <Container>
      <AppBar>
        <IconLink to="/" title="Pagina inicial">
          <FaHome />
        </IconLink>

        <HeaderTitle>
          <span>Dashboard</span>
          <strong>Ola, {firstName}</strong>
        </HeaderTitle>

        <ProfileMenuWrapper ref={profileMenuRef}>
          <ProfileBubble
            type="button"
            aria-label="Abrir menu do perfil"
            aria-expanded={profileMenuOpen}
            onClick={() => setProfileMenuOpen((isOpen) => !isOpen)}
          >
            {firstName.charAt(0).toUpperCase()}
          </ProfileBubble>

          {profileMenuOpen && (
            <ProfileDropdown>
              <UserSummary>
                <UserAvatar>
                  <FaUserCircle />
                </UserAvatar>
                <div>
                  <strong>{fullName}</strong>
                  <span>{userEmail}</span>
                </div>
              </UserSummary>

              <MenuAction
                type="button"
                onClick={() => setProfileMenuOpen(false)}
              >
                <FaCog />
                <div>
                  <strong>Settings</strong>
                  <span>Em breve</span>
                </div>
              </MenuAction>

              <MenuAction type="button" className="danger" onClick={logout}>
                <FaSignOutAlt />
                <div>
                  <strong>Desconectar</strong>
                  <span>Sair desta conta</span>
                </div>
              </MenuAction>
            </ProfileDropdown>
          )}
        </ProfileMenuWrapper>
      </AppBar>

      <Content>
        <HeroPanel>
          <span className="eyebrow">Seu ritmo hoje</span>
          <h1>Continue de onde parou.</h1>
          <p>
            Leitura, quiz e memorizacao reunidos em um painel rapido para usar
            no celular.
          </p>

          <ProgressBlock>
            <ProgressTop>
              <span>Textos recentes concluidos</span>
              <strong>{completionPercent}%</strong>
            </ProgressTop>
            <ProgressTrack aria-hidden="true">
              <ProgressFill $progress={completionPercent} />
            </ProgressTrack>
          </ProgressBlock>
        </HeroPanel>

        {isLoading ? (
          <LoadingState>
            <LoadingComp />
          </LoadingState>
        ) : (
          <>
            <StatsGrid>
              <StatCard $tone="blue">
                <FaRegNewspaper />
                <strong>{completedTexts.length}</strong>
                <span>textos concluidos</span>
              </StatCard>
              <StatCard $tone="green">
                <FaLayerGroup />
                <strong>{decksWithCards.length}</strong>
                <span>decks ativos</span>
              </StatCard>
              <StatCard $tone="orange">
                <GiBrain />
                <strong>{totalCards}</strong>
                <span>cards salvos</span>
              </StatCard>
            </StatsGrid>

            <QuickActions>
              <SectionTitle>Atalhos</SectionTitle>

              <ActionList>
                <ActionItem to="/textslist">
                  <ActionIcon $tone="blue">
                    <FaBookOpen />
                  </ActionIcon>
                  <div>
                    <strong>Continuar lendo</strong>
                    <span>Textos, audio e quiz</span>
                  </div>
                  <FaChevronRight className="chevron" />
                </ActionItem>

                <ActionItem to="/memorizelists">
                  <ActionIcon $tone="green">
                    <GiBrain />
                  </ActionIcon>
                  <div>
                    <strong>Revisar palavras</strong>
                    <span>Decks e treino ativo</span>
                  </div>
                  <FaChevronRight className="chevron" />
                </ActionItem>
              </ActionList>
            </QuickActions>

            <ContinueGrid>
              <ContinueCard>
                <CardTop>
                  <span>Proxima leitura</span>
                  {nextText && <LevelBadge>{nextText.level}</LevelBadge>}
                </CardTop>

                <h2>{nextText?.title || "Nenhum texto encontrado"}</h2>
                <p>
                  {nextText?.resume ||
                    "Quando novos textos aparecerem, eles entram aqui."}
                </p>

                <CardButton
                  to={nextText ? `/text/${nextText._id}` : "/textslist"}
                >
                  <FaPlay />
                  Abrir texto
                </CardButton>
              </ContinueCard>

              <ContinueCard>
                <CardTop>
                  <span>Deck em foco</span>
                  <LevelBadge>{nextDeck?.flashcards.length || 0} cards</LevelBadge>
                </CardTop>

                <h2>{nextDeck?.title || "Sem deck ativo"}</h2>
                <p>
                  {nextDeck
                    ? "Revise em rodadas curtas para fixar as palavras salvas."
                    : "Crie ou salve palavras em um texto para montar seu deck."}
                </p>

                <CardButton
                  to={nextDeck ? `/memolist/${nextDeck._id}` : "/memorizelists"}
                >
                  <FaCheck />
                  Revisar agora
                </CardButton>
              </ContinueCard>
            </ContinueGrid>
          </>
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-bottom: 28px;
`;

const AppBar = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) 44px;
  align-items: center;
  gap: 10px;
  padding: calc(env(safe-area-inset-top) + 10px) 12px 10px;
  border-bottom: 1px solid rgba(76, 85, 125, 0.24);
  background: rgba(12, 15, 24, 0.76);
  backdrop-filter: blur(16px);
`;

const IconLink = styled(Link)`
  width: 44px;
  height: 44px;
  border: 1px solid rgba(76, 85, 125, 0.45);
  border-radius: 16px;
  background: rgba(24, 27, 40, 0.86);
  color: #f5f7ff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.div`
  min-width: 0;

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

const ProfileMenuWrapper = styled.div`
  position: relative;
  justify-self: end;
`;

const ProfileBubble = styled.button`
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #29aa8b, #8fe5d0);
  color: #07121b;
  font-weight: 900;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #bdd0ff;
    outline-offset: 3px;
  }
`;

const ProfileDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: min(300px, calc(100vw - 24px));
  padding: 10px;
  border: 1px solid rgba(76, 85, 125, 0.45);
  border-radius: 22px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent 40%),
    rgba(18, 21, 32, 0.98);
  box-shadow: 0 22px 44px rgba(7, 10, 20, 0.34);
  backdrop-filter: blur(18px);
`;

const UserSummary = styled.div`
  min-width: 0;
  padding: 10px;
  border-radius: 18px;
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  background: rgba(33, 36, 51, 0.68);

  strong {
    display: block;
    color: #f5f7ff;
    font-size: 0.92rem;
    line-height: 1.25;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    display: block;
    margin-top: 3px;
    color: #99a4c8;
    font-size: 0.74rem;
    line-height: 1.25;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const UserAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #8fe5d0;
  background: rgba(41, 170, 139, 0.12);

  svg {
    font-size: 1.35rem;
  }
`;

const MenuAction = styled.button`
  width: 100%;
  min-height: 58px;
  margin-top: 8px;
  padding: 10px;
  border: 1px solid rgba(76, 85, 125, 0.32);
  border-radius: 18px;
  background: rgba(24, 27, 40, 0.76);
  color: #f5f7ff;
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr);
  align-items: center;
  gap: 9px;
  text-align: left;
  cursor: pointer;

  svg {
    color: #bdd0ff;
    font-size: 1rem;
    justify-self: center;
  }

  strong {
    display: block;
    font-size: 0.88rem;
    line-height: 1.2;
  }

  span {
    display: block;
    margin-top: 2px;
    color: #99a4c8;
    font-size: 0.72rem;
  }

  &:hover {
    border-color: rgba(143, 229, 208, 0.38);
    background: rgba(33, 36, 51, 0.88);
  }

  &.danger {
    color: #ffb4b4;

    svg {
      color: #ffb4b4;
    }
  }
`;

const Content = styled.main`
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  padding: calc(env(safe-area-inset-top) + 84px) 12px 0;
  display: grid;
  gap: 14px;
`;

const HeroPanel = styled.section`
  padding: 18px;
  border-radius: 26px;
  border: 1px solid rgba(76, 85, 125, 0.45);
  background:
    linear-gradient(145deg, rgba(41, 170, 139, 0.12), transparent 42%),
    rgba(24, 27, 40, 0.9);
  box-shadow: 0 18px 36px rgba(7, 10, 20, 0.22);

  .eyebrow {
    color: #8fe5d0;
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  h1 {
    margin-top: 8px;
    color: #f7f9ff;
    font-size: 1.65rem;
    line-height: 1.12;
  }

  p {
    margin-top: 8px;
    color: #a9b4d8;
    font-size: 0.92rem;
    line-height: 1.65;
  }
`;

const ProgressBlock = styled.div`
  margin-top: 16px;
  padding: 14px;
  border-radius: 20px;
  border: 1px solid rgba(76, 85, 125, 0.34);
  background: rgba(33, 36, 51, 0.68);
`;

const ProgressTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  color: #aeb8d8;
  font-size: 0.82rem;
  font-weight: 700;

  strong {
    color: #8fe5d0;
  }
`;

const ProgressTrack = styled.div`
  height: 7px;
  overflow: hidden;
  margin-top: 10px;
  border-radius: 999px;
  background: rgba(76, 85, 125, 0.34);
`;

const ProgressFill = styled.div<{ $progress: number }>`
  width: ${(props) => Math.min(100, Math.max(0, props.$progress))}%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #4968ec, #8fe5d0);
  transition: width 0.2s ease;
`;

const LoadingState = styled.div`
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
`;

const StatCard = styled.div<{ $tone: "blue" | "green" | "orange" }>`
  min-height: 104px;
  min-width: 0;
  padding: 12px 8px;
  border: 1px solid rgba(76, 85, 125, 0.36);
  border-radius: 20px;
  background: ${(props) =>
    props.$tone === "green"
      ? "rgba(14, 59, 68, 0.62)"
      : props.$tone === "orange"
        ? "rgba(70, 44, 24, 0.58)"
        : "rgba(39, 48, 82, 0.66)"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  text-align: center;

  svg {
    color: ${(props) =>
      props.$tone === "green"
        ? "#8fe5d0"
        : props.$tone === "orange"
          ? "#ffc878"
          : "#bdd0ff"};
    font-size: 1.15rem;
  }

  strong {
    color: #f5f7ff;
    font-size: 1.22rem;
    line-height: 1;
  }

  span {
    color: #b6c0df;
    font-size: 0.7rem;
    line-height: 1.25;
  }
`;

const QuickActions = styled.section`
  display: grid;
  gap: 10px;
`;

const SectionTitle = styled.h2`
  padding: 0 2px;
  color: #f5f7ff;
  font-size: 1.05rem;
  line-height: 1.2;
`;

const ActionList = styled.div`
  display: grid;
  gap: 10px;
`;

const ActionItem = styled(Link)`
  min-height: 72px;
  padding: 12px;
  border: 1px solid rgba(76, 85, 125, 0.4);
  border-radius: 22px;
  background: rgba(24, 27, 40, 0.88);
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) 18px;
  align-items: center;
  gap: 12px;

  strong {
    display: block;
    color: #f5f7ff;
    font-size: 0.96rem;
    line-height: 1.25;
  }

  span {
    display: block;
    margin-top: 3px;
    color: #99a4c8;
    font-size: 0.78rem;
  }

  .chevron {
    color: #8390b7;
    font-size: 0.8rem;
  }
`;

const ActionIcon = styled.div<{ $tone: "blue" | "green" }>`
  width: 48px;
  height: 48px;
  border-radius: 17px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$tone === "green" ? "#8fe5d0" : "#bdd0ff")};
  background: ${(props) =>
    props.$tone === "green"
      ? "rgba(41, 170, 139, 0.12)"
      : "rgba(73, 104, 236, 0.16)"};

  svg {
    font-size: 1.18rem;
  }
`;

const ContinueGrid = styled.section`
  display: grid;
  gap: 12px;
`;

const ContinueCard = styled.article`
  padding: 16px;
  border-radius: 24px;
  border: 1px solid rgba(76, 85, 125, 0.42);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 38%),
    rgba(24, 27, 40, 0.88);
  box-shadow: 0 18px 36px rgba(7, 10, 20, 0.18);

  h2 {
    margin-top: 14px;
    color: #f5f7ff;
    font-size: 1.14rem;
    line-height: 1.25;
  }

  p {
    margin-top: 8px;
    color: #99a4c8;
    font-size: 0.86rem;
    line-height: 1.62;
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  span {
    color: #8fe5d0;
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
  }
`;

const LevelBadge = styled.span`
  min-height: 30px;
  padding: 7px 10px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(73, 104, 236, 0.16);
  color: #bdd0ff !important;
  font-size: 0.74rem !important;
  text-transform: none !important;
`;

const CardButton = styled(Link)`
  min-height: 50px;
  margin-top: 16px;
  border-radius: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  width: 100%;
  background: linear-gradient(135deg, #29aa8b, #8fe5d0);
  color: #07121b;
  font-weight: 800;
`;
