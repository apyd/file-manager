import { EOL, cpus, userInfo, homedir, arch, availableParallelism } from 'node:os'
import { OS_PARAM } from '../constants/index.js'
import { ERROR_MESSAGES } from '../constants/index.js'

export const os = (param) => {
  let dataToPrint = ''
  switch (param) {
    case OS_PARAM.EOL:
      dataToPrint = `End of line: ${JSON.stringify(EOL)}`
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
      dataToPrint = `Home directory: ${homedir()}`
      break
    case OS_PARAM.USERNAME:
      dataToPrint = `Current system user name: ${userInfo().username}`
      break
    case OS_PARAM.ARCHITECTURE:
      dataToPrint = `CPU architecture: ${arch()}`
      break
    default:
      dataToPrint = `${ERROR_MESSAGES.OPERATION_FAILED}. Invalid parameter: ${param}. Use one of available: ${Object.values(OS_PARAM)}${EOL}`
  }
  console.log(dataToPrint)
}