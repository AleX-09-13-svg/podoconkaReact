/*
const parentProperties = [
  {
    title: 'display',
    classes: ['flex', 'inline-flex'],
    description: 'включает flex-контейнер',
  },
  {
    title: 'direction',
    classes: [
      'flex-row',
      'flex-row-reverse',
      'flex-col',
      'flex-col-reverse',
    ],
    description: 'задаёт направление главной оси',
  },
  {
    title: 'wrap',
    classes: ['flex-wrap', 'flex-nowrap', 'flex-wrap-reverse'],
    description: 'управляет переносом элементов',
  },
  {
    title: 'justify',
    classes: [
      'justify-start',
      'justify-center',
      'justify-end',
      'justify-between',
      'justify-around',
      'justify-evenly',
    ],
    description: 'выравнивает по главной оси',
  },
  {
    title: 'items',
    classes: [
      'items-start',
      'items-center',
      'items-end',
      'items-stretch',
      'items-baseline',
    ],
    description: 'выравнивает по поперечной оси',
  },
  {
    title: 'content',
    classes: [
      'content-start',
      'content-center',
      'content-end',
      'content-between',
      'content-around',
      'content-evenly',
      'content-stretch',
    ],
    description: 'работает со строками при переносе',
  },
  {
    title: 'gap',
    classes: ['gap-*', 'gap-x-*', 'gap-y-*'],
    description: 'задаёт расстояние между элементами',
  },
]

const childProperties = [
  {
    title: 'order',
    classes: [
      'order-1',
      'order-2',
      'order-first',
      'order-last',
      'order-none',
    ],
    description: 'меняет порядок элемента',
  },
  {
    title: 'grow',
    classes: ['grow', 'grow-0'],
    description: 'разрешает или запрещает рост',
  },
  {
    title: 'shrink',
    classes: ['shrink', 'shrink-0'],
    description: 'разрешает или запрещает сжатие',
  },
  {
    title: 'basis',
    classes: ['basis-*'],
    description: 'задаёт базовый размер',
  },
  {
    title: 'flex',
    classes: ['flex-1', 'flex-auto', 'flex-initial', 'flex-none'],
    description: 'короткая запись поведения элемента',
  },
  {
    title: 'self',
    classes: [
      'self-auto',
      'self-start',
      'self-end',
      'self-center',
      'self-stretch',
      'self-baseline',
    ],
    description: 'переопределяет выравнивание одного элемента',
  },
]

function PropertyCard({
  title,
  classes,
  description,
}: {
  title: string
  classes: string[]
  description: string
}) {
  return (
    <article className="rounded-[28px] border border-stone-900/10 bg-white/80 p-5 shadow-[0_20px_60px_rgba(64,49,19,0.08)] backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-lg tracking-[0.12em] text-stone-800 uppercase">
          {title}
        </h3>
        <span className="rounded-full border border-stone-900/10 bg-stone-100 px-3 py-1 text-[11px] tracking-[0.18em] text-stone-600 uppercase">
          Tailwind
        </span>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {classes.map((item) => (
          <span
            key={item}
            className="rounded-full border border-amber-800/15 bg-amber-50 px-3 py-1.5 text-sm text-amber-950"
          >
            {item}
          </span>
        ))}
      </div>
      <p className="text-sm leading-6 text-stone-600">{description}</p>
    </article>
  )
}

export default function TailwindFlexGuide() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#f8edd1_0%,#efe4c3_38%,#e3d6af_100%)] px-4 py-8 text-stone-900">
      <div className="mx-auto w-full max-w-6xl">
        <section className="overflow-hidden rounded-[40px] border border-stone-900/15 bg-white/45 shadow-[0_28px_80px_rgba(61,45,16,0.16)] backdrop-blur-sm">
          <div className="border-b border-stone-900/10 px-6 py-6 sm:px-10">
            <p className="mb-3 text-xs tracking-[0.35em] text-stone-500 uppercase">
              Tailwind Cheat Sheet
            </p>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h1 className="text-4xl leading-none text-stone-900 sm:text-5xl">
                  Flex свойства в Tailwind
                </h1>
                <p className="mt-4 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
                  Визуальный конспект по классам flex-контейнера и flex-элемента
                  в формате одной страницы.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-stone-700">
                <span className="rounded-full border border-stone-900/10 bg-white/70 px-4 py-2">
                  Родитель: контейнер
                </span>
                <span className="rounded-full border border-stone-900/10 bg-white/70 px-4 py-2">
                  Ребёнок: отдельный элемент
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
            <section className="rounded-[36px] border border-stone-900 bg-[#efe6c6] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)] sm:p-8">
              <div className="rounded-[32px] border border-stone-900/90 p-4 sm:p-6">
                <p className="text-2xl text-stone-900 sm:text-3xl">Родитель</p>
                <p className="mt-3 inline-flex rounded-full border border-stone-900/15 bg-white/50 px-4 py-2 text-xl text-stone-800">
                  `flex` / `inline-flex`
                </p>

                <div className="mt-8 rounded-[28px] border border-stone-900/90 bg-[#f8f2dc] p-4 sm:ml-10 sm:p-6">
                  <p className="text-xl text-stone-900 sm:text-2xl">Ребёнок</p>
                  <p className="mt-2 text-sm leading-6 text-stone-600 sm:max-w-sm">
                    Классы ниже применяются уже к отдельным flex-элементам внутри
                    контейнера.
                  </p>

                  <div className="mt-6 grid gap-4">
                    {childProperties.map((property) => (
                      <PropertyCard key={property.title} {...property} />
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid gap-4">
                  {parentProperties.map((property) => (
                    <PropertyCard key={property.title} {...property} />
                  ))}
                </div>
              </div>
            </section>

            <aside className="flex flex-col gap-6">
              <section className="rounded-[32px] border border-stone-900/10 bg-white/75 p-6 shadow-[0_22px_60px_rgba(64,49,19,0.08)]">
                <p className="text-sm tracking-[0.28em] text-stone-500 uppercase">
                  Как читать
                </p>
                <div className="mt-4 space-y-4 text-sm leading-7 text-stone-700">
                  <p>
                    `justify-*` работает вдоль главной оси. Она зависит от
                    `flex-row` или `flex-col`.
                  </p>
                  <p>
                    `items-*` выравнивает элементы поперёк главной оси и
                    используется чаще всего.
                  </p>
                  <p>
                    `content-*` заметен только когда включён перенос через
                    `flex-wrap` и есть несколько строк.
                  </p>
                </div>
              </section>

              <section className="rounded-[32px] border border-stone-900/10 bg-stone-900 p-6 text-stone-100 shadow-[0_22px_60px_rgba(64,49,19,0.15)]">
                <p className="text-sm tracking-[0.28em] text-stone-300 uppercase">
                  Мини-пример
                </p>
                <pre className="mt-4 overflow-x-auto rounded-[24px] bg-black/20 p-4 text-sm leading-7 text-amber-100">
                  <code>{`<div className="flex items-center justify-between gap-4">
  <div className="flex-1">A</div>
  <div className="shrink-0">B</div>
</div>`}</code>
                </pre>
              </section>

              <section className="rounded-[32px] border border-dashed border-stone-900/20 bg-white/65 p-6">
                <p className="text-sm tracking-[0.28em] text-stone-500 uppercase">
                  Быстро запомнить
                </p>
                <div className="mt-4 grid gap-3 text-sm text-stone-700">
                  <div className="rounded-2xl bg-stone-100/80 px-4 py-3">
                    `flex-row` = в строку
                  </div>
                  <div className="rounded-2xl bg-stone-100/80 px-4 py-3">
                    `flex-col` = в колонку
                  </div>
                  <div className="rounded-2xl bg-stone-100/80 px-4 py-3">
                    `justify-*` = вдоль направления
                  </div>
                  <div className="rounded-2xl bg-stone-100/80 px-4 py-3">
                    `items-*` = поперёк направления
                  </div>
                  <div className="rounded-2xl bg-stone-100/80 px-4 py-3">
                    `gap-*` = расстояния между элементами
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </section>
      </div>
    </main>
  )
}
*/

const childProperties = [
  {
    classes: '`order-1`, `order-2`, `order-first`, `order-last`, `order-none`',
    description: 'порядок элемента',
  },
  {
    classes: '`grow` / `grow-0`',
    description: 'растягиваться или нет',
  },
  {
    classes: '`shrink` / `shrink-0`',
    description: 'сжиматься или нет',
  },
  {
    classes: '`basis-*`',
    description: 'базовый размер',
  },
  {
    classes: '`flex-1`, `flex-auto`, `flex-initial`, `flex-none`',
    description: 'короткая запись flex',
  },
  {
    classes:
      '`self-auto`, `self-start`, `self-end`, `self-center`, `self-stretch`, `self-baseline`',
    description: 'выравнивание одного элемента',
  },
]

const parentProperties = [
  {
    classes: '`flex-row`, `flex-row-reverse`, `flex-col`, `flex-col-reverse`',
    description: 'направление главной оси',
  },
  {
    classes: '`flex-wrap`, `flex-nowrap`, `flex-wrap-reverse`',
    description: 'перенос элементов',
  },
  {
    classes:
      '`justify-start`, `justify-center`, `justify-end`, `justify-between`, `justify-around`, `justify-evenly`',
    description: 'выравнивание по главной оси',
  },
  {
    classes:
      '`items-start`, `items-center`, `items-end`, `items-stretch`, `items-baseline`',
    description: 'выравнивание по поперечной оси',
  },
  {
    classes:
      '`content-start`, `content-center`, `content-end`, `content-between`, `content-around`, `content-evenly`, `content-stretch`',
    description: 'выравнивание строк',
  },
  {
    classes: '`gap-*`, `gap-x-*`, `gap-y-*`',
    description: 'расстояние между элементами',
  },
]

function PropertyLine({
  classes,
  description,
}: {
  classes: string
  description: string
}) {
  return (
    <div className="pt-3 first:pt-0">
      <p className="text-[15px] leading-6 text-black sm:text-base">{classes}</p>
      <p className="mt-1 text-[15px] leading-6 text-neutral-700">- {description}</p>
    </div>
  )
}

export default function TailwindFlexGuide() {
  return (
    <main className="min-h-screen bg-[#f3eedb] px-4 py-8 [font-family:Arial,sans-serif] text-black">
      <div className="mx-auto max-w-5xl">
        <div className="border border-black bg-[#f3eedb] p-4 sm:p-8">
          <p className="text-2xl sm:text-3xl">Родитель</p>
          <p className="mt-4 text-xl sm:text-2xl">`flex` / `inline-flex`</p>

          <div className="mt-8 border border-black bg-[#f3eedb] p-4 sm:mx-12 sm:p-6">
            <p className="text-2xl sm:text-3xl">Ребёнок</p>

            <div className="mt-6 space-y-4">
              {childProperties.map((property) => (
                <PropertyLine
                  key={property.classes}
                  classes={property.classes}
                  description={property.description}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {parentProperties.map((property) => (
              <PropertyLine
                key={property.classes}
                classes={property.classes}
                description={property.description}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
