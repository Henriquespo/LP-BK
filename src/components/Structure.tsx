import structurePhoto from '../assets/photos/salao-principal.jpeg'
import { STRUCTURE_HIGHLIGHTS } from '../data/site'
import { card, container, section } from '../ui'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

const highlightTones = ['text-kawai-orange', 'text-[#2b72dd]', 'text-[#70a807]']

export default function Structure() {
  return (
    <section className={`${section} bg-kawai-paper`} id="estrutura">
      <div className={`${container} grid items-center gap-12 lg:grid-cols-[minmax(0,.92fr)_minmax(440px,1.08fr)] lg:gap-20`}>
        <div>
          <SectionHeading
            eyebrow="Nossa estrutura"
            title="Tudo pensado para"
            highlight="momentos inesquecíveis"
            align="left"
          />
          <p className="mt-6 max-w-[620px] text-[clamp(16px,1.25vw,19px)] leading-[1.7] text-kawai-brown">
            Há 18 anos, o Buffet Kawai reúne alimentação, atendimento e diversão para que cada
            família aproveite a celebração com tranquilidade.
          </p>

          <div className="mt-8 grid gap-3">
            {STRUCTURE_HIGHLIGHTS.map((item, index) => (
              <div className={`${card} flex min-h-[78px] items-center gap-4 px-4 py-3.5 shadow-none`} key={item.title}>
                <span className={`grid size-11 shrink-0 place-items-center rounded-xl bg-kawai-cream [&>svg]:size-6 ${highlightTones[index]}`}>
                  <Icon name={item.icon} />
                </span>
                <div>
                  <strong className="block font-display text-base text-kawai-ink">{item.title}</strong>
                  <small className="mt-0.5 block text-xs leading-relaxed text-kawai-brown">{item.detail}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <figure className="m-0">
          <picture className="block overflow-hidden [border-radius:42%_18%_38%_16%/24%_18%_34%_16%] shadow-[18px_24px_50px_rgba(73,47,22,.14)]">
            <img
              className="aspect-[1.12] size-full object-cover transition duration-500 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100"
              src={structurePhoto}
              width="1600"
              height="1200"
              loading="lazy"
              alt="Salão principal do Buffet Kawai preparado com mesas e decoração de festa"
            />
          </picture>
          <figcaption className="mt-3 text-center text-[11px] text-kawai-muted">
            Salão principal do Buffet Kawai preparado para uma celebração.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
