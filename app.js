import { homedir } from 'node:os';
import { chdir, stdin } from 'node:process';
import { ERROR_MESSAGES } from './constants/index.js';
import { getOperation, quit } from './operations/operations.js';
import { showCurrentPath, showWelcomeMessage } from './utils/index.js';

chdir(homedir())
showWelcomeMessage()
showCurrentPath()

stdin.on('data', async(data) => {
  const transformedData = data.toString('utf8').trim().split(' ')
  const [operationName, ...args] = transformedData
  const operation = getOperation?.(operationName)

  operation && await operation(...args)
  !operation && console.log(`${ERROR_MESSAGES.INVALID_INPUT}`)

  showCurrentPath()
})

stdin.on('error', error => {
  console.log(`${ERROR_MESSAGES.OPERATION_FAILED}: ${error.message}`)
})

process.on('SIGINT', quit)
