import styled from "styled-components";

import { useEffect, useRef, useState } from "react";
import { deleteText, getTexts } from "../../Apis/englishplusApi";
import { toast, ToastContainer } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MutatingDots } from "react-loader-spinner";
// Definindo a tipagem correta para os textos
interface Text {
  _id: string;
  level: string;
  title: string;
  resume: string;
  content: { paragrafo: string; audiotexturl: string }[]; // Array de objetos com parágrafos e audioUrl
}

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

  return (
    <Container>
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
        <LevelWrapper>
          <Searchbar>
            <input type="text" placeholder="Search texts..." />
          </Searchbar>
          <TextListWrapper>
            {levels.map((text) => (
              <TextItem key={text._id}>
                <div className="text-info">
                  <h4>
                    {text.title} - {text.level}
                  </h4>
                  <span>{text.resume}</span>
                </div>
                <div className="editToolsIcons">
                  <div className="icon">
                    <FaEdit />
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
              </TextItem>
            ))}
          </TextListWrapper>
          {hasMore && (
            <LoadingWrapper ref={loaderRef}>
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
            </LoadingWrapper>
          )}
        </LevelWrapper>
      </>

      {showPopUp && (
        <PopUpOverlay>
          <PopUpContent>
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
                onClick={() => {
                  setShowPopUp(false);
                  setTextToDelete(null);
                }}
                disabled={isDeleting}
              >
                Cancelar
              </button>
            </div>
          </PopUpContent>
        </PopUpOverlay>
      )}
    </Container>
  );
}

const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: white;
`;
// Styled-components
const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const LevelWrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

const TextListWrapper = styled.ul`
  padding: 0px;
  width: 100%;

  @media (min-width: 500px) {
    max-width: 900px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
`;

const TextItem = styled.li`
  width: 100%;
  list-style: none;
  padding: 20px 20px;

  border: 1px solid #353a52;
  border-radius: 20px;
  margin: 10px 0px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;

  align-items: center;

  max-width: 900px;

  .text-info {
    display: flex;
    flex-direction: column;
    max-width: 80%;

    h4 {
      font-size: 18px;
      color: #a0bbdb;
      font-weight: 600;
    }
    span {
      font-size: 14px;
    }
  }

  .editToolsIcons {
    display: flex;
    gap: 15px;
    .icon {
      cursor: pointer;
      font-size: 20px;
      color: #cfd4ff;
      &:hover {
        color: #6c7bff;
      }
    }
  }
`;

const Searchbar = styled.div`
  margin-bottom: 20px;
  input {
    width: 100%;
    padding: 10px 15px;
    border-radius: 8px;
    background-color: #2e3553;
    border: 1px solid #555b7e;
    color: white;
    font-size: 14px;
    outline: none;
  }
`;

const PopUpOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopUpContent = styled.div`
  background-color: #212433;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 15px;
  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }
  p {
    font-size: 14px;
    line-height: 1.4;
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    button {
      padding: 8px 16px;

      border: none;
      border-radius: 6px;
      cursor: pointer;

      font-size: 14px;
      font-weight: 500;
      &:first-child {
        background-color: #6c7bff;
        color: white;
      }
      &:last-child {
        background-color: #555b7e;
        color: white;
      }
    }
  }
`;
