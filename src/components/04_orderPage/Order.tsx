import { useState } from 'react'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import drawImage from '../../assets/draw.png'
import { appPagePathByPage } from '../../config/appPageRoutes'
import frameSizeConfig from '../../config/frameSizeConfig'
import stoneCutConfig from '../../config/stoneCutConfig'
import { useAppData } from '../../context/AppDataContext'
import {
  calculateStoneOrderCut,
  type CutCalculationResult,
} from '../../lib/guillotinePacking'
import { buildOrderDetails } from '../../lib/orderDetails'
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
  const [showDrawing, setShowDrawing] =
    useState(false)
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
  const {
    hasCurrentSill,
    currentSillDescription,
    orderItemDescriptions,
    cutItems,
  } = buildOrderDetails({
    calculatorFormValues,
    orderItems,
  })

  const stoneName = selectedStone
    ? getStoneDisplayName(selectedStone.name)
    : 'Камень не выбран'

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
      config: stoneCutConfig,
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
    if (hasCurrentSill) {
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
                {hasCurrentSill
                  ? `1. ${currentSillDescription}`
                  : currentSillDescription}
              </p>

              {orderItemDescriptions.length > 0 && (
                <div className="space-y-1 pt-1 [font-family:system-ui] text-[clamp(13px,4vw,20px)] leading-tight text-[#e3932d]">
                  {orderItemDescriptions.map(
                    (description, index) => (
                      <p key={`${description}-${index}`}>
                        {index + (hasCurrentSill ? 2 : 1)}. {description}
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

            <LandingActionButton
              className="col-start-3 w-full min-w-0 bg-[#d6882e] px-2 py-2 shadow-none hover:bg-[#c77b28]"
              innerClassName="min-h-[56px] px-2 py-2 text-[clamp(14px,4.5vw,20px)] font-semibold uppercase tracking-normal"
              textForButton="чертеж"
              onClick={() => setShowDrawing(true)}
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

        {showDrawing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6 [font-family:system-ui]">
            <div className="flex max-h-[92vh] w-[min(94vw,860px)] flex-col overflow-hidden rounded-[1rem] bg-[#f7f4ef] shadow-[0_28px_80px_rgba(0,0,0,0.28)]">
              <div className="flex items-center justify-between gap-4 border-b border-[#d8c9b8] px-4 py-3">
                <h2 className="text-[18px] font-semibold leading-none text-[#526474]">
                  Чертеж
                </h2>
                <button
                  type="button"
                  onClick={() => setShowDrawing(false)}
                  aria-label="Закрыть чертеж"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#526474]/30 bg-white text-[#526474] transition-colors hover:bg-[#eee7df]"
                >
                  <X
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-auto p-4">
                <img
                  src={drawImage}
                  alt="Чертеж подоконника"
                  className="mx-auto max-h-[76vh] w-auto max-w-full rounded-[0.75rem] bg-white object-contain"
                />
              </div>
            </div>
          </div>
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
