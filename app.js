import { EOL, homedir } from 'node:os';
import { chdir, stdin, stdout } from 'node:process';
import { ERROR_MESSAGES } from './constants/index.js';
import { getOperation } from './operations.js';
import { quit } from './operations/exit.js';
import { showCurrentPath, showWelcomeMessage } from './utils/index.js';

chdir(homedir())
showWelcomeMessage()
showCurrentPath()

stdin.on('data', async(data) => {
  const transformedData = data.toString('utf8').trim().split(' ')
  const [operationName, ...args] = transformedData
  const operation = getOperation?.(operationName)

  operation && await operation(...args)
  !operation && stdout.write(`${ERROR_MESSAGES.INVALID_INPUT}${EOL}`)

  showCurrentPath()
})

stdin.on('error', error => {
  stdout.write(`${ERROR_MESSAGES.OPERATION_FAILED}: ${error.message}${EOL}`)
})

process.on('SIGINT', quit)
