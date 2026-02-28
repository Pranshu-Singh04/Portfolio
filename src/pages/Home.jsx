import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Research from '../components/Research';
import Achievements from '../components/Achievements';
import Timeline from '../components/Timeline';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Research />
      <Achievements />
      <Timeline />
      <Contact />
    </main>
  );
}
