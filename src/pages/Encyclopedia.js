import React from 'react';
import { motion } from 'framer-motion';

import Intro from '../components/Encyclopedia/Intro';
import List from '../components/Encyclopedia/List';

function Encyclopedia()
{
    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <Intro />
            <List />
        </motion.div>
    );
}

export default Encyclopedia;