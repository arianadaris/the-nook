import React from 'react';
import { useLocation } from 'react-router';

import styles from './Header.module.css';

import Logo from '../assets/TheNook_Logo.png';

function Header()
{
    var location = useLocation();
    const encyclopedia = location.pathname === '/encyclopedia' ? { backgroundColor: '#F8EEBB' } : { backgroundColor: 'transparent' };
    const villagers = location.pathname === '/villagers' ? { backgroundColor: '#F8EEBB' } : { backgroundColor: 'transparent' };
    const resources = location.pathname === '/resources' ? { backgroundColor: '#F8EEBB' } : { backgroundColor: 'transparent' };
    const about = location.pathname === '/about' ? { backgroundColor: '#F8EEBB' } : { backgroundColor: 'transparent' };
    
    return(
        <div className={styles.container}>
            <a href="/"><div className={styles.logo}>
                <img src={Logo} alt="The Nook Logo"/>
                <h1>The Nook</h1>
            </div></a>
            <div className={styles.nav}>
                <div className={styles.navItem}>
                    <a href="/encyclopedia" style={encyclopedia}>Encyclopedia</a>
                    <div className={styles.hover} />
                </div>
                <div className={styles.navItem}>
                    <a href="/villagers" style={villagers}>Villagers</a>
                    <div className={styles.hover} />
                </div>
                <div className={styles.navItem}>
                    <a href="/resources" style={resources}>Resources</a>
                    <div className={styles.hover} />
                </div>
                <div className={styles.navItem}>
                    <a href="/about" style={about}>About</a>
                    <div className={styles.hover} />
                </div>
            </div>
        </div>
    );
}

export default Header;