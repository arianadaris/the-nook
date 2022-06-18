import React from 'react';

import styles from './Intro.module.css';

import SeaIcon from '../../assets/Icon_SeaCreatures.png';
import FishIcon from '../../assets/Icon_Fish.png';
import BugIcon from '../../assets/Icon_Bugs.png';
import FossilIcon from '../../assets/Icon_Fossils.png';

function Intro()
{
    return(
        <div className={styles.container}>
            <h1>Encyclopedia</h1>
            <h3 id={styles.tagline}>Learn about all of the museum items!</h3>
            <div className={styles.cardsWrapper}>
                <div className={styles.card} id={styles.sea}>
                    <h1 className={styles.title} id={styles.seaTitle}>Sea Creatures</h1>
                    <div className={styles.image}>
                        <img src={SeaIcon} alt="Encyclopedia Icon - Sea Creatures" />
                    </div>
                </div>
                <div className={styles.card} id={styles.fish}>
                    <h1 className={styles.title} id={styles.fishTitle}>Fish</h1>
                    <div className={styles.image}>
                        <img src={FishIcon} alt="Encyclopedia Icon - Fish" />
                    </div>
                </div>
                <div className={styles.card} id={styles.bug}>
                    <h1 className={styles.title} id={styles.bugTitle}>Bugs</h1>
                    <div className={styles.image}>
                        <img src={BugIcon} alt="Encyclopedia Icon - Bug" />
                    </div>
                </div>
                <div className={styles.card} id={styles.fossil}>
                    <h1 className={styles.title} id={styles.fossilTitle}>Fossils</h1>
                    <div className={styles.image}>
                        <img src={FossilIcon} alt="Encyclopedia Icon - Fossils" />
                    </div>
                </div>
            </div>
            <h3>Search by sea creatures, fish, bugs, and fossils</h3>
            <h3 id={styles.tagline}>or scroll down to view a list of all museum items!</h3>
        </div>
    );
}

export default Intro;