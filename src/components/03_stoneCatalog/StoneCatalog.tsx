import frameSizeConfig from '../../config/frameSizeConfig'
import stonesData from '../../data/stones.json'
import OverlayLayout from '../ui/OverlayLayout'

type Stone = {
  id: string
  name: string
  pricePerSheet: number
  image: string
}

const stones = stonesData as Stone[]

function getDisplayName(name: string) {
  const grandexIndex = name
    .toLowerCase()
    .indexOf('grandex')

  return (
    grandexIndex >= 0
      ? name.slice(grandexIndex)
      : name
  ).toUpperCase()
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU').format(price)
}

export default function Catalog() {
  return (
    <OverlayLayout frame={frameSizeConfig.stoneCatalog}>
      <section className="col-[1/-1] row-[1/-1] flex min-h-0 flex-col px-[8%] pb-8 pt-[14%] text-white">
        <header className="mb-8 pr-[5.75rem] text-center">
          <h1 className="text-[clamp(28px,9vw,46px)] font-black leading-[0.88] tracking-normal">
            ВЫБЕРИТЕ
            <br />
            ЦВЕТ
          </h1>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
          {stones.map((stone) => (
            <article
              key={stone.id}
              className="grid min-h-[96px] grid-cols-[45%_1fr] overflow-hidden rounded-[2rem] border-2 border-[#d98328] bg-[#4f6370]"
            >
              <div className="relative overflow-hidden rounded-[1.85rem] bg-white">
                <img
                  src={stone.image}
                  alt={stone.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-col items-center justify-center px-3 py-3 text-center">
                <h2 className="max-w-full text-[clamp(13px,4.25vw,19px)] font-black leading-[0.9] tracking-normal">
                  {getDisplayName(stone.name)}
                </h2>
                <p className="mt-1 text-[clamp(10px,3.4vw,14px)] font-black leading-none tracking-normal">
                  {formatPrice(stone.pricePerSheet)} РУБ/ЛИСТ
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </OverlayLayout>
  )
}
