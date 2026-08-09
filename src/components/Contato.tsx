import { CONTACT } from '../data/site'
import { card, container, section } from '../ui'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

export default function Contato() {
  return (
    <section className={`${section} bg-kawai-paper`} id="contato">
      <div className={container}>
        <SectionHeading eyebrow="Contato" title="Fale com a equipe e" highlight="venha nos visitar" />

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[.78fr_1.22fr]">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <article className={`${card} flex gap-3.5 p-4 shadow-none`}>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-kawai-cream text-kawai-orange [&>svg]:size-5"><Icon name="location" /></span>
              <div>
                <h3 className="font-display text-base font-bold">Endereço</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-kawai-brown">{CONTACT.address}</p>
                <a className="mt-2 inline-block text-xs font-extrabold text-kawai-orange underline underline-offset-4" href={CONTACT.mapsUrl} target="_blank" rel="noreferrer">Abrir no Google Maps</a>
              </div>
            </article>

            <article className={`${card} flex gap-3.5 p-4 shadow-none`}>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-kawai-cream text-kawai-orange [&>svg]:size-5"><Icon name="phone" /></span>
              <div>
                <h3 className="font-display text-base font-bold">WhatsApp</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-kawai-brown">Atendimento e orçamentos</p>
                <a className="mt-2 inline-block text-xs font-extrabold text-kawai-orange underline underline-offset-4" href={CONTACT.whatsapp.href} target="_blank" rel="noreferrer">
                  {CONTACT.whatsapp.display}
                </a>
              </div>
            </article>

            <article className={`${card} flex gap-3.5 p-4 shadow-none sm:col-span-2`}>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-kawai-cream text-kawai-orange [&>svg]:size-5"><Icon name="mail" /></span>
              <div>
                <h3 className="font-display text-base font-bold">E-mail</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-kawai-brown">Envie sua dúvida ou solicitação</p>
                <a className="mt-2 inline-block text-xs font-extrabold text-kawai-orange underline underline-offset-4" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </div>
            </article>

            <article className={`${card} flex gap-3.5 p-4 shadow-none sm:col-span-2`}>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-kawai-cream text-kawai-orange [&>svg]:size-5"><Icon name="calendar" /></span>
              <div>
                <h3 className="font-display text-base font-bold">Atendimento</h3>
                {CONTACT.hours.map((hour) => (
                  <p className="mt-1.5 text-xs leading-relaxed text-kawai-brown" key={hour.days}><strong className="text-kawai-ink">{hour.days}:</strong> {hour.time}</p>
                ))}
              </div>
            </article>
          </div>

          <div className="min-h-[420px] overflow-hidden rounded-[28px] shadow-[0_18px_42px_rgba(73,47,22,.12)]">
            <iframe
              className="size-full min-h-[420px] border-0"
              title="Como chegar ao Buffet Kawai"
              src={CONTACT.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}
