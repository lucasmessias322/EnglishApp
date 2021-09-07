import React, { useContext,useRef, useState } from 'react'
import { AppContext } from '../../data/Store';
import { FaBars} from 'react-icons/fa';
import HeaderLinkMenu from '../HeaderLinkMenu';
import DadosDoTexto from '../../Api/Textos'
import Switch from "react-switch";
import { HeaderComponents } from './style.js'

function Header(props) {
    const menu = useRef(null)
    const [switchBtn, setSwitchBtn] = useState({ checked: false })
    const { thema, setThema } = useContext(AppContext);

    function AtivarMenu() {
        const Menu = menu.current
        if (Menu.classList == 'MenuDisable') {
            Menu.classList.remove('MenuDisable')
        } else {
            Menu.classList.add('MenuDisable')
        }
    }

    function handleChange(checked) {
        setSwitchBtn({ checked })
        setThema(switchBtn.checked)
        console.log(thema);
    }

    return (
        <HeaderComponents thema={thema}>
            <header>
                <div className="logo-end-Menu">
                    <FaBars className='Fabars' onClick={AtivarMenu} />
                    <h3>English Plus+</h3>
                </div>
                <Switch
                    className='Switchbtn'
                    onColor={"#004393"}
                    offColor={"#9A0041"}
                    uncheckedIcon
                    checkedIcon
                    onChange={handleChange}
                    checked={switchBtn.checked}
                />

            </header>
            <div className="title-Text">
                <h4>{props.TitleOfText}</h4>
            </div>

            <menu className="MenuDisable" ref={menu}>
                {DadosDoTexto.map((elem, i) =>
                    <HeaderLinkMenu key={i} texto={i} TitleMenu={DadosDoTexto[i].title} />
                )}
            </menu>
        </HeaderComponents>
    )
}

export default Header
