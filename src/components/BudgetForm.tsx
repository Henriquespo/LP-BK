import { useState } from 'react'
import type { FormEvent } from 'react'
import { trackEvent } from '../analytics'
import { CONTACT, MENUS } from '../data/site'
import { buttonGreen } from '../ui'
import Icon from './Icon'

interface BudgetFormFields {
  nome: string
  email: string
  telefone: string
  data: string
  convidados: string
  rodizio: string
  mensagem: string
}

interface BudgetFormProps {
  /** De onde partiu o pedido (CTA da hero, cardápio específico, atrações…). */
  intent?: string
  /** Versão curta usada no modal dos CTAs: só nome e data da festa. */
  compact?: boolean
  /** Chamado depois que a conversa do WhatsApp é aberta. */
  onSubmitted?: () => void
  submitLabel?: string
}

const INITIAL: BudgetFormFields = {
  nome: '',
  email: '',
  telefone: '',
  data: '',
  convidados: '',
  rodizio: '',
  mensagem: '',
}

const fieldClass = 'grid gap-2 text-xs font-bold text-kawai-ink'
const controlClass =
  'min-h-12 w-full rounded-xl border border-kawai-line bg-kawai-cream px-4 py-3 text-sm font-normal text-kawai-ink placeholder:text-kawai-muted/70 focus:border-kawai-green focus:outline-none focus:ring-3 focus:ring-kawai-green/25'

function formatDateBR(iso: string): string {
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}

export default function BudgetForm({
  intent,
  compact = false,
  onSubmitted,
  submitLabel = 'Enviar detalhes pelo WhatsApp',
}: BudgetFormProps) {
  const [form, setForm] = useState<BudgetFormFields>(INITIAL)

  const update = (field: keyof BudgetFormFields) => (value: string) =>
    setForm((previous) => ({ ...previous, [field]: value }))

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const lines = [
      intent && `*Interesse:* ${intent}`,
      `*Nome:* ${form.nome}`,
      form.email && `*E-mail:* ${form.email}`,
      form.telefone && `*Telefone:* ${form.telefone}`,
      form.data && `*Data da festa:* ${formatDateBR(form.data)}`,
      form.convidados && `*Convidados:* ${form.convidados}`,
      form.rodizio && `*Rodízio:* ${form.rodizio}`,
      form.mensagem && `*Mensagem:* ${form.mensagem}`,
    ].filter(Boolean)
    const message = `🎉 *Pedido de orçamento — site Buffet Kawai*\n\n${lines.join('\n')}`

    // `generate_lead` é evento recomendado do GA4, então entra direto nos
    // relatórios de conversão sem configuração extra.
    trackEvent('generate_lead', {
      cta_intent: intent ?? 'Orçamento',
      form_variant: compact ? 'modal' : 'secao',
      tem_data: Boolean(form.data),
      tem_convidados: Boolean(form.convidados),
      rodizio: form.rodizio || 'nao informado',
    })

    window.open(`${CONTACT.whatsapp.href}&text=${encodeURIComponent(message)}`, '_blank', 'noopener')
    onSubmitted?.()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={`grid gap-5 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <label className={fieldClass}>
          <span>Nome *</span>
          <input
            className={controlClass}
            type="text"
            required
            autoComplete="name"
            value={form.nome}
            onChange={(event) => update('nome')(event.target.value)}
            placeholder="Seu nome completo"
          />
        </label>

        {!compact && (
          <label className={fieldClass}>
            <span>E-mail</span>
            <input
              className={controlClass}
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => update('email')(event.target.value)}
              placeholder="voce@email.com"
            />
          </label>
        )}

        {!compact && (
          <label className={fieldClass}>
            <span>Telefone / WhatsApp *</span>
            <input
              className={controlClass}
              type="tel"
              required
              autoComplete="tel"
              value={form.telefone}
              onChange={(event) => update('telefone')(event.target.value)}
              placeholder="(11) 90000-0000"
            />
          </label>
        )}

        <label className={fieldClass}>
          <span>Data da festa</span>
          <input
            className={controlClass}
            type="date"
            value={form.data}
            onChange={(event) => update('data')(event.target.value)}
          />
        </label>

        {!compact && (
          <>
            <label className={fieldClass}>
              <span>Número de convidados</span>
              <input
                className={controlClass}
                type="number"
                min={1}
                value={form.convidados}
                onChange={(event) => update('convidados')(event.target.value)}
                placeholder="Ex.: 80"
              />
            </label>

            <label className={fieldClass}>
              <span>Tipo de rodízio</span>
              <select
                className={controlClass}
                value={form.rodizio}
                onChange={(event) => update('rodizio')(event.target.value)}
              >
                <option value="">Escolher depois</option>
                {MENUS.map((menu) => (
                  <option key={menu.id} value={`${menu.name} (${menu.tagline})`}>
                    {menu.name} — {menu.tagline}
                  </option>
                ))}
              </select>
            </label>

            <label className={`${fieldClass} sm:col-span-2`}>
              <span>Mensagem</span>
              <textarea
                className={`${controlClass} min-h-[120px] resize-y`}
                rows={4}
                maxLength={300}
                value={form.mensagem}
                onChange={(event) => update('mensagem')(event.target.value)}
                placeholder="Conte um pouco sobre a festa: tema, horário e dúvidas"
              />
            </label>
          </>
        )}
      </div>

      <div className="mt-6 flex">
        <button
          type="submit"
          className={`${buttonGreen} w-full cursor-pointer ${compact ? '' : 'sm:ml-auto sm:w-auto'}`}
        >
          <Icon name="whatsapp" />
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
