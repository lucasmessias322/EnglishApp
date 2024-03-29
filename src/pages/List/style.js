import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => (props.thema ? "#FFFF" : "#111b29")};
`;

export const TableConatiner = styled.div`
  padding-top: 50px;
`;

export const Table = styled.table`
  width: 100%;
  color: ${(props) => (props.thema ? "#000" : "#FFF")};
  border-collapse: collapse;

  thead {
    tr {
      td {
        border: 0.5px solid ${(props) => (props.thema ? "#d50059" : "#004eaa")};
        text-align: center;
        font-size: 16px;

        h3 {
          color: white;
          padding: 15px 10px;
          background-color: ${(props) => (props.thema ? "#d50059" : "#004eaa")};
        }

        h3.pt {
          /* background-color: #004eaa; */
        }

        h3.eng {
          /* background-color: #0255b8; */
        }
      }
    }
  }

  tbody {
    tr {
      td {
        padding: 10px;
        border: 0.5px solid ${(props) => (props.thema ? "black" : "#fff")};

        div.eng {
          display: flex;
          align-items: center;
        }

        div.pt {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        div.tools {
          display: flex;
          justify-content: center;
          align-items: center;

          span {
            margin: 0px 5px;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 100%;
            padding: 6px;
            background-color: #0255b8;

            &:hover {
              background-color: #d50059;
            }
          }
        }
      }
    }
  }
`;

export const BtnsContainer = styled.div`
  bottom: 0;
  width: 100%;
  position: fixed;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

export const DownBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
  color: white;
  padding: 15px;
  background-color: ${(props) => (props.thema ? "#D50059" : "#005ac5")};
  border-radius: 100%;
  font-size: 16px;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px black;
  }
`;
