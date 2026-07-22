import { useState } from 'react'
import type { FormEvent } from 'react'
import { CONTACT, MENUS } from '../data/site'
import { buttonGreen, container } from '../ui'
import Icon from './Icon'

interface OrcamentoForm {
  nome: string
  email: string
  telefone: string
  data: string
  convidados: string
  rodizio: string
  mensagem: string
}

const INITIAL: OrcamentoForm = {
  nome: '',
  email: '',
  telefone: '',
  data: '',
  convidados: '',
  rodizio: '',
  mensagem: '',
}

const directMessage = encodeURIComponent(
  'Olá! Quero receber um orçamento personalizado para uma festa no Buffet Kawai. 🎉',
)

const fieldClass = 'grid gap-2 text-xs font-bold text-kawai-ink'
const controlClass =
  'min-h-12 w-full rounded-xl border border-kawai-line bg-kawai-cream px-4 py-3 text-sm font-normal text-kawai-ink placeholder:text-kawai-muted/70 focus:border-kawai-green focus:outline-none focus:ring-3 focus:ring-kawai-green/25'

function formatDateBR(iso: string): string {
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}

export default function Orcamento() {
  const [form, setForm] = useState<OrcamentoForm>(INITIAL)

  const update = (field: keyof OrcamentoForm) => (value: string) =>
    setForm((previous) => ({ ...previous, [field]: value }))

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const lines = [
      `*Nome:* ${form.nome}`,
      form.email && `*E-mail:* ${form.email}`,
      form.telefone && `*Telefone:* ${form.telefone}`,
      form.data && `*Data da festa:* ${formatDateBR(form.data)}`,
      form.convidados && `*Convidados:* ${form.convidados}`,
      form.rodizio && `*Rodízio:* ${form.rodizio}`,
      form.mensagem && `*Mensagem:* ${form.mensagem}`,
    ].filter(Boolean)
    const message = `🎉 *Pedido de orçamento — site Buffet Kawai*\n\n${lines.join('\n')}`
    window.open(`${CONTACT.whatsapp.href}&text=${encodeURIComponent(message)}`, '_blank', 'noopener')
  }

  return (
    <section className="scroll-mt-20 overflow-hidden bg-kawai-orange py-16 text-white lg:py-20" id="orcamento">
      <div className={container}>
        <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.14em] text-kawai-yellow">Vamos celebrar?</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-none tracking-[-0.04em]">
              Pronto para viver essa alegria?
            </h2>
            <span className="mt-3 block text-sm text-white/85">
              Fale agora com a equipe e receba um orçamento personalizado.
            </span>
          </div>
          <a
            className={`${buttonGreen} min-h-[58px] shrink-0 px-7 text-[15px] max-sm:w-full`}
            href={`${CONTACT.whatsapp.href}&text=${directMessage}`}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="whatsapp" />
            Fazer orçamento agora
          </a>
        </div>

        <div className="mt-8 border-t border-white/25 pt-1">
          <p className="py-5 font-display text-base font-bold text-white">
            Prefere enviar os detalhes da festa?
          </p>
          <form className="rounded-[24px] bg-white p-5 text-kawai-ink shadow-[0_20px_50px_rgba(91,40,0,.2)] sm:p-8" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
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

              <label className={fieldClass}>
                <span>Data da festa</span>
                <input
                  className={controlClass}
                  type="date"
                  value={form.data}
                  onChange={(event) => update('data')(event.target.value)}
                />
              </label>

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
                <select className={controlClass} value={form.rodizio} onChange={(event) => update('rodizio')(event.target.value)}>
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
            </div>

            <button type="submit" className={`${buttonGreen} mt-6 sm:ml-auto`}>
              <Icon name="whatsapp" />
              Enviar detalhes pelo WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
