import type { GuillotinePackingConfig } from '../lib/guillotinePacking'

const stoneCutConfig = {
  sheetLength: 3660,
  sheetWidth: 750,
  edgeGap: 10,
  partGap: 5,
  includeEdgeBands: true,
  allowRotate: true,
  preferMinimalUsedLength: true,
  purchaseStepQuarters: 1,
  maxQuarters: 40,
} satisfies Partial<GuillotinePackingConfig>

export default stoneCutConfig
