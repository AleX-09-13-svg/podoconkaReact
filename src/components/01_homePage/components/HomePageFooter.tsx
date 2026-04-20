import ContactBar from '@/components/ui/ContactBar'
import Map from '../../../assets/map1.png'

export default function HomePageFooter() {
  return (
    <div className="col-[1/5] row-[6/8] m-5 flex flex-col gap-6 self-end justify-self-stretch">
      <p className="text-center text-[clamp(14px,4.6vw,32px)] text-white">
        Контакты :
      </p>
      <ContactBar />
      <div>
        <img
          className="h-full w-full object-cover"
          src={Map}
          alt="Локация"
        />
      </div>
    </div>
  )
}
