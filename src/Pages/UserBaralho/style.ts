import styled from "styled-components";

export const BaralhoContain = styled.div<{thema?:boolean}>`
  background-color: ${(props) => (props.thema ? "#FFF" : "#111b29")};
  min-height: 100vh;

  #table {
    width: 100%;
    color: ${(props) => (props.thema ? "#000" : "#FFF")};
    border-collapse: collapse;

    tr {
      td {
        padding: 10px 5px;
        border: 0.5px solid ;

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
            background-color: ${(props) =>
              props.thema ? "#FF006B" : "#0074ff"};
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
  }

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

export const RoundButton = styled.div<{thema?:boolean}>`
            width: 25px;
            height: 25px;
            background-color: ${(props) =>
              props.thema ? "#FF006B" : "#0074ff"};
            border-radius: 100%;
            padding: 5px;
            margin-right: 20px;

            &:hover {
              transform: scale(1.1);
            }
          }
        
`;
