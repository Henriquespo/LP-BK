import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ClipboardList,
  CookingPot,
  CupSoda,
  Gamepad2,
  Mail,
  MapPin,
  PartyPopper,
  Phone,
  Pizza,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type IconName =
  | 'arrow-right'
  | 'award'
  | 'calendar'
  | 'clipboard'
  | 'close'
  | 'confetti'
  | 'drink'
  | 'facebook'
  | 'instagram'
  | 'location'
  | 'mail'
  | 'phone'
  | 'pizza'
  | 'play'
  | 'serving'
  | 'whatsapp'
  | 'youtube'

interface IconProps {
  name: IconName | string
  className?: string
}

const ICONS: Record<string, LucideIcon> = {
  'arrow-right': ArrowRight,
  award: BadgeCheck,
  calendar: CalendarCheck,
  clipboard: ClipboardList,
  confetti: PartyPopper,
  drink: CupSoda,
  location: MapPin,
  mail: Mail,
  phone: Phone,
  pizza: Pizza,
  play: Gamepad2,
  serving: CookingPot,
  close: X,
}

function WhatsAppIcon({ className }: Pick<IconProps, 'className'>) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93a7.898 7.898 0 0 0-2.327-5.607ZM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.25a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592Zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.514.646-.63.775-.116.133-.232.148-.43.05-1.17-.578-1.935-1.033-2.707-2.345-.203-.35.203-.326.578-1.084.064-.133.034-.247-.015-.346-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.116-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.472.205.842.326 1.129.418.475.152.908.129 1.25.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232Z" />
    </svg>
  )
}

function BrandIcon({ name, className }: Pick<IconProps, 'name' | 'className'>) {
  if (name === 'facebook') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 12a10 10 0 1 0-11.563 9.874v-6.987H7.9V12h2.537V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562V12h2.773l-.443 2.887h-2.33v6.987A10.002 10.002 0 0 0 22 12Z" />
      </svg>
    )
  }

  if (name === 'instagram') {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect width="18" height="18" x="3" y="3" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </svg>
    )
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  )
}

export default function Icon({ name, className }: IconProps) {
  if (name === 'whatsapp') return <WhatsAppIcon className={className} />
  if (name === 'facebook' || name === 'instagram' || name === 'youtube') {
    return <BrandIcon name={name} className={className} />
  }

  const IconComponent = ICONS[name]
  if (!IconComponent) return null

  return (
    <IconComponent
      className={className}
      strokeWidth={1.9}
      absoluteStrokeWidth
      aria-hidden="true"
    />
  )
}
