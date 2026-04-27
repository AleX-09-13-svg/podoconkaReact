import heroImage from '../assets/home2.webp'
import calculatorImage from '../assets/calculator2.webp'
import orderImage from '../assets/order2.webp'

type Grid = {
  cols: number
  rows: number
}

type Background = {
  color?: string
  image?: string
  position?: string
  repeat?: string
  size?: string
}

type Size = {
  x: number
  y: number
  width: string
  grid: Grid
  background?: Background
}

type FrameConfigMap = {
  home: Size
  calculator: Size
  stoneCatalog: Size
  orderPage: Size
}

const frameSizeConfig: FrameConfigMap = {
  home: {
    x: 320,
    y: 1814,
    width: 'clamp(280px, 82vw, 420px)',
    grid: { cols: 4, rows: 7 },
    background: {
      color: '#ffffff',
      image: `url(${heroImage})`,
      position: 'center',
      repeat: 'no-repeat',
      size: 'cover',
    },
  },
  calculator: {
    x: 320,
    y: 802,
    width: 'clamp(280px, 82vw, 420px)',
    grid: { cols: 4, rows: 8 },
    background: {
      color: '#ffffff',
      image: `url(${calculatorImage})`,
      position: 'center',
      repeat: 'no-repeat',
      size: 'cover',
    },
  },
  stoneCatalog: {
    x: 320,
    y: 3410,
    width: 'clamp(280px, 82vw, 420px)',
    grid: { cols: 4, rows: 20 },
    background: {
      color: '#4f6370',
    },
  },
  orderPage: {
    x: 320,
    y: 1315,
    width: 'clamp(280px, 82vw, 420px)',
    grid: { cols: 4, rows: 6 },
    background: {
      color: '#f5f1eb',
      image: `url(${orderImage})`,
      position: 'center',
      repeat: 'no-repeat',
      size: 'cover',
    },
  },
}

export default frameSizeConfig
export type {
  Background,
  FrameConfigMap,
  Grid,
  Size,
}
