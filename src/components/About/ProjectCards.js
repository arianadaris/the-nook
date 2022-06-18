import React from 'react';

import styles from './ProjectCards.module.css';

import Time from '../../assets/About_Time.png';
import Project from '../../assets/About_Project.png';
import API from '../../assets/About_API.png';

function ProjectCards()
{
    return(
        <div className={styles.container}>
            <div className={styles.cardsWrapper}>
                <div className={styles.card} id={styles.time}>
                    <h1 className={styles.title} id={styles.timeTitle}>Time Spent</h1>
                    <div className={styles.image}>
                        <img src={Time} alt="Time Spent Icon - Clock" />
                    </div>
                    <h3>I spent 2 weeks creating this project from start to finish!</h3>
                </div>
                <div className={styles.card} id={styles.project}>
                    <h1 className={styles.title} id={styles.projectTitle}>Project</h1>
                    <div className={styles.image}>
                        <img src={Project} alt="Project Icon - Computer" />
                    </div>
                    <h3>Check out this project on my personal website!</h3>
                    <div className={styles.buttonWrapper}>
                        <a href="/about">Learn more!</a>
                        <div className={styles.hover} />
                    </div>
                </div>
                <div className={styles.card} id={styles.api}>
                    <h1 className={styles.title} id={styles.apiTitle}>APIs Used</h1>
                    <div className={styles.image}>
                        <img src={API} alt="API Icon - Visual Studio Code" />
                    </div>
                    <h3>ACNH API</h3>
                    <h3>Nookipedia API</h3>
                </div>
            </div>
        </div>
    );
}

export default ProjectCards;