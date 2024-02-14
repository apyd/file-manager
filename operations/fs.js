import { join, dirname } from 'node:path'
import { createReadStream, createWriteStream } from 'node:fs'
import { rm as remove, rename } from 'node:fs/promises'
import { getCorrectPath } from '../utils/index.js'
import { ERROR_MESSAGES } from '../constants/index.js'

export const cat = pathToFile => {
  const normalizedPath = getCorrectPath(pathToFile)

  try {
    const readStream = createReadStream(normalizedPath, { flags: 'r' })
    readStream.on('data', chunk => {
      console.log(chunk.toString())
    })
    readStream.on('error', error => {
      console.error(ERROR_MESSAGES.OPERATION_FAILED, ' Cannot read file. Error:', error)
    })
  }
  catch(error) {
    console.error(ERROR_MESSAGES.OPERATION_FAILED, ' Error:', error)
  }
}

export const add = newFileName => {
  const filePath = getCorrectPath(newFileName)
  
  try {
    const writeStream = createWriteStream(filePath, { flags: 'wx' })
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
  const newFileNamePath = join(dirname(normalizedSourceFilePath), newFileName)

  try {
    await rename(normalizedSourceFilePath, newFileNamePath)
    console.log(`File renamed successfully. New file name: ${newFileNamePath}.`)
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

    readStream.pipe(writeStream).on('error', error => {
      console.log(ERROR_MESSAGES.OPERATION_FAILED, 'Cannot copy file. Error:', error)
    })
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
