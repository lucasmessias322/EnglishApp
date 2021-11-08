import styled from "styled-components";


export const FraseAFraseContainer = styled.li`
  margin: 10px;
  /* margin-bottom: 15px; */


  div {
    display: flex;
    align-items: center;
    h3 {
      margin: 5px;
      color: ${(props) => (props.thema ? "#ff5ad1" : "#9FDDFF")};
      font-size: 22px;
    }
  }
  p {
    font-size: 16px;
    margin-left: 45px;
    color: white;
  }
`;


export const PlayFraseButton = styled.div`
  width: 25px;
  height: 25px;
  background-color: ${(props) => (props.thema ? "#FF006B" : "#0074ff")};
  color: white;
  border-radius: 100%;
  padding: 5px;
  margin-right: 10px;

  &:hover {
    transform: scale(1.1);
  }
`;