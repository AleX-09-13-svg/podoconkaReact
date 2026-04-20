const childProperties = [
  {
    label: 'расположение по колонкам',
    classes:
      '`col-span-*`, `col-span-full`, `col-start-*`, `col-end-*`, `col-auto`',
  },
  {
    label: 'расположение по строкам',
    classes: '`row-span-*`, `row-start-*`, `row-end-*`, `row-auto`',
  },
  {
    label: 'выравнивание одного элемента',
    classes:
      '`self-auto`, `self-start`, `self-end`, `self-center`, `self-stretch`, `self-baseline`',
  },
  {
    label: 'выравнивание по горизонтали',
    classes:
      '`justify-self-auto`, `justify-self-start`, `justify-self-end`, `justify-self-center`, `justify-self-stretch`',
  },
  {
    label: 'короткая запись выравнивания',
    classes:
      '`place-self-auto`, `place-self-start`, `place-self-end`, `place-self-center`, `place-self-stretch`',
  },
  {
    label: 'порядок элемента',
    classes: '`order-1`, `order-2`, `order-first`, `order-last`, `order-none`',
  },
]

const parentProperties = [
  {
    label: 'колонки',
    classes: '`grid-cols-*`, `grid-cols-none`, `grid-cols-subgrid`',
  },
  {
    label: 'строки',
    classes: '`grid-rows-*`, `grid-rows-none`, `grid-rows-subgrid`',
  },
  {
    label: 'авто-колонки',
    classes:
      '`auto-cols-auto`, `auto-cols-min`, `auto-cols-max`, `auto-cols-fr`',
  },
  {
    label: 'авто-строки',
    classes:
      '`auto-rows-auto`, `auto-rows-min`, `auto-rows-max`, `auto-rows-fr`',
  },
  {
    label: 'направление автопотока',
    classes:
      '`grid-flow-row`, `grid-flow-col`, `grid-flow-dense`, `grid-flow-row-dense`, `grid-flow-col-dense`',
  },
  {
    label: 'расстояние между элементами',
    classes: '`gap-*`, `gap-x-*`, `gap-y-*`',
  },
  {
    label: 'выравнивание элементов',
    classes:
      '`items-start`, `items-center`, `items-end`, `items-stretch`, `items-baseline`',
  },
  {
    label: 'выравнивание по горизонтали',
    classes:
      '`justify-items-start`, `justify-items-center`, `justify-items-end`, `justify-items-stretch`',
  },
  {
    label: 'короткая запись выравнивания',
    classes:
      '`place-items-start`, `place-items-center`, `place-items-end`, `place-items-stretch`',
  },
  {
    label: 'выравнивание всей сетки',
    classes:
      '`content-start`, `content-center`, `content-end`, `content-between`, `content-around`, `content-evenly`, `content-stretch`',
  },
  {
    label: 'выравнивание сетки по X',
    classes:
      '`justify-start`, `justify-center`, `justify-end`, `justify-between`, `justify-around`, `justify-evenly`',
  },
  {
    label: 'короткая запись выравнивания',
    classes:
      '`place-content-start`, `place-content-center`, `place-content-end`, `place-content-between`, `place-content-around`, `place-content-evenly`, `place-content-stretch`',
  },
]

function PropertyRow({
  label,
  classes,
}: {
  label: string
  classes: string
}) {
  return (
    <div className="grid gap-1 sm:grid-cols-[240px_minmax(0,1fr)] sm:gap-4">
      <p className="text-[15px] leading-7 text-black sm:text-base">{label}</p>
      <p className="text-[15px] leading-7 text-black sm:text-base">{classes}</p>
    </div>
  )
}

export default function TailwindGridGuide() {
  return (
    <main className="min-h-screen bg-[#f3eedb] px-4 py-8 [font-family:Arial,sans-serif] text-black">
      <div className="mx-auto max-w-5xl">
        <div className="border border-black bg-[#f3eedb] p-4 sm:p-8">
          <p className="text-2xl sm:text-3xl">Родитель</p>
          <p className="mt-4 text-xl sm:text-2xl">`grid` / `inline-grid`</p>

          <div className="mt-8 border border-black bg-[#efe8cf] p-4 sm:mx-12 sm:p-6">
            <p className="text-2xl sm:text-3xl">Ребёнок</p>

            <div className="mt-6 space-y-3">
              {childProperties.map((property) => (
                <PropertyRow
                  key={property.label}
                  label={property.label}
                  classes={property.classes}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-5">
            {parentProperties.map((property) => (
              <PropertyRow
                key={`${property.label}-${property.classes}`}
                label={property.label}
                classes={property.classes}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
