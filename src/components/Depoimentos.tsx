import { TESTIMONIALS } from '../data/site'
import { card, container, section } from '../ui'
import SectionHeading from './SectionHeading'

export default function Depoimentos() {
  return (
    <section className={`${section} bg-kawai-cream`} id="depoimentos">
      <div className={container}>
        <SectionHeading
          eyebrow="Depoimentos reais"
          title="O que dizem nossas"
          highlight="famílias"
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {TESTIMONIALS.slice(0, 3).map((testimonial) => (
            <figure className={`${card} m-0 flex min-h-[286px] flex-col p-7`} key={testimonial.author}>
              <span className="font-display text-4xl font-bold leading-none text-kawai-orange" aria-hidden="true">“</span>
              <blockquote className="mt-3 grow text-sm leading-[1.75] text-kawai-brown">{testimonial.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <b className="grid size-11 place-items-center rounded-full bg-kawai-orange font-display text-sm text-white">
                  {testimonial.author.charAt(0)}
                </b>
                <span>
                  <strong className="block text-[13px] text-kawai-ink">{testimonial.author}</strong>
                  <small className="mt-0.5 block text-[11px] text-kawai-muted">Cliente do Buffet Kawai</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
