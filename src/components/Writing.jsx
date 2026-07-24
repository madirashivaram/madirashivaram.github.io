import useReveal from '../hooks/useReveal.js'
import './Writing.css'

const ARTICLES = [
  {
    tag: 'Kubernetes',
    title: 'How I Reduced Kubernetes Incident Response Time by 33%',
    excerpt:
      'A breakdown of the observability and alerting changes that cut incident response time in a production Kubernetes platform.',
    source: 'LinkedIn',
    url: 'https://www.linkedin.com/pulse/how-i-reduced-kubernetes-incident-response-time-33-major-madira-ie3uc/',
  },
  {
    tag: 'GitOps with ArgoCD',
    title: 'What Breaks in Production That No Tutorial Prepares You For',
    excerpt:
      'The gap between a clean ArgoCD demo and a real GitOps rollout — and what actually goes wrong in production.',
    source: 'Medium',
    url: 'https://medium.com/@ramsivapm/gitops-with-argocd-what-breaks-in-production-that-no-tutorial-prepares-you-for-f95383bf907f',
  },
  {
    tag: 'Terraform',
    title: 'Terraform Module Design for Multi-Cloud: What Actually Cuts Configuration Drift',
    excerpt:
      'Module design patterns that hold up across AWS, Azure, and GCP, and the ones that quietly cause drift.',
    source: 'Medium',
    url: 'https://medium.com/@ramsivapm/terraform-module-design-for-multi-cloud-what-actually-cuts-configuration-drift-db0345876e3d',
  },
]

export default function Writing() {
  const reveal = useReveal()

  return (
    <section id="writing" className="section section--alt writing" ref={reveal.ref} data-reveal={reveal.visible}>
      <div className="container">
        <span className="section-label">Writing</span>

        <div className="writing__grid">
          {ARTICLES.map((article) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="writing__card card"
            >
              <span className="chip chip--blue writing__tag">{article.tag}</span>
              <h3 className="writing__title">{article.title}</h3>
              <p className="writing__excerpt">{article.excerpt}</p>
              <div className="writing__footer">
                <span className="writing__source">{article.source}</span>
                <span className="writing__arrow">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
