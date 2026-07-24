import { useEffect } from 'react'
import { CAL_LINK_15 } from '../config.js'
import useReveal from '../hooks/useReveal.js'
import './ScheduleCall.css'

const EMBED_TARGET = 'cal-inline-15'

export default function ScheduleCall() {
  const reveal = useReveal()

  useEffect(() => {
    if (typeof window === 'undefined' || !window.Cal) return

    window.Cal('inline', {
      elementOrSelector: `#${EMBED_TARGET}`,
      calLink: CAL_LINK_15,
      layout: 'month_view',
    })
  }, [])

  return (
    <section id="schedule" className="section schedule" ref={reveal.ref} data-reveal={reveal.visible}>
      <div className="container">
        <span className="section-label">Schedule a Call</span>
        <h3 className="schedule__heading">Grab 15 minutes on my calendar</h3>
        <p className="schedule__subtext">
          Pick a slot that works for you — no back and forth emails.
        </p>

        <div className="schedule__embed-wrap">
          <div id={EMBED_TARGET} className="schedule__embed" />
        </div>
      </div>
    </section>
  )
}
