import React from 'react';
import { motion } from 'framer-motion';

import Intro from '../components/Home/Intro';
import Encyclopedia from '../components/Home/Encyclopedia';
import Villagers from '../components/Home/Villagers';
import Resources from '../components/Home/Resources';

function Home()
{
    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <Intro />
            <Encyclopedia />
            <Villagers />
            <Resources />
        </motion.div>
    );
}

export default Home;