import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UploadAudios } from "../../Apis/englishplusApi";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";

interface AudioUploaderProps {
  className?: string;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ className }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [folderName, setFolderName] = useState<string>("");
  const [audiosUrls, setAudiosUrls] = useState([]);
  const { token } = useContext(AuthContext);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!selectedFiles) return;
      // Adicione cada arquivo com uma chave única
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("audioFiles", selectedFiles[i]);
      }
      // Adicione o nome da pasta
      formData.append("folderName", folderName);

      // Faça o upload dos arquivos usando a função UploadAudios
      await UploadAudios(folderName, formData, token)
        .then((res) => {
          console.log("URLs dos áudios:", res);

          setAudiosUrls(res.audioUrls);
          console.log(res.audioUrls);

          toast.success("upload Feito com sucesso!", {
            theme: "colored",
          });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Erro ao fazer upload dos arquivos de áudio:", error);
      toast.error("Erro ao fazer upload", {
        theme: "colored",
      });
    }
  };

  return (
    <UploaderContainer className={className}>
      <form onSubmit={handleUpload}>
        <InputLabel>
          Selecione os arquivos de áudio:
          <Input
            required
            type="file"
            name="audioFiles"
            accept="audio/*"
            multiple
            onChange={handleFileChange}
          />
        </InputLabel>
        <InputLabel>
          Nome da Pasta:
          <Input
            required
            type="text"
            placeholder="Nome da Pasta"
            value={folderName}
            onChange={handleFolderNameChange}
          />
        </InputLabel>
        <UploadButton>Enviar</UploadButton>
      </form>

      {audiosUrls?.length > 0 && (
        <DisplayAudioUrls>
          {audiosUrls?.map((item) => (
            <span>{item.replace(/\\/g, "/").replace("public/ftp/", "")}</span>
          ))}
        </DisplayAudioUrls>
      )}
    </UploaderContainer>
  );
};

const UploaderContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 2px solid #6e88cc;
  border-radius: 5px;
  background-color: #212433;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #6e88cc;
`;

const Input = styled.input`
  display: block;
  margin: 10px 0px;
  border: 1px solid #6e88cc;
  background-color: #212433;
  padding: 10px;
  border-radius: 5px;
`;

const UploadButton = styled.button`
  display: block;
  background-color: #6e88cc;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const DisplayAudioUrls = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: #181a25;
  margin-top: 20px;
  border-radius: 5px;
  padding: 20px;

  span {
    font-size: 14px;
    padding: 5px;
  }
`;

export default AudioUploader;
