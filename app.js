import { EOL, homedir } from 'node:os';
import { chdir, stdin, stdout } from 'node:process';
import { COMMANDS, ERROR_MESSAGES } from './constants/index.js';
import { getOperation } from './operations.js';
import { showCurrentPath, showWelcomeMessage } from './utils/index.js';

chdir(homedir())
showWelcomeMessage()
showCurrentPath()

stdin.on('data', async(data) => {
  const transformedData = data.toString('utf8').trim().split(' ')
  const [operationName, ...args] = transformedData
  const operation = getOperation?.(operationName)

  if(typeof operation === 'function') {
    await operation(...args)
  }

  showCurrentPath()
})

stdin.on('error', error => {
  stdout.write(`${ERROR_MESSAGES.OPERATION_FAILED}: ${error.message}${EOL}`)
})

process.on('SIGINT', getOperation(COMMANDS['.exit']))

