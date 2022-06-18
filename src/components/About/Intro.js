import React from 'react';

import styles from './Intro.module.css';

import Logo from '../../assets/TheNook_Logo.png';

function Intro()
{
    return(
        <div className={styles.container}>
            <div className={styles.image}>
                <img src={Logo} alt="The Nook Logo" />
            </div>
            <div className={styles.text}>
                <h1>About The Nook</h1>
                <h3>I created this project to challenge my skills with using REST APIs to create a website that looks and performs beautifully.</h3>
            </div>
        </div>
    );
}

export default Intro;