import { cwd, chdir } from 'node:process'
import { readdir, stat } from 'node:fs/promises'
import { parse } from 'node:path'
import { ERROR_MESSAGES, FILE_TYPES } from '../constants/index.js'
import { getCorrectPath } from '../utils/index.js'

export const cd = async (goToPath) => {
  const normalizedPath = getCorrectPath(goToPath)
  
  try {
    const stats = await stat(normalizedPath)
    const isPathToDirectory = stats.isDirectory()
    if (isPathToDirectory) {
      chdir(normalizedPath)
    } else {
      throw new Error()
    }
  } catch (error) {
    console.log(`${ERROR_MESSAGES.OPERATION_FAILED}: ${error}`)
  }
}

export const ls =  async () => {
  try {
    const currentPath = cwd()
    const dirContent = await readdir(currentPath, { withFileTypes: true })
    const mappedDirContent = dirContent.map(item => {
      return {
        name: item.name,
        type: item.isDirectory() ? FILE_TYPES.DIRECTORY : FILE_TYPES.FILE
      }
    })
    const sortedAlphabeticallyContent = mappedDirContent.sort((a, b) => a.name.localeCompare(b.name))
    const sortedByTypeContent = sortedAlphabeticallyContent.sort((a, b) => {
      if (a.type === FILE_TYPES.DIRECTORY && b.type === FILE_TYPES.FILE) {
        return -1
      }
      if (a.type === FILE_TYPES.FILE && b.type === FILE_TYPES.DIRECTORY) {
        return 1
      }
      return 0
    })
    console.table(sortedByTypeContent)
  } catch (error) {
    console.log(`${ERROR_MESSAGES.OPERATION_FAILED}: ${error}`)
  }
}

export const up = () => {
  const currentPath = cwd()
  const rootDirectory = parse(process.cwd()).root;

  if (currentPath !== rootDirectory) {
    chdir('..')
    return
  } else {
    console.log(`You are already in the home directory.`)
  }
}