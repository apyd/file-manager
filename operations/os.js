import { EOL, cpus, userInfo, homedir, arch } from 'node:os'

export const os = (param) => {
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
}