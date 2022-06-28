import React from 'react';
import { useRef } from 'react';

import styles from './List.module.css';

import { ReactComponent as Arrow } from '../../assets/Arrow.svg';

import SeaList from './SeaList';
import FishList from './FishList';
import BugList from './BugList';
import FossilList from './FossilList';

import SeaIcon from '../../assets/Icon_SeaCreatures.png';
import FishIcon from '../../assets/Icon_Fish.png';
import BugIcon from '../../assets/Icon_Bugs.png';
import FossilIcon from '../../assets/Icon_Fossils.png';

class List extends React.Component
{
    render()
    {
        return (
            <div className={styles.container}>
                <h1>Encyclopedia</h1>
                <h3 id={styles.tagline}>Learn about all of the museum items!</h3>
                <div className={styles.cardsWrapper}>
                    <a href="#sea-list" className={styles.card} id={styles.sea}><div>
                        <h1 className={styles.title} id={styles.seaTitle}>Sea Creatures</h1>
                        <div className={styles.image}>
                            <img src={SeaIcon} alt="Encyclopedia Icon - Sea Creatures" />
                        </div>
                    </div></a>
                    <a href="#fish-list" className={styles.card} id={styles.fish}><div >
                        <h1 className={styles.title} id={styles.fishTitle}>Fish</h1>
                        <div className={styles.image}>
                            <img src={FishIcon} alt="Encyclopedia Icon - Fish" />
                        </div>
                    </div></a>
                    <a href="#bug-list" className={styles.card} id={styles.bug}><div>
                        <h1 className={styles.title} id={styles.bugTitle}>Bugs</h1>
                        <div className={styles.image}>
                            <img src={BugIcon} alt="Encyclopedia Icon - Bug" />
                        </div>
                    </div></a>
                    <a href="#fossil-list" className={styles.card} id={styles.fossil}><div>
                        <h1 className={styles.title} id={styles.fossilTitle}>Fossils</h1>
                        <div className={styles.image}>
                            <img src={FossilIcon} alt="Encyclopedia Icon - Fossils" />
                        </div>
                    </div></a>
                </div>
                <h3>Search by sea creatures, fish, bugs, and fossils</h3>
                <h3 id={styles.tagline}>or scroll down to view a list of all museum items!</h3>
                <SeaList styles={{marginTop: '3rem'}} />
                <FishList styles={{marginTop: '3rem'}} />
                <BugList styles={{marginTop: '3rem'}} />
                <FossilList styles={{marginTop: '3rem'}} />
            </div>
        );
    }
}

export default List;