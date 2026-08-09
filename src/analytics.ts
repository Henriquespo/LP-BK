/**
 * Integração com o Google Analytics 4, com consentimento no modelo da LGPD.
 *
 * Duas travas independentes:
 *  1. sem `VITE_GA_MEASUREMENT_ID`, nada existe — nem banner, nem eventos;
 *  2. com o ID, o gtag.js só é baixado depois de consentimento explícito.
 *
 * Enquanto não houver consentimento nenhum script de terceiro entra na página
 * e nenhum cookie é gravado, então `trackEvent` é um no-op silencioso.
 */

export type EventParams = Record<string, string | number | boolean>
export type ConsentChoice = 'granted' | 'denied'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()
const CONSENT_KEY = 'kawai:consentimento-analytics'

/** Sem ID de medição não há coleta nenhuma, então o banner nem aparece. */
export const analyticsEnabled = Boolean(MEASUREMENT_ID)

/** `null` = ainda não decidiu. */
export function readConsent(): ConsentChoice | null {
  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    return stored === 'granted' || stored === 'denied' ? stored : null
  } catch {
    // Navegação privada ou storage bloqueado: trata como indeciso.
    return null
  }
}

export function saveConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(CONSENT_KEY, choice)
  } catch {
    // Sem persistência o banner volta na próxima visita; a escolha vale a sessão.
  }

  if (choice === 'granted') loadGoogleAnalytics()
}

export function initAnalytics(): void {
  if (!MEASUREMENT_ID) return

  // Registrado desde já: se o consentimento vier no meio da sessão, os links
  // já estão instrumentados sem precisar recarregar a página.
  trackContactLinks()

  if (readConsent() === 'granted') loadGoogleAnalytics()
}

function loadGoogleAnalytics(): void {
  if (!MEASUREMENT_ID || window.dataLayer) return

  const dataLayer: unknown[] = []
  window.dataLayer = dataLayer
  window.gtag = (...args: unknown[]) => {
    dataLayer.push(args)
  }

  // Consent Mode v2. Só liberamos `analytics_storage` porque medição de
  // audiência é o único uso declarado no banner — nada de publicidade.
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  })
  window.gtag('consent', 'update', { analytics_storage: 'granted' })

  const preconnect = document.createElement('link')
  preconnect.rel = 'preconnect'
  preconnect.href = 'https://www.googletagmanager.com'
  document.head.appendChild(preconnect)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`
  document.head.appendChild(script)

  window.gtag('js', new Date())
  // `anonymize_ip` é padrão no GA4; explicitar deixa a intenção no código.
  window.gtag('config', MEASUREMENT_ID, { anonymize_ip: true })
}

/**
 * A LGPD dá direito de rever a decisão a qualquer momento, então o rodapé
 * precisa reabrir o banner. Um emissor mínimo evita ter que passar contexto
 * até um elemento que é único e global na página.
 */
const reviewListeners = new Set<() => void>()

export function requestConsentReview(): void {
  reviewListeners.forEach((listener) => listener())
}

export function onConsentReview(listener: () => void): () => void {
  reviewListeners.add(listener)
  return () => {
    reviewListeners.delete(listener)
  }
}

export function trackEvent(name: string, params: EventParams = {}): void {
  window.gtag?.('event', name, params)
}

/**
 * Os links de contato diretos (topo, seção Contato e rodapé) são âncoras
 * comuns espalhadas por vários componentes. Um listener delegado cobre todos
 * sem obrigar cada um a conhecer o analytics — os CTAs de conversão, esses
 * sim, disparam explicitamente no ponto onde a ação acontece.
 */
function trackContactLinks(): void {
  document.addEventListener(
    'click',
    (event) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const link = target.closest('a')
      if (!link) return

      const href = link.getAttribute('href') ?? ''
      if (href.includes('whatsapp')) trackEvent('whatsapp_direct_click', { link_url: href })
      else if (href.startsWith('mailto:')) trackEvent('email_click', { link_url: href })
      else if (href.includes('google.com/maps')) trackEvent('maps_click', { link_url: href })
    },
    { passive: true },
  )
}
