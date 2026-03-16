import * as bin from './bin';

export const commandExists = (command: string) => {
  if (command.split(' ')[0].startsWith('./')) {
    return true;
  }

  const commands = ['clear', ...Object.keys(bin)];
  return commands.indexOf(command.split(' ')[0].toLowerCase()) !== -1;
};
