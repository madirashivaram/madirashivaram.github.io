import { useState } from 'react'
import { BMC_USERNAME, WEB3FORMS_KEY } from '../config.js'
import useReveal from '../hooks/useReveal.js'
import './Contact.css'

const ROWS = [
  {
    key: 'email',
    href: 'mailto:ramsivapm@gmail.com',
    label: 'ramsivapm@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 6l-10 7L2 6" />
      </svg>
    ),
  },
  {
    key: 'phone',
    href: null,
    label: '806-370-0066',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    key: 'location',
    href: null,
    label: 'San Jose, CA',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_MESSAGE_WORDS = 300

function countWords(text) {
  const trimmed = text.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const wordCount = countWords(message)
  const overLimit = wordCount > MAX_MESSAGE_WORDS

  const validate = () => {
    const nextErrors = {}
    if (!name.trim()) nextErrors.name = 'Full name is required.'
    if (!email.trim()) {
      nextErrors.email = 'Email address is required.'
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (overLimit) nextErrors.message = `Message is ${wordCount - MAX_MESSAGE_WORDS} words over the limit.`
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    const form = event.target
    if (form.botcheck.value) return

    setStatus('submitting')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name,
          email,
          message,
          botcheck: form.botcheck.value,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="botcheck"
        className="contact-form__honeypot"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="contact-form__field">
        <label htmlFor="cf-name">
          Full Name <span className="contact-form__required">*</span>
        </label>
        <input
          id="cf-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={errors.name ? 'contact-form__input--error' : ''}
        />
        {errors.name && <span className="contact-form__error">{errors.name}</span>}
      </div>

      <div className="contact-form__field">
        <label htmlFor="cf-email">
          Email Address <span className="contact-form__required">*</span>
        </label>
        <input
          id="cf-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? 'contact-form__input--error' : ''}
        />
        {errors.email && <span className="contact-form__error">{errors.email}</span>}
      </div>

      <div className="contact-form__field">
        <div className="contact-form__label-row">
          <label htmlFor="cf-message">Message</label>
          <span className={`contact-form__word-count ${overLimit ? 'contact-form__word-count--over' : ''}`}>
            {wordCount}/{MAX_MESSAGE_WORDS} words
          </span>
        </div>
        <textarea
          id="cf-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={errors.message ? 'contact-form__input--error' : ''}
        />
        <span className="contact-form__helper">optional, max 300 words</span>
        {errors.message && <span className="contact-form__error">{errors.message}</span>}
      </div>

      <button type="submit" className="btn btn--filled contact-form__submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>

      {status === 'success' && (
        <p className="contact-form__notice contact-form__notice--success">
          Message sent! I'll get back to you soon.
        </p>
      )}
      {status === 'error' && (
        <p className="contact-form__notice contact-form__notice--error">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}

export default function Contact() {
  const reveal = useReveal()

  return (
    <section id="contact" className="section section--alt contact" ref={reveal.ref} data-reveal={reveal.visible}>
      <div className="container">
        <span className="section-label">Contact</span>

        <p className="contact__intro">
          Reach out about DevOps and platform engineering roles, infrastructure
          consulting, or just to compare notes on running Kubernetes at scale.
        </p>

        <div className="contact__grid">
          <div className="contact__info">
            <div className="contact__rows">
              {ROWS.map((row) =>
                row.href ? (
                  <a key={row.key} href={row.href} className="contact__row">
                    <span className="contact__row-icon">{row.icon}</span>
                    {row.label}
                  </a>
                ) : (
                  <span key={row.key} className="contact__row">
                    <span className="contact__row-icon">{row.icon}</span>
                    {row.label}
                  </span>
                ),
              )}
            </div>

            <div className="contact__actions">
              <a href="/assets/resume.pdf" download className="btn btn--filled">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v12" />
                  <path d="M7 10l5 5 5-5" />
                  <path d="M5 21h14" />
                </svg>
                Download resume
              </a>
              <a
                href="https://github.com/madirashivaram"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outlined"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/shivarammadira/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outlined"
              >
                LinkedIn
              </a>
              <a
                href={`https://buymeacoffee.com/${BMC_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--amber"
              >
                ☕ Buy me a coffee
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
