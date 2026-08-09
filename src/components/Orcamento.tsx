import { buttonGreen, container } from '../ui'
import BudgetForm from './BudgetForm'
import { useBudgetModal } from './budgetModal'
import Icon from './Icon'

export default function Orcamento() {
  const { open: openBudget } = useBudgetModal()

  return (
    <section className="scroll-mt-20 overflow-hidden bg-kawai-orange py-16 text-white lg:py-20" id="orcamento">
      <div className={container}>
        <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.14em] text-kawai-yellow">Vamos celebrar?</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-none tracking-[-0.04em]">
              Pronto para viver essa alegria?
            </h2>
            <span className="mt-3 block text-sm text-white/85">
              Fale agora com a equipe e receba um orçamento personalizado.
            </span>
          </div>
          <button
            className={`${buttonGreen} min-h-[58px] shrink-0 cursor-pointer px-7 text-[15px] max-sm:w-full`}
            type="button"
            onClick={() => openBudget('Orçamento')}
          >
            <Icon name="whatsapp" />
            Fazer orçamento agora
          </button>
        </div>

        <div className="mt-8 border-t border-white/25 pt-1">
          <p className="py-5 font-display text-base font-bold text-white">
            Prefere enviar os detalhes da festa?
          </p>
          <div className="rounded-[24px] bg-white p-5 text-kawai-ink shadow-[0_20px_50px_rgba(91,40,0,.2)] sm:p-8">
            <BudgetForm intent="Orçamento" />
          </div>
        </div>
      </div>
    </section>
  )
}
