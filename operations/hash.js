import { createReadStream } from 'node:fs'
import { createHash } from 'node:crypto'
import { ERROR_MESSAGES } from '../constants/index.js'
import { getCorrectPath } from '../utils/index.js'

export const hash = filePath => {
  const normalizedFilePath = getCorrectPath(filePath)
  
  try {
    const readStream = createReadStream(normalizedFilePath, { flags: 'r' })
    const hash = createHash('sha256')
    readStream.on('data', (chunk) => {
      hash.update(chunk)
    });
    readStream.on('end', () => {
      console.log('File hash:', hash.digest('hex'))
    })
    readStream.on('error', (error) => {
      throw new Error(error)
    })
  } catch (error) {
    console.log(`${ERROR_MESSAGES.OPERATION_FAILED}: ${error}`)
  }
}