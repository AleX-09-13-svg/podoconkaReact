import HomePage from './components/01_homePage/HomePage'
import Calculator from './components/02_calculatorPage/CalculatorPage'
import Catalog from './components/03_stoneCatalog/StoneCatalog'
import Order from './components/04_orderPage/Order'
import TailwindFlexGuide from './components/05_tailwindFlexGuide/TailwindFlexGuide'
import TailwindGridGuide from './components/06_tailwindGridGuide/TailwindGridGuide'
import BurgerMenuButton from './components/ui/BurgerMenuButton'

import { useState } from 'react'
import type { AppPage } from './types/appPage'

export default function App() {
  const [activePage, setActivePage] =
    useState<AppPage>('home')

  const renderedPage =
    activePage === 'home' ? (
      <HomePage />
    ) : activePage === 'calculator' ? (
      <Calculator />
    ) : activePage === 'catalog' ? (
      <Catalog />
    ) : activePage === 'order' ? (
      <Order />
    ) : activePage === 'tailwind-flex' ? (
      <TailwindFlexGuide />
    ) : (
      <TailwindGridGuide />
    )

  return (
    <div className="min-h-screen bg-neutral-100 py-6">
      <div className="mx-auto flex w-[min(92vw,720px)] flex-wrap gap-2 pb-4">
        <button
          type="button"
          onClick={() => setActivePage('home')}
          className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          Home
        </button>
        <button
          type="button"
          onClick={() =>
            setActivePage('calculator')
          }
          className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          Calculator
        </button>
        <button
          type="button"
          onClick={() => setActivePage('catalog')}
          className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          Catalog
        </button>
        <button
          type="button"
          onClick={() => setActivePage('order')}
          className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          Order
        </button>
        <button
          type="button"
          onClick={() =>
            setActivePage('tailwind-flex')
          }
          className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          Tailwind Flex
        </button>
        <button
          type="button"
          onClick={() =>
            setActivePage('tailwind-grid')
          }
          className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          Tailwind Grid
        </button>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-50">
          <div className="mx-auto flex w-[min(92vw,420px)] justify-end px-2 pt-2">
            <div className="pointer-events-auto">
              <BurgerMenuButton
                activePage={activePage}
                className="w-20 shrink-0"
                onNavigate={(page) =>
                  setActivePage(page)
                }
              />
            </div>
          </div>
        </div>
        {renderedPage}
      </div>
    </div>
  )
}
