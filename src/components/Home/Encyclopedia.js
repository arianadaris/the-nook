import React from 'react';

import styles from './Encyclopedia.module.css';

import SeaIcon from '../../assets/Icon_SeaCreatures.png';
import FishIcon from '../../assets/Icon_Fish.png';
import BugIcon from '../../assets/Icon_Bugs.png';
import FossilIcon from '../../assets/Icon_Fossils.png';

function Encyclopedia()
{
    return (
        <div className={styles.container}>
            <h1 id={styles.sectionTitle}>Check out our Encyclopedia!</h1>
            <div className={styles.cardsWrapper}>
                <div className={styles.card} id={styles.sea}>
                    <h1 className={styles.title} id={styles.seaTitle}>Sea Creatures</h1>
                    <div className={styles.image}>
                        <img src={SeaIcon} alt="Sea Creatures Icon - Starfish" />
                    </div>
                    <h3>Dive in and learn about the underwater critters!</h3>
                    <div className={styles.buttonWrapper}>
                        <a href="/about">Learn more!</a>
                        <div className={styles.hover} />
                    </div>
                </div>
                <div className={styles.card} id={styles.fish}>
                    <h1 className={styles.title} id={styles.fishTitle}>Fish</h1>
                    <div className={styles.image}>
                        <img src={FishIcon} alt="Fish Icon - Bitterling" />
                    </div>
                    <h3>Get to know the river and ocean fish!</h3>
                    <div className={styles.buttonWrapper}>
                        <a href="/about">Learn more!</a>
                        <div className={styles.hover} />
                    </div>
                </div>
                <div className={styles.card} id={styles.bug}>
                    <h1 className={styles.title} id={styles.bugTitle}>Bugs</h1>
                    <div className={styles.image}>
                        <img src={BugIcon} alt="Bug Icon - Alexandra Butterfly" />
                    </div>
                    <h3>Find out why Blathers hates insects!</h3>
                    <div className={styles.buttonWrapper}>
                        <a href="/about">Learn more!</a>
                        <div className={styles.hover} />
                    </div>
                </div>
                <div className={styles.card} id={styles.fossil}>
                    <h1 className={styles.title} id={styles.fossilTitle}>Fossils</h1>
                    <div className={styles.image}>
                        <img src={FossilIcon} alt="Fossil Icon - Fossil Item" />
                    </div>
                    <h3>Reveal information about what you dig up!</h3>
                    <div className={styles.buttonWrapper}>
                        <a href="/about">Learn more!</a>
                        <div className={styles.hover} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Encyclopedia;