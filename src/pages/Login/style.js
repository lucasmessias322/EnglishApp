import styled from "styled-components";

export const Container = styled.div`
  background-color: #111b29;
  min-height: 100vh;
  padding: 10px 0px;
  text-align: center;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  border-top: 0px solid white;
  border-bottom: 0.1px solid white;
  padding: 40px 0px;
  margin: 0 auto;

  img {
    width: 100%;
    padding-bottom: 30px;
  }

  form {
    padding: 0px 15px;
  }
`;

export const ButtonSubmit = styled.button`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 10px;
  font-size: 20px;
  border: none;
  outline: none;
  background-color: #ff006b;
  color: white;
  border-radius: 10px;
  cursor: pointer;
`;

export const H4 = styled.h5`
  padding: 10px;
  color: #fff;

  span {
    a{
       color: #ff006b;
    cursor: pointer;
    }
   
  }
`;

export const ButtonNoAcount = styled.button`
  background-color: #ff006b;
  margin-top: 15px;
  padding: 10px 15px;
  border-radius: 20px;
  border: none;
  outline: none;
  color: white;
  font-size: 15px;
  cursor: pointer;
`;
