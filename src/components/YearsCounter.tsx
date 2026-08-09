import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

const TARGET = 18
const DURATION = 1500
const PIECES = 28
const COLORS = ['#f45c0b', '#fce11b', '#91c900', '#1559c5', '#e83d92']

interface Piece {
  style: CSSProperties
  round: boolean
}

/** Distribui os confetes num leque para cima e sorteia queda, giro e ritmo de cada um. */
function buildPieces(): Piece[] {
  return Array.from({ length: PIECES }, (_, index) => {
    const spread = (index / (PIECES - 1) - 0.5) * 2
    const dx = spread * (70 + Math.random() * 90)
    const width = 5 + Math.random() * 5
    const height = 8 + Math.random() * 7

    return {
      round: index % 4 === 0,
      style: {
        width: `${width}px`,
        height: `${height}px`,
        background: COLORS[index % COLORS.length],
        '--dx': `${dx.toFixed(1)}px`,
        '--rise': `${-(50 + Math.random() * 80).toFixed(1)}px`,
        '--fall': `${(130 + Math.random() * 110).toFixed(1)}px`,
        '--rot': `${(Math.random() * 900 - 450).toFixed(0)}deg`,
        '--delay': `${Math.round(Math.random() * 260)}ms`,
        '--duration': `${Math.round(1500 + Math.random() * 800)}ms`,
      } as CSSProperties,
    }
  })
}

export default function YearsCounter() {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const [celebrating, setCelebrating] = useState(false)
  const pieces = useMemo(buildPieces, [])

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let frame = 0

    const animate = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setValue(TARGET)
        return
      }

      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / DURATION, 1)
        setValue(Math.round((1 - (1 - progress) ** 3) * TARGET))
        if (progress < 1) frame = requestAnimationFrame(tick)
        else setCelebrating(true)
      }
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        animate()
      },
      { threshold: 0.6 },
    )
    observer.observe(node)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <span className="kawai-anniversary" ref={ref}>
      <strong
        className={`kawai-anniversary-value block font-display text-[clamp(72px,9vw,126px)] font-bold leading-[.8] tracking-[-0.08em] text-kawai-orange ${
          celebrating ? 'kawai-anniversary-value--pop' : ''
        }`}
      >
        {value}
      </strong>

      {celebrating && (
        <span className="kawai-confetti" aria-hidden="true">
          {pieces.map((piece, index) => (
            <span
              className={piece.round ? 'rounded-full' : 'rounded-[2px]'}
              key={index}
              style={piece.style}
            />
          ))}
        </span>
      )}
    </span>
  )
}
