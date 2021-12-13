import styled from "styled-components";

export const ExameContain = styled.div<{ thema?: boolean }>`
  background-color: ${(props) => (props.thema ? "#FFF" : "#111b29")};
  min-height: 100vh;

  .questionAndResponseCard {
    margin: 0px 10px;
    .question {
      padding: 10px;
      display: flex;
      color: ${(props) => (props.thema ? "#000" : "#FFF")};
      border-bottom: 1px solid ${(props) => (props.thema ? "#000" : "#FFF")};

      .play {
        width: 30px;
        height: 30px;
        background-color: ${(props) => (props.thema ? "#FF006B" : "#0074ff")};
        border-radius: 100%;
        padding: 5px;

        &:hover {
          transform: scale(1.1);
        }
      }

      h2 {
        font-size: 20px;
        width: 100%;
        text-align: center;
      }
    }
  }

  .response {
    padding: 20px 10px;
    display: flex;
    color: ${(props) => (props.thema ? "#000" : "#FFF")};

    .play {
      width: 30px;
      height: 30px;
      border-radius: 100%;
      padding: 5px;

      &:hover {
        transform: scale(1.1);
      }
    }

    h2 {
      font-size: 20px;
      width: 100%;
      text-align: center;
    }
  }

  .exameControl-contain {
    width: 100%;
    padding: 10px;
    border: 0.5px solid ${(props) => (props.thema ? "#FF006B" : "#0074ff")};
    position: fixed;
    display: flex;
    bottom: 0;
    justify-content: center;
    align-items: baseline;

    span {
      color: ${(props) => (props.thema ? "#FF006B" : "#0074ff")};
      font-weight: bold;
      margin: 0px 20px;
    }

    h2 {
      color: ${(props) => (props.thema ? "#000" : "#FFF")};
    }
  }

  @media (max-width: 500px) {
    .exameControl-contain {
      h2 {
        font-size: 20px;
      }
    }
  }
`;
