import styled from "styled-components";

export const CardResponse = styled.div`
  padding: 0px 10px;
  
  .card {
    padding: 10px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 0.5px solid grey;
  }
`;

export const Response = styled.div`
  display: ${(props) => (props.Menu ? "block" : "none")};
  padding: 10px 0px;
`;
