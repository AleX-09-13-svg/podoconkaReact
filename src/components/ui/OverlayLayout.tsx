import type { Size } from '../../config/frameSizeConfig'
import layoutDebugConfig from '../../config/layoutDebugConfig'
import { cn } from '../../lib/utils'
import type { ReactNode } from 'react'

type OverlayLayoutProps = {
  frame: Size
  children?: ReactNode
}

export default function OverlayLayout({
  frame,
  children,
}: OverlayLayoutProps) {
  const gridCells = Array.from({
    length: frame.grid.cols * frame.grid.rows,
  })

  return (
    <div
      style={{
        aspectRatio: `${frame.x} / ${frame.y}`,
        width: frame.width,
        backgroundColor: frame.background?.color,
        backgroundImage: frame.background?.image,
        backgroundPosition: frame.background?.position,
        backgroundRepeat: frame.background?.repeat,
        backgroundSize: frame.background?.size,
        display: 'grid',
        gridTemplateColumns: `repeat(${frame.grid.cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${frame.grid.rows}, minmax(0, 1fr))`,
      }}
      className={cn(
        'relative mx-auto max-w-full transition-[width] duration-300 ease-out',
        layoutDebugConfig.showFrameBorder &&
          'border-2 border-red-500',
      )}
    >
      {children}
      {layoutDebugConfig.showGridCells && (
        <div
          aria-hidden="true"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${frame.grid.cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${frame.grid.rows}, minmax(0, 1fr))`,
          }}
          className="pointer-events-none absolute inset-0 z-10"
        >
          {gridCells.map((_, index) => (
            <div
              key={index}
              className="border border-red-500/35"
            />
          ))}
        </div>
      )}
    </div>
  )
}
