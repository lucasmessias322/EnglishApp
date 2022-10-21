import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #111b29;
`;

export const FormContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 700px;
  /* border: 1px solid white; */
  text-align: center;

  img {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 30px;
  }

  form {
    padding: 5px 10px;
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
  }
`;

export const LoginOrRegister = styled.div`
  width: 100%;
  display: flex;
`;

export const LorRItem = styled.h2`
  display: inherit;
  align-items: center;
  justify-content: center;
  padding: 15px;
  width: 100%;
  color: white;
  cursor: pointer;
`;

export const ButtonSubmit = styled.button`
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  font-size: 20px;
  border: none;
  outline: none;
  background-color:#D50059;
  color: white;
  border-radius: 10px;
  cursor: pointer;
`;
