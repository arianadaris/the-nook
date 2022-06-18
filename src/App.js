import './App.css';
import {Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Encyclopedia from './pages/Encyclopedia';
import Villagers from './pages/Villagers';
import Resources from './pages/Resources';
import About from './pages/About';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Header />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/encyclopedia" element={<Encyclopedia />} />
          <Route exact path="/villagers" element={<Villagers />} /> 
          <Route exact path="/resources" element={<Resources />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
