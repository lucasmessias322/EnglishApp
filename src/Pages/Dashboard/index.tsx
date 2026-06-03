import styled from "styled-components";
import {
  FaDownload,
  FaMobileAlt,
  FaRegNewspaper,
  FaShareAlt,
  FaTextHeight,
  FaTimes,
} from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { GiBrain } from "react-icons/gi";
import HeaderComponent from "../../Components/HeaderComponent";
import { AuthContext } from "../../Context/AuthContext";
import { useContext, useEffect, useState } from "react";

type BeforeInstallPromptChoice = {
  outcome: "accepted" | "dismissed";
  platform: string;
};

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<BeforeInstallPromptChoice>;
};

const MOBILE_INSTALL_QUERY = "(max-width: 768px), (pointer: coarse)";

function isStandalonePwa() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone)
  );
}

function isIosDevice() {
  return (
    /iPad|iPhone|iPod/.test(window.navigator.userAgent) ||
    (window.navigator.platform === "MacIntel" &&
      window.navigator.maxTouchPoints > 1)
  );
}

function listenToMediaQuery(query: MediaQueryList, listener: () => void) {
  if ("addEventListener" in query) {
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }

  query.addListener(listener);
  return () => query.removeListener(listener);
}

export default function Dashboard() {
  const { token, userData } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [installBannerDismissed, setInstallBannerDismissed] = useState(false);

  useEffect(() => {
    if (userData?.name) {
      const nameWords = userData.name.split(" ");
      const firstTwoWords = nameWords.slice(0, 2);
      setUserName(firstTwoWords.join(" "));
      setIsAdmin(Boolean(userData.role?.includes("admin")));
    }
  }, [userData]);

  useEffect(() => {
    const mobileQuery = window.matchMedia(MOBILE_INSTALL_QUERY);
    const standaloneQuery = window.matchMedia("(display-mode: standalone)");

    const updateInstallVisibility = () => {
      setIsMobile(mobileQuery.matches);
      setIsInstalled(isStandalonePwa());
    };

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setInstallBannerDismissed(false);
      updateInstallVisibility();
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setIsInstalled(true);
      setInstallBannerDismissed(true);
    };

    updateInstallVisibility();
    setIsIOS(isIosDevice());

    const cleanupMobileQuery = listenToMediaQuery(
      mobileQuery,
      updateInstallVisibility,
    );
    const cleanupStandaloneQuery = listenToMediaQuery(
      standaloneQuery,
      updateInstallVisibility,
    );

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      cleanupMobileQuery();
      cleanupStandaloneQuery();
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
    setInstallBannerDismissed(true);
  };

  const shouldShowInstallBanner =
    isMobile && !isInstalled && !installBannerDismissed;

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <DashboardContainer>
      <HeaderComponent
        admin={isAdmin}
        fixed={false}
        bgcolor="#212433"
        loginSignin
        showlogo
      />

      <HeroSection>
        {shouldShowInstallBanner && (
          <InstallPromptCard>
            <InstallPromptIcon>
              <FaMobileAlt />
            </InstallPromptIcon>

            <InstallPromptText>
              <strong>Use o EnglishPlus como app</strong>
              <span>
                {installPrompt
                  ? "Baixe no celular para abrir mais rapido e estudar direto da tela inicial."
                  : isIOS
                    ? "No Safari, toque em Compartilhar e depois em Adicionar a Tela de Inicio."
                    : "Abra o menu do navegador e escolha instalar o app quando a opcao aparecer."}
              </span>
            </InstallPromptText>

            <InstallPromptActions>
              {installPrompt ? (
                <InstallPromptButton type="button" onClick={handleInstallClick}>
                  <FaDownload />
                  Baixar app
                </InstallPromptButton>
              ) : (
                <InstallPromptHint>
                  <FaShareAlt />
                  Menu do navegador
                </InstallPromptHint>
              )}

              <DismissInstallPrompt
                type="button"
                aria-label="Fechar aviso de instalacao"
                onClick={() => setInstallBannerDismissed(true)}
              >
                <FaTimes />
              </DismissInstallPrompt>
            </InstallPromptActions>
          </InstallPromptCard>
        )}

        <HeroContent>
          <HeroCopy>
            <HeroBadge>Ingles com contexto e revisão</HeroBadge>
            <h1>
              Aprenda ingles com textos reais, palavras salvas e revisao
              constante.
            </h1>
            <p>
              O app junta leitura, compreensao e memorizacao em um fluxo mais
              bonito e mais claro para voce manter ritmo todos os dias.
            </p>

            <img src="./logo3.png" alt="EngleshPlus" />
            <ActionRow>
              <PrimaryAction to={userName ? "/dashboard" : "/textslist"}>
                {userName ? "Abrir dashboard" : "Explorar textos"}
              </PrimaryAction>
              <SecondaryAction
                to={userName ? "/memorizelists" : "/account/login"}
              >
                {userName ? "Abrir memorizacao" : "Entrar para revisar"}
              </SecondaryAction>
            </ActionRow>
            <HighlightsGrid>
              <HighlightCard>
                <FaTextHeight />
                <div>
                  <strong>Leitura guiada</strong>
                  <span>
                    Toque nas palavras e salve o vocabulario no fluxo.
                  </span>
                </div>
              </HighlightCard>

              <HighlightCard>
                <GiBrain />
                <div>
                  <strong>Memorizacao ativa</strong>
                  <span>Flashcards e rodadas curtas para revisar melhor.</span>
                </div>
              </HighlightCard>

              <HighlightCard>
                <FaRegNewspaper />
                <div>
                  <strong>Estudo consistente</strong>
                  <span>
                    Organizacao visual melhor para manter foco no app.
                  </span>
                </div>
              </HighlightCard>
            </HighlightsGrid>
          </HeroCopy>

          <HeroPanel>
            <PanelGlow />
            <PanelCard>
              <span className="kicker">
                {userName ? `Sessao de ${userName}` : "Jornada English Plus"}
              </span>
              <h2>
                Seu treino pode comecar pela leitura e terminar na revisao.
              </h2>
              <p>
                Leia um texto, destaque palavras novas e leve tudo para os decks
                de memorizacao sem sair da rotina de estudo.
              </p>

              <PanelStats>
                <div>
                  <strong>Textos</strong>
                  <span>Leitura com contexto</span>
                </div>
                <div>
                  <strong>Quiz</strong>
                  <span>Conferencia de compreensao</span>
                </div>
                <div>
                  <strong>Decks</strong>
                  <span>Revisao com repeticao ativa</span>
                </div>
              </PanelStats>
            </PanelCard>
          </HeroPanel>
        </HeroContent>
      </HeroSection>

      <SectionTwo>
        <SectionTitle>
          <span>Formas de estudar</span>
          <h2>Escolha o jeito que faz mais sentido para o momento.</h2>
        </SectionTitle>

        <CardsContain>
          <Card
            to="/textslist"
            bgColor="#4968EC"
            bgColor2="#6EB1F7"
            btnColor="#698EF9"
            btnColor2="#4968EC"
          >
            <IconBubble>
              <FaTextHeight />
            </IconBubble>
            <h3>Com textos</h3>
            <p>Leia com calma, traduza palavras e acompanhe sua evolucao.</p>
            <button>Comecar</button>
          </Card>

          <Card
            disabled={!userName}
            to={userName ? "/memorizelists" : ""}
            title={!userName ? "Faca login para acessar a memorizacao." : ""}
            bgColor="#29AA8B"
            bgColor2="#6ECCBA"
            btnColor="#60CA83"
            btnColor2="#29AA8B"
          >
            <IconBubble>
              <GiBrain />
            </IconBubble>
            <h3>Memorize palavras</h3>
            <p>Revise vocabulario com cards interativos e rodadas rapidas.</p>
            <button>{userName ? "Comecar" : "Entrar"}</button>
          </Card>
        </CardsContain>
      </SectionTwo>

      <WhyLearning>
        <span className="tag">Por que isso importa</span>
        <h3>Aprender ingles abre acesso, repertorio e oportunidades.</h3>
        <p>
          Com leitura frequente e revisao de vocabulario, fica mais facil ganhar
          confianca para consumir conteudo, estudar, trabalhar e se comunicar
          com mais naturalidade.
        </p>
      </WhyLearning>

      <Footer>
        <span>
          English Plus+ • leitura, compreensao e memorizacao no mesmo lugar
        </span>
      </Footer>
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-image: linear-gradient(
    to bottom,
    #212433 0%,
    #151824 45%,
    #12141d 100%
  );
`;

const HeroSection = styled.section`
  width: 100%;
  padding: 50px 16px 56px;
`;

const InstallPromptCard = styled.aside`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto 22px;
  padding: 16px;
  border-radius: 24px;
  border: 1px solid rgba(143, 229, 208, 0.32);
  background:
    linear-gradient(
      135deg,
      rgba(41, 170, 139, 0.18),
      rgba(73, 104, 236, 0.15)
    ),
    rgba(24, 27, 40, 0.94);
  box-shadow: 0 22px 44px rgba(7, 10, 20, 0.28);
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;

  @media (min-width: 769px) {
    display: none;
  }

  @media (max-width: 540px) {
    grid-template-columns: auto minmax(0, 1fr);
    align-items: flex-start;
  }
`;

const InstallPromptIcon = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(19, 23, 35, 0.42);
  color: #8fe5d0;
  flex-shrink: 0;

  svg {
    font-size: 1.35rem;
  }
`;

const InstallPromptText = styled.div`
  min-width: 0;

  strong {
    display: block;
    margin-bottom: 4px;
    color: #eef1ff;
    font-size: 0.96rem;
    line-height: 1.3;
  }

  span {
    display: block;
    color: #b9c2e4;
    font-size: 0.82rem;
    line-height: 1.45;
  }
`;

const InstallPromptActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  min-width: fit-content;

  @media (max-width: 540px) {
    grid-column: 1 / -1;
    width: 100%;
    justify-content: space-between;
  }
`;

const InstallPromptButton = styled.button`
  min-height: 42px;
  padding: 0 14px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #29aa8b, #4968ec);
  color: white;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 14px 26px rgba(41, 170, 139, 0.18);

  svg {
    font-size: 0.95rem;
  }
`;

const InstallPromptHint = styled.span`
  min-height: 42px;
  padding: 0 12px;
  border-radius: 14px;
  border: 1px solid rgba(143, 229, 208, 0.22);
  color: #d8def6;
  background: rgba(19, 23, 35, 0.36);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  font-weight: 600;
`;

const DismissInstallPrompt = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 14px;
  border: 1px solid rgba(216, 222, 246, 0.16);
  background: rgba(19, 23, 35, 0.34);
  color: #d8def6;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;

  svg {
    font-size: 0.92rem;
  }
`;

const HeroContent = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(300px, 0.85fr);
  gap: 28px;

  @media (max-width: 940px) {
    grid-template-columns: 1fr;
  }
`;

const HeroCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  h1 {
    max-width: 720px;
    font-size: clamp(2.3rem, 5vw, 4.3rem);
    line-height: 1.04;
    font-family: "Google Sans", "Poppins", sans-serif;
  }

  p {
    max-width: 640px;
    color: #b9c2e4;
    font-size: 1.02rem;
    line-height: 1.7;
  }

  img {
    margin: 0 auto;
    width: 200px;
    height: 200px;
    object-fit: contain;
  }
`;

const HeroBadge = styled.span`
  width: fit-content;
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid rgba(110, 136, 204, 0.32);
  background: rgba(32, 39, 63, 0.78);
  color: #c9d4fb;
  font-size: 0.88rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const ActionRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 4px;
`;

const PrimaryAction = styled(Link)`
  padding: 14px 22px;
  border-radius: 18px;
  background: linear-gradient(135deg, #4968ec, #6e88cc);
  color: white;
  font-weight: 600;
  box-shadow: 0 18px 35px rgba(73, 104, 236, 0.25);
 
`;

const SecondaryAction = styled(Link)`
  padding: 14px 22px;
  border-radius: 18px;
  border: 1px solid rgba(76, 85, 125, 0.62);
  background: rgba(27, 31, 45, 0.75);
  color: #d8def6;
  font-weight: 600;
`;

const HighlightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 12px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const HighlightCard = styled.div`
  padding: 18px;
  border-radius: 22px;
  border: 1px solid rgba(76, 85, 125, 0.5);
  background: rgba(27, 31, 45, 0.82);
  display: flex;
  gap: 14px;
  align-items: flex-start;
  box-shadow: 0 20px 35px rgba(7, 10, 20, 0.2);

  svg {
    color: #29aa8b;
    font-size: 1.4rem;
    margin-top: 3px;
    flex-shrink: 0;
  }

  strong {
    display: block;
    margin-bottom: 6px;
    font-size: 1rem;
  }

  span {
    color: #99a4c8;
    font-size: 0.92rem;
    line-height: 1.6;
  }
`;

const HeroPanel = styled.div`
  position: relative;
  min-height: 100%;
`;

const PanelGlow = styled.div`
  position: absolute;
  inset: 32px 16px 16px 32px;
  border-radius: 32px;
  background: linear-gradient(
    180deg,
    rgba(73, 104, 236, 0.35),
    rgba(41, 170, 139, 0.1)
  );
  filter: blur(28px);
`;

const PanelCard = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  border-radius: 32px;
  border: 1px solid rgba(110, 136, 204, 0.18);
  background:
    linear-gradient(180deg, rgba(110, 136, 204, 0.12), transparent 35%),
    rgba(24, 27, 40, 0.9);
  padding: 28px;
  box-shadow: 0 28px 60px rgba(7, 10, 20, 0.34);
  overflow: hidden;

  .kicker {
    display: inline-flex;
    margin-bottom: 20px;
    padding: 8px 12px;
    border-radius: 999px;
    background: rgba(41, 170, 139, 0.12);
    color: #8fe5d0;
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  h2 {
    max-width: 420px;
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    line-height: 1.15;
    margin-bottom: 14px;
  }

  p {
    color: #a6b1d5;
    line-height: 1.75;
  }
`;

const PanelStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 24px;

  div {
    padding: 16px;
    border-radius: 20px;
    background: rgba(33, 36, 51, 0.78);
    border: 1px solid rgba(76, 85, 125, 0.38);
  }

  strong {
    display: block;
    font-size: 1.05rem;
    margin-bottom: 4px;
  }

  span {
    color: #99a4c8;
    font-size: 0.88rem;
    line-height: 1.5;
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

const SectionTwo = styled.section`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 18px 16px 32px;
`;

const SectionTitle = styled.div`
  margin-bottom: 18px;

  span {
    display: inline-flex;
    margin-bottom: 8px;
    color: #8fe5d0;
    font-size: 0.88rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  h2 {
    max-width: 620px;
    font-size: clamp(1.7rem, 3vw, 2.5rem);
    color: #eef1ff;
    line-height: 1.2;
  }
`;

const CardsContain = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(Link)<{
  disabled?: boolean;
  bgColor?: string;
  bgColor2?: string;
  btnColor?: string;
  btnColor2?: string;
}>`
  min-height: 280px;
  border-radius: 28px;
  padding: 26px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  overflow: hidden;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  opacity: ${(props) => (props.disabled ? "0.45" : "1")};
  background-image: linear-gradient(
    160deg,
    ${(props) => props.bgColor || "#212433"},
    ${(props) => props.bgColor2 || "#212433"}
  );
  color: white;
  box-shadow: 0 26px 45px rgba(7, 10, 20, 0.24);

  &::after {
    content: "";
    position: absolute;
    inset: auto -10% -35% auto;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.14);
  }

  h3 {
    font-size: 1.75rem;
    line-height: 1.1;
  }

  p {
    max-width: 320px;
    color: rgba(255, 255, 255, 0.88);
    line-height: 1.65;
  }

  button {
    margin-top: auto;
    width: fit-content;
    padding: 12px 20px;
    border: none;
    border-radius: 16px;
    background-image: linear-gradient(
      135deg,
      ${(props) => props.btnColor || "#212433"},
      ${(props) => props.btnColor2 || "#212433"}
    );
    color: white;
    font-weight: 700;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
`;

const IconBubble = styled.div`
  width: 68px;
  height: 68px;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(19, 23, 35, 0.22);
  backdrop-filter: blur(8px);

  svg {
    font-size: 2rem;
  }
`;

const WhyLearning = styled.section`
  width: calc(100% - 32px);
  max-width: 1180px;
  margin: 44px auto 0;
  padding: 30px;
  border-radius: 30px;
  border: 1px solid rgba(76, 85, 125, 0.4);
  background:
    linear-gradient(145deg, rgba(41, 170, 139, 0.08), transparent 35%),
    rgba(24, 27, 40, 0.86);
  box-shadow: 0 26px 52px rgba(7, 10, 20, 0.25);

  .tag {
    display: inline-flex;
    margin-bottom: 10px;
    color: #8fe5d0;
    font-size: 0.88rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  h3 {
    max-width: 680px;
    font-size: clamp(1.6rem, 3vw, 2.25rem);
    line-height: 1.2;
    color: #eef1ff;
  }

  p {
    max-width: 720px;
    padding-top: 14px;
    font-size: 1rem;
    line-height: 1.8;
    color: #aab5d8;
  }
`;

const Footer = styled.footer`
  width: 100%;
  padding: 28px 16px 40px;
  text-align: center;
  color: #94a0c3;
  font-size: 0.92rem;
`;
