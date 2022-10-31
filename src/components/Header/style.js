import styled from "styled-components";

export const HeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  z-index: 99;
`;

export const Header = styled.header`
  width: 100%;
  background-color: ${(props) => (props.thema ? "#D50059" : "#0053B6")};
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 15px;
  display: flex;
  justify-content: space-between;
  line-height: 20px;
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;

  .Fabars {
    color: white;
    font-size: 30px;
    margin-right: 15px;
  }

  h3 {
    color: white;
    margin: 5px 10px;
    padding: 0;
    font-weight: bold;
    cursor: pointer;

    span {
      color: white;
      font-size: 15px;
    }
  }
`;

export const RightSide = styled.div`
  display: flex;
  align-items: center;

  .OutButton {
    color: white;
    font-size: 20px;
    margin-left: 15px;
  }
`;

export const LoginSignin = styled.div`
  //
  display: flex;
  align-items: center;

  a {
    span {
      color: white;
      font-size: 17px;
      margin-left: 15px;
    }

    span.register {
      border-radius: 20px;
      padding: 5px 20px;
      background-color: ${(props) =>
        props.thema ? "#FF1376" : "rgba(83, 162, 255, 0.57)"};
    }

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const TextTitle = styled.div`
  width: 100%;
  background-color: ${(props) => (props.thema ? "#CF0057" : "#005AC5")};
  padding: 15px 15px;

  h4 {
    color: white;
  }
`;

export const Menu = styled.div`
  @keyframes slidein {
    from {
      opacity: 0;
      display: none;
    }

    to {
      opacity: 1;
      display: block;
    }
  }
  menu.MenuDisable {
    opacity: 0.2;
    height: 0px;
    width: 0px;

    * {
      opacity: 0;
      display: none;
    }
  }
  menu {
    transition: 0.4s;
    width: 100%;
    max-width: 500px;
    height: 100%;
    background-color: ${(props) => (props.thema ? "#CD0056" : "#004393")};
    position: fixed;
    z-index: 999;

    li {
      animation-duration: 0.5s;
      animation-name: slidein;
      color: white;
      list-style: none;
      height: 60px;
      padding: 10px;
      padding-top: 20px;
      padding-left: 25px;
      border-bottom: 1px solid
        ${(props) =>
          props.thema
            ? "rgba(255, 4, 100, 0.644)"
            : "rgba(62, 150, 255, 0.51)"};

      span {
        font-size: 18px;
      }
      .FaBook {
        margin-right: 15px;
      }
    }
  }
`;
