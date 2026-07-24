import { useEffect, useState } from 'react'
import './Navbar.css'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#credentials', label: 'Credentials' },
  { href: '#writing', label: 'Writing' },
  { href: '#contact', label: 'Contact' },
]

function getInitialTheme() {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return 'dark'
}

export default function Navbar() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <a href="#" className="navbar__wordmark">
          Shiva<span className="navbar__dot">.</span>
        </a>

        <nav className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <a
            className="navbar__icon-btn"
            href="/assets/resume.pdf"
            download
            aria-label="Download resume"
            title="Download resume"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12" />
              <path d="M7 10l5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
          </a>

          <button
            type="button"
            className="navbar__icon-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            className="navbar__hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
