import { Phone, Send } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

function ActionLink({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'inline-flex h-13 w-13 items-center justify-center rounded-full bg-[#4f6373] text-white transition-transform duration-150 ease-out hover:scale-110 active:scale-110',
        className,
      )}
    >
      {children}
    </div>
  )
}
type ContactBarProps = {
  className?: string
}

export default function ContactBar({
  className,
}: ContactBarProps) {
  const handleCall = () => {
    window.location.href = 'tel:+79647735543'
  }

  return (
    <button
      type="button"
      onClick={handleCall}
      aria-label="Позвонить по номеру +79647735543"
      className={cn(
        `${className} flex cursor-pointer items-center gap-3 rounded-[2.2rem] border-[5px] border-[#786d62] bg-white px-2 py-2 text-left shadow-[0_14px_24px_rgba(120,109,98,0.12)] transition-colors duration-200 ease-out`,
      )}
    >
      <div className="min-w-0 flex-1 truncate text-[clamp(14px,4.6vw,32px)] leading-none whitespace-nowrap text-[#786d62]">
        +79647735543
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <ActionLink>
          <Phone
            className="h-5 w-5"
            strokeWidth={2}
          />
        </ActionLink>
        <ActionLink>
          <Send
            className="h-5 w-5"
            strokeWidth={2}
          />
        </ActionLink>
      </div>
    </button>
  )
}
