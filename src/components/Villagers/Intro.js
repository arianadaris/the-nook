import React from 'react';

import styles from './Intro.module.css';

import Name from '../../assets/Home_SearchName.png';
import Species from '../../assets/Home_SearchSpecies.png';
import Personality from '../../assets/Home_SearchPersonality.png';

function Intro()
{
    return(
        <div className={styles.container}>
            <h1>Villagers</h1>
            <h3 id={styles.tagline}>Get to know your villagers!</h3>
            <div className={styles.cardsWrapper}>
                <div className={styles.card} id={styles.name}>
                    <h1 className={styles.title} id={styles.nameTitle}>Name</h1>
                    <div className={styles.image}>
                        <img src={Name} alt="Villager Icon - Search by name" />
                    </div>
                </div>
                <div className={styles.card} id={styles.species}>
                    <h1 className={styles.title} id={styles.speciesTitle}>Species</h1>
                    <div className={styles.image}>
                        <img src={Species} alt="Villager Icon - Search by species" />
                    </div>
                </div>
                <div className={styles.card} id={styles.personality}>
                    <h1 className={styles.title} id={styles.personalityTitle}>Personality</h1>
                    <div className={styles.image}>
                        <img src={Personality} alt="Villager Icon - Search by personality" />
                    </div>
                </div>
            </div>
            <h3>Search by name, species or personality</h3>
            <h3 id={styles.tagline}>or scroll down to view a list of all villagers!</h3>
        </div>
    );
}

export default Intro;