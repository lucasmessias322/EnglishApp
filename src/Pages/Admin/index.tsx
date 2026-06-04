import React, { useState } from "react";
import HeaderComponent from "../../Components/HeaderComponent";
import styled from "styled-components";
import AddText from "./AddText";
import EditText from "./EditText";
import {
  FaBookOpen,
  FaChartLine,
  FaCog,
  FaLayerGroup,
  FaPenFancy,
  FaPlusCircle,
} from "react-icons/fa";

type MenuKey = "dashboard" | "addText" | "editText" | "settings";

const menuItems: {
  key: MenuKey;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    key: "dashboard",
    label: "Painel",
    description: "Visao geral",
    icon: <FaChartLine />,
  },
  {
    key: "addText",
    label: "Adicionar textos",
    description: "Novo conteudo",
    icon: <FaPlusCircle />,
  },
  {
    key: "editText",
    label: "Editar textos",
    description: "Biblioteca",
    icon: <FaPenFancy />,
  },
  {
    key: "settings",
    label: "Ajustes",
    description: "Configuracoes",
    icon: <FaCog />,
  },
];

function Admin() {
  const token = localStorage.getItem("token") || "";
  const [activeMenu, setActiveMenu] = useState<MenuKey>("dashboard");

  const renderContent = () => {
    switch (activeMenu) {
      case "addText":
        return <AddText token={token} />;
      case "editText":
        return <EditText token={token} />;
      case "settings":
        return (
          <EmptyState>
            <FaCog />
            <span>Ajustes</span>
            <h2>Area de configuracoes em breve.</h2>
            <p>
              Este espaco pode concentrar preferencias do painel, permissoes e
              opcoes de publicacao quando o fluxo crescer.
            </p>
          </EmptyState>
        );
      default:
        return (
          <AdminDashboard>
            <DashboardHero>
              <div>
                <TopLabel>Admin EnglishPlus</TopLabel>
                <h1>Gerencie textos, audios e quizzes em um painel mais claro.</h1>
                <p>
                  Use este espaco para publicar leituras novas, revisar conteudo
                  existente e manter a experiencia de estudo organizada.
                </p>
              </div>
              <HeroIcon>
                <FaLayerGroup />
              </HeroIcon>
            </DashboardHero>

            <MetricGrid>
              <MetricCard>
                <FaBookOpen />
                <strong>Biblioteca</strong>
                <span>Textos organizados por nivel e prontos para leitura.</span>
              </MetricCard>
              <MetricCard>
                <FaPlusCircle />
                <strong>Publicacao</strong>
                <span>Cadastre paragrafos, audios e quizzes no mesmo fluxo.</span>
              </MetricCard>
              <MetricCard>
                <FaPenFancy />
                <strong>Revisao</strong>
                <span>Edite conteudos publicados sem sair do painel.</span>
              </MetricCard>
            </MetricGrid>

            <QuickActions>
              <ActionCard type="button" onClick={() => setActiveMenu("addText")}>
                <FaPlusCircle />
                <div>
                  <strong>Adicionar texto</strong>
                  <span>Criar uma nova leitura para os alunos.</span>
                </div>
              </ActionCard>

              <ActionCard type="button" onClick={() => setActiveMenu("editText")}>
                <FaPenFancy />
                <div>
                  <strong>Editar biblioteca</strong>
                  <span>Atualizar titulos, resumos, paragrafos e quizzes.</span>
                </div>
              </ActionCard>
            </QuickActions>
          </AdminDashboard>
        );
    }
  };

  return (
    <Container>
      <HeaderComponent loginSignin admin showlogo />

      <Main>
        <SideBar>
          <div className="sidebar-header">
            <span>Painel administrativo</span>
            <h2>EnglishPlus</h2>
          </div>

          <NavList>
            {menuItems.map((item) => (
              <SideBarItem
                key={item.key}
                $active={activeMenu === item.key}
                onClick={() => setActiveMenu(item.key)}
                type="button"
              >
                <span className="icon">{item.icon}</span>
                <span className="copy">
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>
              </SideBarItem>
            ))}
          </NavList>
        </SideBar>

        <Content>{renderContent()}</Content>
      </Main>
    </Container>
  );
}

export default Admin;

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(
      circle at top left,
      rgba(var(--primary-strong-rgb), 0.16),
      transparent 32%
    ),
    radial-gradient(
      circle at top right,
      rgba(var(--accent-rgb), 0.12),
      transparent 28%
    ),
    linear-gradient(
      to bottom,
      var(--surface-strong) 0%,
      var(--bg-secondary) 46%,
      var(--bg) 100%
    );
`;

const Main = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 24px 16px 42px;
  display: grid;
  grid-template-columns: 270px minmax(0, 1fr);
  gap: 20px;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    padding-top: 16px;
  }
`;

const SideBar = styled.aside`
  height: fit-content;
  position: sticky;
  top: 18px;
  padding: 14px;
  border: 1px solid rgba(var(--primary-strong-rgb), 0.24);
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(var(--primary-strong-rgb), 0.1), transparent 36%),
    var(--glass-bg);
  color: var(--text);
  box-shadow: 0 24px 52px rgba(7, 10, 20, 0.28);

  .sidebar-header {
    padding: 10px 10px 16px;
    border-bottom: 1px solid rgba(var(--primary-strong-rgb), 0.18);

    span {
      display: inline-flex;
      margin-bottom: 8px;
      color: var(--accent-soft);
      font-size: 0.72rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    h2 {
      font-family: "Google Sans", "Poppins", sans-serif;
      font-size: 1.35rem;
      line-height: 1.15;
    }
  }

  @media (max-width: 880px) {
    position: static;

    .sidebar-header {
      display: none;
    }
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 14px;

  @media (max-width: 880px) {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding-top: 0;
  }

  @media (max-width: 620px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const SideBarItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  min-height: 64px;
  padding: 12px;
  border: 1px solid
    ${({ $active }) =>
      $active
        ? "rgba(var(--accent-rgb), 0.42)"
        : "rgba(var(--primary-strong-rgb), 0.22)"};
  border-radius: 18px;
  cursor: pointer;
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(135deg, rgba(var(--accent-rgb), 0.18), rgba(var(--primary-strong-rgb), 0.16))"
      : "var(--control-bg)"};
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: var(--subtle-bg);
    color: ${({ $active }) => ($active ? "var(--accent-soft)" : "var(--primary)")};
  }

  .copy {
    min-width: 0;
  }

  strong,
  small {
    display: block;
  }

  strong {
    font-size: 0.95rem;
    line-height: 1.2;
  }

  small {
    margin-top: 3px;
    color: var(--muted);
    font-size: 0.76rem;
    line-height: 1.25;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(var(--primary-strong-rgb), 0.5);
    background: var(--control-bg-strong);
  }

  @media (max-width: 620px) {
    min-height: 58px;

    .icon {
      width: 34px;
      height: 34px;
      border-radius: 12px;
    }

    strong {
      font-size: 0.82rem;
    }

    small {
      display: none;
    }
  }
`;

const Content = styled.main`
  min-width: 0;
  border: 1px solid rgba(var(--primary-strong-rgb), 0.22);
  border-radius: 30px;
  background:
    linear-gradient(180deg, rgba(var(--primary-strong-rgb), 0.04), transparent 42%),
    var(--glass-bg);
  box-shadow: 0 26px 54px rgba(7, 10, 20, 0.22);
  overflow: hidden;
`;

const AdminDashboard = styled.section`
  padding: 24px;

  @media (max-width: 560px) {
    padding: 16px;
  }
`;

const DashboardHero = styled.div`
  min-height: 220px;
  padding: 28px;
  border-radius: 26px;
  border: 1px solid rgba(var(--primary-strong-rgb), 0.24);
  background:
    linear-gradient(135deg, rgba(var(--primary-strong-rgb), 0.2), transparent 46%),
    linear-gradient(145deg, rgba(var(--accent-rgb), 0.12), transparent 36%),
    var(--glass-bg-strong);
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 18px;

  h1 {
    max-width: 680px;
    color: var(--text);
    font-family: "Google Sans", "Poppins", sans-serif;
    font-size: clamp(1.8rem, 4vw, 3rem);
    line-height: 1.08;
  }

  p {
    max-width: 620px;
    margin-top: 14px;
    color: var(--muted);
    line-height: 1.75;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    padding: 22px;
  }
`;

const TopLabel = styled.span`
  display: inline-flex;
  margin-bottom: 10px;
  color: var(--accent-soft);
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const HeroIcon = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 28px;
  background: var(--subtle-bg);
  color: var(--accent-soft);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 2.5rem;
  }

  @media (max-width: 700px) {
    width: 70px;
    height: 70px;
    border-radius: 22px;
  }
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 16px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.article`
  min-height: 150px;
  padding: 20px;
  border-radius: 22px;
  border: 1px solid rgba(var(--primary-strong-rgb), 0.24);
  background: var(--glass-bg);
  display: flex;
  flex-direction: column;
  gap: 10px;

  svg {
    color: var(--accent);
    font-size: 1.35rem;
  }

  strong {
    color: var(--text);
    font-size: 1.08rem;
  }

  span {
    color: var(--muted);
    line-height: 1.55;
    font-size: 0.92rem;
  }
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 16px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const ActionCard = styled.button`
  min-height: 96px;
  padding: 18px;
  border: 1px solid rgba(var(--primary-strong-rgb), 0.32);
  border-radius: 22px;
  background: var(--control-bg);
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 14px;
  text-align: left;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;

  > svg {
    flex-shrink: 0;
    color: var(--accent-soft);
    font-size: 1.4rem;
  }

  strong,
  span {
    display: block;
  }

  strong {
    margin-bottom: 4px;
    font-size: 1rem;
  }

  span {
    color: var(--muted);
    font-size: 0.88rem;
    line-height: 1.45;
  }

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(var(--accent-rgb), 0.5);
    background: var(--control-bg-strong);
  }
`;

const EmptyState = styled.section`
  min-height: 420px;
  padding: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  > svg {
    margin-bottom: 14px;
    color: var(--accent-soft);
    font-size: 2rem;
  }

  span {
    color: var(--accent-soft);
    font-size: 0.78rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  h2 {
    margin-top: 8px;
    color: var(--text);
    font-size: clamp(1.45rem, 3vw, 2rem);
  }

  p {
    max-width: 520px;
    margin-top: 10px;
    color: var(--muted);
    line-height: 1.7;
  }
`;
