import { normalize, join } from 'node:path'
import { EOL, homedir } from 'node:os'
import { chdir, exit, stdout, cwd } from 'node:process'
import { stat } from 'node:fs/promises'
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
      } catch {
        stdout.write(`Operation failed${EOL}`)
      }
    },
    [COMMAND.LS]: async (dedicatedFolder) => {
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
      } catch {
        stdout.write(`Operation failed${EOL}`)
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