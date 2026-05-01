import ContactBar from '../../ui/ContactBar'
import LandingActionButton from '../../ui/LandingActionButton'

export default function HomePageHeader() {
  return (
    <div className="col-[1/5] row-[1/3] flex h-full flex-col px-2">
      <div className="mt-3 w-full">
        <div className="min-w-0">
          <ContactBar className="w-2/3" />
        </div>
      </div>
      <div className="mt-auto self-center px-4">
        <LandingActionButton
          className="w-full"
          textForButton="Позвонить"
          href="tel:+79647735543"
        />
      </div>
    </div>
  )
}
