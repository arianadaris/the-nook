import React from 'react';
import { motion } from 'framer-motion';

import Intro from '../components/About/Intro';
import ProjectCards from '../components/About/ProjectCards';
import Contact from '../components/About/Contact';

function About()
{
    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <Intro />
            <ProjectCards />
            <Contact />
        </motion.div>
    );
}

export default About;