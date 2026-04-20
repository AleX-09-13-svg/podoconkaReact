import frameSizeConfig from '../../config/frameSizeConfig'
import OverlayLayout from '../ui/OverlayLayout'
import HomePageHeader from './components/HomePageHeader'
import OrderSteps from './components/OrderStep'
import HomePageFotos from './components/HomePageFoto'
import HomePageFooter from './components/HomePageFooter'

export default function HomePage() {
  return (
    <OverlayLayout frame={frameSizeConfig.home}>
      <HomePageHeader />
      <OrderSteps></OrderSteps>
      <HomePageFotos></HomePageFotos>
      <HomePageFooter></HomePageFooter>
    </OverlayLayout>
  )
}
