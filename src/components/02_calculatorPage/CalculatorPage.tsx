import frameSizeConfig from '../../config/frameSizeConfig'
import OverlayLayout from '../ui/OverlayLayout'
import LengthData from './components/LengthData'
import WithData from './components/WithData'
import Thickness from './components/Thickness'
import StoneData from './components/StoneData'
import CountData from './components/CountData'
import LandingActionButton from '../ui/LandingActionButton'

export default function Calculator() {
  return (
    <OverlayLayout
      frame={frameSizeConfig.calculator}
    >
      <div className="col-[1/4] row-[1/2] flex items-center justify-center">
        <p className="text-[clamp(14px,5.6vw,42px)] text-white">
          Калькулятор
        </p>
      </div>

      <div className="z-10 col-[1/5] row-[5/8] flex flex-col items-start gap-1 px-4 pt-3">
        <LengthData />
        <WithData />
        <Thickness />
        <StoneData />
        <CountData />
        <LandingActionButton
          className="w-full"
          textForButton="Добавить в корзину"
        ></LandingActionButton>
      </div>
    </OverlayLayout>
  )
}
