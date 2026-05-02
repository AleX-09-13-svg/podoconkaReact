import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { appPagePathByPage } from '../../config/appPageRoutes'
import frameSizeConfig from '../../config/frameSizeConfig'
import { useAppData } from '../../context/AppDataContext'
import {
  calculateStoneOrderCut,
  type CutCalculationResult,
  type GuillotinePackingItem,
} from '../../lib/guillotinePacking'
import OverlayLayout from '../ui/OverlayLayout'
import LandingActionButton from '../ui/LandingActionButton'
import CutLayoutPreview from './components/CutLayoutPreview'
import ManualCutDetailsModal from './components/ManualCutDetailsModal'
import OrderRequestForm from './components/OrderRequestForm'

function getStoneDisplayName(name: string) {
  const grandexIndex = name
    .toLowerCase()
    .indexOf('grandex')

  return grandexIndex >= 0
    ? name.slice(grandexIndex)
    : name
}

function getNumericValue(value: string) {
  return value.replace(/[^\d.,]/g, '')
}

function getNumberValue(value: string) {
  return Number(getNumericValue(value).replace(',', '.'))
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  }).format(price)
}

export default function Order() {
  const navigate = useNavigate()
  const [cutResult, setCutResult] =
    useState<CutCalculationResult | null>(null)
  const [calculationError, setCalculationError] =
    useState('')
  const [showCutLayout, setShowCutLayout] =
    useState(false)
  const [
    showManualCutDetails,
    setShowManualCutDetails,
  ] = useState(false)
  const [cutQuality, setCutQuality] = useState<
    'good' | 'bad'
  >('good')
  const {
    selectedStone,
    calculatorFormValues,
    orderItems,
    addOrderItem,
    resetCalculatorForNextItem,
  } = useAppData()
  const { length, width, thickness, count } =
    calculatorFormValues
  const hasSillDescription =
    Boolean(length && width && thickness && count)

  const stoneName = selectedStone
    ? getStoneDisplayName(selectedStone.name)
    : 'Камень не выбран'

  const sillDescription =
    length && width && thickness && count
      ? `${getNumericValue(length)}x${getNumericValue(width)}x${getNumericValue(thickness)}-${getNumericValue(count)}`
      : 'Параметры не заданы'

  const orderItemDescriptions = orderItems.map(
    (item) =>
      `${getNumericValue(item.length)}x${getNumericValue(item.width)}x${getNumericValue(item.thickness)}-${getNumericValue(item.count)}`,
  )

  const cutItems: GuillotinePackingItem[] = [
    ...(hasSillDescription
      ? [
          {
            labelPrefix: '1.',
            partLength: getNumberValue(length),
            partWidth: getNumberValue(width),
            count: getNumberValue(count),
            edgeBandWidth: getNumberValue(thickness),
          },
        ]
      : []),
    ...orderItems.map((item, index) => ({
      labelPrefix: `${index + (hasSillDescription ? 2 : 1)}.`,
      partLength: getNumberValue(item.length),
      partWidth: getNumberValue(item.width),
      count: getNumberValue(item.count),
      edgeBandWidth: getNumberValue(item.thickness),
    })),
  ]

  function calculateOrderCut() {
    if (!selectedStone) {
      setCutResult(null)
      setCalculationError('Выберите камень')
      return null
    }

    if (!cutItems.length) {
      setCutResult(null)
      setCalculationError('Параметры не заданы')
      return null
    }

    const result = calculateStoneOrderCut({
      items: cutItems,
      pricePerSheet: selectedStone.pricePerSheet,
      config: {
        sheetLength: 3660,
        sheetWidth: 750,
        edgeGap: 10,
        partGap: 5,
        includeEdgeBands: true,
        allowRotate: true,
        preferMinimalUsedLength: true,
        purchaseStepQuarters: 1,
        maxQuarters: 40,
      },
    })

    setCutResult(result)
    setCalculationError(
      result
        ? ''
        : 'Не удалось разместить детали',
    )

    return result
  }

  function handleCalculatePrice() {
    calculateOrderCut()
  }

  function handleShowCutLayout() {
    const result = cutResult ?? calculateOrderCut()

    if (result) {
      setShowCutLayout(true)
    }
  }

  function handleShowManualCutDetails() {
    if (!cutItems.length) {
      setCalculationError('Параметры не заданы')
      return
    }

    setShowManualCutDetails(true)
  }

  function handleAddOrderItem() {
    if (hasSillDescription) {
      addOrderItem(calculatorFormValues)
      resetCalculatorForNextItem()
    }

    navigate(appPagePathByPage.calculator)
  }

  return (
    <OverlayLayout frame={frameSizeConfig.orderPage}>
      <div className="col-[1/5] row-[1/7] flex h-full flex-col px-5 pb-8 pt-7">
        <section className="relative px-0 text-white">
          <div className="pr-20">
            <h2 className="text-[clamp(28px,8vw,44px)] font-black uppercase leading-none tracking-[0.03em]">
              Вы выбрали
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-4">
            <div className="space-y-2">
              <p className="text-[clamp(16px,5vw,24px)] font-black uppercase leading-none">
                Камень:
              </p>
              <p className="[font-family:system-ui] text-[clamp(13px,4vw,20px)] uppercase leading-tight text-[#e3932d]">
                {stoneName}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-[clamp(16px,5vw,24px)] font-black uppercase leading-none">
                Подоконник:
              </p>
              <p className="[font-family:system-ui] text-[clamp(13px,4vw,20px)] leading-tight text-[#e3932d]">
                {hasSillDescription
                  ? `1. ${sillDescription}`
                  : sillDescription}
              </p>

              {orderItemDescriptions.length > 0 && (
                <div className="space-y-1 pt-1 [font-family:system-ui] text-[clamp(13px,4vw,20px)] leading-tight text-[#e3932d]">
                  {orderItemDescriptions.map(
                    (description, index) => (
                      <p key={`${description}-${index}`}>
                        {index + (hasSillDescription ? 2 : 1)}. {description}
                      </p>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>

          <LandingActionButton
            className="mt-8 w-full bg-[#d6882e] px-2 py-2 shadow-none hover:bg-[#c77b28]"
            onClick={handleAddOrderItem}
            innerClassName="px-4 py-2 text-[clamp(16px,4.8vw,24px)] font-semibold tracking-normal"
            textForButton="добавить к заказу"
          />

          <LandingActionButton
            className="mt-4 w-full bg-[#d6882e] px-2 py-2 shadow-none hover:bg-[#c77b28]"
            innerClassName="px-4 py-2 text-[clamp(16px,4.8vw,24px)] font-semibold tracking-normal"
            textForButton="стоимость заказа"
            onClick={handleCalculatePrice}
          />

          <p className="mt-5 text-center text-[clamp(16px,5vw,24px)] font-black uppercase leading-none">
            {calculationError ||
              (cutResult
                ? `${formatPrice(cutResult.totalPrice)} руб.`
                : '0 руб.')}
          </p>

          <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-3 gap-y-5">
            <LandingActionButton
              className="w-full min-w-0 bg-[#d6882e] px-2 py-2 shadow-none hover:bg-[#c77b28]"
              innerClassName="px-2 py-2 text-[clamp(14px,4.5vw,20px)] font-semibold uppercase tracking-normal"
              textForButton="раскрой"
              onClick={handleShowCutLayout}
            />

            <span className="text-center [font-family:system-ui] text-[clamp(26px,7vw,40px)] font-black leading-none text-white">
              =
            </span>

            <LandingActionButton
              className="w-full min-w-0 bg-[#d6882e] px-2 py-2 shadow-none hover:bg-[#c77b28]"
              innerClassName="px-2 py-2 text-[clamp(13px,4vw,18px)] font-semibold uppercase tracking-normal"
              textForButton={
                cutQuality === 'good'
                  ? '👍 хорошо'
                  : '👎 плохо'
              }
              onClick={() =>
                setCutQuality((currentQuality) =>
                  currentQuality === 'good'
                    ? 'bad'
                    : 'good',
                )
              }
            />

            <LandingActionButton
              className="col-start-1 w-full min-w-0 bg-[#d6882e] px-2 py-2 shadow-none hover:bg-[#c77b28]"
              innerClassName="min-h-[56px] px-2 py-2 text-[clamp(10px,3vw,14px)] font-semibold uppercase leading-tight tracking-normal"
              textForButton="список деталей для ручного раскроя"
              onClick={handleShowManualCutDetails}
            />

            {cutQuality === 'bad' && (
              <p className="col-span-full px-2 text-center [font-family:system-ui] text-[clamp(18px,5vw,26px)] font-black leading-tight text-[#ffb2a9]">
                стоимость пересчитывается по итогу
                ручного раскроя
              </p>
            )}
          </div>
        </section>

        {showCutLayout && cutResult && (
          <CutLayoutPreview
            result={cutResult}
            onClose={() => setShowCutLayout(false)}
          />
        )}

        {showManualCutDetails && (
          <ManualCutDetailsModal
            items={cutItems}
            onClose={() =>
              setShowManualCutDetails(false)
            }
          />
        )}

        <section className="flex flex-1 flex-col pt-12">
          <h1 className="text-center text-[clamp(28px,8vw,44px)] font-black uppercase tracking-[0.04em] text-[#6b7d8d]">
            Оформить заказ
          </h1>

          <div className="mt-6 min-h-0 flex-1">
            <OrderRequestForm
              cutQuality={cutQuality}
            />
          </div>
        </section>
      </div>
    </OverlayLayout>
  )
}
