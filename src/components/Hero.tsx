import heroAvif from '../assets/hero-photo.avif'
import heroJpg from '../assets/hero-photo.jpg'
import mascotPng from '../assets/mascote-kawai-original-transparent.png'
import { CONTACT, TRUST_ITEMS } from '../data/site'
import { container } from '../ui'
import Icon from './Icon'

const budgetMessage = encodeURIComponent(
  'Olá! Quero conhecer melhor o Buffet Kawai e receber um orçamento para uma festa. 🎉',
)

export default function Hero() {
  return (
    <section className="brand-hero" id="home">
      <div className="brand-hero-confetti brand-hero-confetti--left" aria-hidden="true">✦</div>
      <div className="brand-hero-confetti brand-hero-confetti--right" aria-hidden="true">✦</div>

      <div className={`${container} brand-hero-layout`}>
        <div className="brand-hero-copy">
          <h1>
            Mais que uma festa.
            <span>Uma lembrança feliz.</span>
          </h1>

          <p className="brand-hero-description">
            Diversão para as crianças, tranquilidade para os pais e sabores que conquistam todo
            mundo.
          </p>

          <div className="brand-hero-actions">
            <a
              className="brand-hero-primary"
              href={`${CONTACT.whatsapp.href}&text=${budgetMessage}`}
              target="_blank"
              rel="noreferrer"
            >
              Fazer orçamento
              <Icon name="arrow-right" />
            </a>
            <a className="brand-hero-secondary" href="#estrutura">
              <span><Icon name="arrow-right" /></span>
              Conheça o buffet
            </a>
          </div>
        </div>

        <div className="brand-hero-visual">
          <span className="brand-hero-shape brand-hero-shape--green" aria-hidden="true" />
          <span className="brand-hero-shape brand-hero-shape--yellow" aria-hidden="true" />
          <span className="brand-hero-shape brand-hero-shape--pink" aria-hidden="true" />

          <img
            className="brand-hero-mascot"
            src={mascotPng}
            width="198"
            height="230"
            alt="Mascote do Buffet Kawai"
          />

          <picture className="brand-hero-photo">
            <source srcSet={heroAvif} type="image/avif" />
            <img
              src={heroJpg}
              width="830"
              height="586"
              alt="Família celebrando um aniversário infantil no Buffet Kawai"
              fetchPriority="high"
            />
          </picture>

          <div className="brand-hero-sticker">
            <Icon name="confetti" />
            <span>Festa</span>
            <strong>completa</strong>
          </div>

          <div className="brand-hero-food-note">
            <Icon name="pizza" />
            <span>Rodízio de pizzas<br />e salgados</span>
          </div>
        </div>
      </div>

      <div className={`${container} brand-trust`} aria-label="Destaques do Buffet Kawai">
        {TRUST_ITEMS.map((item) => (
          <div key={item.label}>
            <span><Icon name={item.icon} /></span>
            <p>
              <strong>{item.value}</strong>
              <small>{item.label}</small>
            </p>
          </div>
        ))}
      </div>

      <div className="brand-hero-scallop" aria-hidden="true" />
    </section>
  )
}
