import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>© 2026 Shiva Rami Reddy Madira</span>
        <nav className="footer__links">
          <a href="https://github.com/madirashivaram" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <span>·</span>
          <a
            href="https://www.linkedin.com/in/shivarammadira/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <span>·</span>
          <a href="/assets/resume.pdf" download>
            Resume
          </a>
        </nav>
      </div>
    </footer>
  )
}
