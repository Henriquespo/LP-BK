import arcadePhoto from '../assets/photos/fliperamas.jpeg'
import hallPhoto from '../assets/photos/ambiente-montado.jpeg'
import pizzeriaPhoto from '../assets/photos/pizzaria.jpeg'
import themedPhoto from '../assets/photos/decoracao-tematica.jpeg'
import { container, section } from '../ui'
import SectionHeading from './SectionHeading'

const GALLERY_IMAGES = [
  {
    src: hallPhoto,
    alt: 'Salão do Buffet Kawai montado com mesas, cadeiras e balões',
    position: 'center center',
  },
  {
    src: themedPhoto,
    alt: 'Decoração temática de aniversário montada no Buffet Kawai',
    position: 'center center',
  },
  {
    src: arcadePhoto,
    alt: 'Fliperamas disponíveis na área de jogos do Buffet Kawai',
    position: '42% center',
  },
  {
    src: pizzeriaPhoto,
    alt: 'Área de pizzaria e serviço de alimentação do Buffet Kawai',
    position: '67% center',
  },
] as const

const galleryLayouts = [
  'md:col-span-7 md:row-span-2 md:[border-radius:42%_24px_24px_24px/24%_24px_24px_24px]',
  'md:col-span-5 md:row-span-1',
  'md:col-span-3 md:row-span-1',
  'md:col-span-2 md:row-span-1',
]

export default function Gallery() {
  return (
    <section className={`${section} bg-kawai-cream`} id="ambientes">
      <div className={container}>
        <SectionHeading
          eyebrow="Ambientes e experiências"
          title="Um espaço para"
          highlight="celebrar junto"
        />
        <p className="mx-auto mt-4 max-w-[720px] text-center text-[15px] leading-relaxed text-kawai-brown">
          Alimentação, diversão e momentos em família reunidos em uma experiência completa.
        </p>

        <div className="mt-10 grid gap-3 md:grid-cols-12 md:grid-rows-[260px_260px]">
          {GALLERY_IMAGES.map((image, index) => (
            <figure
              className={`group m-0 min-h-[250px] overflow-hidden rounded-3xl shadow-[0_16px_36px_rgba(73,47,22,.12)] ${galleryLayouts[index]}`}
              key={image.alt}
            >
              <picture className="block size-full">
                <img
                  className="size-full object-cover transition duration-500 group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  src={image.src}
                  width="1600"
                  height="1200"
                  loading="lazy"
                  alt={image.alt}
                  style={{ objectPosition: image.position }}
                />
              </picture>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-center text-[11px] text-kawai-muted">
          Ambientes reais do Buffet Kawai. A decoração e a disposição do salão podem variar conforme cada festa.
        </p>
      </div>
    </section>
  )
}
