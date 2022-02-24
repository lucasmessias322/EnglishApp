import styled from "styled-components";

export const BaralhoContain = styled.div<{ thema?: boolean }>`
  background-color: ${(props) => (props.thema ? "#FFF" : "#111b29")};
  min-height: 100vh;

  .exame {
    width: 60px;
    height: 60px;
    background-color: ${(props) => (props.thema ? "#FF006B" : "#0074ff")};
    border-radius: 100%;
    padding: 15px;
    position: fixed;
    bottom: 0;
    right: 0px;
    margin: 20px;
    /* box-shadow: 0 0 25px rgba(0, 17, 37, 1); */

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const RoundButton = styled.div<{ thema?: boolean }>`
            width: 20px;
            height: 20px;
            background-color: ${(props) =>
              props.thema ? "#FF006B" : "#0074ff"};
            border-radius: 100%;
            padding-left: 5px;
            padding-right: 5px;
            /* margin-right: 20px; */

            &:hover {
              transform: scale(1.1);
            }
          }
        
`;

export const CriarBaralhoContain = styled.div<{ toogleAddbaralho?: boolean }>`
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

export const CardCriarBaralho = styled.div<{ thema?: boolean }>`
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

export const Table = styled.table<{ thema?: boolean }>`
  width: 100%;
  color: ${(props) => (props.thema ? "black" : "white")};
  border-collapse: collapse;

  tr {
    td {
      padding: 10px 5px;
      border: 0.5px solid;

      .response {
        padding-left: 15px;
      }

      .container {
        display: flex;
        align-items: center;

        span {
          text-align: center;
        }

        .play {
          width: 25px;
          height: 25px;
          background-color: ${(props) => (props.thema ? "#FF006B" : "#0074ff")};
          border-radius: 100%;
          padding: 5px;
          margin-right: 20px;

          &:hover {
            transform: scale(1.1);
          }
        }
      }

      .resposonseContainer {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
`;

export const EditionCardContainer = styled.div<{
  thema?: boolean;
  editItem?: boolean;
}>`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  background: rgba(0, 0, 0, 0.68);
  /* display: flex; */
  justify-content: center;
  align-items: center;

  display: ${(props) => (props.editItem ? "flex" : "none")};
`;

export const EditionCard = styled.div`
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
      justify-content: space-between;

      #delete {
        cursor: pointer;
        color: #ff4646;
      }

      div {
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
  }
`;
