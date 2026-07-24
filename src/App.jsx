import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import TerminalStrip from './components/TerminalStrip.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Credentials from './components/Credentials.jsx'
import Writing from './components/Writing.jsx'
import ScheduleCall from './components/ScheduleCall.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <TerminalStrip />
      <About />
      <Experience />
      <Skills />
      <Credentials />
      <Writing />
      <ScheduleCall />
      <Contact />
      <Footer />
    </>
  )
}
