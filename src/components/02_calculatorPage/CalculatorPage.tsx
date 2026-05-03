import { useEffect, useState } from 'react'
import {
  type SubmitHandler,
  useForm,
} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { appPagePathByPage } from '../../config/appPageRoutes'
import frameSizeConfig from '../../config/frameSizeConfig'
import { useAppData } from '../../context/AppDataContext'
import type { CalculatorFormValues } from '../../types/calculator'
import OverlayLayout from '../ui/OverlayLayout'
import LengthData from './components/LengthData'
import WidthData from './components/WidthData'
import Thickness from './components/Thickness'
import StoneData from './components/StoneData'
import CountData from './components/CountData'
import LandingActionButton from '../ui/LandingActionButton'
import { cn } from '../../lib/utils'

const numberRules = {
  required: 'Заполни поле',
  pattern: {
    value: /^\d+([.,]\d+)?$/,
    message: 'Только число',
  },
}

function getStoneDisplayName(name: string) {
  const grandexIndex = name
    .toLowerCase()
    .indexOf('grandex')

  return grandexIndex >= 0
    ? name.slice(grandexIndex)
    : name
}

export default function Calculator() {
  const navigate = useNavigate()
  const {
    selectedStone,
    calculatorFormValues,
    setCalculatorFormValues,
  } = useAppData()
  const [lastAdded, setLastAdded] =
    useState<CalculatorFormValues | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CalculatorFormValues>({
    mode: 'onTouched',
    defaultValues: calculatorFormValues,
  })

  useEffect(() => {
    const subscription = watch((values) => {
      setCalculatorFormValues({
        length: values.length ?? '',
        width: values.width ?? '',
        thickness: values.thickness ?? '',
        stone: values.stone ?? '',
        count: values.count ?? '',
      })
    })

    return () => subscription.unsubscribe()
  }, [setCalculatorFormValues, watch])

  useEffect(() => {
    setValue('stone', selectedStone?.id ?? '', {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }, [selectedStone, setValue])

  const onSubmit: SubmitHandler<
    CalculatorFormValues
  > = (data) => {
    console.info('Calculator add to cart', data)
    setLastAdded(data)
    navigate(appPagePathByPage.order)
  }

  return (
    <OverlayLayout
      frame={frameSizeConfig.calculator}
    >
      <div className="col-[1/4] row-[1/2] flex items-center justify-center">
        <p className="text-[clamp(14px,5.6vw,42px)] text-white">
          Калькулятор
        </p>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="z-10 col-[1/5] row-[5/8] flex flex-col items-start gap-1 px-4 pt-3"
      >
        <LengthData
          type="text"
          inputMode="decimal"
          aria-invalid={Boolean(errors.length)}
          {...register('length', numberRules)}
        />
        <WidthData
          type="text"
          inputMode="decimal"
          aria-invalid={Boolean(errors.width)}
          className={cn(
            errors.width && 'ring-2 ring-[#b4574b]',
          )}
          {...register('width', numberRules)}
        />
        <Thickness
          aria-invalid={Boolean(errors.thickness)}
          className={cn(
            errors.thickness &&
              'ring-2 ring-[#b4574b]',
          )}
          {...register('thickness', {
            required: 'Выбери толщину',
          })}
        />
        <StoneData
          value={selectedStone?.id ?? ''}
          buttonText={
            selectedStone
              ? getStoneDisplayName(selectedStone.name)
              : 'Выбрать'
          }
          aria-invalid={Boolean(errors.stone)}
          buttonProps={{
            title: selectedStone?.name,
            onClick: () => navigate(appPagePathByPage.catalog),
          }}
          {...register('stone', {
            required: true,
          })}
        />
        <CountData
          type="text"
          inputMode="numeric"
          aria-invalid={Boolean(errors.count)}
          className={cn(
            errors.count && 'ring-2 ring-[#b4574b]',
          )}
          {...register('count', {
            required: 'Заполни поле',
            pattern: {
              value: /^\d+$/,
              message: 'Только целое число',
            },
          })}
        />
        <p
          className={cn(
            'min-h-[1rem] w-full px-2 text-center text-[12px] leading-none font-semibold text-[#b4574b]',
            !Object.keys(errors).length && 'invisible',
          )}
        >
          {Object.values(errors)[0]?.message ?? ' '}
        </p>
        <p
          className={cn(
            'min-h-[1rem] w-full px-2 text-center text-[12px] leading-none font-semibold text-[#526474]',
            !lastAdded && 'invisible',
          )}
        >
          {lastAdded ? 'Позиция подготовлена.' : ' '}
        </p>
        <LandingActionButton
          type="submit"
          className="w-full"
          textForButton="Добавить в корзину"
        ></LandingActionButton>
      </form>
    </OverlayLayout>
  )
}
