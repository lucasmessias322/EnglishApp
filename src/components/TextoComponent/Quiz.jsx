import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "./style";

export default function Quiz({ toast, questions }) {
  const [showFraseFrase, setShowFraseFrase] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    setIsLoadingPage(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    questions.forEach((q, i) => {
      const selectedOption = e.target.elements[`question-${i}`].value;
      console.log(selectedOption);
      if (selectedOption === q.correct) {
        score++;
      }
    });

    toast(`Você acertou ${score} de ${questions.length} questões`);
  };

  return (
    <Container>
      <h2 onClick={() => setShowFraseFrase(!showFraseFrase)}>
        Quiz <span>{showFraseFrase ? "Ocultar" : "Mostrar"}</span>
      </h2>

      {showFraseFrase && !isLoadingPage && (
        <QuizContainer>
          <form onSubmit={handleSubmit}>
            {questions.map((q, i) => (
              <Question key={q.question}>
                <h4>
                  {i + 1}) {q.question}
                </h4>
                <Choices>
                  <ResponseOption>
                    <input
                      type="radio"
                      name={`question-${i}`}
                      id={`choiceA-${i}`}
                      value="A"
                      required
                    />
                    <label htmlFor={`choiceA-${i}`}>{q.choiceA}</label>
                  </ResponseOption>
                  <ResponseOption>
                    <input
                      type="radio"
                      name={`question-${i}`}
                      id={`choiceB-${i}`}
                      value="B"
                      required
                    />
                    <label htmlFor={`choiceB-${i}`}>{q.choiceB}</label>
                  </ResponseOption>
                  <ResponseOption>
                    <input
                      type="radio"
                      name={`question-${i}`}
                      id={`choiceC-${i}`}
                      value="C"
                      required
                    />
                    <label htmlFor={`choiceC-${i}`}>{q.choiceC}</label>
                  </ResponseOption>
                </Choices>
              </Question>
            ))}

            <BtnViewResult type="submit">Mostrar resultados</BtnViewResult>
          </form>
        </QuizContainer>
      )}
    </Container>
  );
}
const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  h2 {
    color: ${(props) => (props.thema ? colors.color2 : colors.color4)};
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 10px;

    span {
      font-weight: normal;
      font-size: 16px;
    }
  }
`;

const QuizContainer = styled.div`
  padding: 10px 20px;
  form {
  }
`;

const Question = styled.div`
  padding-bottom: 15px;

  h4 {
    color: ${colors.color4};
    font-size: 20px;
    font-weight: normal;
    padding-bottom: 10px;
  }

  @media (max-width: 500px) {
    h4 {
      font-size: 17px;
    }
  }
`;

const Choices = styled.ul``;

const ResponseOption = styled.li`
  padding: 5px 10px;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;

  label {
    padding-left: 10px;
  }

  span {
    background-color: #fff;
    border: 1px solid white;
    border-radius: 100%;
    padding: 5px;
  }
`;

const BtnViewResult = styled.button`
  border: none;
  border-right: 2px solid #313131;
  border-bottom: 2px solid #313131;
  color: white;
  background-color: #0084ff;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 20px;
`;
