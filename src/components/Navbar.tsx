import { useEffect, useRef, useState } from 'react'
import logoAvif from '../assets/logo.avif'
import logoPng from '../assets/logo-compact.png'
import { CONTACT, NAV_ITEMS } from '../data/site'
import { container } from '../ui'
import Icon from './Icon'

const HIDE_AFTER = 180
const DIRECTION_THRESHOLD = 10

function useNavbarScroll() {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const distance = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY

    const onScroll = () => {
      const currentY = Math.max(window.scrollY, 0)
      const delta = currentY - lastY.current

      if (currentY < 80) {
        setHidden(false)
        distance.current = 0
      } else if (delta !== 0) {
        const directionChanged = Math.sign(delta) !== Math.sign(distance.current)
        distance.current = directionChanged ? delta : distance.current + delta

        if (distance.current > DIRECTION_THRESHOLD && currentY > HIDE_AFTER) {
          setHidden(true)
          distance.current = 0
        } else if (distance.current < -DIRECTION_THRESHOLD) {
          setHidden(false)
          distance.current = 0
        }
      }

      lastY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return hidden
}

const budgetMessage = encodeURIComponent(
  'Olá! Vi o site do Buffet Kawai e gostaria de receber um orçamento para uma festa. 🎉',
)

export default function Navbar() {
  const hidden = useNavbarScroll()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header
      className={`brand-header ${hidden && !menuOpen ? '-translate-y-[110%]' : 'translate-y-0'}`}
    >
      <div className="brand-topbar">
        <div className={`${container} brand-topbar-inner`}>
          <p>
            <strong>Há 18 anos celebrando histórias felizes</strong>
            <span>Casa Verde · São Paulo</span>
          </p>
          <div>
            <a href={`mailto:${CONTACT.email}`}>
              <Icon name="mail" />
              <span>{CONTACT.email}</span>
            </a>
            <a href={CONTACT.whatsapp.href} target="_blank" rel="noreferrer">
              <Icon name="whatsapp" />
              {CONTACT.whatsapp.display}
            </a>
          </div>
        </div>
      </div>

      <nav className={`${container} brand-navbar`} aria-label="Navegação principal">
        <a href="#home" className="brand-nav-logo" aria-label="Buffet Kawai — início">
          <picture>
            <source srcSet={logoAvif} type="image/avif" />
            <img src={logoPng} width="150" height="82" alt="Buffet Kawai" />
          </picture>
        </a>

        <ul className="brand-nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <a
          className="brand-nav-cta"
          href={`${CONTACT.whatsapp.href}&text=${budgetMessage}`}
          target="_blank"
          rel="noreferrer"
        >
          Fazer orçamento
          <Icon name="arrow-right" />
        </a>

        <button
          className="brand-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={menuOpen ? 'translate-y-[7px] rotate-45' : ''} />
          <span className={menuOpen ? 'opacity-0' : ''} />
          <span className={menuOpen ? '-translate-y-[7px] -rotate-45' : ''} />
        </button>
      </nav>

      <div
        className={`brand-mobile-navigation ${menuOpen ? 'brand-mobile-navigation--open' : ''}`}
        id="mobile-navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
                <Icon name="arrow-right" />
              </a>
            </li>
          ))}
        </ul>
        <a
          className="brand-nav-cta"
          href={`${CONTACT.whatsapp.href}&text=${budgetMessage}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          Fazer orçamento
          <Icon name="arrow-right" />
        </a>
      </div>
    </header>
  )
}
