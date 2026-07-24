import useReveal from '../hooks/useReveal.js'
import './Experience.css'

const PIPELINE = [
  { label: 'Wipro', status: 'done' },
  { label: 'TCS', status: 'done' },
  { label: 'Citibank', status: 'current' },
]

const JOBS = [
  {
    company: 'Citibank',
    accent: '#1a73e8',
    role: 'Cloud Platform Engineer',
    dates: 'Jul 2025 – Present',
    location: 'San Jose, CA',
    description:
      "Architect and operate the secure multi-cloud Kubernetes platform on AWS and GCP powering Citibank's internal payment processing systems. Own landing zone design, Terraform modules, ArgoCD GitOps with blue/green and canary deploys, Dynatrace observability with Davis AI anomaly detection, and HashiCorp Vault secrets governance.",
    chips: [
      '↓40% config inconsistencies',
      '↓30% false positive alerts',
      '↓25% service disruptions',
      '<40 min incident response',
    ],
  },
  {
    company: 'Tata Consultancy Services',
    accent: '#3fb950',
    role: 'AWS DevOps Engineer',
    dates: 'Jun 2022 – Jul 2023',
    location: 'Hyderabad, India',
    description:
      'Designed modular AWS infrastructure with Terraform. Led migration of containerized healthcare applications into EKS with Helm and ArgoCD. Built CI/CD in Jenkins and GitLab CI that lifted release cadence from bi-weekly to multiple daily deployments. Drove MTTR reduction through Prometheus, Grafana, and CloudWatch observability.',
    chips: ['↓55% deploy time', '↓30% MTTR', '↓15% AWS costs', '99.9% availability'],
  },
  {
    company: 'Wipro',
    accent: '#f9ab00',
    role: 'Cloud Engineer',
    dates: 'Sept 2020 – May 2022',
    location: 'Bengaluru, India',
    description:
      'Led migration of 30+ legacy and AWS-hosted workloads to Azure. Automated provisioning with Terraform and ARM templates, compressing environment setup from days to under 6 hours. Combined Terraform with Ansible for VM configuration and established Azure DevOps CI/CD for AKS deployments.',
    chips: [
      '↓65% provisioning time',
      '↓50% manual release effort',
      '↓35% config drift',
      '30+ workloads migrated',
    ],
  },
]

function PipelineNode({ label, status }) {
  return (
    <div className={`experience__node experience__node--${status}`}>
      <div className="experience__node-circle">
        {status === 'done' ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          <span className="experience__node-dot" />
        )}
      </div>
      <span className="experience__node-label">{label}</span>
    </div>
  )
}

function JobCard({ job }) {
  return (
    <article className="experience__card card" style={{ borderLeft: `3px solid ${job.accent}` }}>
      <div className="experience__card-head">
        <div>
          <h3 className="experience__company">{job.company}</h3>
          <p className="experience__role">{job.role}</p>
        </div>
        <div className="experience__meta">
          <span>{job.dates}</span>
          <span>{job.location}</span>
        </div>
      </div>
      <p className="experience__description">{job.description}</p>
      <div className="experience__chips">
        {job.chips.map((chip) => (
          <span key={chip} className="chip chip--blue">
            {chip}
          </span>
        ))}
      </div>
    </article>
  )
}

export default function Experience() {
  const reveal = useReveal()

  return (
    <section id="experience" className="section experience" ref={reveal.ref} data-reveal={reveal.visible}>
      <div className="container">
        <span className="section-label">Experience</span>

        <div className="experience__pipeline">
          {PIPELINE.map((node, i) => (
            <div key={node.label} className="experience__pipeline-item">
              <PipelineNode {...node} />
              {i < PIPELINE.length - 1 && <div className="experience__pipeline-line" />}
            </div>
          ))}
        </div>

        <div className="experience__list">
          {JOBS.map((job) => (
            <JobCard key={job.company} job={job} />
          ))}
        </div>
      </div>
    </section>
  )
}
