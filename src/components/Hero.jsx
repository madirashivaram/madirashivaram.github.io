import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <div className="hero__status">
            <span className="hero__status-dot" />
            Currently building payment infrastructure at Citibank
          </div>

          <h1 className="hero__name">
            Shiva Rami Reddy <span className="hero__name-accent">Madira</span>
          </h1>

          <p className="hero__role">DevOps · Platform Engineering · SRE</p>

          <p className="hero__bio">
            Four years engineering cloud native platforms at enterprise scale across
            AWS, Azure, and GCP. At Citibank, I own the multi-cloud Kubernetes
            infrastructure for internal payment systems.
          </p>

          <div className="hero__actions">
            <a href="#experience" className="btn btn--filled">
              View my work
            </a>
            <a href="#contact" className="btn btn--outlined">
              Get in touch
            </a>
          </div>
        </div>

        <div className="hero__photo-wrap">
          <img
            className="hero__photo"
            src="/assets/photo.jpg"
            alt="Shiva Rami Reddy Madira"
          />
        </div>
      </div>
    </section>
  )
}
