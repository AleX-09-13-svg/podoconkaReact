import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import {
  calculatorFormDefaultValues,
  type CalculatorFormValues,
  type OrderItem,
} from '../types/calculator'
import type { Stone } from '../types/stone'

type AppDataContextValue = {
  selectedStone: Stone | null
  setSelectedStone: (stone: Stone | null) => void
  calculatorFormValues: CalculatorFormValues
  setCalculatorFormValues: Dispatch<
    SetStateAction<CalculatorFormValues>
  >
  orderItems: OrderItem[]
  addOrderItem: (
    values: CalculatorFormValues,
  ) => void
  resetCalculatorForNextItem: () => void
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
  const [orderItems, setOrderItems] = useState<
    OrderItem[]
  >([])

  const addOrderItem = useCallback(
    (values: CalculatorFormValues) => {
      if (
        !values.length ||
        !values.width ||
        !values.thickness ||
        !values.count
      ) {
        return
      }

      setOrderItems((currentItems) => [
        ...currentItems,
        {
          id: crypto.randomUUID(),
          length: values.length,
          width: values.width,
          thickness: values.thickness,
          count: values.count,
        },
      ])
    },
    [],
  )

  const resetCalculatorForNextItem = useCallback(() => {
    setCalculatorFormValues((currentValues) => ({
      ...calculatorFormDefaultValues,
      stone: selectedStone?.id ?? currentValues.stone,
    }))
  }, [selectedStone])

  const value = useMemo(
    () => ({
      selectedStone,
      setSelectedStone,
      calculatorFormValues,
      setCalculatorFormValues,
      orderItems,
      addOrderItem,
      resetCalculatorForNextItem,
    }),
    [
      addOrderItem,
      calculatorFormValues,
      orderItems,
      resetCalculatorForNextItem,
      selectedStone,
    ],
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
