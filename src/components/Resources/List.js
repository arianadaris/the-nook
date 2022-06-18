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
            <div className={styles.section} ref={addToSections} onClick={() => toggle(sections.current[0])}>
                <div className={styles.row}>
                    <h1>ACNH Wikis</h1>
                    <Arrow id={styles.arrow} stroke="#68B893" />
                </div>
                <a className={styles.hide} href="/">{'>'} Link 1</a>
                <a className={styles.hide} href="/">{'>'} Link 1</a>
                <a className={styles.hide} href="/">{'>'} Link 1</a>
                <a className={styles.hide} href="/">{'>'} Link 1</a>
            </div>
            <div className={styles.section} ref={addToSections} onClick={() => toggle(sections.current[1])}>
                <div className={styles.row}>
                    <h1>Stalk Market Calculators</h1>
                    <Arrow id={styles.arrow} stroke="#68B893" />
                </div>
                <a className={styles.hide} href="/">{'>'} Link 1</a>
                <a className={styles.hide} href="/">{'>'} Link 1</a>
                <a className={styles.hide} href="/">{'>'} Link 1</a>
                <a className={styles.hide} href="/">{'>'} Link 1</a>
            </div>
            <div className={styles.section} ref={addToSections} onClick={() => toggle(sections.current[2])}>
                <div className={styles.row}>
                    <h1>Dodo Codes & Dream Addresses</h1>
                    <Arrow id={styles.arrow} stroke="#68B893" />
                </div>
                <a className={styles.hide} href="/">{'>'} Link 1</a>
                <a className={styles.hide} href="/">{'>'} Link 1</a>
                <a className={styles.hide} href="/">{'>'} Link 1</a>
                <a className={styles.hide} href="/">{'>'} Link 1</a>
            </div>
            <div className={styles.section} ref={addToSections} onClick={() => toggle(sections.current[3])}>
                <div className={styles.row}>
                    <h1>Patterns, QR Codes & Tunes</h1>
                    <Arrow id={styles.arrow} stroke="#68B893" />
                </div>
                <a className={styles.hide} href="/">{'>'} Link 1</a>
                <a className={styles.hide} href="/">{'>'} Link 1</a>
                <a className={styles.hide} href="/">{'>'} Link 1</a>
                <a className={styles.hide} href="/">{'>'} Link 1</a>
            </div>
            <div className={styles.section} ref={addToSections} onClick={() => toggle(sections.current[4])}>
                <div className={styles.row}>
                    <h1>Official Websites</h1>
                    <Arrow id={styles.arrow} stroke="#68B893" />
                </div>
                <a className={styles.hide} href="/">{'>'} Link 1</a>
                <a className={styles.hide} href="/">{'>'} Link 1</a>
                <a className={styles.hide} href="/">{'>'} Link 1</a>
                <a className={styles.hide} href="/">{'>'} Link 1</a>
            </div>
        </div>
    );
}

export default List;