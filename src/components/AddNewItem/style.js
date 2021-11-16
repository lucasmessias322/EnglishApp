import styled from 'styled-components'


export const CriarBaralhoContain = styled.div`
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
        margin: 10px 0px;
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