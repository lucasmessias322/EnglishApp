import styled from 'styled-components';

export const MemorizeContain = styled.div<{thema?:boolean}>`
  background-color: ${(props) => (props.thema ? "#ffff" : "#111B29")};
  min-height: 100vh;
`;

export const ListaBaralhos = styled.div`
  width: 100%;
  padding-top: 60px;
`;

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
    h3 {
    }

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

export const ItemContainer = styled.li<{thema?:boolean}>`
  padding: 15px 10px;
  border-bottom: 0.1px solid
    ${(props) => (props.thema ? "grey" : "rgba(255, 255, 255, 0.2)")};
  display: flex;
  justify-content: space-between;

  a {
    text-decoration: none;

    div {
      display: flex;
      font-weight: bold;
      align-items: baseline;

      h3 {
        color: ${(props) => (props.thema ? "black" : "#ffff")};
        font-size: 20px;
      }
      span {
        color: #ff006b;
        font-size: 16px;
        padding-left: 10px;
      }
    }
  }
`;

export const ItemEdit = styled.div`
  /* margin-right: 10px; */
  display: flex;
  align-items: center;

  .IconCircle {
  }
`;

export const CircleContain = styled.div<{size?:number, thema?:boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.size ? props.size : "10")}px;
  height: ${(props) => (props.size ? props.size : "10")}px;
  margin-right: 5px;
  padding: 5px;
  color: white;
  border-radius: 100%;
  background-color: ${(props) => (props.thema ? "#ff006b" : "#006aff")};
  /* border: 10px solid ${(props) => (props.thema ? "#ff006b" : "#006aff")}; */

  &:hover {
    transform: scale(1.1);
  }
`;
