import { ChevronDown } from 'lucide-react'
import type { ChangeEventHandler } from 'react'
import { cn } from '../../../lib/utils'

type ThicknessProps = {
  className?: string
  label?: string
  name?: string
  value?: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
  options?: string[]
  placeholder?: string
}

export default function Thickness({
  className,
  label = 'Толщина:',
  name = 'thickness',
  value = '',
  onChange,
  options = ['20 мм', '30 мм', '40 мм'],
  placeholder = 'Выбрать',
}: ThicknessProps) {
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

      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="h-[clamp(44px,13vw,58px)] w-[clamp(120px,38vw,180px)] appearance-none rounded-full border-[3px] border-[#526474] bg-white px-4 pr-11 text-[clamp(18px,4vw,28px)] text-[#526474] outline-none transition-colors focus:border-[#41525f]"
        >
          <option value="">
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 text-[#526474]"
          strokeWidth={2.5}
        />
      </div>
    </label>
  )
}
