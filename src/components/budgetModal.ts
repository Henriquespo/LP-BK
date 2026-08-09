import { createContext, useContext } from 'react'

export interface BudgetModalValue {
  /** Abre o formulário de orçamento; `intent` descreve de onde o pedido partiu. */
  open: (intent?: string) => void
}

export const BudgetModalContext = createContext<BudgetModalValue | null>(null)

export function useBudgetModal(): BudgetModalValue {
  const value = useContext(BudgetModalContext)
  if (!value) throw new Error('useBudgetModal precisa de um BudgetModalProvider acima na árvore.')
  return value
}
