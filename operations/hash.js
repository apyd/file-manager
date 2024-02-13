import { createReadStream } from 'node:fs'
import { createHash } from 'node:crypto'
import { ERROR_MESSAGES } from '../constants/index.js'

export const hash = pathToFile => {
  try {
    const readFileStream = createReadStream(pathToFile)
    const hash = createHash('sha256')
    readFileStream.on('data', (chunk) => {
      hash.update(chunk)
    });
    readFileStream.on('end', () => {
      console.log('Hash:', hash.digest('hex'))
    })
    readFileStream.on('error', (error) => {
      throw new Error(error)
    })
  } catch (error) {
    console.log(`${ERROR_MESSAGES.OPERATION_FAILED}: ${error}`)
  }
}