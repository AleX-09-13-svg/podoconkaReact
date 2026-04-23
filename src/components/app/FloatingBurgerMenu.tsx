import { useLocation } from 'react-router-dom'

import BurgerMenuButton from '../ui/BurgerMenuButton'

export default function FloatingBurgerMenu() {
  const location = useLocation()

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex w-[min(92vw,420px)] justify-end px-2 pt-2">
        <div className="pointer-events-auto">
          <BurgerMenuButton
            key={location.pathname}
            className="w-20 shrink-0"
          />
        </div>
      </div>
    </div>
  )
}
