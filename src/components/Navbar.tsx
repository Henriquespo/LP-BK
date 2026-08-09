import { useEffect, useState } from 'react'
import logoAvif from '../assets/logo.avif'
import logoPng from '../assets/logo-compact.png'
import { CONTACT, NAV_ITEMS } from '../data/site'
import { useAnchorPrefix } from '../router'
import { container } from '../ui'
import { useBudgetModal } from './budgetModal'
import Icon from './Icon'

/** Perto do topo a barra fica sempre visível. */
const ALWAYS_VISIBLE_UNTIL = 80
/** Só começa a se esconder depois que a hero saiu de vista. */
const HIDE_AFTER = 180
/** Descer exige intenção clara; subir revela quase na hora. */
const HIDE_INTENT = 64
const SHOW_INTENT = 12

function useNavbarScroll() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let intent = 0
    let frame = 0

    const evaluate = () => {
      frame = 0

      // Limitar ao scroll real descarta o repique de overscroll do iOS/macOS,
      // que senão gera deltas fantasmas e faz a barra piscar.
      const maxY = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0)
      const currentY = Math.min(Math.max(window.scrollY, 0), maxY)
      const delta = currentY - lastY
      lastY = currentY

      if (currentY <= ALWAYS_VISIBLE_UNTIL) {
        intent = 0
        setHidden(false)
        return
      }

      // Ao trocar de direção o acumulado zera, para a intenção não herdar
      // o movimento anterior e disparar antes da hora.
      if (delta > 0 !== intent > 0) intent = 0
      intent += delta

      if (intent > HIDE_INTENT && currentY > HIDE_AFTER) {
        intent = 0
        setHidden(true)
      } else if (intent < -SHOW_INTENT) {
        intent = 0
        setHidden(false)
      }
    }

    // Um cálculo por quadro: o scroll dispara muito mais que isso.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(evaluate)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return hidden
}

export default function Navbar() {
  const hidden = useNavbarScroll()
  const [menuOpen, setMenuOpen] = useState(false)
  const { open: openBudget } = useBudgetModal()
  const anchor = useAnchorPrefix()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header className={`brand-header ${hidden && !menuOpen ? 'brand-header--hidden' : ''}`}>
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
        <a href={`${anchor}#home`} className="brand-nav-logo" aria-label="Buffet Kawai — início">
          <picture>
            <source srcSet={logoAvif} type="image/avif" />
            <img src={logoPng} width="150" height="82" alt="Buffet Kawai" />
          </picture>
        </a>

        <ul className="brand-nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={`${anchor}${item.href}`}>{item.label}</a>
            </li>
          ))}
        </ul>

        <button className="brand-nav-cta cursor-pointer" type="button" onClick={() => openBudget('Orçamento')}>
          Fazer orçamento
          <Icon name="arrow-right" />
        </button>

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
              <a href={`${anchor}${item.href}`} onClick={() => setMenuOpen(false)}>
                {item.label}
                <Icon name="arrow-right" />
              </a>
            </li>
          ))}
        </ul>
        <button
          className="brand-nav-cta cursor-pointer"
          type="button"
          onClick={() => {
            setMenuOpen(false)
            openBudget('Orçamento')
          }}
        >
          Fazer orçamento
          <Icon name="arrow-right" />
        </button>
      </div>
    </header>
  )
}
