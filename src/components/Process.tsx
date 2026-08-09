import { PROCESS_STEPS } from '../data/site'
import { card, container, section } from '../ui'
import { useBudgetModal } from './budgetModal'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

const stepIconTones = ['bg-[#f2f9df] text-[#69a616]', 'bg-[#fff2d9] text-kawai-orange', 'bg-[#ffe9f1] text-[#e84a7b]']
const stepClass = `${card} relative min-h-[242px] p-7 text-center transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(73,47,22,.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0`

export default function Process() {
  const { open: openBudget } = useBudgetModal()

  return (
    <section className={`${section} bg-white`} id="como-funciona">
      <div className={container}>
        <SectionHeading eyebrow="Como funciona" title="Sua festa em" highlight="3 passos" />
        <p className="mx-auto mt-3 max-w-[620px] text-center text-[15px] text-kawai-brown">
          Simples, rápido e com a equipe por perto em cada decisão.
        </p>

        <div className="relative mt-12 grid gap-4 lg:grid-cols-3">
          {PROCESS_STEPS.map((step, index) => {
            const content = (
              <>
                <span className={`mx-auto grid size-16 place-items-center rounded-[20px] [&>svg]:size-8 ${stepIconTones[index]}`}>
                  <Icon name={step.icon} />
                </span>
                <span className="absolute right-6 top-6 grid size-7 place-items-center rounded-full bg-kawai-orange font-display text-xs font-bold text-white">
                  {step.number}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-kawai-ink">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-[300px] text-[13px] leading-relaxed text-kawai-brown">{step.detail}</p>
              </>
            )

            return index === 0 ? (
              <button
                className={`${stepClass} cursor-pointer`}
                type="button"
                onClick={() => openBudget('Começar a organizar a festa')}
                key={step.number}
              >
                {content}
              </button>
            ) : (
              <article className={stepClass} key={step.number}>{content}</article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
