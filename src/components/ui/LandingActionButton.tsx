import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '../../lib/utils'

type LandingActionButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    textForButton: ReactNode
    innerClassName?: string
  }

export default function LandingActionButton({
  textForButton: textForButton,
  className,
  innerClassName,
  type = 'button',
  ...props
}: LandingActionButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex min-w-[220px] items-center justify-center rounded-[1.5rem] bg-[#d3852f] p-[0.8rem] text-white shadow-[0_12px_20px_rgba(152,88,16,0.22)] transition-[background-color,transform] duration-150 ease-out hover:scale-[1.01] hover:bg-[#bf7627] active:scale-[0.985]',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'flex w-full items-center justify-center rounded-[1.55rem] border-[3px] border-dashed border-[#5f6470] px-2 py-2 text-center text-[var(--font-size-md)] font-black leading-none tracking-[0.03em]',
          innerClassName,
        )}
      >
        {textForButton}
      </span>
    </button>
  )
}
