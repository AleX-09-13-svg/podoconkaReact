import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicStonesPath = path.resolve(
  __dirname,
  '../../public/stones',
)

function getImageExtension(imageUrl) {
  const extension = path.extname(new URL(imageUrl).pathname)

  return extension || '.webp'
}

async function downloadImage(imageUrl, outputPath) {
  const response = await fetch(imageUrl)

  if (!response.ok) {
    throw new Error(
      `Failed to download image ${imageUrl}: ${response.status} ${response.statusText}`,
    )
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  await writeFile(outputPath, buffer)
}

export async function downloadStoneImages(stones, siteOrigin) {
  await mkdir(publicStonesPath, {
    recursive: true,
  })

  const stonesWithLocalImages = []

  for (const stone of stones) {
    const fullImageUrl = new URL(
      stone.sourceImage,
      siteOrigin,
    ).href
    const extension = getImageExtension(fullImageUrl)
    const publicImagePath = `/stones/${stone.id}${extension}`
    const outputPath = path.join(
      publicStonesPath,
      `${stone.id}${extension}`,
    )

    await downloadImage(fullImageUrl, outputPath)

    stonesWithLocalImages.push({
      id: stone.id,
      name: stone.name,
      pricePerSheet: stone.pricePerSheet,
      image: publicImagePath,
    })
  }

  return stonesWithLocalImages
}
