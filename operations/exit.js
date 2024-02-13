import { exit } from "node:process"
import { getUsername } from "../utils/index.js"

export const quit = () => {
  const username = getUsername()
  console.log(`Thank you for using File Manager, ${username}!`)
  exit(0)
}