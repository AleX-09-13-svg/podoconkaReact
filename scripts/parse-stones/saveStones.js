import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputPath = path.resolve(
  __dirname,
  '../../src/data/stones.json',
)

export async function saveStones(stones) {
  await mkdir(path.dirname(outputPath), {
    recursive: true,
  })

  await writeFile(
    outputPath,
    `${JSON.stringify(stones, null, 2)}\n`,
    'utf8',
  )
}
