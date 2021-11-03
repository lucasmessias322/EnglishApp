import React, { useContext, useRef, useState, useEffect } from "react";
import { AppContext } from "../../data/Store";
import { AuthContext } from "../../data/auth";
import { FaBars } from "react-icons/fa";
import HeaderLinkMenu from "../HeaderLinkMenu";
import Switch from "react-switch";

import { HeaderComponents } from "./style.js";

function Header({
  DadosDoTexto,
  TitleOfText,
  TituloDaPagina,
  children,
  switchButtom,
  MemorizeTable,
  MenuBars = true,
}) {
  const menu = useRef(null);
  const [switchBtn, setSwitchBtn] = useState({ checked: false });
  const { thema, setThema } = useContext(AppContext);
  const { sigOut } = useContext(AuthContext);

  function AtivarMenu() {
    const Menu = menu.current;
    if (Menu.classList == "MenuDisable") {
      Menu.classList.remove("MenuDisable");
    } else {
      Menu.classList.add("MenuDisable");
    }
  }

  function handleChange(checked) {
    setSwitchBtn({ checked });

    //quando o botao Switch for mudado ele muda tambem no localstorage
    SetModeTheme();
  }

  //seta o thema no localStorage
  async function SetModeTheme() {
    if (switchBtn.checked === true) {
      await localStorage.setItem("Theme", "light__mode");
    } else if (switchBtn.checked === false) {
      await localStorage.setItem("Theme", "dark__mode");
    }
  }

  // recupera o thema do localStorage
  async function RecuperarTema() {
    if (localStorage.getItem("Theme") === "light__mode") {
      setSwitchBtn({ checked: false });
      setThema(true);
    } else if (localStorage.getItem("Theme") === "dark__mode") {
      setSwitchBtn({ checked: true });
      setThema(false);
    }
  }

  useEffect(() => {
    RecuperarTema();
  }, [switchBtn.checked]);

  return (
    <HeaderComponents thema={thema}>
      <header>
        <div className="logo-end-Menu">
          {MenuBars ? <FaBars className="Fabars" onClick={AtivarMenu} /> : ""}
          <h3>
            {TituloDaPagina
              ? `${TituloDaPagina} - 50 palavras `
              : "English Plus+"}{" "}
          </h3>
        </div>
        {switchButtom ? (
          ""
        ) : (
          <Switch
            className="Switchbtn"
            onColor={"#004393"}
            offColor={"#9A0041"}
            uncheckedIcon
            checkedIcon
            height={15}
            width={50}
            handleDiameter={25}
            onChange={handleChange}
            checked={switchBtn.checked}
          />
        )}
        <h3 onClick={() => sigOut()}>Sair</h3>
      </header>

      {TitleOfText ? (
        <div className="title-Text">
          <h4>{TitleOfText}</h4>
        </div>
      ) : (
        ""
      )}

      {MemorizeTable ? (
        <div className="BaralhoTypes">
          <h2>Question</h2>
          <h2>Response</h2>
        </div>
      ) : (
        ""
      )}

      {MenuBars ? (
        <menu className="MenuDisable" ref={menu}>
          {children}
        </menu>
      ) : (
        ""
      )}
    </HeaderComponents>
  );
}

export default Header;
