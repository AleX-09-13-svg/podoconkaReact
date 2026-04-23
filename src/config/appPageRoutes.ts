import type { ComponentType } from 'react'

import HomePage from '../components/01_homePage/HomePage'
import Calculator from '../components/02_calculatorPage/CalculatorPage'
import Catalog from '../components/03_stoneCatalog/StoneCatalog'
import Order from '../components/04_orderPage/Order'

type AppPage =
  | 'home'
  | 'calculator'
  | 'catalog'
  | 'order'

type AppPageNavItem = {
  page: AppPage
  path: string
  label: string
}

type AppPageRoute = AppPageNavItem & {
  component: ComponentType
}

const appRoutes = [
  {
    page: 'home',
    path: '/',
    label: 'Home',
    component: HomePage,
  },
  {
    page: 'calculator',
    path: '/calculator',
    label: 'Calculator',
    component: Calculator,
  },
  {
    page: 'catalog',
    path: '/catalog',
    label: 'Catalog',
    component: Catalog,
  },
  {
    page: 'order',
    path: '/order',
    label: 'Order',
    component: Order,
  },
] as const satisfies ReadonlyArray<AppPageRoute>

const appPages: ReadonlyArray<AppPageNavItem> = appRoutes.map(
  ({ page, path, label }) => ({ page, path, label }),
)

const appPagePathByPage = appRoutes.reduce<Record<AppPage, string>>(
  (pathByPage, route) => {
    pathByPage[route.page] = route.path
    return pathByPage
  },
  {} as Record<AppPage, string>,
)

export { appRoutes, appPages, appPagePathByPage }
export type { AppPage, AppPageNavItem, AppPageRoute }
