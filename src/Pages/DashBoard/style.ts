import styled from "styled-components";

export const DashboardContainer = styled.div<{ thema?: boolean }>`
  min-height: 100vh;
  footer {
    padding: 15px 10px;
    background-color: ${(props) => (props.thema ? "#FF006B" : "#0053B6")};

    span {
      color: white;
    }
  }
`;

export const SectionOne = styled.div<{ thema?: boolean }>`
  padding: 20px;
  height: 400px;
  background-image: url("${(props) => props.thema ? "/assets/Rectangle 4.svg" : "/assets/Rectangle 4 dark.svg"}");
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 20px;

  @media (max-width: 500px) {
    /* padding-top: 45px; */
    background-image: url("${(props) => props.thema ? "/assets/Rectangle (mobile) 4.svg" : "/assets/Rectangle (mobile) 4 dark.svg"}");
    background-size: contain;
    height: 100vw;
    background-repeat: no-repeat;
  }
`;

export const LogoAndImageLogo = styled.div<{ thema?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center flex-end;
  width: 100%;
  padding: 10px 15px;
  text-align: center;

  img {
    width: 10vw;
    object-fit: contain;
    margin: auto;
  }
  h1 {
    color: white;
    font-size: 35px;

    span {
      color: ${(props) => (props.thema ? "#FF006B" : "#0053B6")};
    }
  }
  p {
    padding-top: 10px;
    color: white;
  }

  @media (max-width: 500px) {
    img {
      width: 24vw;
      object-fit: contain;
      margin: auto;
    }
    p {
      font-size: 14px;
    }
  }
`;

export const ThingsToDo = styled.div<{ thema?: boolean }>`
  text-align: center;

  h3 {
    color: ${(props) => (props.thema ? "#FF006B": "#0053B6" )};
  }

  div.CardsContain {
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }

  @media (min-width: 500px) {
    h3 {
      font-size: 25px;
      padding-bottom: 20px;
    }
  }
`;
export const Card = styled.div<{ thema?: boolean }>`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  margin: 5px;
  &:hover {
    transform: scale(1.1);
  }

  padding: 10px;
  background-color: ${(props) => (props.thema ?  "#FF006B": "#0053B6")};
  cursor: pointer;

  a {
    text-decoration: none;
    p {
      font-size: 14px;
      padding-top: 10px;
      color: white;
    }
  }

  @media (min-width: 501px) {
    width: 200px;
    height: 200px;
    padding: 35px 10px;
    margin: 15px;

    a {
      p {
        font-size: 18px;
      }
    }
  }
`;

export const WhyLearning = styled.div<{ thema?: boolean }>`
  padding: 40px 10px;

  h3 {
    font-size: 18px;
    color: ${(props) => (props.thema ?  "#FF006B": "#0053B6")};
  }

  p {
    padding-top: 10px;
    font-size: 14px;
  }

  @media (min-width: 500px) {
    padding: 60px 30px;

    h3 {
      font-size: 25px;
    }

    p {
      padding-top: 10px;
      font-size: 16px;
      max-width: 600px;
    }
  }
`;
