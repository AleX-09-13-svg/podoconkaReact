import { useNavigate } from 'react-router-dom'

import { appPagePathByPage } from '../../../config/appPageRoutes'
import ContactBar from '../../ui/ContactBar'
import LandingActionButton from '../../ui/LandingActionButton'

export default function HomePageHeader() {
  const navigate = useNavigate()

  return (
    <div className="relative z-30 col-[1/5] row-[1/3] flex h-full flex-col px-2">
      <div className="mt-3 w-full">
        <div className="min-w-0">
          <ContactBar className="w-2/3" />
        </div>
      </div>
      <div className="mt-auto self-center px-4">
        <LandingActionButton
          className="w-full"
          textForButton="Создать заказ"
          onClick={() =>
            navigate(appPagePathByPage.calculator)
          }
        />
      </div>
    </div>
  )
}
