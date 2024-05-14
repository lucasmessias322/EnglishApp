import React from "react";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import MyForm from "../../Components/MyForm";
import AudioUploader from "../../Components/AudioUploader";

export default function AddNewTextAdminTool() {
  return (
    <Container>
      <ToastContainer />
      <MyForm />
      <AudioUploader />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: top;
  flex-wrap: wrap;
  padding: 10px;
`;
