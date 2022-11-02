import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => (props.thema ? "#FFFF" : "#111b29")};
`;

export const ListContainer = styled.div`
  width: 100%;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.div`
  width: 100%;
  padding: 20px 10px;
  border-bottom: 0.5px solid grey;

  display: flex;
  align-items: center;
  justify-content: space-between;

  div.BtnsContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span.iconContainer {
      margin: 0px 4px;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      padding: 6px;
      background-color: #0255b8;

      &:hover {
        background-color: #d50059;
        transform: scale(1.1);
        box-shadow: 4px 4px 4px #0005;
      }
    }
  }

  h3 {
    color: ${(props) => (props.thema ? "#000" : "#FFFF")};
  }
  div {
    a {
      align-items: center;
      display: flex;

      span {
        color: #6d8ab2;
        font-size: 16px;
        padding: 0px 10px;
      }
    }
  }
`;

export const AddNewListContainer = styled.div`
  display: ${(props) => (props.listModalOpen ? "flex" : "none")};
  position: fixed;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #000;
  z-index: 999;
  opacity: 0.8;

  div.card {
    width: 90%;
    max-width: 500px;
    background-color: #131313;
    padding: 25px 30px;
    border-radius: 10px;
    color: #005ac5;

    h3 {
      color: white;
      padding-bottom: 30px;
    }
    div.containerInputsEbuttons {
      margin: 0px auto;
      width: 100%;

      input {
        margin-top: 20px 0px;
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

      .btnContainer {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        button {
          margin-top: 20px;

          cursor: pointer;
          border-radius: 5px;
          padding: 0px 10px;
          border: 0;
          background-color: transparent;
          color: #005ac5;
          font-size: 17px;

          &:hover {
            color: rgba(70, 155, 255, 1);
          }
        }
      }
    }
  }
`;

export const BtnAddListContainer = styled.div`
  bottom: 0;
  width: 100%;
  position: fixed;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: flex-end;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    color: white;
    padding: 15px;
    background-color: ${(props) => (props.thema ? "#D50059" : "#005ac5")};
    border-radius: 100%;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 0 10px black;
    }
  }
`;
