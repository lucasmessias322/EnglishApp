import styled from "styled-components";

export const HeaderComponents = styled.div`
  position: fixed;
  width: 100%;
  z-index: 99;

  header {
    width: 100%;
    background-color: ${(props) => (props.thema ? "#FF006B" : "#0053B6")};
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 15px;
    display: flex;
    justify-content: space-between;
    line-height: 20px;

    div.logo-end-Menu {
      display: flex;
      overflow: hidden;
      text-overflow: ellipsis;

      .Fabars {
        color: white;
        font-size: 30px;
        margin-right: 15px;
      }

      h3 {
        /* font-size: 25px; */
        color: white;
        margin: 5px 0;
        padding: 0;
        font-weight: bold;

        span {
          color: white;
          font-size: 15px;
        }
      }
    }

    div.left {
      display: flex;
      align-items: center;

      .OutButton {
        color: white;
        font-size: 20px;
        margin-left: 15px;
      }
    }
  }
  .title-Text {
    width: 100%;
    background-color: ${(props) => (props.thema ? "#E90062" : "#005AC5")};
    padding: 15px 15px;

    h4 {
      color: white;
    }
  }
  .BaralhoTypes {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: white;
    position: fixed;
    background-color: ${(props) => (props.thema ? "#E90062" : "#003861")};
    padding: 10px 0px;
    margin-top: 0px;

    h2 {
      width: 100%;
      text-align: center;
      font-size: 18px;
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

  .MenuDisable {
    opacity: 0.2;
    width: 0px;

    * {
      opacity: 0;
      display: none;
    }
  }
`;
