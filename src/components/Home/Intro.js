import React from 'react';

import styles from './Intro.module.css';

import NooksCranny from '../../assets/Home_NooksCranny.png';

function Intro()
{
    return (
        <div className={styles.container}>
            <div className={styles.text}>
                <h1>The one stop shop for all things Animal Crossing.</h1>
                <div className={styles.buttonWrapper}>
                    <a href="/about">Learn more!</a>
                    <div className={styles.hover} />
                </div>
            </div>
            <div className={styles.imageWrapper}>
                <img src={NooksCranny} id={styles.nooksCranny} alt="Nook's Cranny" />
                <h3 className={styles.credit}>Illustration credit - @instantfrogs</h3>
            </div>
        </div>
    )
}

export default Intro;