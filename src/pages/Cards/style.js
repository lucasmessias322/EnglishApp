import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => (props.thema ? "#FFFF" : "#111b29")};
  display: flex;
  flex-direction: column;
`;

export const Stack = styled.div`
  width: 90%;
  max-width: 300px;
  margin: 0 auto;
  padding: 30px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Card = styled.div`
  width: 300px;
  height: 450px;
  color: white;
  font-size: 30px;
  border-radius: 15px;
  background-color: #223754;
  box-shadow: -5px 5px 10px #0a111a;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 20% 70%;

  .iconVolume {
    width: 100%;
    padding: 20px;
  }

  .text {
    padding: 0px 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* &.front {
    background-color: #304e78;
  }
  &.back {
    background-color: #223754;
  } */
`;
export const BtnCardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 20px;
`;

export const BtnCard = styled.div`
  color: white;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
`;
