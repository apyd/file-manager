import { argv, cwd } from 'node:process'
import { isAbsolute, join, normalize } from 'node:path'

export const getUsername = () => {
  const args = argv.slice(2)
  const username = args[0]?.split('=')?.[1] || 'Username'
  return username
}

export const showWelcomeMessage = () => {
  const username = getUsername()
  console.log(`Welcome to the File Manager, ${username}!`)
}

export const showCurrentPath = () => {
  const currentPath = cwd()
  console.log(`You are currently in ${currentPath}`)
}

export const getCorrectPath = path => {
  const currentPath = cwd()
  if(!path) return ''
  return normalize(isAbsolute(path) ? path : join(currentPath, path))
}

export const getListOfKeys = obj => {
  return Object.keys(obj).join(', ')
}