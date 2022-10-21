import styled from "styled-components";

const colors = {
  color1: "#111B29",
  color2: "#FF006B",
  color3: "rgb(255, 253, 128)",
  color4: "#9FDDFF",
  color5: "#CF0057",
  color6: "#005AC5",
  color7: "#0074ff",
  color8: "#C20052",
};

export const TextoLayoutContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: ${(props) => (props.thema ? "white" : colors.color1)};
`;

export const TextoContainer = styled.div`
  margin: auto;
  padding-top:30px;
  text-align: center;
  max-width: 700px;
  width: 100%;
  p {
    color: ${(props) => (props.thema ? "black" : "white")};
    font-size: clamp(0.5em, 0.8em + 1vw, 1.2em);
    padding: 0px 5px;
    /* font-weight: bold; */
  }
  .SelectedP {
    color: ${(props) => (props.thema ? colors.color2 : colors.color3)};
  }
`;

export const FraseAFraseComponent = styled.div`
  padding: 10px;
  width: 100%;
  max-width: 700px;
  margin: auto;

  h2 {
    color: ${(props) => (props.thema ? colors.color2 : colors.color4)};
    font-size: 30px;
  }

  div.content-frases {
    list-style: none;
  }

  @media (max-width: 500px) {
    div.content-frases {
      li {
        h3 {
          font-size: 16px;
        }
        p {
          font-size: 15px;
        }
      }
    }
  }
`;

export const FraseAFraseContainer = styled.li`
  margin: 10px;

  div {
    display: flex;
    align-items: center;
    h3 {
      margin: 5px;
      color: ${(props) => (props.thema ? colors.color2 : colors.color4)};
      font-size: 22px;
    }
  }
  p {
    font-size: 16px;
    margin-left: 45px;
    color: ${(props) => (props.thema ? "black" : "white")};
  }
`;

export const PlayerComponent = styled.div`
  width: 100%;
  height: 75px;
  position: fixed;
  z-index: 9999;
  bottom: 0;
  background-color: ${(props) => (props.thema ? colors.color5 : colors.color6)};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  li#PlayPauseButton {
    width: 55px;
    height: 55px;
    padding: 10px;
    font-size: 30px;
  }

  li#SlowButton {
    width: 45px;
    height: 45px;
    padding: 10px;

    img {
      width: 100%;
      margin-bottom: 15px;
    }
  }
  li#FastButton {
    width: 45px;
    height: 45px;
    padding: 10px;
    font-size: 29px;
    line-height: 30px;
  }
  li#homeBtn {
    width: 45px;
    height: 45px;
    padding: 5px;
    font-size: 29px;
    line-height: 30px;

    a {
      text-decoration: none;
      outline: none;
      color: inherit;
    }
  }

  input#inputRange {
    transform: rotate(-90deg);
  }

  li#VolumeBtn {
    width: 45px;
    height: 45px;
    padding: 10px;
    font-size: 26px;
    line-height: 30px;
  }

  li {
    background-color: ${(props) =>
      props.thema ? colors.color8 : colors.color6};
    list-style: none;
    box-shadow: 0px 0px 20px ${(props) => (props.thema ? "#2b0112" : "#27004E")};
    border-radius: 100px;
    margin: 5px;
    color: white;

    &:hover {
      transform: scale(1.1);
      background-color: ${(props) =>
        props.thema ? colors.color2 : colors.color6};
    }
  }

  @media (max-width: 500px) {
    li#PlayPauseButton {
      font-size: 29px;
    }
  }
`;
export const PlayFraseButton = styled.div`
  width: 25px;
  height: 25px;
  background-color: ${(props) => (props.thema ? colors.color2 : colors.color7)};
  color: white;
  border-radius: 100%;
  padding: 5px;
  margin-right: 10px;

  &:hover {
    transform: scale(1.1);
  }
`;
