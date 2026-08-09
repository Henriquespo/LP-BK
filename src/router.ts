import { useSyncExternalStore } from 'react'

/**
 * Roteamento mínimo para as duas únicas páginas do site. Não vale trazer uma
 * biblioteca de rotas para isso — e o servidor Express já devolve o index.html
 * em qualquer caminho, então link direto e refresh funcionam.
 */

export const ROUTES = {
  home: '/',
  privacidade: '/politica-de-privacidade',
} as const

const listeners = new Set<() => void>()

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  window.addEventListener('popstate', listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('popstate', listener)
  }
}

/** Normaliza a barra final para `/rota/` e `/rota` caírem no mesmo lugar. */
function currentPath(): string {
  const path = window.location.pathname
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path
}

export function useRoute(): string {
  return useSyncExternalStore(subscribe, currentPath, () => ROUTES.home)
}

export function navigate(path: string): void {
  if (currentPath() === path) return
  window.history.pushState(null, '', path)
  // Instantâneo de propósito: o `scroll-behavior: smooth` da página é para as
  // âncoras; numa troca de página, ver tudo rolar até o topo é desconcertante.
  window.scrollTo({ top: 0, behavior: 'instant' })
  listeners.forEach((listener) => listener())
}

/**
 * Os links de seção são âncoras (`#cardapio`). Fora da home elas não existem,
 * então precisam apontar para a home com a âncora (`/#cardapio`).
 */
export function useAnchorPrefix(): string {
  return useRoute() === ROUTES.home ? '' : ROUTES.home
}
