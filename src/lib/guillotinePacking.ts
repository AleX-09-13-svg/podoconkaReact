type GuillotinePackingConfig = {
  sheetLength: number
  sheetWidth: number
  edgeGap: number
  partGap: number
  edgeBandWidth: number
  includeEdgeBands: boolean
  allowRotate: boolean
  preferMinimalUsedLength: boolean
  purchaseStepQuarters: number
  maxQuarters: number
}

type GuillotinePackingInput = {
  partLength: number
  partWidth: number
  count: number
  pricePerSheet: number
  config?: Partial<GuillotinePackingConfig>
}

type PackedPart = {
  binIndex: number
  label: string
  x: number
  y: number
  length: number
  width: number
  rotated: boolean
}

type CutCalculationResult = {
  quartersNeeded: number
  sheetsNeeded: number
  pricePerQuarter: number
  totalPrice: number
  placements: PackedPart[]
  config: GuillotinePackingConfig
}

type FreeRect = {
  x: number
  y: number
  length: number
  width: number
}

type Bin = {
  length: number
  width: number
  freeRects: FreeRect[]
  placements: PackedPart[]
}

type PlacementCandidate = {
  freeRectIndex: number
  length: number
  width: number
  rotated: boolean
  x: number
  y: number
  usedLengthEnd: number
  score: number
  shortSideWaste: number
}

const defaultGuillotinePackingConfig: GuillotinePackingConfig = {
  sheetLength: 3660,
  sheetWidth: 750,
  edgeGap: 10,
  partGap: 5,
  edgeBandWidth: 20,
  includeEdgeBands: true,
  allowRotate: true,
  preferMinimalUsedLength: true,
  purchaseStepQuarters: 1,
  maxQuarters: 40,
}

function calculateStoneCut({
  partLength,
  partWidth,
  count,
  pricePerSheet,
  config,
}: GuillotinePackingInput): CutCalculationResult | null {
  const resolvedConfig = {
    ...defaultGuillotinePackingConfig,
    ...config,
  }

  if (
    partLength <= 0 ||
    partWidth <= 0 ||
    count <= 0 ||
    pricePerSheet <= 0
  ) {
    return null
  }

  for (
    let quarters = resolvedConfig.purchaseStepQuarters;
    quarters <= resolvedConfig.maxQuarters;
    quarters += resolvedConfig.purchaseStepQuarters
  ) {
    const bins = createPurchasedBins(
      quarters,
      resolvedConfig,
    )
    const parts = createPartsToPack({
      partLength,
      partWidth,
      count,
      config: resolvedConfig,
    })
    const placements = packPartsInBins({
      bins,
      parts,
      config: resolvedConfig,
    })

    if (placements) {
      const pricePerQuarter = pricePerSheet / 4

      return {
        quartersNeeded: quarters,
        sheetsNeeded: quarters / 4,
        pricePerQuarter,
        totalPrice: pricePerQuarter * quarters,
        placements,
        config: resolvedConfig,
      }
    }
  }

  return null
}

function createPurchasedBins(
  quarters: number,
  config: GuillotinePackingConfig,
) {
  const bins: Bin[] = []
  const fullSheets = Math.floor(quarters / 4)
  const remainingQuarters = quarters % 4

  for (let index = 0; index < fullSheets; index += 1) {
    bins.push(createBin(config.sheetLength, config))
  }

  if (remainingQuarters > 0) {
    bins.push(
      createBin(
        (config.sheetLength / 4) * remainingQuarters,
        config,
      ),
    )
  }

  return bins
}

function createBin(
  purchasedLength: number,
  config: GuillotinePackingConfig,
): Bin {
  const usableLength =
    purchasedLength - config.edgeGap * 2 + config.partGap
  const usableWidth =
    config.sheetWidth - config.edgeGap * 2 + config.partGap

  return {
    length: purchasedLength,
    width: config.sheetWidth,
    freeRects:
      usableLength > 0 && usableWidth > 0
        ? [
            {
              x: config.edgeGap,
              y: config.edgeGap,
              length: usableLength,
              width: usableWidth,
            },
          ]
        : [],
    placements: [],
  }
}

function packPartsInBins({
  bins,
  parts,
  config,
}: {
  bins: Bin[]
  parts: PartToPack[]
  config: GuillotinePackingConfig
}) {
  for (const part of parts) {
    const occupiedLength = part.length + config.partGap
    const occupiedWidth = part.width + config.partGap
    let placed = false

    for (
      let binIndex = 0;
      binIndex < bins.length && !placed;
      binIndex += 1
    ) {
      const candidate = findBestPlacement(
        bins[binIndex],
        occupiedLength,
        occupiedWidth,
        config,
      )

      if (candidate) {
        placePart({
          bin: bins[binIndex],
          binIndex,
          candidate,
          part,
        })
        placed = true
      }
    }

    if (!placed) {
      return null
    }
  }

  return bins.flatMap((bin) => bin.placements)
}

type PartToPack = {
  label: string
  length: number
  width: number
}

function createPartsToPack({
  partLength,
  partWidth,
  count,
  config,
}: {
  partLength: number
  partWidth: number
  count: number
  config: GuillotinePackingConfig
}) {
  const parts: PartToPack[] = []

  for (let index = 1; index <= count; index += 1) {
    parts.push({
      label: `${index} осн.`,
      length: partLength,
      width: partWidth,
    })

    if (config.includeEdgeBands) {
      parts.push(
        {
          label: `${index} перед`,
          length: partLength,
          width: config.edgeBandWidth,
        },
        {
          label: `${index} бок`,
          length: partWidth,
          width: config.edgeBandWidth,
        },
        {
          label: `${index} бок`,
          length: partWidth,
          width: config.edgeBandWidth,
        },
      )
    }
  }

  return parts.sort(
    (first, second) =>
      second.length * second.width -
      first.length * first.width,
  )
}

function findBestPlacement(
  bin: Bin,
  length: number,
  width: number,
  config: GuillotinePackingConfig,
) {
  let bestCandidate: PlacementCandidate | null = null

  bin.freeRects.forEach((freeRect, freeRectIndex) => {
    const orientations = config.allowRotate
      ? [
          { length, width, rotated: false },
          { length: width, width: length, rotated: true },
        ]
      : [{ length, width, rotated: false }]

    orientations.forEach((orientation) => {
      if (
        orientation.length > freeRect.length ||
        orientation.width > freeRect.width
      ) {
        return
      }

      const lengthWaste =
        freeRect.length - orientation.length
      const widthWaste = freeRect.width - orientation.width
      const score = freeRect.length * freeRect.width -
        orientation.length * orientation.width
      const shortSideWaste = Math.min(
        lengthWaste,
        widthWaste,
      )
      const usedLengthEnd = freeRect.x + orientation.length

      const candidate: PlacementCandidate = {
        freeRectIndex,
        length: orientation.length,
        width: orientation.width,
        rotated: orientation.rotated,
        x: freeRect.x,
        y: freeRect.y,
        usedLengthEnd,
        score,
        shortSideWaste,
      }

      if (
        isBetterPlacement(
          candidate,
          bestCandidate,
          config,
        )
      ) {
        bestCandidate = candidate
      }
    })
  })

  return bestCandidate
}

function isBetterPlacement(
  candidate: PlacementCandidate,
  bestCandidate: PlacementCandidate | null,
  config: GuillotinePackingConfig,
) {
  if (!bestCandidate) {
    return true
  }

  if (
    config.preferMinimalUsedLength &&
    candidate.y !== bestCandidate.y
  ) {
    return candidate.y < bestCandidate.y
  }

  if (
    config.preferMinimalUsedLength &&
    candidate.usedLengthEnd !== bestCandidate.usedLengthEnd
  ) {
    return (
      candidate.usedLengthEnd <
      bestCandidate.usedLengthEnd
    )
  }

  if (
    config.preferMinimalUsedLength &&
    candidate.x !== bestCandidate.x
  ) {
    return candidate.x < bestCandidate.x
  }

  if (candidate.score !== bestCandidate.score) {
    return candidate.score < bestCandidate.score
  }

  if (
    candidate.shortSideWaste !==
    bestCandidate.shortSideWaste
  ) {
    return (
      candidate.shortSideWaste <
      bestCandidate.shortSideWaste
    )
  }

  return candidate.rotated && !bestCandidate.rotated
}

function placePart({
  bin,
  binIndex,
  candidate,
  part,
}: {
  bin: Bin
  binIndex: number
  candidate: PlacementCandidate
  part: PartToPack
}) {
  const freeRect = bin.freeRects[candidate.freeRectIndex]
  const actualLength = candidate.rotated
    ? part.width
    : part.length
  const actualWidth = candidate.rotated
    ? part.length
    : part.width

  bin.placements.push({
    binIndex,
    label: part.label,
    x: freeRect.x,
    y: freeRect.y,
    length: actualLength,
    width: actualWidth,
    rotated: candidate.rotated,
  })

  const newFreeRects = splitFreeRect(
    freeRect,
    candidate.length,
    candidate.width,
  )

  bin.freeRects.splice(
    candidate.freeRectIndex,
    1,
    ...newFreeRects,
  )
}

function splitFreeRect(
  freeRect: FreeRect,
  usedLength: number,
  usedWidth: number,
) {
  const remainingLength = freeRect.length - usedLength
  const remainingWidth = freeRect.width - usedWidth

  const verticalSplit = [
    {
      x: freeRect.x + usedLength,
      y: freeRect.y,
      length: remainingLength,
      width: freeRect.width,
    },
    {
      x: freeRect.x,
      y: freeRect.y + usedWidth,
      length: usedLength,
      width: remainingWidth,
    },
  ]

  const horizontalSplit = [
    {
      x: freeRect.x + usedLength,
      y: freeRect.y,
      length: remainingLength,
      width: usedWidth,
    },
    {
      x: freeRect.x,
      y: freeRect.y + usedWidth,
      length: freeRect.length,
      width: remainingWidth,
    },
  ]

  return (remainingLength > remainingWidth
    ? verticalSplit
    : horizontalSplit
  ).filter((rect) => rect.length > 0 && rect.width > 0)
}

export {
  calculateStoneCut,
  defaultGuillotinePackingConfig,
}
export type {
  CutCalculationResult,
  GuillotinePackingConfig,
  GuillotinePackingInput,
  PackedPart,
}
