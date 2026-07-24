import { useEffect, useState } from 'react'
import './TerminalStrip.css'

const COMMANDS = [
  'kubectl get pods -n citi-payments',
  'argocd app sync payment-platform',
  'terraform apply -target=eks-prod',
]

const TYPE_SPEED = 45
const DELETE_SPEED = 20
const PAUSE_AFTER_TYPED = 1400
const PAUSE_BEFORE_NEXT = 300

export default function TerminalStrip() {
  const [commandIndex, setCommandIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const current = COMMANDS[commandIndex]
    let timeoutId

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeoutId = setTimeout(() => {
          setText(current.slice(0, text.length + 1))
        }, TYPE_SPEED)
      } else {
        timeoutId = setTimeout(() => setPhase('deleting'), PAUSE_AFTER_TYPED)
      }
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timeoutId = setTimeout(() => {
          setText(text.slice(0, -1))
        }, DELETE_SPEED)
      } else {
        timeoutId = setTimeout(() => {
          setCommandIndex((i) => (i + 1) % COMMANDS.length)
          setPhase('typing')
        }, PAUSE_BEFORE_NEXT)
      }
    }

    return () => clearTimeout(timeoutId)
  }, [text, phase, commandIndex])

  return (
    <div className="terminal-strip">
      <div className="container terminal-strip__inner">
        <div className="terminal-strip__dots">
          <span />
          <span />
          <span />
        </div>
        <div className="terminal-strip__text">
          $ {text}
          <span className="terminal-strip__cursor">▊</span>
        </div>
      </div>
    </div>
  )
}
