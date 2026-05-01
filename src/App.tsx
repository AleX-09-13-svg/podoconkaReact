import AppNav from './components/app/AppNav'
import AppRoutes from './components/app/AppRoutes'
import FloatingBurgerMenu from './components/app/FloatingBurgerMenu'
import { AppDataProvider } from './context/AppDataContext'

export default function App() {
  return (
    <AppDataProvider>
      <div className="min-h-screen bg-neutral-100 py-6">
        <AppNav />
        <div className="relative">
          <FloatingBurgerMenu />
          <AppRoutes />
        </div>
      </div>
    </AppDataProvider>
  )
}
