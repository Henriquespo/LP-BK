interface SectionHeadingProps {
  eyebrow: string
  title: string
  highlight?: string
  tone?: 'dark' | 'light'
  align?: 'left' | 'center'
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  tone = 'dark',
  align = 'center',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left'
  const titleTone = tone === 'light' ? 'text-white' : 'text-kawai-ink'
  const eyebrowTone = tone === 'light' ? 'text-kawai-yellow' : 'text-kawai-orange'
  const highlightTone = tone === 'light' ? 'text-kawai-yellow' : 'text-kawai-orange'

  return (
    <div className={`max-w-[780px] ${alignment}`}>
      <p className={`mb-2.5 text-xs font-extrabold uppercase tracking-[0.16em] ${eyebrowTone}`}>
        {eyebrow}
      </p>
      <h2
        className={`font-display text-[clamp(2rem,4vw,3.625rem)] font-bold leading-[1.02] tracking-[-0.04em] text-balance ${titleTone}`}
      >
        {title}{' '}
        {highlight && <span className={highlightTone}>{highlight}</span>}
      </h2>
    </div>
  )
}
