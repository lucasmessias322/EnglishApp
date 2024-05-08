import styled from "styled-components";
import HeaderComponent from "../../Components/HeaderComponent";
import { useEffect, useState } from "react";
import { getTexts } from "../../Apis/englishplusApi";
import { Link } from "react-router-dom";
import LoadingComp from "../../Components/LoadingComp";

interface Text {
  _id: string;
  level: string;
  title: string;
  resume: string;
  content: string;
}

export default function TextsListPage() {
  const [levels, setLevels] = useState<Text[]>([
    // {
    //   _id: "",
    //   level: "A1",
    //   resume: "",
    //   title: "Carregando..",
    //   content: "",
    // },
  ]);

  useEffect(() => {
    getTexts().then((res) => {
      setLevels(res);
    });
  }, []);

  return (
    <Container>
      <HeaderComponent fixed />

      {levels.length === 0 ? (
        <LoadingComp />
      ) : (
        <LevelWrapper>
          <h2>Textos em Ingles</h2>
          <TextListWrapper>
            {levels?.map((text, textIndex) => (
              <TextItem key={textIndex}>
                <Link to={`/text/${text._id}`}>
                  <h4>
                    {text.title} - {text.level}
                  </h4>
                  <span>{text.resume}</span>
                </Link>
              </TextItem>
            ))}
          </TextListWrapper>
        </LevelWrapper>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 60px;
`;

const LevelWrapper = styled.div`
  width: 100%;
  padding: 20px;

  @media (min-width: 500px) {
    /* display: flex;
    justify-content: center;
    flex-direction: column; */
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
