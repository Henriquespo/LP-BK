import playAreaPhoto from '../assets/photos/brinquedao.jpeg'
import { FUN_POINTS } from '../data/site'
import { buttonOrange, container, section } from '../ui'
import { useBudgetModal } from './budgetModal'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

export default function Fun() {
  const { open: openBudget } = useBudgetModal()

  return (
    <section className={`${section} bg-kawai-paper`} id="atracoes">
      <div className={container}>
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_.8fr] lg:gap-20">
          <SectionHeading
            eyebrow="Diversão"
            title="Alegria para"
            highlight="diferentes idades"
            align="left"
          />
          <p className="max-w-[520px] text-[clamp(15px,1.15vw,18px)] leading-[1.7] text-kawai-brown lg:pb-1">
            A diversão faz parte da experiência do Buffet Kawai. Como as atrações disponíveis
            podem variar, a equipe confirma as opções adequadas para cada data.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.12fr_.88fr] lg:gap-16">
          <figure className="m-0">
            <picture className="block overflow-hidden [border-radius:24px_42%_24px_24px/24px_28%_24px_24px] shadow-[16px_22px_42px_rgba(73,47,22,.12)]">
              <img
                className="aspect-[1.18] size-full object-cover"
                src={playAreaPhoto}
                width="1600"
                height="1200"
                loading="lazy"
                alt="Brinquedão com escorregadores coloridos na área de diversão do Buffet Kawai"
              />
            </picture>
            <figcaption className="mt-3 text-center text-[11px] text-kawai-muted">
              Brinquedão e escorregadores da área de diversão do buffet.
            </figcaption>
          </figure>

          <div className="grid gap-0">
            {FUN_POINTS.map((point, index) => (
              <article className="grid grid-cols-[42px_1fr] gap-x-3 border-b border-kawai-line py-6 first:pt-0" key={point.title}>
                <span className="pt-1 font-display text-sm font-bold text-kawai-orange">0{index + 1}</span>
                <div>
                  <h3 className="font-display text-xl font-bold text-kawai-ink">{point.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-kawai-brown">{point.detail}</p>
                </div>
              </article>
            ))}
            <button
              className={`${buttonOrange} mt-7 cursor-pointer justify-self-start`}
              type="button"
              onClick={() => openBudget('Brinquedos e atrações')}
            >
              <Icon name="whatsapp" />
              Consultar atrações
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
