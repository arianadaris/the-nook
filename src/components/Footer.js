import React from 'react';

import styles from './Footer.module.css';

import Logo from '../assets/TheNook_Logo.png';
import { ReactComponent as Arrow } from '../assets/Arrow.svg';

function Footer()
{
    const toTop = () => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
    };

    return(
        <div className={styles.container}>
            <div className={styles.logoWrapper}>
                <img src={Logo} id={styles.logo} alt="The Nook Logo" />
                <h1>The Nook</h1>
            </div>
            <h2>© 2022 Ariana Rajewski</h2>
            <div className={styles.buttonWrapper}>
                <div className={styles.socialButtons}>
                    <a href="https://github.com/arianadaris" target="_blank" rel="noreferrer">
                        <span className={`${'iconify'} ${styles.iconify}`} id={styles.github} data-icon="akar-icons:github-fill" data-width="32"></span>
                    </a>
                    <a href="https://dribbble.com/arianadaris" target="_blank" rel="noreferrer">
                        <span className={`${'iconify'} ${styles.iconify}`} id={styles.dribbble} data-icon="akar-icons:dribbble-fill" data-width="32"></span>
                    </a>
                    <a href="https://www.linkedin.com/in/ariana-rajewski/" target="_blank" rel="noreferrer">
                        <span className={`${'iconify'} ${styles.iconify}`} id={styles.linkedin} data-icon="akar-icons:linkedin-fill" data-width="32"></span>
                    </a>
                </div>
            </div>
            <div href="/" id={styles.image} onClick={toTop}>
                <Arrow id={styles.arrow} stroke="white" />
            </div>
        </div>
    );
}

export default Footer;