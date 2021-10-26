import styled from "styled-components";

export const BaralhoContain = styled.div`
  background-color: #111b29;
  padding-bottom: 700px;

  #table {
    width: 100%;
    text-align: center;
    color: white;
    border-collapse: collapse;

    tr {
      td {
        padding: 5px;
      }
    }
  }

  .exame {
    width: 60px;
    height: 60px;
    background-color: #0074ff;
    border-radius: 100%;
    padding: 15px;
    position: fixed;
    bottom: 0;
    right: 0px;
    margin: 20px;
    box-shadow: 0 0 25px rgba(0, 17, 37, 1);

    &:hover {
      transform: scale(1.1);
    }
  }
`;
