type GuillotinePackingConfig = {
  sheetLength: number
  sheetWidth: number
  edgeGap: number
  partGap: number
  edgeBandWidth: number
  includeEdgeBands: boolean
  allowRotate: boolean
  preferMinimalUsedLength: boolean
  preferUsedBins: boolean
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

type GuillotinePackingItem = {
  labelPrefix?: string
  partLength: number
  partWidth: number
  count: number
  edgeBandWidth?: number
}

type GuillotinePackingOrderInput = {
  items: GuillotinePackingItem[]
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
  preferUsedBins: true,
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

function calculateStoneOrderCut({
  items,
  pricePerSheet,
  config,
}: GuillotinePackingOrderInput): CutCalculationResult | null {
  const resolvedConfig = {
    ...defaultGuillotinePackingConfig,
    ...config,
  }

  if (
    !items.length ||
    pricePerSheet <= 0 ||
    items.some(
      (item) =>
        item.partLength <= 0 ||
        item.partWidth <= 0 ||
        item.count <= 0,
    )
  ) {
    return null
  }

  const parts = items
    .flatMap((item, itemIndex) =>
      createPartsToPack({
        partLength: item.partLength,
        partWidth: item.partWidth,
        count: item.count,
        config: {
          ...resolvedConfig,
          edgeBandWidth:
            item.edgeBandWidth ??
            resolvedConfig.edgeBandWidth,
        },
      }).map((part) => ({
        ...part,
        label: `${item.labelPrefix ?? `${itemIndex + 1}.`} ${part.label}`,
      })),
    )
    .sort(
      (first, second) =>
        second.length * second.width -
        first.length * first.width,
    )

  for (
    let quarters = resolvedConfig.purchaseStepQuarters;
    quarters <= resolvedConfig.maxQuarters;
    quarters += resolvedConfig.purchaseStepQuarters
  ) {
    const bins = createPurchasedBins(
      quarters,
      resolvedConfig,
    )
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
    const bestPlacement = findBestBinPlacement({
      bins,
      length: occupiedLength,
      width: occupiedWidth,
      config,
    })

    if (!bestPlacement) {
      return null
    }

    placePart({
      bin: bins[bestPlacement.binIndex],
      binIndex: bestPlacement.binIndex,
      candidate: bestPlacement.candidate,
      part,
    })
  }

  return bins.flatMap((bin) => bin.placements)
}

function findBestBinPlacement({
  bins,
  length,
  width,
  config,
}: {
  bins: Bin[]
  length: number
  width: number
  config: GuillotinePackingConfig
}) {
  const activeBinIndexes = bins
    .map((bin, index) =>
      bin.placements.length > 0 ? index : -1,
    )
    .filter((index) => index >= 0)
  const emptyBinIndexes = bins
    .map((bin, index) =>
      bin.placements.length === 0 ? index : -1,
    )
    .filter((index) => index >= 0)
  const binIndexGroups =
    config.preferUsedBins &&
    activeBinIndexes.length > 0
      ? [activeBinIndexes, emptyBinIndexes]
      : [[...activeBinIndexes, ...emptyBinIndexes]]

  for (const binIndexes of binIndexGroups) {
    let bestPlacement:
      | {
          binIndex: number
          candidate: PlacementCandidate
        }
      | null = null

    for (const binIndex of binIndexes) {
      const candidate = findBestPlacement(
        bins[binIndex],
        length,
        width,
        config,
      )

      if (
        candidate &&
        isBetterBinPlacement({
          bins,
          binIndex,
          candidate,
          bestPlacement,
        })
      ) {
        bestPlacement = {
          binIndex,
          candidate,
        }
      }
    }

    if (bestPlacement) {
      return bestPlacement
    }
  }

  return null
}

function getBinUsedLengthEnd(bin: Bin) {
  return bin.placements.reduce(
    (usedLengthEnd, placement) =>
      Math.max(
        usedLengthEnd,
        placement.x + placement.length,
      ),
    0,
  )
}

function isBetterBinPlacement({
  bins,
  binIndex,
  candidate,
  bestPlacement,
}: {
  bins: Bin[]
  binIndex: number
  candidate: PlacementCandidate
  bestPlacement: {
    binIndex: number
    candidate: PlacementCandidate
  } | null
}) {
  if (!bestPlacement) {
    return true
  }

  const currentUsedLengthEnd = getBinUsedLengthEnd(
    bins[binIndex],
  )
  const bestUsedLengthEnd = getBinUsedLengthEnd(
    bins[bestPlacement.binIndex],
  )
  const candidateResultLengthEnd = Math.max(
    currentUsedLengthEnd,
    candidate.usedLengthEnd,
  )
  const bestResultLengthEnd = Math.max(
    bestUsedLengthEnd,
    bestPlacement.candidate.usedLengthEnd,
  )
  const candidateLengthIncrease =
    candidateResultLengthEnd - currentUsedLengthEnd
  const bestLengthIncrease =
    bestResultLengthEnd - bestUsedLengthEnd

  if (candidateLengthIncrease !== bestLengthIncrease) {
    return candidateLengthIncrease < bestLengthIncrease
  }

  if (candidateResultLengthEnd !== bestResultLengthEnd) {
    return candidateResultLengthEnd < bestResultLengthEnd
  }

  if (candidate.x !== bestPlacement.candidate.x) {
    return candidate.x < bestPlacement.candidate.x
  }

  if (candidate.y !== bestPlacement.candidate.y) {
    return candidate.y < bestPlacement.candidate.y
  }

  return binIndex < bestPlacement.binIndex
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

  if (
    config.preferMinimalUsedLength &&
    candidate.y !== bestCandidate.y
  ) {
    return candidate.y < bestCandidate.y
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
  const actualLength = candidate.rotated
    ? part.width
    : part.length
  const actualWidth = candidate.rotated
    ? part.length
    : part.width

  bin.placements.push({
    binIndex,
    label: part.label,
    x: candidate.x,
    y: candidate.y,
    length: actualLength,
    width: actualWidth,
    rotated: candidate.rotated,
  })

  bin.freeRects = pruneFreeRects(
    bin.freeRects.flatMap((freeRect) =>
      splitFreeRectByUsedRect(freeRect, {
        x: candidate.x,
        y: candidate.y,
        length: candidate.length,
        width: candidate.width,
      }),
    ),
  )
}

function splitFreeRectByUsedRect(
  freeRect: FreeRect,
  usedRect: FreeRect,
) {
  if (!rectsIntersect(freeRect, usedRect)) {
    return [freeRect]
  }

  const freeRight = freeRect.x + freeRect.length
  const freeBottom = freeRect.y + freeRect.width
  const usedRight = usedRect.x + usedRect.length
  const usedBottom = usedRect.y + usedRect.width
  const splitRects: FreeRect[] = []

  if (usedRect.x > freeRect.x) {
    splitRects.push({
      x: freeRect.x,
      y: freeRect.y,
      length: usedRect.x - freeRect.x,
      width: freeRect.width,
    })
  }

  if (usedRight < freeRight) {
    splitRects.push({
      x: usedRight,
      y: freeRect.y,
      length: freeRight - usedRight,
      width: freeRect.width,
    })
  }

  if (usedRect.y > freeRect.y) {
    splitRects.push({
      x: freeRect.x,
      y: freeRect.y,
      length: freeRect.length,
      width: usedRect.y - freeRect.y,
    })
  }

  if (usedBottom < freeBottom) {
    splitRects.push({
      x: freeRect.x,
      y: usedBottom,
      length: freeRect.length,
      width: freeBottom - usedBottom,
    })
  }

  return splitRects.filter(
    (rect) => rect.length > 0 && rect.width > 0,
  )
}

function rectsIntersect(
  first: FreeRect,
  second: FreeRect,
) {
  return (
    first.x < second.x + second.length &&
    first.x + first.length > second.x &&
    first.y < second.y + second.width &&
    first.y + first.width > second.y
  )
}

function rectContains(
  outer: FreeRect,
  inner: FreeRect,
) {
  return (
    inner.x >= outer.x &&
    inner.y >= outer.y &&
    inner.x + inner.length <= outer.x + outer.length &&
    inner.y + inner.width <= outer.y + outer.width
  )
}

function pruneFreeRects(freeRects: FreeRect[]) {
  return freeRects.filter(
    (rect, rectIndex) =>
      !freeRects.some(
        (otherRect, otherIndex) =>
          rectIndex !== otherIndex &&
          rectContains(otherRect, rect),
      ),
  )
}

export {
  calculateStoneCut,
  calculateStoneOrderCut,
  defaultGuillotinePackingConfig,
}
export type {
  CutCalculationResult,
  GuillotinePackingConfig,
  GuillotinePackingInput,
  GuillotinePackingItem,
  GuillotinePackingOrderInput,
  PackedPart,
}
