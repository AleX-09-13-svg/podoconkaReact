import Foto1 from '../../../assets/imageSlider1.png'
import { appPagePathByPage } from '../../../config/appPageRoutes'
import Foto2 from '../../../assets/imageSlider2.png'
import { cn } from '../../../lib/utils'
import LandingActionButton from '@/components/ui/LandingActionButton'
import { useNavigate } from 'react-router-dom'

type HomePageFotoProps = {
  foto: string
  className?: string
}

function HomePageFoto({
  foto,
  className,
}: HomePageFotoProps) {
  return (
    <div
      className={cn(
        'aspect-[320/213] overflow-hidden rounded-[2.25rem] bg-white',
        className,
      )}
    >
      <img
        src={foto}
        alt="Подоконка"
        className="h-full w-full object-cover"
      />
    </div>
  )
}

export default function HomePageFotos() {
  const navigate = useNavigate()
  return (
    <div className="col-[1/5] row-[4/6] flex flex-col px-3 pt-20 pb-4">
      <p className="text-center text-[clamp(18px,5vw,26px)] font-semibold tracking-[0.03em] text-[#d88a2d]">
        изготовление 5 рабочих дней
      </p>
      <div className="mt-4 flex flex-col gap-4">
        <HomePageFoto
          foto={Foto1}
          className="w-full"
        ></HomePageFoto>
        <HomePageFoto
          foto={Foto2}
          className="w-full"
        ></HomePageFoto>
        <div className="mt-auto self-center px-4">
          <LandingActionButton
            className="w-full"
            textForButton="Создать заказ"
            onClick={() =>
              navigate(
                appPagePathByPage.calculator,
              )
            }
          ></LandingActionButton>
        </div>
      </div>
    </div>
  )
}
