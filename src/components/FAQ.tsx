import { FAQS } from '../data/site'
import { container, section } from '../ui'
import SectionHeading from './SectionHeading'

export default function FAQ() {
  return (
    <section className={`${section} bg-kawai-paper`} id="duvidas">
      <div className={`${container} grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20`}>
        <div>
          <SectionHeading
            eyebrow="Dúvidas frequentes"
            title="Informação clara antes da"
            highlight="sua festa"
            align="left"
          />
          <p className="mt-6 max-w-[440px] text-sm leading-[1.7] text-kawai-brown">
            Reunimos apenas respostas confirmadas. Para capacidade, pagamento, decoração ou
            disponibilidade, fale diretamente com a equipe.
          </p>
        </div>

        <div className="grid content-start gap-3">
          {FAQS.map((item) => (
            <details className="group rounded-2xl border border-kawai-line bg-white shadow-[0_8px_20px_rgba(73,47,22,.04)]" key={item.question}>
              <summary className="flex min-h-[62px] cursor-pointer items-center justify-between gap-5 px-5 py-4 font-display text-[15px] font-bold text-kawai-ink sm:px-6">
                {item.question}
                <span className="shrink-0 text-xl leading-none text-kawai-orange transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="px-5 pb-5 text-[13px] leading-[1.7] text-kawai-brown sm:px-6">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
