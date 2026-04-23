import { NavLink } from 'react-router-dom'

import { appRoutes } from '../../config/appPageRoutes'
import { cn } from '../../lib/utils'

type NavLinkState = {
  isActive: boolean
}

const navLinkClassName = ({ isActive }: NavLinkState) =>
  cn(
    'rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50',
    isActive &&
      'border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800',
  )

export default function AppNav() {
  return (
    <div className="mx-auto flex w-[min(92vw,720px)] flex-wrap gap-2 pb-4">
      {appRoutes.map((page) => (
        <NavLink
          key={page.page}
          to={page.path}
          end
          className={navLinkClassName}
        >
          {page.label}
        </NavLink>
      ))}
    </div>
  )
}
