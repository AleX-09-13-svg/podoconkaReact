import ContactBar from '@/components/ui/ContactBar'

export default function HomePageFooter() {
  const yandexMapUrl =
    'https://yandex.ru/map-widget/v1/?ll=37.548108%2C55.344491&pt=37.548108,55.344491,pm2rdm&z=16'
  const yandexOpenUrl =
    'https://yandex.ru/maps/?ll=37.548108%2C55.344491&z=16&pt=37.548108,55.344491,pm2rdm'

  return (
    <div className="col-[1/5] row-[6/8] m-5 flex flex-col gap-6 self-end justify-self-stretch">
      <p className="text-center text-[clamp(14px,4.6vw,32px)] text-white">
        Контакты :
      </p>
      <ContactBar />
      <div className="relative overflow-hidden rounded-2xl">
        <a
          href={yandexOpenUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Открыть точку в Яндекс Картах"
          className="block h-full w-full"
        >
          <iframe
            title="Наше производство на Яндекс Картах"
            src={yandexMapUrl}
            className="h-[260px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </a>

        <div className="pointer-events-none absolute top-3 left-3 rounded-full bg-[#d6882e] px-4 py-1.5 text-sm font-black text-white shadow-lg">
          наше производство
        </div>

        <a
          href={yandexOpenUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-3 bottom-3 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
        >
          открыть в Яндекс Картах
        </a>
      </div>
    </div>
  )
}
