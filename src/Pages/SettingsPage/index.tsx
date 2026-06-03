import { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheck,
  FaExclamationTriangle,
  FaPalette,
  FaTrash,
  FaUserCircle,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { deleteUser } from "../../Apis/englishplusApi";
import { AuthContext } from "../../Context/AuthContext";
import { ThemeId, useTheme } from "../../Context/ThemeContext";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { token, userId, userData, logout } = useContext(AuthContext);
  const { currentTheme, setTheme, themes } = useTheme();
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const canDeleteAccount = deleteConfirmation.trim().toUpperCase() === "DELETAR";
  const firstName = userData?.name?.split(" ")[0] || "estudante";
  const userEmail = userData?.email || userData?.username || "Conta conectada";

  async function handleDeleteAccount() {
    if (!canDeleteAccount || isDeleting) return;

    setIsDeleting(true);
    const response = await deleteUser(userId, token);
    setIsDeleting(false);

    if (!response) {
      toast.error("Nao foi possivel deletar sua conta agora.");
      return;
    }

    toast.success("Conta deletada com sucesso.");
    logout();
  }

  return (
    <Container>
      <ToastContainer />
      <AppBar>
        <IconLink to="/dashboard" title="Voltar para dashboard">
          <FaArrowLeft />
        </IconLink>

        <HeaderTitle>
          <span>Conta</span>
          <strong>Configuracoes</strong>
        </HeaderTitle>
      </AppBar>

      <Content>
        <AccountCard>
          <AccountIcon>
            <FaUserCircle />
          </AccountIcon>
          <div>
            <span>Perfil</span>
            <h1>{userData?.name || `Ola, ${firstName}`}</h1>
            <p>{userEmail}</p>
          </div>
        </AccountCard>

        <SettingsSection>
          <SectionHeader>
            <FaPalette />
            <div>
              <span>Aparencia</span>
              <h2>Escolha um tema</h2>
            </div>
          </SectionHeader>

          <ThemeGrid>
            {themes.map((theme) => (
              <ThemeButton
                key={theme.id}
                type="button"
                $active={currentTheme.id === theme.id}
                onClick={() => setTheme(theme.id as ThemeId)}
              >
                <ThemeSwatches>
                  <i style={{ background: theme.preview.primary }} />
                  <i style={{ background: theme.preview.accent }} />
                  <i style={{ background: theme.preview.surface }} />
                </ThemeSwatches>
                <div>
                  <strong>{theme.name}</strong>
                  <span>{theme.description}</span>
                </div>
                {currentTheme.id === theme.id && <FaCheck className="check" />}
              </ThemeButton>
            ))}
          </ThemeGrid>

          <ThemePreview>
            <span>Preview</span>
            <strong>{currentTheme.name}</strong>
            <p>O tema muda cores globais, fundos e componentes preparados.</p>
          </ThemePreview>
        </SettingsSection>

        <SettingsSection>
          <SectionHeader>
            <FaExclamationTriangle />
            <div>
              <span>Zona de risco</span>
              <h2>Deletar conta</h2>
            </div>
          </SectionHeader>

          <DangerBox>
            <p>
              Essa acao remove sua conta e os decks criados por voce. Para
              confirmar, digite <strong>DELETAR</strong>.
            </p>

            <input
              value={deleteConfirmation}
              onChange={(event) => setDeleteConfirmation(event.target.value)}
              placeholder="Digite DELETAR"
            />

            <DeleteButton
              type="button"
              disabled={!canDeleteAccount || isDeleting}
              onClick={handleDeleteAccount}
            >
              <FaTrash />
              {isDeleting ? "Deletando..." : "Deletar minha conta"}
            </DeleteButton>
          </DangerBox>
        </SettingsSection>

        <BackButton type="button" onClick={() => navigate("/dashboard")}>
          Voltar para o dashboard
        </BackButton>
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
  grid-template-columns: 44px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  padding: calc(env(safe-area-inset-top) + 10px) 12px 10px;
  border-bottom: 1px solid rgba(76, 85, 125, 0.24);
  background: var(--appbar-bg);
  backdrop-filter: blur(16px);
`;

const IconLink = styled(Link)`
  width: 44px;
  height: 44px;
  border: 1px solid var(--border-strong);
  border-radius: 16px;
  background: var(--glass-bg);
  color: var(--text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.div`
  min-width: 0;

  span {
    display: block;
    color: var(--accent-soft);
    font-size: 0.68rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  strong {
    display: block;
    margin-top: 2px;
    color: var(--text);
    font-size: 0.96rem;
    line-height: 1.15;
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

const AccountCard = styled.section`
  padding: 18px;
  border-radius: 26px;
  border: 1px solid var(--border-strong);
  background:
    linear-gradient(145deg, rgba(var(--accent-rgb), 0.12), transparent 42%),
    var(--glass-bg);
  display: grid;
  grid-template-columns: 58px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  box-shadow: 0 18px 36px rgba(7, 10, 20, 0.22);

  span {
    color: var(--accent-soft);
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  h1 {
    margin-top: 4px;
    color: var(--text);
    font-size: 1.25rem;
    line-height: 1.2;
    overflow-wrap: anywhere;
  }

  p {
    margin-top: 4px;
    color: var(--muted);
    font-size: 0.82rem;
    overflow-wrap: anywhere;
  }
`;

const AccountIcon = styled.div`
  width: 58px;
  height: 58px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-soft);
  background: rgba(var(--accent-rgb), 0.12);

  svg {
    font-size: 1.7rem;
  }
`;

const SettingsSection = styled.section`
  padding: 16px;
  border-radius: 24px;
  border: 1px solid rgba(76, 85, 125, 0.42);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 38%),
    var(--glass-bg);
`;

const SectionHeader = styled.div`
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  align-items: center;
  gap: 10px;

  > svg {
    width: 42px;
    height: 42px;
    padding: 12px;
    border-radius: 16px;
    color: var(--accent-soft);
    background: rgba(var(--accent-rgb), 0.12);
  }

  span {
    color: var(--accent-soft);
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  h2 {
    margin-top: 2px;
    color: var(--text);
    font-size: 1.1rem;
    line-height: 1.2;
  }
`;

const ThemeGrid = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 14px;
`;

const ThemeButton = styled.button<{ $active: boolean }>`
  min-height: 72px;
  border: 1px solid
    ${(props) =>
      props.$active ? "rgba(var(--accent-rgb), 0.65)" : "rgba(76, 85, 125, 0.4)"};
  border-radius: 20px;
  padding: 12px;
  background: ${(props) =>
    props.$active
      ? "rgba(var(--accent-rgb), 0.12)"
      : "var(--control-bg)"};
  color: var(--text);
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr) 22px;
  align-items: center;
  gap: 10px;
  text-align: left;
  cursor: pointer;

  strong {
    display: block;
    font-size: 0.94rem;
    line-height: 1.2;
  }

  span {
    display: block;
    margin-top: 3px;
    color: var(--muted);
    font-size: 0.74rem;
    line-height: 1.35;
  }

  .check {
    color: var(--accent-soft);
  }
`;

const ThemeSwatches = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;

  i {
    height: 42px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }
`;

const ThemePreview = styled.div`
  margin-top: 14px;
  padding: 14px;
  border-radius: 20px;
  background:
    linear-gradient(135deg, rgba(var(--primary-strong-rgb), 0.22), transparent),
    var(--surface-strong);

  span {
    color: var(--accent-soft);
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  strong {
    display: block;
    margin-top: 5px;
    color: var(--text);
    font-size: 1rem;
  }

  p {
    margin-top: 5px;
    color: var(--muted);
    font-size: 0.82rem;
    line-height: 1.55;
  }
`;

const DangerBox = styled.div`
  margin-top: 14px;
  display: grid;
  gap: 12px;

  p {
    color: #ffb4b4;
    font-size: 0.84rem;
    line-height: 1.6;
  }

  input {
    min-height: 52px;
    border: 1px solid rgba(243, 91, 91, 0.38);
    border-radius: 18px;
    padding: 0 14px;
    outline: none;
    color: var(--text);
    background: rgba(70, 32, 31, 0.24);
  }

  input::placeholder {
    color: rgba(255, 180, 180, 0.58);
  }
`;

const DeleteButton = styled.button`
  min-height: 52px;
  border: none;
  border-radius: 18px;
  padding: 0 16px;
  background: #ff6b6b;
  color: #190909;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  font-weight: 900;
  cursor: pointer;

  &:disabled {
    color: #aab2c9;
    background: rgba(76, 85, 125, 0.28);
    cursor: not-allowed;
  }
`;

const BackButton = styled.button`
  min-height: 52px;
  border: 1px solid rgba(76, 85, 125, 0.45);
  border-radius: 18px;
  color: var(--text);
  background: var(--control-bg);
  font-weight: 800;
  cursor: pointer;
`;
