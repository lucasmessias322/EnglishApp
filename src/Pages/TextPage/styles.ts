import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 60px;
`;

export const TextoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 600px;
  margin: 0px auto;
  padding: 40px 10px;

  h2 {
    text-align: center;
    padding: 10px 0px;
  }
  p {
    padding: 10px;
  }
  .SelectedP {
    color: rgb(255, 255, 114);
  }
`;

export const WordContainer = styled.span`
  &:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: #52043b;
    /* padding: 0px 5px; */
    text-align: center;
  }
`;

export const WordPopUpContainer = styled.div`
  width: 100%;
  height: 100vh;

  background: #1a19198d;
  z-index: 9999;
  position: fixed;
  top: 0;

  /* padding: 20px 0px; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WordPopUp = styled.div`
  /* width: 90%; */
  margin: auto;
  border: 5px solid #222635;
  max-width: 250px;
  border-radius: 10px;
  padding: 15px;
  background-color: #1c1f2d;
  display: flex;
  box-shadow: 5px 5px 10px #11131b;

  flex-direction: column;

  div {
    display: flex;
    padding: 5px 0px;
    margin-bottom: 10px;
    border-bottom: 1px solid gray;
    align-items: center;
    justify-content: space-between;

    .ico {
      font-size: 16px;
    }

    h4 {
    }
  }
`;
