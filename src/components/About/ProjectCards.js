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
                    <h3>I spent 2 weeks creating this project from start to finish! This included creating Figma prototypes, developing in React, and launching the website.</h3>
                </div>
                <div className={styles.card} id={styles.project}>
                    <h1 className={styles.title} id={styles.projectTitle}>Project</h1>
                    <div className={styles.image}>
                        <img src={Project} alt="Project Icon - Computer" />
                    </div>
                    <h3>Check out this project on my personal website!</h3>
                    <div className={styles.buttonWrapper}>
                        <a href="http://www.arianadaris.com/work/the-nook" target="_blank" rel="noreferrer">Learn more!</a>
                        <div className={styles.hover} />
                    </div>
                </div>
                <div className={styles.card} id={styles.api}>
                    <h1 className={styles.title} id={styles.apiTitle}>APIs Used</h1>
                    <div className={styles.image}>
                        <img src={API} alt="API Icon - Visual Studio Code" />
                    </div>
                    <a href="http://acnhapi.com/" target="_blank" rel="noreferrer"><h3>ACNH API</h3></a><h3 id={styles.apiText}>is a fan-made Animal Crossing New Horizons RESTful API/Website for a variety of items, furniture and villagers in the game.
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default ProjectCards;