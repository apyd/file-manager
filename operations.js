import { normalize, join } from 'node:path'
import { EOL, homedir } from 'node:os'
import { chdir, exit, stdout, cwd } from 'node:process'
import { readdir, stat } from 'node:fs/promises'
import { getUsername } from './utils/index.js'
import { COMMAND } from './constants/index.js'

export const getOperation = operationName => {
  return {
    [COMMAND.CD]: async (dedicatedFolder) => {
      try {
        const currentPath = cwd()
        const updatedPath = join(currentPath, dedicatedFolder)
        const normalizedPath = normalize(updatedPath)
        const stats = await stat(normalizedPath)
        const isPathToDirectory = stats
        if(isPathToDirectory) {
          chdir(normalizedPath)
        } else {
          throw new Error()
        }
      } catch (error) {
        stdout.write(`Operation failed: ${error}${EOL}`)
      }
    },
    [COMMAND.LS]: async() => {
      try {
        const currentPath = cwd()
        const dirContent = await readdir(currentPath, { withFileTypes: true })
        const mappedDirContent = dirContent.map(item => {
          return {
            name: item.name,
            type: item.isDirectory() ? 'directory' : 'file'
          }
        })
        const sortedAlphabeticallyContent = mappedDirContent.sort((a, b) => a.name.localeCompare(b.name))
        const sortedByTypeContent = sortedAlphabeticallyContent.sort((a, b) => {
          if(a.type === 'directory' && b.type === 'file') {
            return -1
          }
          if(a.type === 'file' && b.type === 'directory') {
            return 1
          }
          return 0
        })
        console.table(sortedByTypeContent)
      } catch (error) {
        stdout.write(`Operation failed: ${error}${EOL}`)
      }
    },
    [COMMAND.EXIT]: () => {
      const username = getUsername()
      stdout.write(`${EOL}Thank you for using File Manager, ${username}!${EOL}`)
      exit(0)
    },
    [COMMAND.UP]: () => {
      const currentPath = cwd()
      const homeDir = homedir()

      if(currentPath !== homeDir) {
        chdir('..')
        return
      } else {
        process.stdout.write(`You are already in the home directory${EOL}`)
      }
    }
  }[operationName] || process.stdout.write(`Invalid input${EOL}`)
}