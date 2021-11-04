import styled from "styled-components";

export const DashboardContainer = styled.div`
  min-height: 100vh;

  .containLogoOrUserImage {
    background-color: ${(props) => (props.thema ? "#FF006B" : "#0053B6")};
    padding-top: 65px;
    padding-bottom: 20px;
    text-align: center;

    .logo {
      padding: 20px;
      img {
        width: 150px;
        object-fit: cover;
      }
    }

    p {
      color: white;
      font-size: 16px;
      font-weight: bold;
    }
  }

  .whatYouWantToDo {
    padding-top: 40px;
    p {
      font-size: 20px;
      margin: 0 auto;
      text-align: center;
      max-width: 500px;
      color: ${(props) => (props.thema ? "#FF006B" : "#0053B6")};
      font-weight: bold;
    }

    .Do-contain {
      padding: 15px;
      padding-top: 100px;

      span {
        font-weight: 1000;
        font-size: 20px;
        color: ${(props) => (props.thema ? "#FF006B" : "#0053B6")};
      }

      .cardas-contain {
        padding-top: 20px;
        display: flex;

        div.card {
          cursor: pointer;
          width: 200px;
          margin-right: 15px;
          a {
            text-decoration: none;

            div {
              text-align: center;
              border-radius: 10px;
              padding: 10px;
              background-color: ${(props) =>
                props.thema ? "#FF006B" : "#0053B6"};
            }

            p {
              font-weight: bold;
              text-align: left;
              color: ${(props) => (props.thema ? "#FF006B" : "#0053B6")};
            }
          }

          &:hover {
            transform: scale(1.1);
          }
        }
      }
    }
  }

  .whyInglesIsImportant {
    max-width: 800px;
    padding: 10px;
    padding-top: 100px;

    h2 {
      color: ${(props) => (props.thema ? "#FF006B" : "#0053B6")};
      font-weight: bold;
    }

    p {
      padding-top: 10px;
      color: black;
      font-weight: bold;
    }
  }

  footer {
    margin-top: 100px;

    .footer-informations {
      background-color: ${(props) => (props.thema ? "#FF006B" : "#005AC5")};
      padding: 15px;
    }

    .footer-copyright {
      background-color: ${(props) => (props.thema ? "#B9004E" : "#00499F")};
      padding: 15px;
      color: white;
      span {
        font-size: 15px;
      }
    }
  }

  @media (max-width: 500px) {
    .whatYouWantToDo {
      padding-top: 40px;
      p {
        padding: 0px 5px;
        font-size: 16px;
        margin: 0 auto;
        text-align: center;
        max-width: 500px;
        color: ${(props) => (props.thema ? "#FF006B" : "#0053B6")};
        font-weight: bold;
      }

      .Do-contain {
        padding: 15px;
        padding-top: 50px;

        span {
          font-weight: 1000;
          font-size: 20px;
          color: ${(props) => (props.thema ? "#FF006B" : "#0053B6")};
        }

        .cardas-contain {
          padding-top: 20px;
          display: flex;

          div.card {
            width: 200px;
            margin-right: 15px;
            a {
              text-decoration: none;

              div {
                text-align: center;
                border-radius: 10px;
                padding: 10px;
                background-color: ${(props) =>
                  props.thema ? "#FF006B" : "#0053B6"};
              }

              p {
                font-weight: bold;
                text-align: left;
                color: ${(props) => (props.thema ? "#FF006B" : "#0053B6")};
              }
            }

            &:hover {
              transform: scale(1.1);
            }
          }
        }
      }
    }

    .whyInglesIsImportant {
      max-width: 600px;
      padding: 10px;
      padding-top: 50px;

      h2 {
        font-size: 18px;
        color: ${(props) => (props.thema ? "#FF006B" : "#0053B6")};
        font-weight: bold;
      }

      p {
        font-size: 14px;
        padding-top: 10px;
        color: black;
        font-weight: bold;
      }
    }
  }
`;

