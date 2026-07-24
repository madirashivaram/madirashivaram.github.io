import { useEffect, useState } from 'react'
import useReveal from '../hooks/useReveal.js'
import './About.css'

const STATS = [
  { value: 4, suffix: '', label: 'Years experience' },
  { value: 3, suffix: '', label: 'Cloud platforms' },
  { value: 65, suffix: '%', label: 'Provisioning time reduced' },
  { value: 2, suffix: '', label: 'Certifications' },
]

const ANIMATION_MS = 1000

function StatCard({ value, suffix, label, animate }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!animate) return
    let frameId
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / ANIMATION_MS, 1)
      setDisplayValue(Math.round(progress * value))
      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [animate, value])

  return (
    <div className="about__stat card">
      <div className="about__stat-value">
        {displayValue}
        {suffix}
      </div>
      <div className="about__stat-label">{label}</div>
    </div>
  )
}

export default function About() {
  const reveal = useReveal()

  return (
    <section
      id="about"
      className="section section--alt about"
      ref={reveal.ref}
      data-reveal={reveal.visible}
    >
      <div className="container about__inner">
        <div className="about__text">
          <span className="section-label">About</span>
          <p>
            I'm a Cloud Platform Engineer based in San Jose, CA, currently at Citibank,
            where I own the multi-cloud Kubernetes platform that powers internal
            payment processing systems. My work spans landing zone design, GitOps
            delivery, observability, and secrets governance across AWS and GCP.
          </p>
          <p>
            Before Citibank, I spent time at TCS and Wipro leading EKS migrations and
            large-scale Azure workload moves — building the Terraform and Ansible
            automation that took provisioning from days down to hours for dozens of
            production workloads.
          </p>
          <p>
            I hold a Master's degree in Computer Science from Texas Tech University,
            along with AWS and Azure certifications, and I care most about building
            infrastructure that stays boring and reliable under real production load.
          </p>
        </div>

        <div className="about__stats">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} animate={reveal.visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
