import React, { useContext, useState } from "react";
import styled from "styled-components";
import { PostText } from "../../Apis/englishplusApi";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";

// Definindo as interfaces para os tipos de dados
interface Paragraph {
  paragraph: string;
  audiotexturl: string;
}

interface FormData {
  level: string;
  title: string;
  resume: string;
  content: Paragraph[];
}

// Componente principal MyForm
export default function MyForm() {
  const { token, userData } = useContext(AuthContext);
  const [formData, setFormData] = useState<FormData>({
    level: "",
    title: "",
    resume: "",
    content: [{ paragraph: "", audiotexturl: "" }],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleParagraphChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedcontent = [...formData.content];
    updatedcontent[index][name] = value;
    setFormData((prevState) => ({
      ...prevState,
      content: updatedcontent,
    }));
  };

  const addParagraph = () => {
    setFormData((prevState) => ({
      ...prevState,
      content: [...prevState.content, { paragraph: "", audiotexturl: "" }],
    }));
  };

  // Adicione esta função ao seu componente MyForm
  const removeParagraph = (indexToRemove: number) => {
    if (formData.content.length > 1) {
      // Verifica se há mais de um parágrafo
      setFormData((prevState) => ({
        ...prevState,
        content: prevState.content.filter(
          (_, index) => index !== indexToRemove
        ),
      }));
    } else {
      alert("Você deve ter pelo menos um parágrafo.");
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      PostText(formData, userData._id, token)
        .then((res) =>
          toast.success(res.msg, {
            theme: "colored",
          })
        )
        .catch((err) => {
          toast.error(err, {
            theme: "colored",
          });
          console.log(err);
        });

      setFormData({
        level: "",
        title: "",
        resume: "",
        content: [{ paragraph: "", audiotexturl: "" }],
      });
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      toast.error("Erro ao enviar dados", {
        theme: "colored",
      });
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Label>
        Nível:
        <Select
          required
          name="level"
          value={formData.level}
          onChange={(e: any) => handleChange(e)}
        >
          <option value="">Selecione o nível de inglês</option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C1">C1</option>
          <option value="C2">C2</option>
        </Select>
      </Label>
      <Label>
        Título:
        <Input
          required
          placeholder="Titulo do texto"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </Label>
      <Label>
        Resumo:
        <Input
          required
          placeholder="Resumo do texto"
          type="text"
          name="resume"
          value={formData.resume}
          onChange={handleChange}
        />
      </Label>
      <ParagraphsContainer>
        {formData.content.map((item, index) => (
          <div key={index}>
            <Label>
              Parágrafo {index + 1}:
              <TextArea
                required
                placeholder="Digite um paragrafo do texto relacionado ao audio"
                name="paragraph"
                value={item.paragraph}
                onChange={(e) => handleParagraphChange(e, index)}
              />
            </Label>
            <Label>
              URL do Áudio:
              <Input
                required
                placeholder="exemplo: audios/weekend-adventure/audio_p1.mp3"
                type="text"
                name="audiotexturl"
                value={item.audiotexturl}
                onChange={(e) => handleParagraphChange(e, index)}
              />
            </Label>
            {formData.content.length > 1 && ( // Verifica se há mais de um parágrafo antes de mostrar o botão de remoção
              <button type="button" onClick={() => removeParagraph(index)}>
                Remover parágrafo
              </button>
            )}
          </div>
        ))}
      </ParagraphsContainer>

      <BtnContainer>
        <button type="button" onClick={addParagraph}>
          Adicionar Parágrafo
        </button>
        <button type="submit">Enviar</button>
      </BtnContainer>
    </FormContainer>
  );
}

// Estilização dos componentes utilizando Styled Components
const FormContainer = styled.form`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  padding: 5px 0px;
  color: #6e88cc;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 5px;
  border: 1px solid #6e88cc;
  outline: none;
  background-color: #212433;
  color: whitesmoke;
  padding: 10px;
  resize: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 5px;
  margin-top: 5px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #6e88cc;
  background-color: #212433;
  color: whitesmoke;
`;

const ParagraphsContainer = styled.div`
  overflow: auto;
  max-height: 250px;
  margin: 10px 0px;

  div {
    margin-top: 10px;
    button {
      margin: 5px 0px;
      border: none;
      cursor: pointer;
      border-radius: 2px;
      padding: 5px;
      color: whitesmoke;
      background-color: #6e88cc;
      &:hover {
        background-color: #485985;
        transform: scale(1.1);
      }
    }
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 5px;
  margin-top: 5px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #6e88cc;
  background-color: #212433;
  color: whitesmoke;
`;

const BtnContainer = styled.div`
  button {
    margin: 10px 5px;
    border: none;
    background-color: #6e88cc;
    padding: 10px;
    border-radius: 5px;
    color: whitesmoke;
    cursor: pointer;
    &:hover {
      background-color: #485985;
      transform: scale(1.1);
    }
  }
`;
