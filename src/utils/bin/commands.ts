// List of commands that do not require API calls

import * as bin from './index';
import config from '../../../config.json';

// Help
export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(', ');
  var c = '';
  for (let i = 1; i <= Object.keys(bin).sort().length; i++) {
    if (i % 7 === 0) {
      c += Object.keys(bin).sort()[i - 1] + '\n';
    } else {
      c += Object.keys(bin).sort()[i - 1] + ' ';
    }
  }
  return `Welcome! Here are all the available commands:
\n${c}\n
[tab]: trigger completion.
[ctrl+l]/clear: clear terminal.\n
Type 'sumfetch' to display summary.
`;
};

// Redirection
export const repo = async (args: string[]): Promise<string> => {
  window.open(`${config.repo}`);
  return 'Opening Github repository...';
};

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

export const resume = async (args: string[]): Promise<string> => {
  window.open(`${config.resume_url}`);
  return 'Opening resume...';
};

export const projects = async (args: string[]): Promise<string> => {
  return `My Key Projects:
  
- TMPL 2.0: A real-time live cricket scoring platform using Next.js, TS, and Firebase.
- GymSync: Web-based Gym Management System built with Spring Boot, React, and MySQL.
- Custom DSL & Compiler: A Domain-Specific Language and compiler for HTTP API testing.
- Hextractor: Lightweight color picker tool for Windows using AutoHotkey 2.0.
- Mochai Bot: DIY hardware project with ESP32 and OLED display.
`;
};

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

// Donate / Support
export const donate = async (args: string[]): Promise<string> => {
  return `I don't need your money... but if you have a Software Engineering Internship, we can talk!
Check out my resume or contact me directly.`;
};

// Contact
export const email = async (args: string[]): Promise<string> => {
  window.open(`mailto:${config.email}`);
  return `Opening mailto:${config.email}...`;
};

export const github = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`);
  return 'Opening github...';
};

export const linkedin = async (args: string[]): Promise<string> => {
  window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);
  return 'Opening linkedin...';
};

// Search
export const google = async (args: string[]): Promise<string> => {
  window.open(`https://google.com/search?q=${args.join(' ')}`);
  return `Searching google for ${args.join(' ')}...`;
};

export const duckduckgo = async (args: string[]): Promise<string> => {
  window.open(`https://duckduckgo.com/?q=${args.join(' ')}`);
  return `Searching duckduckgo for ${args.join(' ')}...`;
};

export const bing = async (args: string[]): Promise<string> => {
  window.open(`https://bing.com/search?q=${args.join(' ')}`);
  return `Wow, really? You are using bing for ${args.join(' ')}?`;
};

export const reddit = async (args: string[]): Promise<string> => {
  window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
  return `Searching reddit for ${args.join(' ')}...`;
};

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${config.ps1_username}`;
};

export const ls = async (args: string[]): Promise<string> => {
  return `Desktop/     Documents/     Downloads/     Pictures/     Quantum_Research/     Startup_Ideas/     Toastmasters_Speeches/`;
};

export const cd = async (args: string[]): Promise<string> => {
  if (args.length === 0) return 'cd: missing operand';
  const dir = args[0];
  if (dir === 'Quantum_Research' || dir === 'Quantum_Research/') {
    return 'cd: Quantum_Research: Access Denied. You need to understand superposition first.';
  } else if (dir === 'Startup_Ideas' || dir === 'Startup_Ideas/') {
    return 'cd: Startup_Ideas: It is a SaaS platform. That is all I can tell you right now... NDA bro.';
  } else if (dir === 'Toastmasters_Speeches' || dir === 'Toastmasters_Speeches/') {
    return 'cd: Toastmasters_Speeches: Warning - high levels of emotional depth and metaphors detected.';
  } else if (dir === 'Desktop' || dir === 'Desktop/') {
    return 'cd: Desktop: There is nothing here, I use a terminal for everything.';
  } else if (dir === '..') {
    return 'cd: You are already at the bottom of the rabbit hole.';
  }
  return `cd: ${dir}: No such file or directory (wait, did you try 'ls' first?)`;
};

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

export const vi = async (args: string[]): Promise<string> => {
  return `woah, you still use 'vi'? just try 'vim'.`;
};

export const vim = async (args: string[]): Promise<string> => {
  return `'vim' is so outdated. how about 'nvim'?`;
};

export const nvim = async (args: string[]): Promise<string> => {
  return `'nvim'? too fancy. why not 'emacs'?`;
};

export const emacs = async (args?: string[]): Promise<string> => {
  return `you know what? just use vscode.`;
};

export const sudo = async (args?: string[]): Promise<string> => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'); // ...I'm sorry
  return `Permission denied: with little power comes... no responsibility? `;
};

export const gui = async (args?: string[]): Promise<string> => {
  return `Error 404: Graphical User Interface not found. 
At this point... just use VS Code like a normal person.`;
};

export const mkdir = async (args?: string[]): Promise<string> => {
  return `mkdir: cannot create directory. Read-only file system. Plus, I don't trust you.`;
};

export const rm = async (args?: string[]): Promise<string> => {
  return `rm: access denied. Nice try! I'm not letting you delete my portfolio.`;
};

export const touch = async (args?: string[]): Promise<string> => {
  return `touch: permission denied. Please don't touch me without consent.`;
};

export const cat = async (args?: string[]): Promise<string> => {
  return `Meow.
...
Just kidding, I'm not a cat person.`;
};

export const nano = async (args?: string[]): Promise<string> => {
  return `Opening nano...
Just kidding. Who uses nano anyway?`;
};

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
