import { container, section } from '../ui'

export default function About() {
  return (
    <section className={`${section} bg-kawai-paper pb-14 lg:pb-20`} id="buffet">
      <div className={`${container} grid items-center gap-8 md:grid-cols-[minmax(150px,.32fr)_minmax(0,1.68fr)] lg:gap-[86px]`}>
        <div className="flex items-baseline justify-center gap-3.5 border-b border-kawai-line pb-7 text-center md:block md:border-b-0 md:border-r md:pb-0 md:pr-10">
          <strong className="block font-display text-[clamp(72px,9vw,126px)] font-bold leading-[.8] tracking-[-0.08em] text-kawai-orange">18</strong>
          <span className="mt-3 block text-[11px] font-extrabold uppercase tracking-[0.12em] text-kawai-brown">anos celebrando</span>
        </div>
        <div>
          <p className="mb-2.5 text-xs font-extrabold uppercase tracking-[0.14em] text-kawai-orange">O Buffet Kawai</p>
          <h2 className="max-w-[820px] font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.04] tracking-[-0.04em] text-kawai-ink">
            Uma história feita de encontros, sabores e muita alegria.
          </h2>
          <div className="mt-6 grid max-w-[900px] gap-3.5 sm:grid-cols-2 sm:gap-7">
            <p className="text-sm leading-[1.65] text-kawai-brown">
              São mais de 3.000 festas realizadas com atenção à alimentação, ao atendimento e ao
              bem-estar dos convidados.
            </p>
            <p className="text-sm leading-[1.65] text-kawai-brown">
              Nosso objetivo é simples: receber cada família com carinho e criar uma celebração que
              continue viva na memória.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
