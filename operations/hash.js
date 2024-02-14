import { createReadStream } from 'node:fs'
import { createHash } from 'node:crypto'
import { ERROR_MESSAGES } from '../constants/index.js'
import { getCorrectPath } from '../utils/index.js'

export const hash = filePath => {
  const normalizedFilePath = getCorrectPath(filePath)
  
  try {
    const readFileStream = createReadStream(normalizedFilePath)
    const hash = createHash('sha256')
    readFileStream.on('data', (chunk) => {
      hash.update(chunk)
    });
    readFileStream.on('end', () => {
      console.log('Operation performed successfully. File hash:', hash.digest('hex'))
    })
    readFileStream.on('error', (error) => {
      throw new Error(error)
    })
  } catch (error) {
    console.log(`${ERROR_MESSAGES.OPERATION_FAILED}: ${error}`)
  }
}