import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react'

import {
  calculatorFormDefaultValues,
  type CalculatorFormValues,
} from '../types/calculator'
import type { Stone } from '../types/stone'

type AppDataContextValue = {
  selectedStone: Stone | null
  setSelectedStone: (stone: Stone | null) => void
  calculatorFormValues: CalculatorFormValues
  setCalculatorFormValues: (
    values: CalculatorFormValues,
  ) => void
}

const AppDataContext =
  createContext<AppDataContextValue | null>(null)

type AppDataProviderProps = {
  children: ReactNode
}

function AppDataProvider({
  children,
}: AppDataProviderProps) {
  const [selectedStone, setSelectedStone] =
    useState<Stone | null>(null)
  const [
    calculatorFormValues,
    setCalculatorFormValues,
  ] = useState<CalculatorFormValues>(
    calculatorFormDefaultValues,
  )

  const value = useMemo(
    () => ({
      selectedStone,
      setSelectedStone,
      calculatorFormValues,
      setCalculatorFormValues,
    }),
    [calculatorFormValues, selectedStone],
  )

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  )
}

function useAppData() {
  const context = useContext(AppDataContext)

  if (!context) {
    throw new Error(
      'useAppData must be used inside AppDataProvider',
    )
  }

  return context
}

export { AppDataProvider, useAppData }
