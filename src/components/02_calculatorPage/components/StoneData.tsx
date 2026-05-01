import {
  forwardRef,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'

import { cn } from '../../../lib/utils'

type StoneDataProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className'
> & {
  className?: string
  label?: ReactNode
  buttonText?: ReactNode
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>
}

const StoneData = forwardRef<
  HTMLInputElement,
  StoneDataProps
>(function StoneData(
  {
    className,
    label = 'Камень',
    name = 'stone',
    buttonText = 'Выбрать',
    buttonProps,
    ...inputProps
  },
  ref,
) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-between gap-4 bg-white/95 px-4 py-3',
        className,
      )}
    >
      <span className="text-[clamp(22px,6vw,36px)] leading-none font-semibold text-[#526474]">
        {label}
      </span>

      <input
        ref={ref}
        type="hidden"
        name={name}
        {...inputProps}
      />

      <button
        type="button"
        {...buttonProps}
        className={cn(
          'h-[clamp(44px,13vw,58px)] w-full min-w-0 flex-1 overflow-hidden rounded-full border-[3px] border-[#526474] bg-white px-5 text-center [font-family:system-ui] text-[14px] leading-none font-semibold text-ellipsis whitespace-nowrap text-[#526474] transition-colors outline-none hover:bg-[#f4ede8] focus:border-[#41525f]',
          buttonProps?.className,
        )}
      >
        {buttonText}
      </button>
    </div>
  )
})

export default StoneData
