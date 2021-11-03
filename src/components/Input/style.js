import styled from "styled-components";

export const InputText = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  margin: 15px auto;

  div {
    background-color: #ff006b;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 10px 15px;
  }
  input {
    width: 100%;
    padding: 5px;
    background-color: #fff;
    border: none;
    outline: none;
    font-size: 17px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;
