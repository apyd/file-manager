export const COMMAND_TYPES = {
  'NAVIGATION': 'navigation',
  'EXIT': 'exit',
  'FILE_OPERATION': 'fs',
  'ZLIB': 'zlib',
  'HASH': 'hash',
  'OS': 'os'
}

export const COMMANDS = {
  'cd': 'cd',
  'ls': 'ls',
  'up': 'up',
  '.exit': '.exit',
  'cat': 'cat',
  'add': 'add',
  'rn': 'rn',
  'cp': 'cp',
  'mv': 'mv',
  'rm': 'rm',
  'os': 'os',
  'hash': 'hash',
  'compress': 'compress',
  'decompress': 'decompress'
}

export const COMMAND_TO_TYPE = {
  [COMMANDS.cd]: COMMAND_TYPES.NAVIGATION,
  [COMMANDS.ls]: COMMAND_TYPES.NAVIGATION,
  [COMMANDS.up]: COMMAND_TYPES.NAVIGATION,
  [COMMANDS['.exit']]: COMMAND_TYPES.EXIT,
  [COMMANDS.cat]: COMMAND_TYPES.FILE_OPERATION,
  [COMMANDS.add]: COMMAND_TYPES.FILE_OPERATION,
  [COMMANDS.rn]: COMMAND_TYPES.FILE_OPERATION,
  [COMMANDS.cp]: COMMAND_TYPES.FILE_OPERATION,
  [COMMANDS.mv]: COMMAND_TYPES.FILE_OPERATION,
  [COMMANDS.rm]: COMMAND_TYPES.FILE_OPERATION,
  [COMMANDS.os]: COMMAND_TYPES.OS,
  [COMMANDS.hash]: COMMAND_TYPES.HASH,
  [COMMANDS.compress]: COMMAND_TYPES.ZLIB,
  [COMMANDS.decompress]: COMMAND_TYPES.ZLIB,
}

export const OS_PARAM = {
  'EOL': '--EOL',
  'CPUS': '--cpus',
  'HOMEDIR': '--homedir',
  'ARCHITECTURE': '--architecture',
  'USERNAME': '--username'
}

export const FILE_TYPES = {
  DIRECTORY: 'directory',
  FILE: 'file'
}

export const ERROR_MESSAGES = {
  OPERATION_FAILED: 'Operation failed',
  INVALID_INPUT: 'Invalid input'
}