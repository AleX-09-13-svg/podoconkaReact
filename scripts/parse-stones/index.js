import * as cheerio from 'cheerio'

import { downloadStoneImages } from './downloadStoneImages.js'
import { parseStoneCard } from './parseStoneCard.js'
import { saveStones } from './saveStones.js'

const catalogUrl = 'https://akrilium.ru/catalog/grandex/'
const catalogEncoding = 'utf-8'
const siteOrigin = new URL(catalogUrl).origin

async function fetchHtml(url) {
  if (!url) {
    throw new Error('Add catalogUrl before running the parser.')
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Failed to fetch catalog HTML: ${response.status} ${response.statusText}`,
    )
  }

  const htmlBuffer = await response.arrayBuffer()
  const decoder = new TextDecoder(catalogEncoding)

  return decoder.decode(htmlBuffer)
}

function parseStones(html) {
  const $ = cheerio.load(html)
  const cards = $('[data-role="item"][data-data]').toArray()

  return cards
    .map((card) => parseStoneCard($, card))
    .filter(Boolean)
}

async function main() {
  const html = await fetchHtml(catalogUrl)
  const stones = parseStones(html)
  const stonesWithLocalImages = await downloadStoneImages(
    stones,
    siteOrigin,
  )

  await saveStones(stonesWithLocalImages)
  console.info(`Saved ${stonesWithLocalImages.length} stones.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
