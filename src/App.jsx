import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './portfolio.css';

import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import ResearchDetail from './pages/ResearchDetail';
import SkillsPage from './pages/SkillsPage';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <Cursor />

      {/* Always mounted — portfolio renders under the loader, visible the instant it slides away */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/research/:id" element={<ResearchDetail />} />
        <Route path="/skills" element={<SkillsPage />} />
      </Routes>

      {/* Loader is a fixed overlay on top — slides up and calls onDone when animation ends */}
      <AnimatePresence>
        {loading && <Loader onDone={() => setLoading(false)} />}
      </AnimatePresence>
    </BrowserRouter>
  );
}
