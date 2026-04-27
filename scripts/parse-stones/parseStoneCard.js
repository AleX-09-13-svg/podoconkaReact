export function parseStoneCard($, card) {
  const $card = $(card)
  const rawData = $card.attr('data-data')
  const sourceImage = $card.find('img').first().attr('src')

  if (!rawData || !sourceImage) {
    return null
  }

  const data = JSON.parse(rawData)
  const price = data.prices?.[0]?.base?.value

  if (!data.id || !data.name || typeof price !== 'number') {
    return null
  }

  return {
    id: String(data.id),
    name: data.name,
    pricePerSheet: Math.round(price),
    sourceImage,
  }
}
