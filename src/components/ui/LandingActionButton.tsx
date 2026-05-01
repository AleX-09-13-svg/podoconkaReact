import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'

import { cn } from '../../lib/utils'

type LandingActionBaseProps = {
  textForButton: ReactNode
  innerClassName?: string
}

type LandingActionButtonButtonProps =
  LandingActionBaseProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
      href?: undefined
    }

type LandingActionButtonLinkProps =
  LandingActionBaseProps &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string
    }

type LandingActionButtonProps =
  | LandingActionButtonButtonProps
  | LandingActionButtonLinkProps

export default function LandingActionButton({
  textForButton: textForButton,
  className,
  innerClassName,
  ...props
}: LandingActionButtonProps) {
  const sharedClassName = cn(
    'inline-flex min-w-[220px] items-center justify-center rounded-[1.5rem] bg-[#d3852f] p-[0.8rem] text-white shadow-[0_12px_20px_rgba(152,88,16,0.22)] transition-[background-color,transform] duration-150 ease-out hover:scale-[1.01] hover:bg-[#bf7627] active:scale-[0.985]',
    className,
  )

  if ('href' in props && props.href) {
    return (
      <a
        className={sharedClassName}
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
      </a>
    )
  }

  const { type = 'button', ...buttonProps } = props

  return (
    <button
      type={type}
      className={sharedClassName}
      {...buttonProps}
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
