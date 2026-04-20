type OrderStepType = {
  number: number
  text: string
}

function OrderStep({
  number,
  text,
}: OrderStepType) {
  return (
    <div className="flex flex-col items-center text-center leading-none">
      <div className="text-5xl font-bold text-[#d88a2d]" style={{ WebkitTextStroke: '2px rgba(75, 92, 104, 1)' }}>{number}</div>
      <div className="mt-2 whitespace-pre-line text-2xl text-[#4f6373]">
        {text}
      </div>
    </div>
  )
}

export default function OrderSteps() {
  return (
    <div className="col-[1/5] row-[3/4] grid grid-cols-2 place-items-center gap-y-6 px-2 pt-15">
      <OrderStep number={1} text={'создал\nзаказ'} />
      <OrderStep number={2} text={'отправил\nзапрос'} />
      <OrderStep number={3} text={'оплатил\n50%'} />
      <OrderStep number={4} text={'забрал\nзаказ'} />
    </div>
  )
}
