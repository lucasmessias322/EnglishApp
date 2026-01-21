import React, { useState } from "react";
import HeaderComponent from "../../Components/HeaderComponent";
import styled from "styled-components";
import { FaPlus, FaTrash } from "react-icons/fa";
import { postText } from "../../Apis/englishplusApi";
import { toast, ToastContainer } from "react-toastify";

type Paragraph = {
  paragraph: string;
  audiotexturl: string | null; // base64
};

type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

type AddTextProps = {
  token: string;
};

function AddText({ token }: AddTextProps) {
  const [title, setTitle] = useState("");
  const [resume, setresume] = useState("");
  const [level, setLevel] = useState<Level>("A1");

  const [paragraphs, setParagraphs] = useState<Paragraph[]>([
    { paragraph: "", audiotexturl: null },
  ]);

  const addParagraph = () => {
    setParagraphs((prev) => [...prev, { paragraph: "", audiotexturl: null }]);
  };

  const removeParagraph = (index: number) => {
    if (paragraphs.length === 1) return;
    setParagraphs((prev) => prev.filter((_, i) => i !== index));
  };

  const updateParagraphText = (index: number, value: string) => {
    const updated = [...paragraphs];
    updated[index].paragraph = value;
    setParagraphs(updated);
  };

  const updateParagraphAudio = (index: number, file: File | null) => {
    const updated = [...paragraphs];
    updated[index].audiotexturl = file;
    setParagraphs(updated);
  };
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        // Remove o prefixo: data:audio/...;base64,
        resolve(result.split(",")[1]);
      };

      reader.onerror = () => reject(reader);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const contentWithBase64 = await Promise.all(
        paragraphs.map(async (p) => ({
          paragraph: p.paragraph,
          audiotexturl: p.audiotexturl
            ? await fileToBase64(p.audiotexturl as unknown as File)
            : null,
        })),
      );

      const data = {
        level,
        title,
        resume,
        hasAudios: contentWithBase64.some((p) => p.audiotexturl !== null),
        content: contentWithBase64,
      };
      await postText(data, token)
        .then(() => {
          toast.success("Texto cadastrado com sucesso!");
        })
        .catch((err) => {
          toast.error("Erro ao cadastrar o texto. Tente novamente.");
          console.log(err);
        });

      // Reset do formulário
      setTitle("");
      setresume("");
      setLevel("A1");
      setParagraphs([{ paragraph: "", audiotexturl: null }]);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar o texto. Tente novamente.");
    }
  };

  return (
    <div>
      <FormWrapper onSubmit={handleSubmit}>
        <Title>Adicionar texto em inglês</Title>

        <Section>
          <Field>
            <label>Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Field>

          <Field>
            <label>Resumo</label>
            <textarea
              value={resume}
              onChange={(e) => setresume(e.target.value)}
              required
            />
          </Field>

          <Field>
            <label>Nível de dificuldade</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as Level)}
              required
            >
              <option value="A1">A1 — Iniciante</option>
              <option value="A2">A2 — Básico</option>
              <option value="B1">B1 — Intermediário</option>
              <option value="B2">B2 — Intermediário avançado</option>
              <option value="C1">C1 — Avançado</option>
              <option value="C2">C2 — Proficiência</option>
            </select>
          </Field>
        </Section>

        {paragraphs.map((paragraph, index) => (
          <ParagraphCard key={index}>
            <ParagraphHeader>
              <span>Parágrafo {index + 1}</span>

              <RemoveButton
                type="button"
                onClick={() => removeParagraph(index)}
                disabled={paragraphs.length === 1}
              >
                <FaTrash />
              </RemoveButton>
            </ParagraphHeader>

            <Field>
              <label>Texto do parágrafo</label>
              <input
                type="text"
                value={paragraph.paragraph}
                onChange={(e) => updateParagraphText(index, e.target.value)}
                required
              />
            </Field>

            <Field>
              <label>Áudio do parágrafo</label>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) =>
                  updateParagraphAudio(index, e.target.files?.[0] || null)
                }
              />
            </Field>
          </ParagraphCard>
        ))}

        <AddParagraphButton type="button" onClick={addParagraph}>
          <FaPlus />
          Adicionar parágrafo
        </AddParagraphButton>

        <SubmitButton type="submit">Salvar texto</SubmitButton>
      </FormWrapper>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
}

export default AddText;
const FormWrapper = styled.form`
  max-width: 900px;

  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h2`
  color: white;
  font-family: poppins, sans-serif;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    color: #cfd4ff;
    font-size: 14px;
  }

  input,
  select,
  textarea {
    padding: 8px 10px;
    border-radius: 6px;
    background-color: transparent;
    border: 1px solid #555b7e;
    color: white;
    outline: none;
    font-size: 14px;
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }

  select option {
    background-color: #2e3553;
  }
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  align-self: flex-end;
  padding: 10px 22px;
  border-radius: 6px;
  background-color: #3ccf91;
  color: #0f1b16;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: #2fb37d;
  }
`;

const ParagraphCard = styled.div`
  background-color: #2e3553;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ParagraphHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-weight: 500;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #ff6b6b;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    color: #ff3b3b;
  }
`;

const AddParagraphButton = styled.button`
  align-self: center;
  padding: 10px 18px;
  border-radius: 20px;
  background-color: #4f67ca;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #3b4aa1;
  }
`;
