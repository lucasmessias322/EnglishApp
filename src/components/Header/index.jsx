import React, { useContext, useRef, useState, useEffect } from "react";
import * as Fa from "react-icons/fa";
import Switch from "react-switch";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import * as C from "./style.js";
import MenuItem from "./MenuItem";
import { getStorage, SetStorage } from "../../utils/storageFunctions";

export default function Header({
  TitleOfText,
  TituloDaPagina,
  switchButtom,
  MenuBars = false,
  QtdItems,
  BaralhoPage = false,
  adicionarNovoItem,
  logoutButton,
  isUserBaralho,
  exameOnClick,
  addnewItem,
  baralholength,
  DataTexto,
  setCurrentTexto,
}) {
  const menu = useRef(null);
  const [switchBtn, setSwitchBtn] = useState({ checked: false });
  const { thema, setThema, logout } = useContext(AuthContext);

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
  function SetModeTheme() {
    if (switchBtn.checked === true) {
      SetStorage("Theme", "light__mode");
    } else if (switchBtn.checked === false) {
      SetStorage("Theme", "dark__mode");
    }
  }

  // recupera o thema do localStorage
  function RecuperarTema() {
    if (getStorage("Theme") === "light__mode") {
      setSwitchBtn({ checked: false });
      setThema(true);
    } else if (getStorage("Theme") === "dark__mode") {
      setSwitchBtn({ checked: true });
      setThema(false);
    }
  }

  useEffect(() => {
    RecuperarTema();
  }, [switchBtn.checked]);

  return (
    <C.HeaderContainer thema={thema}>
      <C.Header thema={thema}>
        <C.LeftSide>
          {MenuBars ? (
            <Fa.FaBars className="Fabars" onClick={AtivarMenu} />
          ) : (
            ""
          )}
          <h3>
            {TituloDaPagina
              ? `${TituloDaPagina} - ${QtdItems} palavras `
              : "English Plus+"}
          </h3>
        </C.LeftSide>

        <C.RightSide className="left">
          {switchButtom ? (
            ""
          ) : (
            <>
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

              {BaralhoPage ? (
                <Fa.FaPlus
                  onClick={() => adicionarNovoItem()}
                  size={20}
                  color="white"
                  style={{ margin: "0 0 5px 15px" }}
                />
              ) : (
                ""
              )}
            </>
          )}

          {logoutButton ? (
            <Fa.FaSignOutAlt className="OutButton" onClick={() => logout()} />
          ) : (
            ""
          )}

          {isUserBaralho ? (
            <C.IsUserBaralho>
              <Fa.FaPlus
                color="white"
                size={20}
                className="child"
                onClick={addnewItem}
              />

              {baralholength > 0 ? (
                <Link to={exameOnClick}>
                  <Fa.FaClipboardList
                    color="white"
                    size={20}
                    className="child"
                  />
                </Link>
              ) : (
                ""
              )}

              <Fa.FaEllipsisV color="white" size={20} className="child" />
            </C.IsUserBaralho>
          ) : (
            ""
          )}
        </C.RightSide>
      </C.Header>

      {DataTexto ? (
        <>
          <C.TextTitle thema={thema}>
            <h4>{TitleOfText}</h4>
          </C.TextTitle>
          {MenuBars ? (
            <C.Menu thema={thema}>
              <menu className="MenuDisable" ref={menu}>
                {DataTexto?.map((item, i) => (
                  <MenuItem
                    key={i}
                    index={i}
                    TitleMenu={item.titulo}
                    setCurrentTexto={setCurrentTexto}
                  />
                ))}
              </menu>
            </C.Menu>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </C.HeaderContainer>
  );
}
