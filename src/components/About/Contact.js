import React from 'react';

import styles from './Contact.module.css';

function Contact()
{
    return(
        <div className={styles.container}>
            <h1>If you like this project, check out some of my other work!</h1>
            <div className={styles.buttonsWrapper}>
                <div className={styles.buttonWrapper}>
                    <a href="http://arianadaris.com" target="_blank" rel="noreferrer">My Portfolio</a>
                    <div className={styles.hover} />
                </div>
                <div className={styles.buttonWrapper}>
                    <a href="https://github.com/arianadaris" target="_blank" rel="noreferrer">My GitHub</a>
                    <div className={styles.hover} />
                </div>
            </div>
        </div>
    );
}

export default Contact;