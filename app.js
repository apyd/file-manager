import { homedir } from 'node:os';
import { chdir, stdin, stdout } from 'node:process';
import { COMMANDS, ERROR_MESSAGES } from './constants/index.js';
import { getOperation } from './operations/operations.js';
import { getUsername } from './utils/index.js';

import { getListOfKeys, showCurrentPath, showWelcomeMessage } from './utils/index.js';
import readline  from 'node:readline/promises';

chdir(homedir())
showWelcomeMessage()
showCurrentPath()

const rl = readline.createInterface({ input: stdin, output: stdout });

rl.on('line', async(data) => {
  const transformedData = data.toString('utf8').trim().split(' ')
  const [operationName, ...args] = transformedData
  const operation = getOperation?.(operationName)

  operation && await operation(...args)
  !operation && console.log(`${ERROR_MESSAGES.INVALID_INPUT}. Available commands: ${getListOfKeys(COMMANDS)}`)

  showCurrentPath()
})

rl.on('error', error => {
  console.log(`${ERROR_MESSAGES.OPERATION_FAILED}: ${error.message}`)
})

rl.on('SIGINT', () => {
  const username = getUsername()
  console.log(`Thank you for using File Manager, ${username}!`)
  rl.close()
})
