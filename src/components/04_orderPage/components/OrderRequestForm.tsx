import type { ReactNode } from 'react'
import { useState } from 'react'
import {
  type FieldError,
  type SubmitHandler,
  useForm,
} from 'react-hook-form'

import LandingActionButton from '../../ui/LandingActionButton'
import { cn } from '../../../lib/utils'

type OrderRequestFormValues = {
  phone: string
  fullName: string
  email: string
  message: string
}

type FieldShellProps = {
  children: ReactNode
  error?: FieldError
  className?: string
}

const defaultMessage =
  'Прошу выставить счет на подоконники 200X200X25-200. GRANDEX SOIL D-320 183200 РУБ.'

const inputClassName =
  'h-[54px] w-full rounded-[1.35rem] border-2 border-[#ddd5ce] bg-[#ddd5ce] px-5 text-[clamp(18px,5vw,28px)] leading-none text-white outline-none transition-colors placeholder:text-white/95 focus:border-[#c7873b] focus:bg-[#d1c8bf]'

const textareaClassName =
  'min-h-[308px] w-full resize-none rounded-[1.35rem] border-2 border-[#ddd5ce] bg-[#ddd5ce] px-4 py-4 text-[clamp(14px,3.8vw,21px)] font-normal  leading-[1.08] text-[#546474] outline-none transition-colors placeholder:text-[#546474]/50 focus:border-[#c7873b] focus:bg-[#d1c8bf] [font-family:system-ui]'

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
          'min-h-[1.1rem] px-2 text-[12px] leading-none font-semibold text-[#b4574b]',
          !error && 'invisible',
        )}
      >
        {error?.message ?? ' '}
      </p>
    </div>
  )
}

export default function OrderRequestForm() {
  const [submittedEmail, setSubmittedEmail] =
    useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderRequestFormValues>({
    mode: 'onTouched',
    defaultValues: {
      phone: '',
      fullName: '',
      email: '',
      message: defaultMessage,
    },
  })

  const onSubmit: SubmitHandler<
    OrderRequestFormValues
  > = (data) => {
    console.info(
      'Order request form submit',
      data,
    )
    setSubmittedEmail(data.email)
    reset({
      phone: '',
      fullName: '',
      email: '',
      message: defaultMessage,
    })
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col"
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
            'rounded-2xl bg-white/80 px-4 py-2 text-center text-[clamp(11px,3.2vw,15px)] leading-tight font-semibold text-[#546474]',
            !submittedEmail && 'invisible',
          )}
        >
          {submittedEmail
            ? `Заявка подготовлена. Сейчас данные выводятся в консоль браузера, письмо для ${submittedEmail} пока не отправляется.`
            : ' '}
        </p>

        <LandingActionButton
          type="submit"
          className="w-full bg-[#d6882e] py-2 shadow-none hover:bg-[#c77b28]"
          innerClassName="px-4 py-2 text-[clamp(16px,4.8vw,26px)] font-semibold leading-none tracking-normal"
          textForButton="запросить счет "
        />

        <p className="px-3 text-center text-[clamp(11px,3.3vw,15px)] leading-tight font-black text-[#546474] uppercase">
          *самовывоз (яндекс доставка) силами
          заказчика
        </p>
      </div>
    </form>
  )
}
