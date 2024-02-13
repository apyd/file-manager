import { COMMANDS } from "./constants/index.js"
import { up, ls, cd } from "./operations/nwd.js"
import { cat, add, rn, cp, mv, rm } from "./operations/file.js"
import { exit } from "./operations/exit.js"

export const getOperation = (operationName) => {
  return {
    [COMMANDS.up]: up,
    [COMMANDS.ls]: ls,
    [COMMANDS.cd]: cd,
    [COMMANDS.cat]: cat,
    [COMMANDS.add]: add,
    [COMMANDS.rn]: rn,
    [COMMANDS.cp]: cp,
    [COMMANDS.mv]: mv,
    [COMMANDS.rm]: rm,
    [COMMANDS.exit]: exit,
    [COMMANDS.os]: os,
    [COMMANDS.hash]: hash,
    [COMMANDS.compress]: compress,
    [COMMANDS.decompress]: decompress
  }[operationName]
}