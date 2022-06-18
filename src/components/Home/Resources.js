import React from 'react';

import styles from './Resources.module.css';

import NookBrothers from '../../assets/Home_Resources.png';

function Resources()
{
    return(
        <div className={styles.container}>
            <div className={styles.image}>
                <img src={NookBrothers} alt="Timmy and Tommy" />
            </div>
            <div className={styles.text}>
                <h1>Looking for more information?</h1>
                <h2>Check out our resources page for links to a varity of other Animal Crossing websites!</h2>
                <div className={styles.buttonWrapper}>
                    <a href="/resources">Go to Resources</a>
                    <div className={styles.hover} />
                </div>
            </div>
        </div>
    );
}

export default Resources;