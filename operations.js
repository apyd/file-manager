import { normalize, join } from 'node:path'
import { EOL, homedir, userInfo, arch, cpus, availableParallelism } from 'node:os'
import { chdir, exit, stdout, cwd, } from 'node:process'
import { createHash } from 'node:crypto'
import { readdir, stat } from 'node:fs/promises'
import { getUsername } from './utils/index.js'
import { COMMANDS, ERROR_MESSAGES, FILE_TYPES, OS_PARAM } from './constants/index.js'
import { createReadStream } from 'node:fs'

export const getOperation = operationName => {
  return {
    [COMMANDS.cd]: async (dedicatedFolder) => {
      try {
        const currentPath = cwd()
        const updatedPath = join(currentPath, dedicatedFolder)
        const normalizedPath = normalize(updatedPath)
        const stats = await stat(normalizedPath)
        const isPathToDirectory = stats
        if (isPathToDirectory) {
          chdir(normalizedPath)
        } else {
          throw new Error()
        }
      } catch (error) {
        stdout.write(`${ERROR_MESSAGES.OPERATION_FAILED}: ${error}${EOL}`)
      }
    },
    [COMMANDS.ls]: async () => {
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
        stdout.write(`${ERROR_MESSAGES.OPERATION_FAILED}: ${error}${EOL}`)
      }
    },
    [COMMANDS['.exit']]: () => {
      const username = getUsername()
      stdout.write(`${EOL}Thank you for using File Manager, ${username}!${EOL}`)
      exit(0)
    },
    [COMMANDS.up]: () => {
      const currentPath = cwd()
      const homeDir = homedir()

      if (currentPath !== homeDir) {
        chdir('..')
        return
      } else {
        process.stdout.write(`You are already in the home directory${EOL}`)
      }
    },
    [COMMANDS.os]: (param) => {
      let dataToPrint = ''
      switch (param) {
        case OS_PARAM.EOL:
          dataToPrint = `End of line: ${EOL}`
          break
        case OS_PARAM.CPUS:
          let summary = ''
          const cpusList = cpus()
          summary += `Amount of CPUs: ${availableParallelism}${EOL}`
          cpusList.forEach((cpu, index) => {
            summary += `Model ${index}: ${cpu.model}${EOL}`
            summary += `Clock rate: ${cpu.speed / 1000} GHZ${EOL}${EOL}`
          })
          dataToPrint = summary
          break
        case OS_PARAM.HOMEDIR:
          dataToPrint = homedir()
          break
        case OS_PARAM.USERNAME:
          dataToPrint = userInfo().username
          break
        case OS_PARAM.ARCHITECTURE:
          dataToPrint = arch()
          break
        default:
          dataToPrint = ERROR_MESSAGES.OPERATION_FAILED
      }
      console.log(dataToPrint)
    },
    [COMMANDS.hash]: (pathToFile) => {
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
    },


  }[operationName] || process.stdout.write(`${ERROR_MESSAGES.INVALID_INPUT}${EOL}`)
}