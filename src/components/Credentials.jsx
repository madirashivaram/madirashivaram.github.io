import {
  IconSchool,
  IconBuildingBank,
  IconStarFilled,
  IconCertificate,
  IconCloud,
  IconExternalLink,
} from '@tabler/icons-react'
import useReveal from '../hooks/useReveal.js'
import './Credentials.css'

const EDUCATION = [
  {
    icon: IconSchool,
    degree: 'Master of Science in Computer Science',
    school: 'Texas Tech University',
    meta: 'Lubbock, TX · Aug 2023 – May 2025',
  },
  {
    icon: IconBuildingBank,
    degree: 'B.E. Computer Science & Engineering',
    school: 'Sathyabama Institute of Science and Technology',
    meta: 'Chennai, India · Aug 2016 – May 2020',
  },
]

const CERTIFICATIONS = [
  {
    issuer: 'Microsoft',
    title: 'Microsoft Certified: DevOps Engineer Expert',
    level: 'Expert-level',
    org: 'Microsoft',
    accent: 'ms',
    icon: IconCertificate,
    expert: true,
    url: 'https://learn.microsoft.com/en-us/users/madirashivaramireddy-3326/credentials/5cd5adfab3f6f9ba?ref=https%3A%2F%2Fwww.linkedin.com%2F',
  },
  {
    issuer: 'Amazon Web Services',
    title: 'AWS Cloud Technology Consultant',
    level: 'Associate-level · IAM · Terraform',
    org: 'Amazon Web Services',
    accent: 'aws',
    icon: IconCloud,
    expert: false,
    url: 'https://www.coursera.org/account/accomplishments/specialization/H9MFEA2CI4IW',
  },
  {
    issuer: 'Microsoft',
    title: 'Azure Developer Associate',
    level: 'Associate-level · Cloud Dev',
    org: 'Microsoft',
    accent: 'ms',
    icon: IconCertificate,
    expert: false,
    url: 'https://learn.microsoft.com/en-gb/users/madirashivaramireddy-3326/credentials/a14c66b82835b6fe',
  },
]

export default function Credentials() {
  const reveal = useReveal()

  return (
    <section id="credentials" className="section credentials" ref={reveal.ref} data-reveal={reveal.visible}>
      <div className="container">
        <span className="section-label">Credentials</span>

        <h3 className="credentials__subhead">Education</h3>
        <div className="credentials__education">
          {EDUCATION.map((edu) => (
            <div key={edu.school} className="credentials__edu-card card">
              <div className="credentials__edu-icon">
                <edu.icon size={18} stroke={1.75} />
              </div>
              <span className="credentials__edu-label">Education</span>
              <h4 className="credentials__edu-degree">{edu.degree}</h4>
              <p className="credentials__edu-school">{edu.school}</p>
              <p className="credentials__edu-meta">{edu.meta}</p>
            </div>
          ))}
        </div>

        <h3 className="credentials__subhead">Certifications</h3>
        <div className="credentials__certs">
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.url} className={`credentials__cert-card card credentials__cert-card--${cert.accent}`}>
              {cert.expert && (
                <span className="credentials__expert-tag">
                  <IconStarFilled size={11} />
                  EXPERT
                </span>
              )}
              <div className="credentials__cert-icon">
                <cert.icon size={18} stroke={1.75} />
              </div>
              <span className="credentials__cert-issuer">{cert.issuer}</span>
              <h4 className="credentials__cert-title">{cert.title}</h4>
              <p className="credentials__cert-org">{cert.org}</p>
              <p className="credentials__cert-level">{cert.level}</p>
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="credentials__cert-verify"
              >
                <IconExternalLink size={14} stroke={1.75} />
                Verify credential
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
