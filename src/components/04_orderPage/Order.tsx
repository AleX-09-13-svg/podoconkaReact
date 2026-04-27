import frameSizeConfig from '../../config/frameSizeConfig'
import OverlayLayout from '../ui/OverlayLayout'
import LandingActionButton from '../ui/LandingActionButton'
import OrderRequestForm from './components/OrderRequestForm'

export default function Order() {
  return (
    <OverlayLayout frame={frameSizeConfig.orderPage}>
      <div className="col-[1/5] row-[1/7] flex h-full flex-col px-5 pt-7 pb-8">
        <section className="relative px-0 text-white">
          <div className="pr-20">
            <h2 className="text-[clamp(28px,8vw,44px)] font-black uppercase leading-none tracking-[0.03em]">
              Вы выбрали
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-4">
            <div className="space-y-2">
              <p className="text-[clamp(16px,5vw,24px)] font-black uppercase leading-none">
                Камень:
              </p>
              <p className="text-[clamp(13px,4vw,20px)] font-black uppercase leading-tight text-[#e3932d]">
                GRANDEX
                <br />
                SOIL D-320
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-[clamp(16px,5vw,24px)] font-black uppercase leading-none">
                Подоконник:
              </p>
              <p className="text-[clamp(13px,4vw,20px)] font-black uppercase leading-tight text-[#e3932d]">
                200x200x25-200
              </p>
            </div>
          </div>

          <LandingActionButton
            className="mt-8 w-full bg-[#d6882e] px-2 py-2 shadow-none hover:bg-[#c77b28]"
            innerClassName="px-4 py-2 text-[clamp(16px,4.8vw,24px)] font-semibold tracking-normal"
            textForButton="стоимость заказа"
          />

          <p className="mt-5 text-center text-[clamp(16px,5vw,24px)] font-black uppercase leading-none">
            18600 руб.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-5">
            <LandingActionButton
              className="min-w-0 w-full bg-[#d6882e] px-2 py-2 shadow-none hover:bg-[#c77b28]"
              innerClassName="px-2 py-2 text-[clamp(14px,4.5vw,20px)] font-semibold uppercase tracking-normal"
              textForButton="раскрой"
            />
            <LandingActionButton
              className="min-w-0 w-full bg-[#d6882e] px-2 py-2 shadow-none hover:bg-[#c77b28]"
              innerClassName="px-2 py-2 text-[clamp(14px,4.5vw,20px)] font-semibold uppercase tracking-normal"
              textForButton="чертеж"
            />
          </div>
        </section>

        <section className="flex flex-1 flex-col pt-12">
          <h1 className="text-center text-[clamp(28px,8vw,44px)] font-black uppercase tracking-[0.04em] text-[#6b7d8d]">
            Оформить заказ
          </h1>

          <div className="mt-6 min-h-0 flex-1">
            <OrderRequestForm />
          </div>
        </section>
      </div>
    </OverlayLayout>
  )
}
