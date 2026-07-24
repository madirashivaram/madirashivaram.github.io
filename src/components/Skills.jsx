import {
  IconShip,
  IconStack2,
  IconBrandAws,
  IconGitBranch,
  IconBrandDocker,
  IconPackage,
  IconBrandGithub,
  IconLock,
  IconFlame,
  IconChartLine,
  IconSettingsAutomation,
  IconBrandAzure,
  IconBrandGoogle,
  IconActivity,
  IconTools,
  IconBrandGitlab,
  IconAdjustments,
  IconEyeCode,
  IconShieldCheck,
  IconBrandPython,
  IconTerminal2,
  IconSnowflake,
  IconCloudComputing,
  IconBrandPowershell,
  IconDatabase,
  IconServer2,
  IconRoute,
  IconLoadBalancer,
} from '@tabler/icons-react'
import useReveal from '../hooks/useReveal.js'
import './Skills.css'

const ICONS = {
  Kubernetes: IconShip,
  Terraform: IconStack2,
  'AWS EKS': IconBrandAws,
  ArgoCD: IconGitBranch,
  Docker: IconBrandDocker,
  GitOps: IconGitBranch,
  Helm: IconPackage,
  'GitHub Actions': IconBrandGithub,
  'HashiCorp Vault': IconLock,
  Prometheus: IconFlame,
  Grafana: IconChartLine,
  'CI/CD': IconSettingsAutomation,
  'AWS EC2/VPC/RDS/S3/IAM': IconBrandAws,
  'Azure AKS': IconBrandAzure,
  'GCP GKE': IconBrandGoogle,
  Dynatrace: IconActivity,
  Jenkins: IconTools,
  'GitLab CI': IconBrandGitlab,
  'Azure DevOps': IconBrandAzure,
  Ansible: IconAdjustments,
  SonarQube: IconEyeCode,
  Trivy: IconShieldCheck,
  Python: IconBrandPython,
  Bash: IconTerminal2,
  Snowflake: IconSnowflake,
  CloudFormation: IconCloudComputing,
  PowerShell: IconBrandPowershell,
  'Azure SQL': IconDatabase,
  PostgreSQL: IconDatabase,
  NGINX: IconServer2,
  'Route 53': IconRoute,
  'ELB/ALB': IconLoadBalancer,
}

const TIERS = [
  {
    tier: 'Expert',
    chipClass: 'chip--blue',
    skills: [
      'Kubernetes',
      'Terraform',
      'AWS EKS',
      'ArgoCD',
      'Docker',
      'GitOps',
      'Helm',
      'GitHub Actions',
      'HashiCorp Vault',
      'Prometheus',
      'Grafana',
      'CI/CD',
    ],
  },
  {
    tier: 'Proficient',
    chipClass: 'chip--green',
    skills: [
      'AWS EC2/VPC/RDS/S3/IAM',
      'Azure AKS',
      'GCP GKE',
      'Dynatrace',
      'Jenkins',
      'GitLab CI',
      'Azure DevOps',
      'Ansible',
      'SonarQube',
      'Trivy',
      'Python',
      'Bash',
    ],
  },
  {
    tier: 'Familiar',
    chipClass: 'chip--amber',
    skills: [
      'Snowflake',
      'CloudFormation',
      'PowerShell',
      'Azure SQL',
      'PostgreSQL',
      'NGINX',
      'Route 53',
      'ELB/ALB',
    ],
  },
]

export default function Skills() {
  const reveal = useReveal()

  return (
    <section id="skills" className="section section--alt skills" ref={reveal.ref} data-reveal={reveal.visible}>
      <div className="container">
        <span className="section-label">Skills</span>

        <div className="skills__groups">
          {TIERS.map((group) => (
            <div key={group.tier} className="skills__group">
              <span className="skills__tier-label">{group.tier}</span>
              <div className="skills__chips">
                {group.skills.map((skill) => {
                  const Icon = ICONS[skill]
                  return (
                    <span key={skill} className={`chip ${group.chipClass}`}>
                      {Icon && <Icon size={14} stroke={1.75} className="skills__chip-icon" />}
                      {skill}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
