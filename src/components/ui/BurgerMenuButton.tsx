import { cn } from '../../lib/utils'
import { useState } from 'react'
import type { AppPage } from '../../types/appPage'

type MenuStubProps = {
  activePage: AppPage
  className?: string
  onNavigate: (page: AppPage) => void
}

export default function MenuStub({
  activePage,
  className,
  onNavigate,
}: MenuStubProps) {
  const [open, setOpen] = useState(false)

  const menuItems: Array<{
    label: string
    page: AppPage
  }> = [
    { label: 'Главная', page: 'home' },
    { label: 'Калькулятор', page: 'calculator' },
    { label: 'Камень', page: 'catalog' },
    { label: 'Корзина', page: 'order' },
    { label: 'Контакты', page: 'home' },
  ]

  return (
    <div className="relative m-4">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="Открыть меню"
        className={cn(
          'flex aspect-square min-w-[5rem] items-center justify-center rounded-[1rem] border-[5px] border-[#7e7368] bg-white shadow-[0_12px_24px_rgba(126,115,104,0.12)] transition hover:bg-black/10',
          className,
        )}
      >
        <div className="flex w-[58%] flex-col gap-3">
          <span className="block h-2 rounded-full bg-[#7e7368]" />
          <span className="block h-2 rounded-full bg-[#7e7368]" />
          <span className="block h-2 rounded-full bg-[#7e7368]" />
        </div>
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+12px)] z-50 w-[220px] rounded-[1.75rem] border-[4px] border-[#7e7368] bg-white px-4 py-6 shadow-[0_18px_32px_rgba(126,115,104,0.18)]">
          <div className="flex flex-col items-center gap-3">
            {menuItems.map((item) => (
              <button
                key={`${item.label}-${item.page}`}
                type="button"
                onClick={() => {
                  onNavigate(item.page)
                  setOpen(false)
                }}
                className={cn(
                  'w-full rounded-xl px-3 py-2 text-center text-[clamp(20px,2.1vw,24px)] leading-none text-[#8f7774] transition-colors hover:bg-[#f4ede8]',
                  activePage === item.page &&
                    'bg-[#f4ede8] text-[#6f5c5a]',
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
