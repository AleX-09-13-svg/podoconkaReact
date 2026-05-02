import {
  type FormEvent,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'

import { appPagePathByPage } from '../../config/appPageRoutes'
import frameSizeConfig from '../../config/frameSizeConfig'
import { useAppData } from '../../context/AppDataContext'
import stonesData from '../../data/stones.json'
import type { Stone } from '../../types/stone'
import OverlayLayout from '../ui/OverlayLayout'

const stones = stonesData as Stone[]
const customStoneId = 'custom-stone'

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
  return new Intl.NumberFormat('ru-RU').format(
    price,
  )
}

export default function Catalog() {
  const navigate = useNavigate()
  const { selectedStone, setSelectedStone } =
    useAppData()
  const [customStoneName, setCustomStoneName] =
    useState(
      selectedStone?.id === customStoneId
        ? selectedStone.name
        : '',
    )
  const [customStonePrice, setCustomStonePrice] =
    useState(
      selectedStone?.id === customStoneId
        ? String(selectedStone.pricePerSheet)
        : '',
    )

  function handleStoneClick(stone: Stone) {
    setSelectedStone(stone)
    navigate(appPagePathByPage.calculator)
  }

  function getCustomStonePrice() {
    return Number(
      customStonePrice
        .replace(/\s/g, '')
        .replace(',', '.'),
    )
  }

  function handleCustomStoneSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const name = customStoneName.trim()
    const pricePerSheet = getCustomStonePrice()

    if (
      !name ||
      !customStonePrice.trim() ||
      !Number.isFinite(pricePerSheet) ||
      pricePerSheet <= 0
    ) {
      return
    }

    handleStoneClick({
      id: customStoneId,
      name,
      pricePerSheet,
      image: '',
    })
  }

  return (
    <OverlayLayout
      frame={frameSizeConfig.stoneCatalog}
    >
      <section className="col-[1/-1] row-[1/-1] flex min-h-0 flex-col px-[8%] pt-[14%] pb-8 text-white">
        <header className="mb-8 pr-[5.75rem] text-center">
          <h1 className="text-[clamp(28px,9vw,46px)] leading-[0.88] font-black tracking-normal">
            ВЫБЕРИТЕ
            <br />
            ЦВЕТ
          </h1>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1 [font-family:system-ui] font-normal">
          <form
            onSubmit={handleCustomStoneSubmit}
            className="grid min-h-[112px] grid-cols-[45%_1fr] overflow-hidden rounded-[2rem] border-2 border-[#d98328] bg-[#4f6370] text-left"
          >
            <div className="flex items-center justify-center rounded-[1.85rem] bg-white px-3 text-center text-[clamp(14px,4.2vw,20px)] leading-none font-semibold text-[#4f6370]">
              СВОЙ
              <br />
              КАМЕНЬ
            </div>

            <div className="flex min-w-0 flex-col justify-center gap-2 px-3 py-3">
              <label className="sr-only" htmlFor="custom-stone-name">
                Название камня
              </label>
              <input
                id="custom-stone-name"
                type="text"
                value={customStoneName}
                onChange={(event) =>
                  setCustomStoneName(event.target.value)
                }
                placeholder="Название камня"
                className="h-9 w-full rounded-full bg-white px-3 text-[14px] leading-none text-[#526474] outline-none placeholder:text-[#526474]/55 focus:ring-2 focus:ring-[#d98328]"
              />

              <label className="sr-only" htmlFor="custom-stone-price">
                Стоимость
              </label>
              <input
                id="custom-stone-price"
                type="text"
                inputMode="decimal"
                value={customStonePrice}
                onChange={(event) =>
                  setCustomStonePrice(event.target.value)
                }
                placeholder="Стоимость"
                className="h-9 w-full rounded-full bg-white px-3 text-[14px] leading-none text-[#526474] outline-none placeholder:text-[#526474]/55 focus:ring-2 focus:ring-[#d98328]"
              />

              <button
                type="submit"
                className="h-8 rounded-full bg-[#d98328] px-3 text-[12px] leading-none font-semibold text-white transition-colors hover:bg-[#bf7627]"
              >
                ВЫБРАТЬ
              </button>
            </div>
          </form>

          {stones.map((stone) => (
            <button
              type="button"
              key={stone.id}
              onClick={() => handleStoneClick(stone)}
              className="grid min-h-[96px] grid-cols-[45%_1fr] overflow-hidden rounded-[2rem] border-2 border-[#d98328] bg-[#4f6370] text-left transition-transform active:scale-[0.985]"
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
                <h2 className="max-w-full text-[clamp(13px,4.25vw,19px)] leading-[0.9]  tracking-normal">
                  {getDisplayName(stone.name)}
                </h2>
                <p className="mt-1 text-[clamp(10px,3.4vw,14px)] leading-none  tracking-normal">
                  {formatPrice(
                    stone.pricePerSheet,
                  )}{' '}
                  РУБ/ЛИСТ
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </OverlayLayout>
  )
}
