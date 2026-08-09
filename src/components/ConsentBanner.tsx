import { useEffect, useRef, useState } from 'react'
import {
  analyticsEnabled,
  onConsentReview,
  readConsent,
  saveConsent,
  type ConsentChoice,
} from '../analytics'
import { buttonGreen, card, container } from '../ui'

export default function ConsentBanner() {
  // Na primeira visita o banner aparece sozinho; reaberto pelo rodapé, ele
  // também recebe o foco — aí a ação partiu de quem está navegando.
  const [visible, setVisible] = useState(() => analyticsEnabled && readConsent() === null)
  const [focusOnOpen, setFocusOnOpen] = useState(false)
  const headingRef = useRef<HTMLParagraphElement>(null)

  useEffect(
    () =>
      onConsentReview(() => {
        setFocusOnOpen(true)
        setVisible(true)
      }),
    [],
  )

  useEffect(() => {
    if (visible && focusOnOpen) headingRef.current?.focus()
  }, [visible, focusOnOpen])

  if (!visible) return null

  const decide = (choice: ConsentChoice) => () => {
    saveConsent(choice)
    setVisible(false)
    setFocusOnOpen(false)
  }

  return (
    <div
      aria-describedby="consent-text"
      aria-labelledby="consent-title"
      aria-modal="false"
      className="animate-consent-enter fixed inset-x-0 bottom-0 z-[110] p-3 sm:p-4"
      role="dialog"
    >
      <div className={`${container} ${card} flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-8`}>
        <div className="lg:flex-1">
          <p
            className="font-display text-base font-bold text-kawai-ink outline-none"
            id="consent-title"
            ref={headingRef}
            tabIndex={-1}
          >
            Cookies de medição
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-kawai-brown" id="consent-text">
            Usamos o Google Analytics para entender como as pessoas navegam pelo site e melhorar a
            experiência. Nenhum dado é usado para publicidade, e recusar não muda nada no
            funcionamento da página. Você pode rever essa escolha quando quiser pelo rodapé.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:items-center">
          {/* Recusar precisa ser tão fácil quanto aceitar: mesmo tamanho, mesma área. */}
          <button
            className="min-h-12 cursor-pointer rounded-xl border border-kawai-line px-5 py-3 font-display text-sm font-bold text-kawai-ink transition hover:bg-kawai-cream"
            onClick={decide('denied')}
            type="button"
          >
            Recusar
          </button>
          <button className={`${buttonGreen} cursor-pointer`} onClick={decide('granted')} type="button">
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
}
