import { join, dirname } from 'node:path'
import { createReadStream, createWriteStream } from 'node:fs'
import { rm as remove } from 'node:fs/promises'
import { getCorrectPath } from '../utils/index.js'
import { ERROR_MESSAGES } from '../constants/index.js'

export const cat = pathToFile => {
  const normalizedPath = getCorrectPath(pathToFile)

  const readStream = createReadStream(normalizedPath)
  readStream.on('data', chunk => {
    console.log(chunk.toString())
  })
  readStream.on('error', error => {
    console.error(ERROR_MESSAGES.OPERATION_FAILED, ' Cannot read file. Error:', error)
  })
}

export const add = newFileName => {
  const filePath = getCorrectPath(newFileName)
  
  try {
    const writeStream = createWriteStream(filePath, { flags: 'ax' })
    writeStream.on('open', () => {
      console.log(`File created successfully. Path to file ${filePath}`)
    })
    writeStream.on('error', error => {
      console.error(ERROR_MESSAGES.OPERATION_FAILED, ' Error:', error)
    })
  }
  catch (error) {
    console.error(ERROR_MESSAGES.OPERATION_FAILED, ' Error:', error)
  }
}

export const rn = async (sourceFilePath, newFileName) => {
  const normalizedSourceFilePath = getCorrectPath(sourceFilePath)
  const renamedFilePath = join(dirname(normalizedSourceFilePath), newFileName)

  try {
    await rename(originalFilePath, renamedFilePath)
    console.log(`File renamed successfully. New file name: ${newFileName}.`)
  }
  catch (error) {
    console.error(ERROR_MESSAGES.OPERATION_FAILED, ' Error:', error)
  }
}

export const cp = (pathToFile, newPath) => {
  const sourceFilePath = getCorrectPath(pathToFile)
  const newFilePath = getCorrectPath(newPath)

  try {
    const readStream = createReadStream(sourceFilePath, { flags: 'r' })
    const writeStream = createWriteStream(newFilePath, { flags: 'wx' })

    readStream.on('error', error => {
      console.error(ERROR_MESSAGES.OPERATION_FAILED, 'Cannot read file. Error:', error)
    })

    writeStream.on('error', error => {
      console.error(ERROR_MESSAGES.OPERATION_FAILED, 'Cannot write file. Error:', error)
    })

    readStream.pipe(writeStream)
    console.log(`File copied successfully. New file path: ${newFilePath}`)
  }
  catch (error) {
    console.error(ERROR_MESSAGES.OPERATION_FAILED, ' Error:', error)
  }
}

export const mv = async (pathToFile, destinationPath) => {
  const normalizedCurrentFilePath = getCorrectPath(pathToFile)
  const normalizedNewFilePath = getCorrectPath(destinationPath)

  try {
    const readStream = createReadStream(normalizedCurrentFilePath, { flags: 'r' })
    const writeStream = createWriteStream(normalizedNewFilePath, { flags: 'wx' })

    readStream.pipe(writeStream)
    await remove(normalizedCurrentFilePath)
    console.log(`File moved successfully. New path: ${normalizedNewFilePath}`)
  }
  catch (error) {
    console.error(ERROR_MESSAGES.OPERATION_FAILED, ' Error:', error)
  }
}

export const rm = async (pathToFile) => {
  const normalizedPath = getCorrectPath(pathToFile)

  try {
    await remove(normalizedPath)
    console.log(`File ${pathToFile} removed successfully.`)
  }
  catch (error) {
    console.error(ERROR_MESSAGES.OPERATION_FAILED, ' Error:', error)
  }
}
