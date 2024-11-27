import styled from "styled-components";
import HeaderComponent from "../../Components/HeaderComponent";
import { useEffect, useState } from "react";
import { getTexts } from "../../Apis/englishplusApi";
import { Link } from "react-router-dom";
import LoadingComp from "../../Components/LoadingComp";

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

  // Carregando os textos da API
  useEffect(() => {
    setIsLoading(true);
    getTexts().then((res) => {
      setLevels(res); // Tipagem implícita do retorno de getTexts
      setIsLoading(false);
    });
  }, []);

  return (
    <Container>
      {isLoading ? (
        <LoadingComp />
      ) : (
        <>
          <HeaderComponent fixed />
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
  margin-top: 60px;
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
    max-width: 800px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
`;

const TextItem = styled.li`
  width: 100%;
  list-style: none;
  padding: 20px 0px;
  border-bottom: 0.2px solid #353a52;
  margin: 10px 0px;
  cursor: pointer;

  a {
    h4 {
      font-size: 18px;
      color: #a0bbdb;
      font-weight: 600;
    }
    span {
      font-size: 14px;
    }
  }
`;
