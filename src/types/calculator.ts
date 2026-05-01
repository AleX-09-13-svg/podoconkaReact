type CalculatorFormValues = {
  length: string
  width: string
  thickness: string
  stone: string
  count: string
}

const calculatorFormDefaultValues: CalculatorFormValues = {
  length: '',
  width: '',
  thickness: '',
  stone: '',
  count: '',
}

export { calculatorFormDefaultValues }
export type { CalculatorFormValues }
