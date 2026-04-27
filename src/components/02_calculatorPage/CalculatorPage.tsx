import { useState } from 'react'
import {
  type SubmitHandler,
  useForm,
} from 'react-hook-form'

import frameSizeConfig from '../../config/frameSizeConfig'
import OverlayLayout from '../ui/OverlayLayout'
import LengthData from './components/LengthData'
import WithData from './components/WithData'
import Thickness from './components/Thickness'
import StoneData from './components/StoneData'
import CountData from './components/CountData'
import LandingActionButton from '../ui/LandingActionButton'
import { cn } from '../../lib/utils'

type CalculatorFormValues = {
  length: string
  width: string
  thickness: string
  stone: string
  count: string
}

const numberRules = {
  required: 'Заполни поле',
  pattern: {
    value: /^\d+([.,]\d+)?$/,
    message: 'Только число',
  },
}

export default function Calculator() {
  const [lastAdded, setLastAdded] =
    useState<CalculatorFormValues | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CalculatorFormValues>({
    mode: 'onTouched',
    defaultValues: {
      length: '',
      width: '',
      thickness: '',
      stone: '',
      count: '',
    },
  })

  const onSubmit: SubmitHandler<
    CalculatorFormValues
  > = (data) => {
    console.info('Calculator add to cart', data)
    setLastAdded(data)
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
          className={cn(
            errors.length && 'ring-2 ring-[#b4574b]',
          )}
          {...register('length', numberRules)}
        />
        <WithData
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
          aria-invalid={Boolean(errors.stone)}
          className={cn(
            errors.stone && 'ring-2 ring-[#b4574b]',
          )}
          {...register('stone', {
            required: 'Выбери камень',
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
