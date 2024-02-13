import { createReadStream } from 'node:fs'
import { createHash } from 'node:crypto'
import { cwd } from 'node:process'
import { ERROR_MESSAGES } from '../constants/index.js'

export const hash = filePath => {
  try {
    const currentPath = cwd()
    const updatedPath = isAbsolute(filePath) ? filePath : join(currentPath, filePath)
    const readFileStream = createReadStream(updatedPath)
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