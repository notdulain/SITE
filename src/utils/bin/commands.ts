// List of commands that do not require API calls

import * as bin from './index';
import config from '../../../config.json';
import { getStoredUsername } from '../terminalProfile';

// Help
interface Command {
  description: string;
  fn: (args: string[]) => Promise<string>;
  hidden: null | boolean;
}

export const help = async (args: string[]): Promise<string> => {
  const commandsWithDescriptions = Object.entries(bin)
    .filter(([, command]) => (command as unknown as Command).hidden !== true)
    .map(([commandName, command]) => {
      const description = (command as any).desc || '';
      return [commandName, { description, fn: command }] as unknown as [
        string,
        Command,
      ];
    })
    .sort();

  const maxCommandLength = Math.max(
    ...commandsWithDescriptions.map(([command]) => command.length),
  );

  const formattedCommands = commandsWithDescriptions
    .map(([command, { description }]) => {
      const padding = ' '.repeat(maxCommandLength - command.length + 4);
      return `${command}${padding}${description}`;
    })
    .join('\n');

  return `Welcome! Here are all the available commands:\n\n${formattedCommands}\n\n
[tab]: trigger completion.
[ctrl+l]/clear: clear terminal.\n
Type 'sumfetch' to display summary.
`;
};
help.desc = 'Display this help message.';

// Redirection
export const repo = async (args: string[]): Promise<string> => {
  window.open(`${config.repo}`);
  return 'Opening Github repository...';
};
repo.desc = 'Open the GitHub repository in your browser.';

export const portfolio = async (args: string[]): Promise<string> => {
  window.open(`${config.portfolio_url}`);
  return 'Opening portfolio website...';
};
portfolio.desc = 'Open the portfolio website in your browser.';

// About
export const about = async (args: string[]): Promise<string> => {
  return `Hi, I am ${config.name}. 
I am a Computer Science Undergraduate at SLIIT, a Toastmasters leader, and a Quantum enthusiast!

More about me:
'sumfetch' - short summary.
'resume' - my latest resume.
'projects' - some of my key projects.
'toastmasters' - my toastmasters journey.`;
};
about.desc = 'Display information about me.';

export const resume = async (args: string[]): Promise<string> => {
  window.open(`${config.resume_url}`);
  return 'Opening resume...';
};
resume.desc = 'Open my resume in your browser.';

export const projects = async (args: string[]): Promise<string> => {
  return `My Key Projects:
  
- TMPL 2.0: A real-time live cricket scoring platform using Next.js, TS, and Firebase.
- GymSync: Web-based Gym Management System built with Spring Boot, React, and MySQL.
- Custom DSL & Compiler: A Domain-Specific Language and compiler for HTTP API testing.
- Hextractor: Lightweight color picker tool for Windows using AutoHotkey 2.0.
- Mochai Bot: DIY hardware project with ESP32 and OLED display.
`;
};
projects.desc = 'List some of my key projects.';

export const toastmasters = async (args: string[]): Promise<string> => {
  return `Toastmasters International

I am the President of the SLIIT Toastmasters Club & Central Link Toastmasters Club.
I've also served as a VP of Public Relations and Division J PR Manager.

Speechwriting style: Psychological, Story-driven, Metaphorical.
Wait... did I ever tell you about the sandcastle metaphor?
How people build emotional structures in life, lose them, and learn to rebuild stronger?
Ah, nevermind. This is a terminal, not therapy!
`;
};
toastmasters.desc = 'Learn about my Toastmasters journey.';

// Donate / Support
export const donate = async (args: string[]): Promise<string> => {
  return `I don't need your money... but if you have a Software Engineering Internship, we can talk!
Check out my resume or contact me directly.`;
};
donate.desc = 'Ways to support my work (or hire me).';

// Contact
export const email = async (args: string[]): Promise<string> => {
  window.open(`mailto:${config.email}`);
  return `Opening mailto:${config.email}...`;
};
email.desc = 'Send me an email.';

export const github = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`);
  return 'Opening github...';
};
github.desc = 'Open my GitHub profile in your browser.';

export const linkedin = async (args: string[]): Promise<string> => {
  window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);
  return 'Opening linkedin...';
};
linkedin.desc = 'Open my LinkedIn profile in your browser.';

// Search
export const google = async (args: string[]): Promise<string> => {
  if (!args.length) {
    return 'Usage: google [search query]. Example: google how to create a website';
  }
  window.open(`https://google.com/search?q=${args.join(' ')}`);
  return `Searching google for ${args.join(' ')}...`;
};
google.desc = 'Search Google for the provided query.';

export const duckduckgo = async (args: string[]): Promise<string> => {
  if (!args.length) {
    return 'Usage: duckduckgo [search query]. Example: duckduckgo how to center a div';
  }
  window.open(`https://duckduckgo.com/?q=${args.join(' ')}`);
  return `Searching duckduckgo for ${args.join(' ')}...`;
};
duckduckgo.desc = 'Search DuckDuckGo for the provided query.';

export const bing = async (args: string[]): Promise<string> => {
  if (!args.length) {
    return 'Usage: bing [search query]. Example: bing how to use vim';
  }
  window.open(`https://bing.com/search?q=${args.join(' ')}`);
  return `Wow, really? You are using bing for ${args.join(' ')}?`;
};
bing.desc = 'Search Bing... (you sure?) for the provided query.';

export const reddit = async (args: string[]): Promise<string> => {
  if (!args.length) {
    return 'Usage: reddit [search query]. Example: reddit programming horror';
  }
  window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
  return `Searching reddit for ${args.join(' ')}...`;
};
reddit.desc = 'Search Reddit for the provided query.';

// Typical linux commands // 
import { fsState } from '../fileSystem';

export const echo = async (args: string[]): Promise<string> => {
  if (!args.length) {
    return 'Usage: echo [string]. Example: echo hello world';
  }
  const string = args.join(' ');
  const regex =
    /<(?:(script|style|object|embed|applet|noframes|noscript|noembed)(?:\s+(?:"[\S\s]*?"|'[\S\s]*?'|(?:(?!\/>)[^>])?)+)?\s*>[\S\s]*?<\/\1\s*(?=>)|(?:\/?[\w:]+\s*\/?)|(?:[\w:]+\s+(?:"[\S\s]*?"|'[\S\s]*?'|[^>]?)+\s*\/?)|\?[\S\s]*?\?|(?:!(?:(?:DOCTYPE[\S\s]*?)|(?:\[CDATA\[[\S\s]*?\]\])|(?:--[\S\s]*?--)|(?:ATTLIST[\S\s]*?)|(?:ENTITY[\S\s]*?)|(?:ELEMENT[\S\s]*?))))>/g;

  if (regex.test(string)) {
    return 'nice try lmao';
  }
  return string.replace(regex, '');
};
echo.desc = 'Print the provided string.';

export const whoami = async (args: string[]): Promise<string> => {
  return `you're ${getStoredUsername()}`;
};
whoami.desc = 'Print the current user.';

export const ls = async (args: string[]): Promise<string> => {
  const contents = fsState.fileSystem[fsState.currentDirectory] || [];
  if (contents.length === 0) return '';

  // Format with some spaces like a real terminal
  return contents.join('     ');
};
ls.desc = 'List files and directories.';

export const cd = async (args: string[]): Promise<string> => {
  if (args.length === 0) {
    fsState.currentDirectory = '~';
    return '';
  }

  const dir = args[0].replace(/\/$/, ''); // Remove trailing slash

  if (dir === 'Quantum_Research') {
    return 'cd: Quantum_Research: Access Denied. You need to understand superposition first.';
  } else if (dir === 'Startup_Ideas') {
    return 'cd: Startup_Ideas: It is a SaaS platform. That is all I can tell you right now... NDA bro.';
  } else if (dir === 'Toastmasters_Speeches') {
    return 'cd: Toastmasters_Speeches: Warning - high levels of emotional depth and metaphors detected.';
  }

  if (dir === '..') {
    if (fsState.currentDirectory === '~') {
      return 'cd: You are already at the bottom of the rabbit hole.';
    }
    const parts = fsState.currentDirectory.split('/');
    parts.pop();
    fsState.currentDirectory = parts.join('/') || '~';
    return '';
  }

  if (dir === '~') {
    fsState.currentDirectory = '~';
    return '';
  }

  // Handle absolute path from home
  const targetPath = dir.startsWith('~/') ? dir :
    (fsState.currentDirectory === '~' ? `~/${dir}` : `${fsState.currentDirectory}/${dir}`);

  if (fsState.fileSystem[targetPath]) {
    fsState.currentDirectory = targetPath;
    return '';
  }

  return `cd: ${dir}: No such file or directory`;
};
cd.desc = 'Change directory. Usage: cd [directory].';

export const pwd = async (args: string[]): Promise<string> => {
  return fsState.currentDirectory.replace('~', '/home/guest');
};
pwd.desc = 'Print the current working directory.';

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};
date.desc = 'Print the current date and time.';

export const vi = async (args: string[]): Promise<string> => {
  return `woah, you still use 'vi'? just try 'vim'.`;
};
vi.desc = 'Open the vi text editor.';

export const vim = async (args: string[]): Promise<string> => {
  return `root access needed, try sudo`;
};
vim.desc = 'Open the vim text editor.';

export const nvim = async (args: string[]): Promise<string> => {
  return `'nvim'? too fancy. why not 'emacs'?`;
};
nvim.desc = 'Open the nvim text editor.';

export const emacs = async (args?: string[]): Promise<string> => {
  return `you know what? just use vscode.`;
};
emacs.desc = 'Open the emacs text editor.';

export const sudo = async (args?: string[]): Promise<string> => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'); // ...I'm sorry
  return `Permission denied: with little power comes... no responsibility? `;
};
sudo.desc = 'Execute a command as the superuser.';

export const gui = async (args?: string[]): Promise<string> => {
  return `Error 404: Graphical User Interface not found. 
At this point... just use VS Code like a normal person.`;
};
gui.desc = 'Switch to the Graphical User Interface.';

export const mkdir = async (args?: string[]): Promise<string> => {
  if (!args || args.length === 0) return 'mkdir: missing operand';
  const dirName = args[0].replace(/\/$/, '');

  if (!fsState.fileSystem[fsState.currentDirectory]) {
    fsState.fileSystem[fsState.currentDirectory] = [];
  }

  if (fsState.fileSystem[fsState.currentDirectory].includes(dirName)) {
    return `mkdir: cannot create directory '${dirName}': File exists`;
  }

  fsState.fileSystem[fsState.currentDirectory].push(dirName);

  // Sort the contents so it looks nice
  fsState.fileSystem[fsState.currentDirectory].sort();

  const newDirPath = fsState.currentDirectory === '~' ? `~/${dirName}` : `${fsState.currentDirectory}/${dirName}`;
  fsState.fileSystem[newDirPath] = [];

  return '';
};
mkdir.desc = 'Make directories. Usage: mkdir [directory].';

export const rm = async (args?: string[]): Promise<string> => {
  return `rm: access denied. Nice try! I'm not letting you delete my portfolio.`;
};
rm.desc = 'Remove files or directories. Usage: rm [file].';

export const touch = async (args?: string[]): Promise<string> => {
  return `touch: permission denied. Please don't touch me without consent.`;
};
touch.desc = 'Create an empty file. Usage: touch [file].';

export const cat = async (args?: string[]): Promise<string> => {
  const cats = [
    `
    /\\_____/\\
   /  o   o  \\
  ( ==  ^  == )
   )         (
  (           )
 ( (  )   (  ) )
(__(__)___(__)__)

meow!`,
    `
 _._     _,-'""\`-._
(,-.\`._,'(       |\`-/|
    \`-.-' \\ )-\`( , o o)
          \`-    \\\`_\`"'-`,
    `
  /\\_/\\
 ( o.o )
  > ^ <`,
    `
    |\\__/,|   (\`\\
  _.|o o  |_   ) )
-(((---(((--------`,
    `
 /\\_/\\
( o o )
 > ^ <
 / 0 \\
(_)-(_)`,
  ];
  return cats[Math.floor(Math.random() * cats.length)];
};
cat.desc = 'Concatenate and display file contents... or maybe just a cat.';

export const nano = async (args?: string[]): Promise<string> => {
  return `root access needed, try sudo`;
};
nano.desc = 'Open the nano text editor.';

export const code = async (args?: string[]): Promise<string> => {
  return `Never gonna give you up, never gonna let you down...`;
};
code.desc = 'Open Visual Studio Code.';

// Banner
export const banner = (args?: string[]): string => {
  return `
██████╗ ██╗   ██╗██╗      █████╗ ██╗███╗   ██╗███████╗    ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
██╔══██╗██║   ██║██║     ██╔══██╗██║████╗  ██║██╔════╝    ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
██║  ██║██║   ██║██║     ███████║██║██╔██╗ ██║███████╗       ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
██║  ██║██║   ██║██║     ██╔══██║██║██║╚██╗██║╚════██║       ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
██████╔╝╚██████╔╝███████╗██║  ██║██║██║ ╚████║███████║       ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝       ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
                                                                                                                           

Type 'help' to see the list of available commands.
Type 'sumfetch' to display summary.
Type 'repo' or click <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.repo}" target="_blank">here</a></u> for the Github repository.
`;
};
banner.desc = 'Display the welcome banner.';
