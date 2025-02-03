import { useState } from "react";
import Header from '../header/';
import Menu from '../menu/';
import VerticalPixelTransition from '../pixelTransition/vertical/';
import "./styles.css";

function NavHeader() {
    const [menuIsActive, setMenuIsActive] = useState(false);
    return (
        <div className="nav-header">
            <Header menuIsActive={menuIsActive} setMenuIsActive={setMenuIsActive}/>
            <Menu menuIsActive={menuIsActive}/>
            <VerticalPixelTransition menuIsActive={menuIsActive}/>
        </div>
    );
}

export default NavHeader;