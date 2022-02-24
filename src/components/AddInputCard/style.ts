import styled from "styled-components";

export const AddCardContain = styled.div<{thema?:boolean}>`
  bottom: 0;
  width: 100%;
  position: fixed;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: flex-end;

  div.linhar {
    margin: 10px;
  }
`;


export const AddCard = styled.div<{thema?:boolean, size?:number}>`
  width: ${(props) => (props.size ? props.size : "10")}px;
  height: ${(props) => (props.size ? props.size : "10")}px;
  padding: 10px;
  border-radius: 100%;
  background-color: ${(props) => (props.thema ? "#ff006b" : "#006aff")};
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px black;
  }
`;

export const CriarBaralhoContain = styled.div<{toogleAddbaralho?:boolean}>`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  background: rgba(0, 0, 0, 0.68);
  /* display: flex; */
  justify-content: center;
  align-items: center;

  display: ${(props) => (props.toogleAddbaralho ? "flex" : "none")};
`;

export const CardCriarBaralho = styled.div`
  max-width: 500px;
  width: 90%;
  padding: 40px;
  border-radius: 5px;
  background-color: #131313;

  .contain {
    width: 100%;
    color: white;

    .inputContain {
      margin: 40px 0px;
      input {
        width: 100%;
        outline: none;
        border: 0;
        border-bottom: 1px solid #005ac5;
        color: white;
        padding: 10px 0px;
        font-size: 17px;
        background-color: transparent;
        margin-bottom: 10px;
      }
    }

    .actions {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      color: #005ac5;

      h5 {
        margin: 0px 10px;
        cursor: pointer;
        &:hover {
          color: rgba(70, 155, 255, 1);
        }
      }
    }
  }
`;
