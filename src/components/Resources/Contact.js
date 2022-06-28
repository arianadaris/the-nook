import React from 'react';

import styles from './Contact.module.css';

function submit()
{
    document.getElementById('textbox').value = '';
}

function Contact()
{
    return(
        <div className={styles.container}>
            <div className={styles.suggestionWrapper}>
                <h1>Have a suggestion?</h1>
                <h2>Share your favorite resource links below!</h2>
                <div className={styles.buttonsWrapper}>
                    <input className={styles.suggestion} id="textbox" type="text" placeholder="Enter a link..."/>
                    <div className={styles.buttonWrapper}>
                        <h1 onClick={submit}>Submit!</h1>
                        <div className={styles.hover} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;