import styled from 'styled-components';

export const FraseAFraseComponent = styled.div`
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