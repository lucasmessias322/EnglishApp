import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaPlus, FaTrash } from "react-icons/fa";
import { postText } from "../../Apis/englishplusApi";
import { toast, ToastContainer } from "react-toastify";
import { useTheme } from "../../Context/ThemeContext";

type Paragraph = {
  paragraph: string;
  translation: string;
  audiotexturl: File | string | null;
};

type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

type AddTextProps = {
  token: string;
};
type Quiz = {
  question: string;
  alternatives: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer?: "A" | "B" | "C" | "D";
};

function getAudioSource(audio: string | null) {
  const trimmedAudio = audio?.trim();

  if (!trimmedAudio) return "";

  if (
    trimmedAudio.startsWith("data:") ||
    trimmedAudio.startsWith("http") ||
    trimmedAudio.startsWith("blob:")
  ) {
    return trimmedAudio;
  }

  return `data:audio/mpeg;base64,${trimmedAudio}`;
}

function AudioPreview({ audio }: { audio: File | string | null }) {
  const [filePreviewUrl, setFilePreviewUrl] = useState("");

  useEffect(() => {
    if (!(audio instanceof File)) {
      setFilePreviewUrl("");
      return;
    }

    const previewUrl = URL.createObjectURL(audio);
    setFilePreviewUrl(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [audio]);

  const audioSrc =
    audio instanceof File ? filePreviewUrl : getAudioSource(audio);

  if (!audioSrc) {
    return (
      <AudioPreviewBox $empty>
        <span>Nenhum audio selecionado para este paragrafo.</span>
      </AudioPreviewBox>
    );
  }

  return (
    <AudioPreviewBox>
      <span>
        {audio instanceof File ? audio.name : "Audio pronto para escuta"}
      </span>
      <audio controls src={audioSrc} />
    </AudioPreviewBox>
  );
}

function AddText({ token }: AddTextProps) {
  const { currentTheme } = useTheme();
  const [title, setTitle] = useState("");
  const [resume, setresume] = useState("");
  const [level, setLevel] = useState<Level>("A1");

  const [paragraphs, setParagraphs] = useState<Paragraph[]>([
    { paragraph: "", translation: "", audiotexturl: null },
  ]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const addParagraph = () => {
    setParagraphs((prev) => [
      ...prev,
      { paragraph: "", translation: "", audiotexturl: null },
    ]);
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

  const updateParagraphTranslation = (index: number, value: string) => {
    const updated = [...paragraphs];
    updated[index].translation = value;
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
          translation: p.translation,
          audiotexturl:
            p.audiotexturl instanceof File
              ? await fileToBase64(p.audiotexturl)
              : p.audiotexturl,
        })),
      );

      const data = {
        level,
        title,
        resume,
        hasAudios: contentWithBase64.some((p) =>
          Boolean(p.audiotexturl?.trim()),
        ),
        content: contentWithBase64,
        quizzes, // 👈 aqui
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
      setParagraphs([{ paragraph: "", translation: "", audiotexturl: null }]);
      setQuizzes([]);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar o texto. Tente novamente.");
    }
  };

  const addQuiz = () => {
    setQuizzes((prev) => [
      ...prev,
      {
        question: "",
        alternatives: { A: "", B: "", C: "", D: "" },
        correctAnswer: "A",
      },
    ]);
  };

  const removeQuiz = (index: number) => {
    setQuizzes((prev) => prev.filter((_, i) => i !== index));
  };
  const updateQuizQuestion = (index: number, value: string) => {
    const updated = [...quizzes];
    updated[index].question = value;
    setQuizzes(updated);
  };
  const updateQuizAlternative = (
    index: number,
    key: "A" | "B" | "C" | "D",
    value: string,
  ) => {
    const updated = [...quizzes];
    updated[index].alternatives[key] = value;
    setQuizzes(updated);
  };
  const updateCorrectAnswer = (index: number, value: "A" | "B" | "C" | "D") => {
    const updated = [...quizzes];
    updated[index].correctAnswer = value;
    setQuizzes(updated);
  };

  return (
    <div>
      <FormWrapper onSubmit={handleSubmit}>
        <FormHeader>
          <span>Novo conteudo</span>
          <Title>Adicionar texto em ingles</Title>
          <p>
            Cadastre a leitura, os audios por paragrafo e as perguntas de
            compreensao em um unico fluxo.
          </p>
        </FormHeader>

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
              <textarea
                value={paragraph.paragraph}
                onChange={(e) => updateParagraphText(index, e.target.value)}
                required
              />
            </Field>

            <Field>
              <label>Traducao do paragrafo</label>
              <textarea
                value={paragraph.translation}
                onChange={(e) =>
                  updateParagraphTranslation(index, e.target.value)
                }
                placeholder="Digite a traducao deste paragrafo"
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
              <AudioPreview audio={paragraph.audiotexturl} />
            </Field>
          </ParagraphCard>
        ))}

        <AddParagraphButton type="button" onClick={addParagraph}>
          <FaPlus />
          Adicionar parágrafo
        </AddParagraphButton>

        {quizzes.length > 0 &&
          quizzes.map((quiz, index) => (
            <ParagraphCard key={index}>
              <ParagraphHeader>
                <span>Quiz {index + 1}</span>

                <RemoveButton
                  type="button"
                  onClick={() => removeQuiz(index)}
                  // disabled={quizzes.length === 1}
                >
                  <FaTrash />
                </RemoveButton>
              </ParagraphHeader>

              <Field>
                <label>Pergunta</label>
                <textarea
                  value={quiz.question}
                  onChange={(e) => updateQuizQuestion(index, e.target.value)}
                  required
                />
              </Field>

              {(["A", "B", "C", "D"] as const).map((alt) => (
                <Field key={alt}>
                  <label>Alternativa {alt}</label>
                  <input
                    type="text"
                    value={quiz.alternatives[alt]}
                    onChange={(e) =>
                      updateQuizAlternative(index, alt, e.target.value)
                    }
                    required
                  />
                </Field>
              ))}

              <Field>
                <label>Resposta correta</label>
                <select
                  value={quiz.correctAnswer}
                  onChange={(e) =>
                    updateCorrectAnswer(
                      index,
                      e.target.value as "A" | "B" | "C" | "D",
                    )
                  }
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </Field>
            </ParagraphCard>
          ))}
        <AddParagraphButton type="button" onClick={addQuiz}>
          <FaPlus />
          Adicionar quiz
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
        theme={
          ["paper", "sepia", "mint"].includes(currentTheme.id)
            ? "light"
            : "dark"
        }
      />
    </div>
  );
}

export default AddText;
const FormWrapper = styled.form`
  max-width: 900px;
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 560px) {
    padding: 16px;
  }
`;

const FormHeader = styled.div`
  padding-bottom: 8px;

  span {
    display: inline-flex;
    margin-bottom: 8px;
    color: var(--accent-soft);
    font-size: 0.78rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  p {
    max-width: 620px;
    margin-top: 8px;
    color: var(--muted);
    line-height: 1.7;
  }
`;

const Title = styled.h2`
  color: var(--text);
  font-family: "Google Sans", "Poppins", sans-serif;
  font-size: clamp(1.6rem, 3vw, 2.25rem);
  line-height: 1.15;
`;

const Section = styled.div`
  padding: 18px;
  border: 1px solid rgba(var(--primary-strong-rgb), 0.24);
  border-radius: 22px;
  background: var(--glass-bg);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    color: var(--text);
    font-size: 14px;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 12px 14px;
    border-radius: 14px;
    border: 1px solid rgba(var(--primary-strong-rgb), 0.32);
    background-color: var(--control-bg);
    color: var(--text);
    outline: none;
    font-size: 14px;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      background-color 0.2s ease;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: rgba(var(--accent-rgb), 0.62);
    background-color: var(--control-bg-strong);
    box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.12);
  }

  textarea {
    min-height: 110px;
    resize: vertical;
  }

  select option {
    background-color: var(--surface-strong);
  }
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  align-self: flex-end;
  min-height: 48px;
  padding: 12px 22px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--accent), var(--accent-soft));
  color: var(--bg);
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 800;
  box-shadow: 0 16px 30px rgba(var(--accent-rgb), 0.18);

  &:hover {
    filter: brightness(1.05);
  }
`;

const ParagraphCard = styled.div`
  border: 1px solid rgba(var(--primary-strong-rgb), 0.24);
  background:
    linear-gradient(180deg, rgba(var(--primary-strong-rgb), 0.04), transparent 44%),
    var(--glass-bg);
  border-radius: 22px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 18px 36px rgba(7, 10, 20, 0.16);
`;

const ParagraphHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  color: var(--text);
  font-weight: 700;
`;

const AudioPreviewBox = styled.div<{ $empty?: boolean }>`
  width: 100%;
  padding: 12px;
  border: 1px solid
    ${(props) =>
      props.$empty
        ? "rgba(var(--primary-strong-rgb), 0.24)"
        : "rgba(var(--accent-rgb), 0.34)"};
  border-radius: 16px;
  background: ${(props) =>
    props.$empty ? "var(--control-bg)" : "rgba(var(--accent-rgb), 0.08)"};
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 10px;

  span {
    color: ${(props) => (props.$empty ? "var(--muted)" : "var(--text)")};
    font-size: 0.84rem;
    font-weight: 700;
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  audio {
    width: 100%;
    height: 38px;
  }
`;

const RemoveButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 14px;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.2);
  color: #ff6b6b;
  cursor: pointer;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

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
  min-height: 46px;
  padding: 10px 18px;
  border-radius: 16px;
  background: rgba(var(--primary-strong-rgb), 0.15);
  color: var(--text);
  border: 1px solid rgba(var(--primary-strong-rgb), 0.42);
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(var(--primary-strong-rgb), 0.24);
    border-color: rgba(var(--accent-rgb), 0.44);
  }
`;
