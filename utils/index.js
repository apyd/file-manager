import { stdout, argv, cwd } from 'node:process'
import { EOL } from 'node:os'

export const getUsername = () => {
  const args = argv.slice(2)
  const username = args[0]?.split('=')?.[1] || 'Username'
  return username
}

export const showWelcomeMessage = () => {
  const username = getUsername()
  stdout.write(`Welcome to the File Manager, ${username}!${EOL}`)
}

export const showCurrentPath = () => {
  const currentPath = cwd()
  stdout.write(`You are currently in ${currentPath}${EOL}${EOL}`)
}