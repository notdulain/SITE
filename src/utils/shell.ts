import React from 'react';
import * as bin from './bin';

import { fsState } from './fileSystem';

export const shell = async (
  command: string,
  setHistory: (value: string, cwd?: string) => void,
  clearHistory: () => void,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
) => {
  const args = command.split(' ');
  args[0] = args[0].toLowerCase();
  const requiresRootAccess = args[0].startsWith('./');

  const currentCwd = fsState.currentDirectory;

  if (args[0] === 'clear') {
    clearHistory();
  } else if (command === '') {
    setHistory('', currentCwd);
  } else if (requiresRootAccess) {
    setHistory('root access needed, try sudo', currentCwd);
  } else if (Object.keys(bin).indexOf(args[0]) === -1) {
    setHistory(
      `shell: command not found: ${args[0]}. Try 'help' to get started.`,
      currentCwd
    );
  } else {
    const output = await bin[args[0]](args.slice(1));
    setHistory(output, currentCwd);
  }

  setCommand('');
};
