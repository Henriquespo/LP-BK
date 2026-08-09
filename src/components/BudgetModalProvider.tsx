import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { trackEvent } from '../analytics'
import { CONTACT } from '../data/site'
import BudgetForm from './BudgetForm'
import { BudgetModalContext } from './budgetModal'
import Icon from './Icon'

const directMessage = encodeURIComponent(
  'Olá! Quero receber um orçamento personalizado para uma festa no Buffet Kawai. 🎉',
)

export default function BudgetModalProvider({ children }: { children: ReactNode }) {
  const [intent, setIntent] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const open = useCallback((nextIntent?: string) => {
    const resolved = nextIntent ?? 'Orçamento'
    trackEvent('whatsapp_cta_click', { cta_intent: resolved })
    setIntent(resolved)
  }, [])

  const value = useMemo(() => ({ open }), [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (intent !== null && dialog && !dialog.open) dialog.showModal()
  }, [intent])

  const closeDialog = () => dialogRef.current?.close()

  return (
    <BudgetModalContext.Provider value={value}>
      {children}

      {intent !== null && (
        <dialog
          ref={dialogRef}
          aria-labelledby="budget-modal-title"
          className="fixed inset-0 z-[130] m-0 h-dvh max-h-none w-screen max-w-none items-center justify-center overflow-y-auto bg-transparent p-3 backdrop:bg-[#211712]/80 backdrop:backdrop-blur-[3px] open:flex sm:p-6"
          onCancel={(event) => {
            event.preventDefault()
            closeDialog()
          }}
          onClose={() => setIntent(null)}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeDialog()
          }}
        >
          <div className="animate-menu-reveal relative my-auto w-full max-w-[420px] rounded-[24px] bg-white p-6 shadow-[0_28px_60px_rgba(43,24,8,.38)] sm:p-7">
            <button
              autoFocus
              aria-label="Fechar formulário de orçamento"
              className="absolute right-3 top-3 grid size-11 cursor-pointer place-items-center rounded-full border border-kawai-line bg-kawai-cream text-kawai-brown transition hover:bg-kawai-orange hover:text-white"
              onClick={closeDialog}
              type="button"
            >
              <Icon className="size-[17px]" name="close" />
            </button>

            <p className="mb-1.5 pr-10 text-[11px] font-extrabold uppercase tracking-[0.14em] text-kawai-orange">
              {intent}
            </p>
            <h2
              className="pr-10 font-display text-[clamp(1.35rem,3vw,1.7rem)] font-bold leading-[1.1] tracking-[-0.03em] text-kawai-ink"
              id="budget-modal-title"
            >
              Falar no WhatsApp
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-kawai-brown">
              Só o essencial para a equipe já iniciar a conversa.
            </p>

            <div className="mt-5">
              <BudgetForm
                compact
                intent={intent}
                onSubmitted={closeDialog}
                submitLabel="Continuar no WhatsApp"
              />
            </div>

            <p className="mt-4 text-center text-[11px] text-kawai-brown">
              <a
                className="font-bold text-kawai-orange underline underline-offset-4"
                href={`${CONTACT.whatsapp.href}&text=${directMessage}`}
                rel="noreferrer"
                target="_blank"
              >
                Abrir o WhatsApp sem preencher
              </a>
            </p>
          </div>
        </dialog>
      )}
    </BudgetModalContext.Provider>
  )
}
