import styled from "styled-components";

export const TextoLayoutContainer = styled.div<{thema?:boolean}>`
    min-height: 100vh;
    width: 100%;
    background: ${props => props.thema ?  "#9A0041": "#111B29"};
`

export const TextoContainer = styled.div`
    margin: auto;
    text-align: center;
    max-width: 700px;
    width: 100%;
    p {
        color: white;
        font-size: clamp(0.5em, 0.8em + 1vw, 1.2em);
        padding: 0px 5px;
    }
    .SelectedP {
        color: rgb(255, 253, 128);
       
    }

`

export const FraseAFraseComponent = styled.div<{thema?:boolean}>`
    padding: 10px;
    width: 100%;
    max-width: 700px;
    margin: auto;
    
    h2 {
        color: ${props => props.thema ? "#ff5ad1": "#9FDDFF"} ;
        font-size: 30px;
    }

    div.content-frases {
        list-style: none;
        
    }

    
@media (max-width: 500px) {
        div.content-frases {
            li {
                h3 {
                    font-size: 16px;
                }
                p {
                    font-size: 15px;
                    /* margin-left: 15px; */
                }
            }
        }
    }


`

export const FraseAFraseContainer = styled.li<{thema?:boolean}>`
  margin: 10px;
  /* margin-bottom: 15px; */


  div {
    display: flex;
    align-items: center;
    h3 {
      margin: 5px;
      color: ${(props) => (props.thema ? "#ff5ad1" : "#9FDDFF")};
      font-size: 22px;
    }
  }
  p {
    font-size: 16px;
    margin-left: 45px;
    color: white;
  }
`;


export const PlayFraseButton = styled.div<{thema?:boolean}>`
  width: 25px;
  height: 25px;
  background-color: ${(props) => (props.thema ? "#FF006B" : "#0074ff")};
  color: white;
  border-radius: 100%;
  padding: 5px;
  margin-right: 10px;

  &:hover {
    transform: scale(1.1);
  }
`;

export const PlayerComponent = styled.div<{thema?:boolean}>`
     width: 100%;
    height: 75px;
    position: fixed;
    z-index: 9999;
    bottom: 0;
    background-color: ${props => props.thema ? "#C20052": "#005AC5"};
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    li#PlayPauseButton {
        width: 55px;
        height: 55px;
        padding: 10px;
        font-size: 30px;
    }

    li#SlowButton {
        width: 45px;
        height: 45px;
        padding: 10px;

        img {
            width: 100%;
            margin-bottom: 15px;
        }
    }
    li#FastButton {
        width: 45px;
        height: 45px;
        padding: 10px;
        font-size: 29px;
        line-height: 30px;
    }
    li#homeBtn {
        width: 45px;
        height: 45px;
        padding: 5px;
        font-size: 29px;
        line-height: 30px;

        a {
            text-decoration: none;
            outline: none;
            color: inherit;
        }
    }

    input#inputRange {
        transform: rotate(-90deg);
    }

    li#VolumeBtn {
        width: 45px;
        height: 45px;
        padding: 10px;
        font-size: 26px;
        line-height: 30px;
    }

    li {
        background-color: ${props => props.thema ? "#C20052" : "#005AC5"};
        list-style: none;
        box-shadow: 0px 0px 20px ${props => props.thema ? "#2b0112" : "#27004E"};
        border-radius: 100px;
        margin: 5px;
        color: white;
        

        &:hover {
            transform: scale(1.1);
            background-color: ${props => props.thema ? "#ff006b" : "#005AC5"} ;
        }
    }

    @media (max-width: 500px) {
        li#PlayPauseButton {
            font-size: 29px;
        }
    
}
`