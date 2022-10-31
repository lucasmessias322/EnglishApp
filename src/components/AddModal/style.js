import styled from "styled-components";

export const AddItemModalContainer = styled.div`
  display: ${(props) => (props.modalOpen ? "flex" : "none")};
  position: fixed;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #0009;
  z-index: 99999;

  div.cardModal {
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
