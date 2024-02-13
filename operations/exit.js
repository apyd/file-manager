import { EOL } from "node:os"
import { exit, stdout } from "node:process"
import { getUsername } from "../utils/index.js"

export const quit = () => {
  const username = getUsername()
  stdout.write(`${EOL}Thank you for using File Manager, ${username}!${EOL}`)
  exit(0)
}