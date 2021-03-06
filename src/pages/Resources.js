import React from 'react';
import { motion } from 'framer-motion';

import Intro from '../components/Resources/Intro';
import List from '../components/Resources/List';
import Contact from '../components/Resources/Contact';

function Resources()
{
    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <Intro />
            <List />
            <Contact />
        </motion.div>
    );
}

export default Resources;