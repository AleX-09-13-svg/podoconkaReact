import { X } from 'lucide-react'

import type {
  CutCalculationResult,
  PackedPart,
} from '../../../lib/guillotinePacking'

type CutLayoutPreviewProps = {
  result: CutCalculationResult
  onClose: () => void
}

type PreviewBin = {
  index: number
  length: number
  width: number
  placements: PackedPart[]
}

function getPreviewBins(result: CutCalculationResult) {
  const bins: PreviewBin[] = []
  const { quartersNeeded, config, placements } = result
  const fullSheets = Math.floor(quartersNeeded / 4)
  const remainingQuarters = quartersNeeded % 4

  for (let index = 0; index < fullSheets; index += 1) {
    bins.push({
      index,
      length: config.sheetLength,
      width: config.sheetWidth,
      placements: placements.filter(
        (part) => part.binIndex === index,
      ),
    })
  }

  if (remainingQuarters > 0) {
    const index = bins.length

    bins.push({
      index,
      length:
        (config.sheetLength / 4) * remainingQuarters,
      width: config.sheetWidth,
      placements: placements.filter(
        (part) => part.binIndex === index,
      ),
    })
  }

  return bins
}

function formatSize(part: PackedPart) {
  return `${part.label} ${part.length}x${part.width}`
}

function shouldShowPartLabel(part: PackedPart) {
  return Math.min(part.length, part.width) >= 100
}

export default function CutLayoutPreview({
  result,
  onClose,
}: CutLayoutPreviewProps) {
  const bins = getPreviewBins(result)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6 [font-family:system-ui]">
      <div className="flex max-h-[92vh] w-[min(94vw,920px)] flex-col overflow-hidden rounded-[1rem] bg-[#f7f4ef] shadow-[0_28px_80px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between gap-4 border-b border-[#d8c9b8] px-4 py-3">
          <div>
            <h2 className="text-[18px] font-semibold leading-none text-[#526474]">
              Раскрой
            </h2>
            <p className="mt-1 text-[13px] leading-tight text-[#526474]/75">
              {result.quartersNeeded}/4 листа,
              стоимость {Math.round(result.totalPrice)} руб.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть раскрой"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#526474]/30 bg-white text-[#526474] transition-colors hover:bg-[#eee7df]"
          >
            <X
              aria-hidden="true"
              className="h-5 w-5"
            />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
          {bins.map((bin) => (
            <section
              key={bin.index}
              className="space-y-2"
            >
              <div className="flex items-center justify-between gap-3 text-[13px] font-medium text-[#526474]">
                <span>Лист {bin.index + 1}</span>
                <span>
                  {bin.length}x{bin.width} мм
                </span>
              </div>

              <svg
                viewBox={`0 0 ${bin.length} ${bin.width}`}
                className="block w-full rounded-[0.75rem] border border-[#526474]/35 bg-white"
                role="img"
                aria-label={`Раскрой листа ${bin.index + 1}`}
              >
                <rect
                  x="0"
                  y="0"
                  width={bin.length}
                  height={bin.width}
                  fill="#f9f7f2"
                />
                <rect
                  x={result.config.edgeGap}
                  y={result.config.edgeGap}
                  width={
                    bin.length - result.config.edgeGap * 2
                  }
                  height={
                    bin.width - result.config.edgeGap * 2
                  }
                  fill="none"
                  stroke="#526474"
                  strokeDasharray="24 18"
                  strokeWidth="8"
                />

                {bin.placements.map((part, index) => (
                  <g
                    key={`${part.x}-${part.y}-${index}`}
                  >
                    <rect
                      x={part.x}
                      y={part.y}
                      width={part.length}
                      height={part.width}
                      rx="10"
                      fill="#d88f36"
                      stroke="#526474"
                      strokeWidth="6"
                    />
                    {shouldShowPartLabel(part) && (
                      <text
                        x={part.x + part.length / 2}
                        y={part.y + part.width / 2}
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fill="#111111"
                        fontSize="24"
                        fontWeight="500"
                      >
                        {index + 1}. {formatSize(part)}
                      </text>
                    )}
                  </g>
                ))}
              </svg>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
