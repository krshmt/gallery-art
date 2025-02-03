import {useState} from 'react'
import Burger from './burger';
import Stairs from './stairs';
import Menu from './menu';
import { AnimatePresence } from 'framer-motion';
import './styles.css';

function Header () {

    const [menuIsOpen, setMenuIsOpen] = useState(false);

    return (
        <div className="header">
            <div className="header__container">
                <Burger openMenu={() => {setMenuIsOpen(true)}}/>
                <AnimatePresence mode="wait">
                {
                    menuIsOpen && <>
                    <Stairs />
                    <Menu closeMenu={() => {setMenuIsOpen(false)}}/>
                    </>
                }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Header;
