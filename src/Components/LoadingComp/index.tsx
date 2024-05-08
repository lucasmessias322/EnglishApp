import React from "react";
import { MutatingDots, RotatingLines } from "react-loader-spinner";
import styled from "styled-components";

export default function LoadingComp() {
  return (
    <Container>
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color=" #a0bbdb"
        secondaryColor=" #a0bbdb"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <span>Carregando...</span>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 10px;
  display: flex;
  margin-top: 100px;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
`;
