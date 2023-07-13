import React from 'react'

import { auth } from "../firebase";

const NavBar = () => {
   
    const logOut = () => {
        auth.signOut();
    };

    const tollgeMobileMenu = () => {
        const mobileMenu = document.querySelector('.mobile-menu') as HTMLElement;
        mobileMenu.classList.toggle('open');
    }
    return <header style={{ marginBottom: '24px' }}>
        <div id="brand"><a href="/">Seaquest</a></div>
        <nav>
            <ul>
                <li id="signup"><a onClick={logOut}>Logout</a></li>
            </ul>
        </nav>
        <div id="hamburger-icon" onClick={tollgeMobileMenu}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>

        </div>
    </header>
}

export default NavBar;