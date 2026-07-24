import { useEffect, useRef, useState } from 'react'

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(prefersReducedMotion)

  useEffect(() => {
    if (visible) return
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, visible])

  return { ref, visible }
}
