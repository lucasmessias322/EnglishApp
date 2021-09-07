import styled from 'styled-components'

export const PlayerComponent = styled.div`
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