import React from 'react';

import styles from './Intro.module.css';

import NookBrothers from '../../assets/Resources_TimmyTommy.png';

function Intro()
{
    return(
        <div className={styles.container}>
            <div className={styles.image}>
                <img src={NookBrothers} alt="Resources - Timmy and Tommy" />
            </div>
            <div className={styles.text}>
                <h1>Resources</h1>
                <h3>Check out these links for more Animal Crossing content!</h3>
            </div>
        </div>
    );
}

export default Intro;