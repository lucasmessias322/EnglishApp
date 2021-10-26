import styled from "styled-components";

export const ExameContain = styled.div`
  background-color: #111b29;
  padding-bottom: 700px;

  .questionAndResponseCard {
    margin: 0px 10px;
    .question {
      padding: 10px;
      display: flex;
      color: white;
      border-bottom: 1px solid white;

      .play {
        width: 30px;
        height: 30px;
        background-color: #0074ff;
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
    color: white;

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
    border: 0.5px solid #0074ff;
    position: fixed;
    display: flex;
    bottom: 0;
    justify-content: center;
    align-items: baseline;

    span {
      color: #0074ff;
      font-weight: bold;
      margin: 0px 20px;
    }

    h2 {
      color: white;
    }
  }

  @media (max-width: 500px) {
    .exameControl-contain {
      h2 {
        color: white;
        font-size: 20px;
      }
    }
  }
`;
