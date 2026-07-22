import logoAvif from '../assets/logo.avif'
import logoPng from '../assets/logo-compact.png'
import { CONTACT, NAV_ITEMS } from '../data/site'
import { container } from '../ui'
import Icon from './Icon'

const partnerMessage = encodeURIComponent(
  'Olá! Gostaria de conversar sobre uma parceria com o Buffet Kawai.',
)

export default function Footer() {
  return (
    <footer className="bg-[#242424] text-white/70">
      <div className={`${container} grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_1.15fr_1fr] lg:gap-14`}>
        <div>
          <picture className="block h-[100px] w-[170px]">
            <source srcSet={logoAvif} type="image/avif" />
            <img className="size-full object-contain" src={logoPng} width="170" height="100" alt="Buffet Kawai" loading="lazy" />
          </picture>
          <p className="mt-4 max-w-[260px] text-[13px] leading-relaxed">Há 18 anos criando festas com sabor, diversão e cuidado.</p>
          <div className="mt-5 flex items-center gap-3">
            <a className="grid size-8 place-items-center rounded-full transition hover:bg-white/10" href={CONTACT.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <Icon className="size-5 text-kawai-orange" name="facebook" />
            </a>
            <a className="grid size-8 place-items-center rounded-full transition hover:bg-white/10" href={CONTACT.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Icon className="size-5 text-kawai-orange" name="instagram" />
            </a>
            <a className="grid size-8 place-items-center rounded-full transition hover:bg-white/10" href={CONTACT.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
              <Icon className="size-5 text-kawai-orange" name="youtube" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-base font-bold text-white">Navegação</h3>
          <ul className="mt-5 grid list-none gap-3 p-0 text-xs">
            <li><a href="#home">Home</a></li>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}><a href={item.href}>{item.label}</a></li>
            ))}
            <li><a href="#duvidas">Dúvidas frequentes</a></li>
          </ul>
        </div>

        <div className="grid content-start gap-3 text-xs leading-relaxed">
          <h3 className="mb-2 font-display text-base font-bold text-white">Informações</h3>
          <a className="transition hover:text-kawai-yellow" href={CONTACT.whatsapp.href} target="_blank" rel="noreferrer">
            {CONTACT.whatsapp.display}
          </a>
          <a className="break-all transition hover:text-kawai-yellow" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <a className="transition hover:text-kawai-yellow" href={CONTACT.mapsUrl} target="_blank" rel="noreferrer">{CONTACT.address}</a>
          <a
            className="font-bold text-kawai-yellow transition hover:text-white"
            href={`${CONTACT.whatsapp.href}&text=${partnerMessage}`}
            target="_blank"
            rel="noreferrer"
          >
            Seja parceiro
          </a>
        </div>

        <div className="text-xs leading-relaxed">
          <h3 className="mb-5 font-display text-base font-bold text-white">Atendimento</h3>
          {CONTACT.hours.map((hour) => (
            <p className="mb-4" key={hour.days}><strong className="text-white">{hour.days}</strong><br />{hour.time}</p>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center">
        <p className="text-[11px]">© {new Date().getFullYear()} Buffet Kawai. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
