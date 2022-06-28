import React from 'react';
import { useRef } from 'react';

import styles from './List.module.css';

import { ReactComponent as Arrow } from '../../assets/Arrow.svg'; 

function List()
{
    const sections = useRef(null);
    sections.current = [];

    const addToSections = (el) => {
        if(el && !sections.current.includes(el))
        {
            sections.current.push(el);
        }
    }

    const toggle = (el) => {
        // Change header color
        var header = el.getElementsByTagName('div')[0];
        if(!header.classList.contains(`${styles.open}`))
        {
            header.classList.add(`${styles.open}`);
        }
        else
        {
            header.classList.remove(`${styles.open}`);
        }

        // Show links
        var links = el.getElementsByTagName('a');
        for(let link of links)
        {
            if(!link.classList.contains(`${styles.hide}`))
            {
                link.classList.add(`${styles.hide}`);
            }
            else
            {
                link.classList.remove(`${styles.hide}`);
            }
            console.log(link);
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.section} ref={addToSections}>
                <div className={styles.row} onClick={() => toggle(sections.current[0])}>
                    <h1>ACNH Wikis</h1>
                    <Arrow id={styles.arrow} stroke="#68B893" />
                </div>
                <a className={styles.hide} href="https://animalcrossing.fandom.com/wiki/Animal_Crossing:_New_Horizons" target="_blank" rel="noreferrer">{'>'} Animal Crossing New Horizons Fandom</a>
                <a className={styles.hide} href="https://nookipedia.com/wiki/Animal_Crossing:_New_Horizons" target="_blank" rel="noreferrer">{'>'} Nookipedia</a>
                <a className={styles.hide} href="https://www.ign.com/wikis/animal-crossing-new-horizons/" target="_blank" rel="noreferrer">{'>'} IGN Animal Crossing New Horizons</a>
            </div>
            <div className={styles.section} ref={addToSections}>
                <div className={styles.row} onClick={() => toggle(sections.current[1])}>
                    <h1>Stalk Market Calculators</h1>
                    <Arrow id={styles.arrow} stroke="#68B893" />
                </div> 
                <a className={styles.hide} href="https://ac-turnip.com/" target="_blank" rel="noreferrer">{'>'} ACNH Turnip Calculator</a>
                <a className={styles.hide} href="https://turnipprophet.io/" target="_blank" rel="noreferrer">{'>'} Turnip Prophet</a>
                <a className={styles.hide} href="https://artem6.github.io/acnh_turnips/?locale=en-us" target="_blank" rel="noreferrer">{'>'} Turnip Price Calculator</a>
                <a className={styles.hide} href="https://nooknet.net/turnips" target="_blank" rel="noreferrer">{'>'} Nooknet Turnips Calculator</a>
            </div>
            <div className={styles.section} ref={addToSections}>
                <div className={styles.row} onClick={() => toggle(sections.current[2])}>
                    <h1>Dodo Codes & Dream Addresses</h1>
                    <Arrow id={styles.arrow} stroke="#68B893" />
                </div>
                <a className={styles.hide} href="https://dodocodes.com/" target="_blank" rel="noreferrer">{'>'} Dodo Codes</a>
                <a className={styles.hide} href="https://www.nookfriends.com/" target="_blank" rel="noreferrer">{'>'} Nook Friends</a>
                <a className={styles.hide} href="https://nooksisland.com/dream-addresses?sort-by=most-popular" target="_blank" rel="noreferrer">{'>'} Nook's Island Dream Addresses</a>
            </div>
            <div className={styles.section} ref={addToSections}>
                <div className={styles.row} onClick={() => toggle(sections.current[3])}>
                    <h1>Patterns & Tunes</h1>
                    <Arrow id={styles.arrow} stroke="#68B893" />
                </div>
                <a className={styles.hide} href="https://acpatterns.com/editor" target="_blank" rel="noreferrer">{'>'} AC Pattern Editor</a>
                <a className={styles.hide} href="https://acpatterngallery.com/" target="_blank" rel="noreferrer">{'>'} AC Pattern Gallery</a>
                <a className={styles.hide} href="hhttps://acnhcustomdesigns.tumblr.com/" target="_blank" rel="noreferrer">{'>'} ACNH Custom Designs</a>
                <a className={styles.hide} href="https://nooksisland.com/designs" target="_blank" rel="noreferrer">{'>'} Nook's Island Designs</a>
                <a className={styles.hide} href="https://nooknet.net/tunes" target="_blank" rel="noreferrer">{'>'} Nooknet Island Tune Creator</a>
            </div>
            <div className={styles.section} ref={addToSections}>
                <div className={styles.row} onClick={() => toggle(sections.current[4])}>
                    <h1>Official Websites</h1>
                    <Arrow id={styles.arrow} stroke="#68B893" />
                </div>
                <a className={styles.hide} href="https://animal-crossing.com/" target="_blank" rel="noreferrer">{'>'} Animal Crossing Website</a>
                <a className={styles.hide} href="https://www.animal-crossing.com/new-horizons/" target="_blank" rel="noreferrer">{'>'} Animal Crossing New Horizons</a>
                <a className={styles.hide} href="https://animal-crossing.com/amiibo/collections/series-1-4-amiibo-cards/" target="_blank" rel="noreferrer">{'>'} Animal Crossing Amiibo Cards</a>
                <a className={styles.hide} href="https://www.animal-crossing.com/new-horizons/happy-home-paradise/" target="_blank" rel="noreferrer">{'>'} Happy Home Paradise DLC</a>
            </div>
        </div>
    );
}

export default List;