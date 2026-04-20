import type { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'
import { cn } from '../../../lib/utils'

type CountDataProps = {
  className?: string
  label?: string
  placeholder?: string
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  type?: HTMLInputTypeAttribute
  name?: string
}

export default function CountData({
  className,
  label = 'кол-во',
  placeholder = '',
  value,
  onChange,
  type = 'text',
  name = 'count',
}: CountDataProps) {
  return (
    <label
      className={cn(
        'flex w-full items-center justify-between gap-4 bg-white/95 px-4 py-3',
        className,
      )}
    >
      <span className="text-[clamp(22px,6vw,36px)] font-semibold leading-none text-[#526474]">
        {label}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-[clamp(44px,13vw,58px)] w-[clamp(120px,38vw,180px)] rounded-full border-[3px] border-[#526474] bg-white px-4 text-[clamp(18px,4vw,28px)] text-[#111111] outline-none transition-colors placeholder:text-[#111111]/35 focus:border-[#41525f]"
      />
    </label>
  )
}
