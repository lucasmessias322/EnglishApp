import styled from "styled-components";
import HeaderComponent from "../../Components/HeaderComponent";
import { useEffect, useState } from "react";
import { getTexts } from "../../Apis/englishplusApi";
import { Link } from "react-router-dom";
import LoadingComp from "../../Components/LoadingComp";
import { FaC } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";

// Definindo a tipagem correta para os textos
interface Text {
  _id: string;
  level: string;
  title: string;
  resume: string;
  content: { paragrafo: string; audiotexturl: string }[]; // Array de objetos com parágrafos e audioUrl
}

export default function TextsListPage() {
  // Tipando o estado de levels como um array de Text
  const [isLoading, setIsLoading] = useState(true);
  const [levels, setLevels] = useState<Text[]>([]);
  const [completedTexts, setCompletedTexts] = useState<string[]>([]);

  // Carregando os textos da API
  useEffect(() => {
    setIsLoading(true);
    getTexts().then((res) => {
      setLevels(res); // Tipagem implícita do retorno de getTexts
      setIsLoading(false);
    });
  }, []);
  useEffect(() => {
    const completed = JSON.parse(
      localStorage.getItem("completed_texts") || "[]"
    );
    setCompletedTexts(completed);
  }, []);
  const isTextCompleted = (id: string) => completedTexts.includes(id);

  return (
    <Container>
      {isLoading ? (
        <LoadingComp />
      ) : (
        <>
          <HeaderComponent bgcolor="#1C1F2D" fixed />
          <LevelWrapper>
            <h2>Textos em Ingles</h2>
            <TextListWrapper>
              {levels.map((text) => (
                <TextItem key={text._id}>
                  <Link to={`/text/${text._id}`}>
                    <h4>
                      {text.title} - {text.level}{" "}
                      {/* {text.content[0]?.audiotexturl ? : } */}
                    </h4>
                    <span>{text.resume}</span>
                  </Link>

                  {isTextCompleted(text._id) && (
                    <div className="check">
                      {isTextCompleted(text._id) && <FaCheck size={25} />}
                    </div>
                  )}
                </TextItem>
              ))}
            </TextListWrapper>
          </LevelWrapper>
        </>
      )}
    </Container>
  );
}

// Styled-components
const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 80px;
`;

const LevelWrapper = styled.div`
  width: 100%;
  padding: 20px;

  @media (min-width: 500px) {
    /* display: flex; justify-content: center; flex-direction: column; */
  }
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

  a {
    max-width: 900px;
    h4 {
      font-size: 18px;
      color: #a0bbdb;
      font-weight: 600;
    }
    span {
      font-size: 14px;
    }
  }

  .check {
    width: 30px;
    height: 30px;
    padding: 5px;
    border: 1px solid #353a52;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #29aa8b;
  }

  @media (max-width: 500px) {
    a {
      max-width: 370px;
    }
  }
`;
