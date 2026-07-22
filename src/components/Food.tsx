import { useState } from 'react'
import foodAvif from '../assets/generated/alimentacao-ilustrativa.avif'
import foodJpg from '../assets/generated/alimentacao-ilustrativa.jpg'
import { CONTACT, FOOD_FEATURES, MENUS } from '../data/site'
import type { Menu } from '../data/site'
import { card, container, section } from '../ui'
import Icon from './Icon'
import MenuModal from './MenuModal'
import SectionHeading from './SectionHeading'

const promoMessage = encodeURIComponent(
  'Olá! Vi o site do Buffet Kawai e quero conhecer as promoções e opções de cardápio disponíveis. 🍕',
)

const featureTones = ['text-kawai-orange', 'text-[#77a916]', 'text-[#ed4f7f]']

export default function Food() {
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)

  return (
    <section className={`${section} bg-kawai-cream`} id="cardapio">
      <div className={`${container} grid items-center gap-12 lg:grid-cols-[minmax(430px,1.08fr)_minmax(0,.92fr)] lg:gap-[7vw]`}>
        <figure className="m-0 lg:ml-[-7vw]">
          <picture className="block overflow-hidden rounded-[30px_30px_44%_30px] lg:[border-radius:0_48%_38%_0/0_30%_42%_0] shadow-[18px_22px_46px_rgba(73,47,22,.12)]">
            <source srcSet={foodAvif} type="image/avif" />
            <img
              className="aspect-[1.18] w-full object-cover"
              src={foodJpg}
              width="1536"
              height="1024"
              loading="lazy"
              alt="Imagem ilustrativa de pizzas frescas sendo servidas em um buffet"
            />
          </picture>
          <figcaption className="mt-2.5 text-center text-[11px] text-kawai-muted">
            Imagem ilustrativa da experiência de alimentação.
          </figcaption>
        </figure>

        <div>
          <SectionHeading
            eyebrow="Alimentação"
            title="O sabor que"
            highlight="completa a festa"
            align="left"
          />
          <p className="mt-6 text-[clamp(16px,1.2vw,19px)] leading-[1.65] text-kawai-brown">
            O rodízio de pizzas é o carro-chefe da casa, acompanhado por salgadinhos, bebidas, bolo
            e doces. Também há opções de massas e pratos quentes.
          </p>

          <div className="mt-7 grid gap-4">
            {FOOD_FEATURES.map((item, index) => (
              <div className="flex items-start gap-3" key={item.title}>
                <span className={`shrink-0 [&>svg]:size-[30px] ${featureTones[index]}`}>
                  <Icon name={item.icon} />
                </span>
                <div>
                  <strong className="block font-display text-base text-kawai-ink">{item.title}</strong>
                  <span className="mt-0.5 block text-[13px] leading-normal text-kawai-brown">{item.detail}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={`${card} mt-7 flex items-center gap-3 px-[18px] py-4 shadow-none`}>
            <strong className="shrink-0 font-display text-[clamp(26px,2.5vw,38px)] leading-none text-kawai-orange">+65 mil</strong>
            <span className="text-[13px] leading-snug text-kawai-brown">pizzas servidas ao longo da nossa história</span>
          </div>
        </div>
      </div>

      <div className={`${container} mt-16 lg:mt-24`}>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.14em] text-kawai-orange">Escolha seu rodízio</p>
            <h3 className="max-w-[650px] font-display text-[clamp(27px,3vw,42px)] font-bold leading-[1.08] tracking-[-0.035em] text-kawai-ink">
              Três cardápios para celebrar do seu jeito
            </h3>
          </div>
          <a
            className="shrink-0 font-extrabold text-kawai-orange underline decoration-2 underline-offset-[5px]"
            href={`${CONTACT.whatsapp.href}&text=${promoMessage}`}
            target="_blank"
            rel="noreferrer"
          >
            Ver promoções
          </a>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          {MENUS.map((menu) => (
            <button
              aria-label={`Abrir cardápio ${menu.name}`}
              className={`${card} group relative min-h-[178px] w-full self-start overflow-hidden p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-kawai-orange/30 hover:shadow-[0_18px_38px_rgba(92,52,19,.12)] lg:min-h-[210px]`}
              key={menu.id}
              onClick={() => setSelectedMenu(menu)}
              type="button"
            >
              <span className="absolute -right-9 -top-9 grid size-28 place-items-end rounded-full bg-kawai-orange/[0.055] p-5 text-kawai-orange transition duration-300 group-hover:scale-110 group-hover:bg-kawai-orange/10">
                <Icon className="size-7" name="pizza" />
              </span>
              <span className="relative block min-h-[130px] lg:min-h-[162px]">
                <span className="block text-[11px] font-extrabold uppercase tracking-[0.06em] text-[#78a915]">{menu.highlight}</span>
                <strong className="mt-[18px] block font-display text-[27px] leading-[1.05] text-kawai-orange">{menu.name}</strong>
                <small className="mt-2 block text-[13px] text-kawai-brown">{menu.tagline}</small>
                <b className="absolute bottom-0 left-0 flex items-center gap-2 text-xs text-kawai-ink">
                  Ver cardápio
                  <Icon className="size-4 text-kawai-orange transition-transform group-hover:translate-x-1" name="arrow-right" />
                </b>
              </span>
            </button>
          ))}
        </div>
      </div>

      <MenuModal menu={selectedMenu} onClose={() => setSelectedMenu(null)} />
    </section>
  )
}
