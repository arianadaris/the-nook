import React from 'react';
import { useRef } from 'react';

import styles from './List.module.css';

import { ReactComponent as Arrow } from '../../assets/Arrow.svg';

import Fish from '../Data/Fish';
import Sea from '../Data/Sea';
import Bugs from '../Data/Bug';
import Fossils from '../Data/Fossil';

function List()
{
    const sections = useRef(null);
    sections.current = [];

    const addToSections = (el) => {
        if(el && !sections.current.includes(el))
        {
            sections.current.push(el);
        }
        console.log(sections.current);
    }

    const toggle = (el) => {
        // Change header color
        if(!el.classList.contains(`${styles.open}`))
        {
            el.classList.add(`${styles.open}`);
        }
        else
        {
            el.classList.remove(`${styles.open}`);
        }
        console.log(el.classList);

        // Show/hide rows
        var rows = el.getElementsByTagName('div');
        for (let row of rows)
        {
            if(!row.classList.contains(`${styles.header}`))
            {
                if(!row.classList.contains(`${styles.hide}`))
                {
                    row.classList.add(`${styles.hide}`);
                }
                else
                {
                    row.classList.remove(`${styles.hide}`);
                }
            }
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.sectionWrapper}>
                <div className={`${styles.section}`} ref={addToSections}>
                    <div className={`${styles.header} ${styles.sea}`} onClick={() => toggle(sections.current[0])}>
                        <h1>Sea Creatures</h1>
                        <Arrow className={`${styles.arrow} ${styles.seaArrow}`} />
                    </div>
                    <Sea />
                </div>
                <div className={`${styles.section} ${styles.open}`} ref={addToSections}>
                    <div className={`${styles.header} ${styles.fish}`} onClick={() => toggle(sections.current[1])}>
                        <h1>Fish</h1>
                        <Arrow className={`${styles.arrow} ${styles.fishArrow}`} />
                    </div>
                    <Fish />
                </div>
                <div className={`${styles.section} ${styles.open}`} ref={addToSections}>
                    <div className={`${styles.header} ${styles.bug}`} onClick={() => toggle(sections.current[2])}>
                        <h1>Bugs</h1>
                        <Arrow className={`${styles.arrow} ${styles.bugArrow}`} />
                    </div>
                    <Bugs />
                </div>
                <div className={`${styles.section} ${styles.open}`} ref={addToSections}>
                    <div className={`${styles.header} ${styles.fossil}`} onClick={() => toggle(sections.current[3])}>
                        <h1>Fossils</h1>
                        <Arrow className={`${styles.arrow} ${styles.fossilArrow}`} />
                    </div>
                    <Fossils />
                </div>
            </div>
        </div>
    );
}

export default List;