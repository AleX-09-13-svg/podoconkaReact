import type {
  CalculatorFormValues,
  OrderItem,
} from '../types/calculator'
import type { GuillotinePackingItem } from './guillotinePacking'

type OrderDetailsInput = {
  calculatorFormValues: CalculatorFormValues
  orderItems: OrderItem[]
}

type OrderDetails = {
  hasCurrentSill: boolean
  currentSillDescription: string
  orderItemDescriptions: string[]
  requestSillDescription: string
  cutItems: GuillotinePackingItem[]
}

function getNumericValue(value: string) {
  return value.replace(/[^\d.,]/g, '')
}

function getNumberValue(value: string) {
  return Number(getNumericValue(value).replace(',', '.'))
}

function getSillDescription({
  length,
  width,
  thickness,
  count,
}: Pick<
  CalculatorFormValues,
  'length' | 'width' | 'thickness' | 'count'
>) {
  return `${getNumericValue(length)}x${getNumericValue(width)}x${getNumericValue(thickness)}-${getNumericValue(count)}`
}

function buildOrderDetails({
  calculatorFormValues,
  orderItems,
}: OrderDetailsInput): OrderDetails {
  const { length, width, thickness, count } =
    calculatorFormValues
  const hasCurrentSill = Boolean(
    length && width && thickness && count,
  )
  const currentSillDescription = hasCurrentSill
    ? getSillDescription({
        length,
        width,
        thickness,
        count,
      })
    : 'Параметры не заданы'
  const orderItemDescriptions = orderItems.map(
    getSillDescription,
  )
  const cutItems: GuillotinePackingItem[] = [
    ...(hasCurrentSill
      ? [
          {
            labelPrefix: '1.',
            partLength: getNumberValue(length),
            partWidth: getNumberValue(width),
            count: getNumberValue(count),
            edgeBandWidth: getNumberValue(thickness),
          },
        ]
      : []),
    ...orderItems.map((item, index) => ({
      labelPrefix: `${index + (hasCurrentSill ? 2 : 1)}.`,
      partLength: getNumberValue(item.length),
      partWidth: getNumberValue(item.width),
      count: getNumberValue(item.count),
      edgeBandWidth: getNumberValue(item.thickness),
    })),
  ]
  const requestDescriptions = [
    ...(hasCurrentSill
      ? [`${currentSillDescription} шт.`]
      : []),
    ...orderItemDescriptions.map(
      (description) => `${description} шт.`,
    ),
  ]
  const requestSillDescription = requestDescriptions.length
    ? requestDescriptions
        .map(
          (description, index) =>
            `${index + 1}. ${description}`,
        )
        .join('; ')
    : 'параметры не заданы'

  return {
    hasCurrentSill,
    currentSillDescription,
    orderItemDescriptions,
    requestSillDescription,
    cutItems,
  }
}

export {
  buildOrderDetails,
  getNumberValue,
  getNumericValue,
}
export type { OrderDetails }
