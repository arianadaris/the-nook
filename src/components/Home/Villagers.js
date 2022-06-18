import React from 'react';

import styles from './Villagers.module.css';

import ViewAll from '../../assets/Home_ViewAll.png';
import SearchName from '../../assets/Home_SearchName.png';
import SearchSpecies from '../../assets/Home_SearchSpecies.png';
import SearchPersonality from '../../assets/Home_SearchPersonality.png';

function Villagers()
{
    return(
        <div className={styles.container}>
            <h1>Get to Know Your Villagers!</h1>
            <h2>View all, or search by name, species or personality!</h2>
            <div className={styles.iconWrapper}>
                <div className={styles.cardsWrapper}>
                    <div className={styles.card}>
                        <img src={ViewAll} alt="Villagers - View all" />
                        <div className={styles.buttonWrapper}>
                            <a href="/villagers">View all!</a>
                            <div className={styles.hover} />
                        </div>
                    </div>
                    <div className={styles.card}>
                        <img src={SearchName} alt="Villagers - Search by Name" />
                        <div className={styles.buttonWrapper}>
                            <a href="/about">Name</a>
                            <div className={styles.hover} />
                        </div>
                    </div>
                    <div className={styles.card}>
                        <img src={SearchSpecies} alt="Villagers - Search by species" />
                        <div className={styles.buttonWrapper}>
                            <a href="/about">Species</a>
                            <div className={styles.hover} />
                        </div>
                    </div>
                    <div className={styles.card}>
                        <img src={SearchPersonality} alt="Villagers - Search by Personality" />
                        <div className={styles.buttonWrapper}>
                            <a href="/about">Personality</a>
                            <div className={styles.hover} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Villagers;