import styled from "styled-components";
import * as C from "./style";
import { useEffect, useRef, useState } from "react";
import {
  deleteText,
  getSingleText,
  getTexts,
  PutText,
} from "../../Apis/englishplusApi";
import { toast, ToastContainer } from "react-toastify";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { MutatingDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
// Definindo a tipagem correta para os textos
interface Text {
  _id: string;
  level: string;
  title: string;
  resume: string;
  content: { paragraph: string; audiotexturl: string }[]; // Array de objetos com parágrafos e audioUrl
}
type Paragraph = {
  paragraph: string;
  audiotexturl: string | null; // base64
};

type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
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
export default function EditText({ token }: { token: string }) {
  // Tipando o estado de levels como um array de Text
  const [isLoading, setIsLoading] = useState(true);
  const [levels, setLevels] = useState<Text[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const isFetchingRef = useRef(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [textToDelete, setTextToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();
  const [editingTextId, setEditingTextId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [resume, setresume] = useState("");
  const [level, setLevel] = useState<Level>("A1");

  const [paragraphs, setParagraphs] = useState<Paragraph[]>([
    { paragraph: "", audiotexturl: null },
  ]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [openEditPopup, setOpenEditPopup] = useState(false);

  useEffect(() => {
    if (!hasMore || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsLoading(true);

    getTexts({ page: currentPage, limit: 5 }).then((res) => {
      setLevels((prev) => {
        const ids = new Set(prev.map((t) => t._id));
        const filtered = res.data.filter((t: Text) => !ids.has(t._id));
        return [...prev, ...filtered];
      });

      console.log(res.data);

      if (res.data.length < 5) {
        setHasMore(false);
      }

      setIsLoading(false);
      isFetchingRef.current = false;
    });
  }, [currentPage]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingRef.current) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0,
      },
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore]);

  const confirmDelete = async () => {
    if (!textToDelete) return;

    try {
      setIsDeleting(true);

      await deleteText(textToDelete, token)
        .then(() => {
          setLevels((prev) => prev.filter((text) => text._id !== textToDelete));
          toast.success("Texto cadastrado com sucesso!");
        })
        .catch((err) => {
          toast.error("Erro ao cadastrar o texto.", err);
          console.log(err);
        });

      setShowPopUp(false);
      setTextToDelete(null);
    } catch (error) {
      console.error("Erro ao deletar texto:", error);
      toast.error("Erro ao deletar o texto. ");
    } finally {
      setIsDeleting(false);
    }
  };
  const HandleEdit = async (textid: string) => {
    try {
      const res = await getSingleText(textid);

      setEditingTextId(textid); // 👈 MUITO IMPORTANTE
      setTitle(res[0].title);
      setresume(res[0].resume);
      setLevel(res[0].level);
      setQuizzes(res[0].quizzes);
      setParagraphs(
        res[0].content.map((para: any) => ({
          paragraph: para.paragraph,
          audiotexturl: para.audiotexturl || null,
        })),
      );

      setOpenEditPopup(true);
    } catch (err) {
      toast.error("Erro ao carregar texto");
      console.error(err);
    }
  };
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
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result as string;

      // remove: data:audio/mpeg;base64,
      const base64Only = result.split(",")[1];

      const updated = [...paragraphs];
      updated[index].audiotexturl = base64Only;
      setParagraphs(updated);
    };

    reader.readAsDataURL(file);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingTextId) {
      toast.error("Texto inválido para edição");
      return;
    }

    try {
      const payload = {
        title,
        resume,
        level,
        content: paragraphs.map((p) => ({
          paragraph: p.paragraph,
          audiotexturl: p.audiotexturl, // base64 ou string antiga
        })),
        quizzes,
      };

      console.log("Payload enviado:", payload);

      await PutText(editingTextId, payload, token);

      toast.success("Texto atualizado com sucesso!");

      setLevels((prev) =>
        prev.map((t) =>
          t._id === editingTextId
            ? { ...t, title, resume, level, content: payload.content }
            : t,
        ),
      );

      setOpenEditPopup(false);
      setEditingTextId(null);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao atualizar texto");
    }
  };

  return (
    <C.Container>
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
      <>
        <C.LevelWrapper>
          <C.Searchbar>
            <input type="text" placeholder="Search texts..." />
          </C.Searchbar>
          <C.TextListWrapper>
            {levels.map((text) => (
              <C.TextItem key={text._id}>
                <div className="text-info">
                  <h4 onClick={() => navigate(`/text/${text._id}`)}>
                    {text.title} - {text.level}
                  </h4>
                  <span>{text.resume}</span>
                </div>
                <div className="editToolsIcons">
                  <div className="icon">
                    <FaEdit onClick={() => HandleEdit(text._id)} />
                  </div>
                  <div className="icon">
                    <FaTrash
                      onClick={() => {
                        setTextToDelete(text._id);
                        setShowPopUp(true);
                      }}
                    />
                  </div>
                </div>
              </C.TextItem>
            ))}
          </C.TextListWrapper>
          {hasMore && (
            <C.LoadingWrapper ref={loaderRef}>
              {isLoading && (
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
              )}
            </C.LoadingWrapper>
          )}
        </C.LevelWrapper>
      </>

      {showPopUp && (
        <C.PopUpOverlay>
          <C.PopUpContent>
            <h3>Confirmar Deleção</h3>
            <p>
              Tem certeza que deseja deletar este texto? Esta ação não pode ser
              desfeita.
            </p>

            <div className="buttons">
              <button onClick={confirmDelete} disabled={isDeleting}>
                {isDeleting ? "Deletando..." : "Deletar"}
              </button>

              <button
                onClick={() => setOpenEditPopup(false)}
                disabled={isDeleting}
              >
                Cancelar
              </button>
            </div>
          </C.PopUpContent>
        </C.PopUpOverlay>
      )}

      {openEditPopup && (
        <EditPopUp
          title={title}
          setTitle={setTitle}
          resume={resume}
          setresume={setresume}
          level={level}
          setLevel={setLevel}
          paragraphs={paragraphs}
          setParagraphs={setParagraphs}
          quizzes={quizzes}
          setQuizzes={setQuizzes}
          handleSubmit={handleSubmit}
          onClose={() => {
            setOpenEditPopup(false);
            setEditingTextId(null);
          }}
        />
      )}
    </C.Container>
  );
}
interface EditPopUpProps {
  title: string;
  setTitle: (v: string) => void;
  resume: string;
  setresume: (v: string) => void;
  level: Level;
  setLevel: (v: Level) => void;

  paragraphs: Paragraph[];
  setParagraphs: React.Dispatch<React.SetStateAction<Paragraph[]>>;

  quizzes: Quiz[];
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;

  handleSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}
function EditPopUp({
  title,
  setTitle,
  resume,
  setresume,
  level,
  setLevel,
  paragraphs,
  setParagraphs,
  quizzes,
  setQuizzes,
  handleSubmit,
  onClose,
}: EditPopUpProps) {
  const addParagraph = () =>
    setParagraphs((prev) => [...prev, { paragraph: "", audiotexturl: null }]);

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
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(",")[1];
      const updated = [...paragraphs];
      updated[index].audiotexturl = base64;
      setParagraphs(updated);
    };
    reader.readAsDataURL(file);
  };

  const addQuiz = () =>
    setQuizzes((prev) => [
      ...prev,
      {
        question: "",
        alternatives: { A: "", B: "", C: "", D: "" },
        correctAnswer: "A",
      },
    ]);

  const removeQuiz = (index: number) => {
    if (quizzes.length === 1) return;
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
    <C.PopUpOverlay>
      <C.EditPopupContent>
        <C.EditForm onSubmit={handleSubmit}>
          <C.Title>Edit Text</C.Title>

          <C.Section>
            <C.Field>
              <label>Título</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </C.Field>

            <C.Field>
              <label>Resumo</label>
              <textarea
                value={resume}
                onChange={(e) => setresume(e.target.value)}
              />
            </C.Field>

            <C.Field>
              <label>Nível</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as Level)}
              >
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
            </C.Field>
          </C.Section>

          {paragraphs.map((p, i) => (
            <C.ParagraphCard key={i}>
              <C.ParagraphHeader>
                <span>Parágrafo {i + 1}</span>
                <C.RemoveButton onClick={() => removeParagraph(i)}>
                  <FaTrash />
                </C.RemoveButton>
              </C.ParagraphHeader>
              <C.Field>
                <textarea
                  required
                  value={p.paragraph}
                  onChange={(e) => updateParagraphText(i, e.target.value)}
                />

                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) =>
                    updateParagraphAudio(i, e.target.files?.[0] || null)
                  }
                />
              </C.Field>
            </C.ParagraphCard>
          ))}

          <C.AddParagraphButton onClick={addParagraph}>
            <FaPlus />
            Adicionar Parágrafo
          </C.AddParagraphButton>

          {quizzes.map((quiz, i) => (
            <C.ParagraphCard key={i}>
              <C.ParagraphHeader>
                <span>Quiz {i + 1}</span>
                <C.RemoveButton onClick={() => removeQuiz(i)}>
                  <FaTrash />
                </C.RemoveButton>
              </C.ParagraphHeader>
              <C.Field>
                <textarea
                  required
                  value={quiz.question}
                  onChange={(e) => updateQuizQuestion(i, e.target.value)}
                />
              </C.Field>

              {(["A", "B", "C", "D"] as const).map((alt) => (
                <C.Field>
                  <label>Alternativa {alt}</label>
                  <input
                    required
                    key={alt}
                    value={quiz.alternatives[alt]}
                    onChange={(e) =>
                      updateQuizAlternative(i, alt, e.target.value)
                    }
                  />{" "}
                </C.Field>
              ))}
              <C.Field>
                <select
                  value={quiz.correctAnswer}
                  onChange={(e) =>
                    updateCorrectAnswer(i, e.target.value as any)
                  }
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </C.Field>
            </C.ParagraphCard>
          ))}

          <C.AddParagraphButton onClick={addQuiz}>
            <FaPlus /> Adicionar Quiz
          </C.AddParagraphButton>

          <div className="buttons">
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </C.EditForm>
      </C.EditPopupContent>
    </C.PopUpOverlay>
  );
}
