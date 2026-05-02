import { X } from 'lucide-react'

import type { GuillotinePackingItem } from '../../../lib/guillotinePacking'

type ManualCutDetail = {
  number: string
  length: number
  width: number
  count: number
}

type ManualCutDetailsModalProps = {
  items: GuillotinePackingItem[]
  onClose: () => void
}

function createManualCutDetails(
  items: GuillotinePackingItem[],
) {
  const detailBySize = new Map<string, ManualCutDetail>()

  function addDetail(detail: Omit<ManualCutDetail, 'count'>) {
    const key = `${detail.number}-${detail.length}-${detail.width}`
    const existingDetail = detailBySize.get(key)

    if (existingDetail) {
      existingDetail.count += 1
      return
    }

    detailBySize.set(key, {
      ...detail,
      count: 1,
    })
  }

  items.forEach((item, itemIndex) => {
    const itemNumber =
      item.labelPrefix?.replace('.', '') ??
      String(itemIndex + 1)

    for (
      let partIndex = 1;
      partIndex <= item.count;
      partIndex += 1
    ) {
      addDetail({
        number: `${itemNumber}.${partIndex} осн.`,
        length: item.partLength,
        width: item.partWidth,
      })

      if (item.edgeBandWidth) {
        addDetail({
          number: `${itemNumber}.${partIndex} перед`,
          length: item.partLength,
          width: item.edgeBandWidth,
        })
        addDetail({
          number: `${itemNumber}.${partIndex} бок`,
          length: item.partWidth,
          width: item.edgeBandWidth,
        })
        addDetail({
          number: `${itemNumber}.${partIndex} бок`,
          length: item.partWidth,
          width: item.edgeBandWidth,
        })
      }
    }
  })

  return Array.from(detailBySize.values())
}

export default function ManualCutDetailsModal({
  items,
  onClose,
}: ManualCutDetailsModalProps) {
  const details = createManualCutDetails(items)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6 [font-family:system-ui]">
      <div className="flex max-h-[92vh] w-[min(94vw,720px)] flex-col overflow-hidden rounded-[1rem] bg-[#f7f4ef] shadow-[0_28px_80px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between gap-4 border-b border-[#d8c9b8] px-4 py-3">
          <div>
            <h2 className="text-[18px] font-semibold leading-tight text-[#526474]">
              Список деталей для ручного раскроя
            </h2>
            <p className="mt-1 text-[13px] leading-tight text-[#526474]/75">
              {details.length} деталей
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть список деталей"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#526474]/30 bg-white text-[#526474] transition-colors hover:bg-[#eee7df]"
          >
            <X
              aria-hidden="true"
              className="h-5 w-5"
            />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <table className="w-full border-collapse overflow-hidden rounded-[0.75rem] bg-white text-left text-[14px] text-[#526474]">
            <thead className="bg-[#d6882e] text-white">
              <tr>
                <th className="px-3 py-3 font-semibold">
                  № детали
                </th>
                <th className="px-3 py-3 text-right font-semibold">
                  Длина
                </th>
                <th className="px-3 py-3 text-right font-semibold">
                  Ширина
                </th>
                <th className="px-3 py-3 text-right font-semibold">
                  Количество
                </th>
              </tr>
            </thead>

            <tbody>
              {details.map((detail, index) => (
                <tr
                  key={`${detail.number}-${index}`}
                  className="border-b border-[#e5ded5] last:border-b-0"
                >
                  <td className="px-3 py-2 font-medium">
                    {detail.number}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {detail.length}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {detail.width}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {detail.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
