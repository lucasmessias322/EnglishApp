import styled from "styled-components";

export const MemorizeContain = styled.div`
  background-color: ${(props) => (props.thema ? "#ffff" : "#111B29")};
  min-height: 100vh;

  div.ListaBaralhos {
    width: 100%;
    padding-top: 60px;

    li {
      padding: 15px 10px;
      border-bottom: 0.1px solid gray;
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
    }

    .starCircle {
      color: white;
      border-radius: 100%;
      background-color: ${(props) => (props.thema ? "#ff006b" : "#006aff")};
      border: 5px solid ${(props) => (props.thema ? "#ff006b" : "#006aff")};

      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;
