import { useEffect, useRef } from 'react'
import type { Menu } from '../data/site'
import { useBudgetModal } from './budgetModal'
import Icon from './Icon'

interface MenuModalProps {
  menu: Menu | null
  onClose: () => void
}

export default function MenuModal({ menu, onClose }: MenuModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { open: openBudget } = useBudgetModal()

  useEffect(() => {
    const dialog = dialogRef.current

    if (menu && dialog && !dialog.open) {
      dialog.showModal()
    }
  }, [menu])

  if (!menu) return null

  const halfway = Math.ceil(menu.items.length / 2)
  const pages = [menu.items.slice(0, halfway), menu.items.slice(halfway)]

  const closeDialog = () => dialogRef.current?.close()

  const requestMenu = () => {
    closeDialog()
    openBudget(`Cardápio ${menu.name}`)
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`menu-title-${menu.id}`}
      className="restaurant-menu-dialog fixed inset-0 z-[120] m-0 h-dvh max-h-none w-screen max-w-none items-center justify-center overflow-y-auto bg-transparent p-3 backdrop:bg-[#211712]/82 backdrop:backdrop-blur-[3px] open:flex sm:p-8"
      onCancel={(event) => {
        event.preventDefault()
        closeDialog()
      }}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeDialog()
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          closeDialog()
        }
      }}
    >
      <div className="restaurant-menu-shell relative w-full max-w-[1040px]">
        <button
          autoFocus
          aria-label="Fechar cardápio"
          className="restaurant-menu-close"
          onClick={closeDialog}
          type="button"
        >
          <Icon className="size-[18px]" name="close" />
        </button>

        <article className="restaurant-menu-book">
          <section className="restaurant-menu-page restaurant-menu-page--left">
            <div className="restaurant-menu-grain" aria-hidden="true" />
            <div className="restaurant-menu-blobs" aria-hidden="true">
              <span className="restaurant-menu-blob restaurant-menu-blob--yellow" />
              <span className="restaurant-menu-blob restaurant-menu-blob--blue" />
              <span className="restaurant-menu-dot restaurant-menu-dot--pink" />
            </div>

            <header className="restaurant-menu-brand">
              <span>Buffet Kawai</span>
              <small>Casa Verde · São Paulo</small>
            </header>

            <div className="restaurant-menu-intro">
              <p>Cardápio da casa</p>
              <h3 id={`menu-title-${menu.id}`}>{menu.name}</h3>
              <span>{menu.tagline}</span>
            </div>

            <div className="restaurant-menu-rule" aria-hidden="true">
              <span>✦</span>
            </div>

            <p className="restaurant-menu-kicker">{menu.highlight}</p>
            <MenuPage items={pages[0]} startIndex={0} />

            <footer className="restaurant-menu-folio">
              <span>Cardápio Buffet Kawai</span>
              <b>01</b>
            </footer>
          </section>

          <section className="restaurant-menu-page restaurant-menu-page--right">
            <div className="restaurant-menu-grain" aria-hidden="true" />
            <div className="restaurant-menu-blobs" aria-hidden="true">
              <span className="restaurant-menu-blob restaurant-menu-blob--green" />
              <span className="restaurant-menu-blob restaurant-menu-blob--pink" />
              <span className="restaurant-menu-dot restaurant-menu-dot--orange" />
            </div>

            <header className="restaurant-menu-edition">
              <span>Servido com carinho</span>
              <small>Desde 2008</small>
            </header>

            <p className="restaurant-menu-kicker restaurant-menu-kicker--right">Também incluído</p>
            <MenuPage items={pages[1]} startIndex={halfway} />

            <div className="restaurant-menu-note">
              <p>
                Consulte disponibilidade, condições e personalizações diretamente com nossa equipe.
              </p>
              <button className="cursor-pointer" type="button" onClick={requestMenu}>
                <Icon className="size-4" name="whatsapp" />
                Quero este cardápio
              </button>
            </div>

            <footer className="restaurant-menu-folio">
              <span>Rua Relíquia, 565</span>
              <b>02</b>
            </footer>
          </section>
        </article>
      </div>
    </dialog>
  )
}

function MenuPage({ items, startIndex }: { items: Menu['items']; startIndex: number }) {
  return (
    <ol className="restaurant-menu-list">
      {items.map((item, index) => (
        <li key={item.group}>
          <span className="restaurant-menu-number">{String(startIndex + index + 1).padStart(2, '0')}</span>
          <div>
            <strong>{item.group}</strong>
            <span>{item.detail}</span>
          </div>
        </li>
      ))}
    </ol>
  )
}
