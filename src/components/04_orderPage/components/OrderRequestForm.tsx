import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'
import {
  type FieldError,
  type SubmitHandler,
  useForm,
} from 'react-hook-form'

import { useAppData } from '../../../context/AppDataContext'
import {
  calculateStoneOrderCut,
  type GuillotinePackingItem,
} from '../../../lib/guillotinePacking'
import { cn } from '../../../lib/utils'
import LandingActionButton from '../../ui/LandingActionButton'

type OrderRequestFormValues = {
  phone: string
  fullName: string
  email: string
  message: string
}

type OrderRequestFormProps = {
  cutQuality: 'good' | 'bad'
}

type FieldShellProps = {
  children: ReactNode
  error?: FieldError
  className?: string
}

const inputClassName =
  'h-[54px] w-full rounded-[1.35rem] border-2 border-[#ddd5ce] bg-[#ddd5ce] px-5 text-[clamp(18px,5vw,28px)] leading-none text-white outline-none transition-colors placeholder:text-white/95 focus:border-[#c7873b] focus:bg-[#d1c8bf]'

const textareaClassName =
  'min-h-[308px] w-full resize-none rounded-[1.35rem] border-2 border-[#ddd5ce] bg-[#ddd5ce] px-4 py-4 text-[clamp(14px,3.8vw,21px)] font-normal leading-[1.08] text-[#546474] outline-none transition-colors placeholder:text-[#546474]/50 focus:border-[#c7873b] focus:bg-[#d1c8bf] [font-family:system-ui]'

const manualCutPriceText =
  'Стоимость пересчитается по итогу ручного раскроя'

function FieldShell({
  children,
  error,
  className,
}: FieldShellProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {children}
      <p
        className={cn(
          'min-h-[1.1rem] px-2 text-[12px] font-semibold leading-none text-[#b4574b]',
          !error && 'invisible',
        )}
      >
        {error?.message ?? ' '}
      </p>
    </div>
  )
}

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

export default function OrderRequestForm({
  cutQuality,
}: OrderRequestFormProps) {
  const [submittedEmail, setSubmittedEmail] =
    useState<string | null>(null)
  const [isSubmittingEmail, setIsSubmittingEmail] =
    useState(false)
  const [submitError, setSubmitError] = useState<
    string | null
  >(null)
  const {
    selectedStone,
    calculatorFormValues,
    orderItems,
  } = useAppData()
  const { length, width, thickness, count } =
    calculatorFormValues
  const serviceId = import.meta.env
    .VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env
    .VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env
    .VITE_EMAILJS_PUBLIC_KEY
  const defaultMessage = useMemo(() => {
    const hasCurrentSill =
      length && width && thickness && count
    const sillDescriptions = [
      ...(hasCurrentSill
        ? [
            `${getNumericValue(length)}x${getNumericValue(width)}x${getNumericValue(thickness)}-${getNumericValue(count)} шт.`,
          ]
        : []),
      ...orderItems.map(
        (item) =>
          `${getNumericValue(item.length)}x${getNumericValue(item.width)}x${getNumericValue(item.thickness)}-${getNumericValue(item.count)} шт.`,
      ),
    ]
    const cutItems: GuillotinePackingItem[] = [
      ...(hasCurrentSill
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
        labelPrefix: `${index + (hasCurrentSill ? 2 : 1)}.`,
        partLength: getNumberValue(item.length),
        partWidth: getNumberValue(item.width),
        count: getNumberValue(item.count),
        edgeBandWidth: getNumberValue(item.thickness),
      })),
    ]
    const sillDescription =
      length && width && thickness && count
        ? `${getNumericValue(length)}x${getNumericValue(width)}x${getNumericValue(thickness)}-${getNumericValue(count)} шт.`
        : 'параметры не заданы'
    const requestSillDescription =
      sillDescriptions.length
        ? sillDescriptions
            .map(
              (description, index) =>
                `${index + 1}. ${description}`,
            )
            .join('; ')
        : sillDescription
    const stoneName = selectedStone
      ? getStoneDisplayName(selectedStone.name)
      : 'камень не выбран'
    const result =
      selectedStone && cutItems.length
        ? calculateStoneOrderCut({
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
        : null
    const priceText = result
      ? `${formatPrice(result.totalPrice)} руб.`
      : 'стоимость не рассчитана'
    const manualCutPriceNote =
      cutQuality === 'bad'
        ? ` (${manualCutPriceText})`
        : ''

    return `Прошу выставить счет на подоконники ${requestSillDescription}. ${stoneName} ${priceText}${manualCutPriceNote}`
  }, [
    count,
    cutQuality,
    length,
    orderItems,
    selectedStone,
    thickness,
    width,
  ])

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { dirtyFields, errors },
  } = useForm<OrderRequestFormValues>({
    mode: 'onTouched',
    defaultValues: {
      phone: '',
      fullName: '',
      email: '',
      message: defaultMessage,
    },
  })

  useEffect(() => {
    if (!dirtyFields.message) {
      setValue('message', defaultMessage)
    }
  }, [defaultMessage, dirtyFields.message, setValue])

  const onSubmit: SubmitHandler<
    OrderRequestFormValues
  > = async (data) => {
    setSubmitError(null)

    if (
      !serviceId ||
      !templateId ||
      !publicKey
    ) {
      setSubmitError(
        'EmailJS не настроен. Добавьте VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID и VITE_EMAILJS_PUBLIC_KEY в .env.local.',
      )
      return
    }

    setIsSubmittingEmail(true)
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          user_name: data.fullName,
          user_phone: data.phone,
          user_email: data.email,
          message: data.message,
        },
        {
          publicKey,
        },
      )
      setSubmittedEmail(data.email)
      reset({
        phone: '',
        fullName: '',
        email: '',
        message: defaultMessage,
      })
    } catch (error) {
      console.error('Email send failed', error)
      setSubmitError(
        'Не удалось отправить письмо. Проверьте настройки EmailJS и попробуйте снова.',
      )
    } finally {
      setIsSubmittingEmail(false)
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col [font-family:system-ui]"
    >
      <div className="space-y-0.5">
        <FieldShell error={errors.phone}>
          <label
            htmlFor="order-phone"
            className="sr-only"
          >
            Телефон
          </label>
          <input
            id="order-phone"
            type="tel"
            autoComplete="tel"
            placeholder="телефон"
            aria-invalid={Boolean(errors.phone)}
            className={inputClassName}
            {...register('phone', {
              required:
                'Укажи телефон для связи.',
              pattern: {
                value: /^[+0-9()\s-]{10,20}$/,
                message:
                  'Телефон должен содержать 10-20 символов.',
              },
            })}
          />
        </FieldShell>

        <FieldShell error={errors.fullName}>
          <label
            htmlFor="order-fullName"
            className="sr-only"
          >
            ФИО
          </label>
          <input
            id="order-fullName"
            type="text"
            autoComplete="name"
            placeholder="ФИО"
            aria-invalid={Boolean(
              errors.fullName,
            )}
            className={inputClassName}
            {...register('fullName', {
              required: 'Укажи имя или ФИО.',
              minLength: {
                value: 2,
                message: 'Слишком короткое имя.',
              },
            })}
          />
        </FieldShell>

        <FieldShell error={errors.email}>
          <label
            htmlFor="order-email"
            className="sr-only"
          >
            Почта
          </label>
          <input
            id="order-email"
            type="email"
            autoComplete="email"
            placeholder="почта"
            aria-invalid={Boolean(errors.email)}
            className={inputClassName}
            {...register('email', {
              required:
                'Укажи email для отправки счета.',
              pattern: {
                value:
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message:
                  'Введи корректный email.',
              },
            })}
          />
        </FieldShell>

        <FieldShell
          error={errors.message}
          className="pt-2"
        >
          <label
            htmlFor="order-message"
            className="sr-only"
          >
            Текст запроса
          </label>
          {cutQuality === 'bad' && (
            <p className="px-3 pb-2 text-[clamp(16px,4.4vw,24px)] font-bold leading-tight text-[#b4574b]">
              {manualCutPriceText}
            </p>
          )}
          <textarea
            id="order-message"
            aria-invalid={Boolean(errors.message)}
            className={textareaClassName}
            {...register('message', {
              required: 'Добавь текст запроса.',
              minLength: {
                value: 20,
                message:
                  'Сообщение должно быть чуть подробнее.',
              },
            })}
          />
        </FieldShell>
      </div>

      <div className="space-y-2">
        <p
          className={cn(
            'rounded-2xl bg-white/80 px-4 py-2 text-center text-[clamp(11px,3.2vw,15px)] font-semibold leading-tight text-[#546474]',
            !submittedEmail &&
              !submitError &&
              'invisible',
          )}
        >
          {submitError
            ? submitError
            : submittedEmail
              ? 'Заявка отправлена. Счет придет на почту (в течении 4 часов).'
              : ' '}
        </p>

        <LandingActionButton
          type="submit"
          disabled={isSubmittingEmail}
          className="w-full bg-[#d6882e] py-2 shadow-none hover:bg-[#c77b28]"
          innerClassName="px-4 py-2 text-[clamp(16px,4.8vw,26px)] font-semibold leading-none tracking-normal"
          textForButton={
            isSubmittingEmail
              ? 'отправка...'
              : 'запросить счет'
          }
        />

        <p className="px-3 text-center text-[clamp(11px,3.3vw,15px)] font-black leading-tight text-[#546474]">
          *самовывоз (яндекс доставка) силами
          заказчика
        </p>
      </div>
    </form>
  )
}
