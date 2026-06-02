import styled from "styled-components";

export const LoadingWrapper = styled.div`
  width: 100%;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #99a4c8;
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
`;

export const LevelWrapper = styled.div`
  width: 100%;
  padding: 24px;

  @media (max-width: 560px) {
    padding: 16px;
  }
`;

export const TextListWrapper = styled.ul`
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const TextItem = styled.li`
  width: 100%;
  list-style: none;
  min-height: 148px;
  padding: 18px;
  border: 1px solid rgba(76, 85, 125, 0.42);
  border-radius: 22px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent 45%),
    rgba(24, 27, 40, 0.84);
  box-shadow: 0 18px 36px rgba(7, 10, 20, 0.16);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(110, 136, 204, 0.68);
    box-shadow: 0 24px 44px rgba(7, 10, 20, 0.24);
  }

  .text-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 80%;
    min-width: 0;

    h4 {
      font-size: 1.05rem;
      color: #eef1ff;
      font-weight: 700;
      line-height: 1.35;
    }

    span {
      font-size: 14px;
      color: #99a4c8;
      line-height: 1.55;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  .editToolsIcons {
    display: flex;
    gap: 8px;
    flex-shrink: 0;

    .icon {
      width: 40px;
      height: 40px;
      border-radius: 14px;
      border: 1px solid rgba(76, 85, 125, 0.36);
      background: rgba(33, 36, 51, 0.72);
      cursor: pointer;
      font-size: 16px;
      color: #cfd4ff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition:
        background-color 0.2s ease,
        color 0.2s ease,
        border-color 0.2s ease;

      &:hover {
        color: #8fe5d0;
        border-color: rgba(143, 229, 208, 0.45);
        background: rgba(41, 170, 139, 0.1);
      }
    }
  }

  @media (max-width: 560px) {
    align-items: flex-start;

    .text-info {
      max-width: 100%;
    }

    .editToolsIcons {
      flex-direction: column;
    }
  }
`;

export const Searchbar = styled.div`
  margin-bottom: 20px;

  input {
    width: 100%;
    min-height: 48px;
    padding: 12px 15px;
    border-radius: 16px;
    background-color: rgba(18, 20, 30, 0.82);
    border: 1px solid rgba(76, 85, 125, 0.62);
    color: #f5f7ff;
    font-size: 14px;
    outline: none;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      background-color 0.2s ease;
  }

  input:focus {
    border-color: rgba(143, 229, 208, 0.62);
    background-color: rgba(18, 20, 30, 0.96);
    box-shadow: 0 0 0 3px rgba(41, 170, 139, 0.12);
  }
`;

export const PopUpOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 18px;
  background-color: rgba(7, 10, 20, 0.68);
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
`;

export const PopUpContent = styled.div`
  width: min(440px, 100%);
  padding: 24px;
  border-radius: 24px;
  border: 1px solid rgba(76, 85, 125, 0.46);
  background:
    linear-gradient(145deg, rgba(255, 107, 107, 0.08), transparent 42%),
    rgba(24, 27, 40, 0.96);
  color: #f5f7ff;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 28px 60px rgba(7, 10, 20, 0.4);

  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }

  p {
    font-size: 14px;
    line-height: 1.7;
    color: #aab5d8;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    button {
      min-height: 42px;
      padding: 8px 16px;
      border: none;
      border-radius: 14px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 800;

      &:first-child {
        background-color: #ff6b6b;
        color: white;
      }

      &:last-child {
        background-color: rgba(76, 85, 125, 0.36);
        color: #eef1ff;
      }
    }
  }
`;

export const EditPopupContent = styled.div`
  width: min(980px, 100%);
  max-height: calc(100vh - 36px);
  overflow: auto;
  padding: 8px;
  border-radius: 26px;
  border: 1px solid rgba(76, 85, 125, 0.46);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent 40%),
    rgba(18, 20, 30, 0.98);
  color: #f5f7ff;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 28px 60px rgba(7, 10, 20, 0.42);

  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }

  p {
    font-size: 14px;
    line-height: 1.4;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding-bottom: 12px;

    button {
      min-height: 44px;
      padding: 8px 16px;
      border: none;
      border-radius: 14px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 800;

      &:first-child {
        background: linear-gradient(135deg, #29aa8b, #8fe5d0);
        color: #07121b;
      }

      &:last-child {
        background-color: rgba(76, 85, 125, 0.36);
        color: #eef1ff;
      }
    }
  }
`;

export const EditForm = styled.form`
  max-width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 560px) {
    padding: 14px;
  }
`;

export const Title = styled.h2`
  color: #eef1ff;
  font-family: "Google Sans", "Poppins", sans-serif;
  font-size: clamp(1.45rem, 3vw, 2rem);
  line-height: 1.15;
`;

export const Section = styled.div`
  padding: 18px;
  border: 1px solid rgba(76, 85, 125, 0.38);
  border-radius: 22px;
  background: rgba(24, 27, 40, 0.76);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Field = styled.div<{ flexDirection?: string }>`
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "column"};
  align-items: ${(props) => (props.flexDirection ? "center" : "stretch")};
  gap: 6px;
  min-width: 0;

  label {
    color: #cfd4ff;
    font-size: 14px;
    flex-shrink: 0;
  }

  input,
  select,
  textarea {
    width: 100%;
    min-width: 0;
    padding: 12px 14px;
    border-radius: 14px;
    border: 1px solid rgba(76, 85, 125, 0.62);
    background-color: rgba(18, 20, 30, 0.82);
    color: #f5f7ff;
    outline: none;
    font-size: 14px;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      background-color 0.2s ease;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: rgba(143, 229, 208, 0.62);
    background-color: rgba(18, 20, 30, 0.96);
    box-shadow: 0 0 0 3px rgba(41, 170, 139, 0.12);
  }

  textarea {
    min-height: 110px;
    resize: vertical;
  }

  select option {
    background-color: #2e3553;
  }

  @media (max-width: 680px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SubmitButton = styled.button`
  margin-top: 20px;
  align-self: flex-end;
  min-height: 48px;
  padding: 12px 22px;
  border-radius: 16px;
  background: linear-gradient(135deg, #29aa8b, #8fe5d0);
  color: #0f1b16;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 800;

  &:hover {
    background: linear-gradient(135deg, #23a383, #72dac6);
  }
`;

export const ParagraphsContainer = styled.div`
  width: 100%;
  padding: 4px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ParagraphCard = styled.div`
  border: 1px solid rgba(76, 85, 125, 0.42);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent 44%),
    rgba(24, 27, 40, 0.84);
  border-radius: 22px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 18px 36px rgba(7, 10, 20, 0.16);
`;

export const ParagraphHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  color: #eef1ff;
  font-weight: 700;
`;

export const AudioPreviewBox = styled.div<{ $empty?: boolean }>`
  width: 100%;
  padding: 12px;
  border: 1px solid
    ${(props) =>
      props.$empty ? "rgba(76, 85, 125, 0.34)" : "rgba(143, 229, 208, 0.34)"};
  border-radius: 16px;
  background: ${(props) =>
    props.$empty ? "rgba(33, 36, 51, 0.56)" : "rgba(41, 170, 139, 0.08)"};
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 10px;

  span {
    color: ${(props) => (props.$empty ? "#8f9bc1" : "#cfd7f6")};
    font-size: 0.84rem;
    font-weight: 700;
    line-height: 1.35;
  }

  audio {
    width: 100%;
    height: 38px;
  }
`;

export const RemoveButton = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 14px;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.2);
  color: #ff6b6b;
  cursor: pointer;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    color: #ff3b3b;
  }
`;

export const AddParagraphButton = styled.div`
  align-self: center;
  min-height: 46px;
  padding: 10px 18px;
  border-radius: 16px;
  background: rgba(73, 104, 236, 0.15);
  color: #dce5ff;
  border: 1px solid rgba(110, 136, 204, 0.42);
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(73, 104, 236, 0.24);
    border-color: rgba(143, 229, 208, 0.44);
  }
`;
