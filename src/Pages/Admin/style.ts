import styled from "styled-components";

export const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: white;
`;
// Styled-components
export const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

export const LevelWrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

export const TextListWrapper = styled.ul`
  padding: 0px;
  width: 100%;

  @media (min-width: 500px) {
    max-width: 900px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
`;

export const TextItem = styled.li`
  width: 100%;
  list-style: none;
  padding: 20px 20px;

  border: 1px solid #353a52;
  border-radius: 20px;
  margin: 10px 0px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;

  align-items: center;

  max-width: 900px;

  .text-info {
    display: flex;
    flex-direction: column;
    max-width: 80%;

    h4 {
      font-size: 18px;
      color: #a0bbdb;
      font-weight: 600;
    }
    span {
      font-size: 14px;
    }
  }

  .editToolsIcons {
    display: flex;
    gap: 15px;
    .icon {
      cursor: pointer;
      font-size: 20px;
      color: #cfd4ff;
      &:hover {
        color: #6c7bff;
      }
    }
  }
`;

export const Searchbar = styled.div`
  margin-bottom: 20px;
  input {
    width: 100%;
    padding: 10px 15px;
    border-radius: 8px;
    background-color: #2e3553;
    border: 1px solid #555b7e;
    color: white;
    font-size: 14px;
    outline: none;
  }
`;

export const PopUpOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PopUpContent = styled.div`
  background-color: #212433;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 15px;
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
    button {
      padding: 8px 16px;

      border: none;
      border-radius: 6px;
      cursor: pointer;

      font-size: 14px;
      font-weight: 500;
      &:first-child {
        background-color: #6c7bff;
        color: white;
      }
      &:last-child {
        background-color: #555b7e;
        color: white;
      }
    }
  }
`;

export const EditPopupContent = styled.div`
  background-color: #212433;
  overflow: auto;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 15px;
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
    padding-bottom: 40px;
    button {
      padding: 8px 16px;

      border: none;
      border-radius: 6px;
      cursor: pointer;

      font-size: 14px;
      font-weight: 500;
      &:first-child {
        background-color: #6c7bff;
        color: white;
      }
      &:last-child {
        background-color: #555b7e;
        color: white;
      }
    }
  }
`;

export const EditForm = styled.form`
  max-width: 100%;
  height: 100vh;

  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h2`
  color: white;
  font-family: poppins, sans-serif;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Field = styled.div<{ flexDirection? }>`
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "column"};
  align-items: ${(props) => (props.flexDirection ? "center" : "")};
  gap: 6px;

  label {
    color: #cfd4ff;
    font-size: 14px;
  }

  input,
  select,
  textarea {
    padding: 8px 10px;
    border-radius: 6px;
    background-color: transparent;
    border: 1px solid #555b7e;
    background-color: #1c1f2d;
    color: white;
    outline: none;
    font-size: 14px;
    min-width: 400px;
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }
 
  select option {
    background-color: #2e3553;
   
  }
`;

export const SubmitButton = styled.button`
  margin-top: 20px;
  align-self: flex-end;
  padding: 10px 22px;
  border-radius: 6px;
  background-color: #3ccf91;
  color: #0f1b16;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: #2fb37d;
  }
`;

export const ParagraphsContainer = styled.div`
  width: 100%;
  padding: 20px 5px;

  overflow: auto;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ParagraphCard = styled.div`
  background-color: #2e3553;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ParagraphHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-weight: 500;
`;

export const RemoveButton = styled.div`
  background: transparent;
  border: none;
  color: #ff6b6b;
  cursor: pointer;
  font-size: 16px;

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
  padding: 10px 18px;
  border-radius: 20px;
  background-color: #4f67ca;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #3b4aa1;
  }
`;
