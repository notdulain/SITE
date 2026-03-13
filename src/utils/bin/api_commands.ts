// // List of commands that require API calls

// Just a comment to test a PR

import { getProjects } from '../api';
import { getQuote } from '../api';
import { getReadme } from '../api';
import { getWeather } from '../api';

export const projects = async (args: string[]): Promise<string> => {
  const projects = await getProjects();
  return projects
    .map(
      (repo: any) =>
        `${repo.name} - <a class="text-light-blue dark:text-dark-blue underline" href="${repo.html_url}" target="_blank">${repo.html_url}</a>`,
    )
    .join('\n');
};
projects.desc = 'List some of my GitHub projects.';

export const quote = async (args: string[]): Promise<string> => {
  const data = await getQuote();
  return data.quote;
};
quote.desc = 'Get a random quote.';

export const readme = async (args: string[]): Promise<string> => {
  const readme = await getReadme();
  return `Opening GitHub README...\n
  ${readme}`;
};
readme.desc = 'Open the GitHub Readme file.';

export const weather = async (args: string[]): Promise<string> => {
  const city = args.join('+');
  if (!city) {
    return 'Usage: weather [city]. Example: weather casablanca';
  }
  const weather = await getWeather(city);
  return weather;
};
weather.desc = 'Get the weather for a specific city. Usage: weather [city].';
