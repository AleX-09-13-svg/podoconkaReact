import type { ChangeEventHandler } from 'react'
import { cn } from '../../../lib/utils'

type StoneDataProps = {
  className?: string
  label?: string
  name?: string
  value?: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
  options?: string[]
  placeholder?: string
}

export default function StoneData({
  className,
  label = 'камень',
  name = 'stone',
  value = '',
  onChange,
  options = ['Акрил', 'Мрамор', 'Гранит'],
  placeholder = 'выбрать',
}: StoneDataProps) {
  return (
    <label
      className={cn(
        'flex w-full items-center justify-between gap-4 bg-white/95 px-4 py-3',
        className,
      )}
    >
      <span
        className="text-[clamp(22px,6vw,36px)] font-semibold leading-none text-[#526474]"
      >
        {label}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="h-[clamp(44px,13vw,58px)] w-[clamp(130px,40vw,170px)] appearance-none rounded-full border-[3px] border-[#526474] bg-white px-5 text-center text-[clamp(18px,4vw,28px)] text-[#526474] outline-none transition-colors focus:border-[#41525f]"
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
    </label>
  )
}
