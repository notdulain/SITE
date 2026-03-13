import React from 'react';
import config from '../../config.json';
import { fsState } from '../utils/fileSystem';

export const Ps1 = ({ cwd }: { cwd?: string }) => {
  return (
    <div>
      <span className="text-light-yellow dark:text-dark-yellow">
        {config.ps1_username}
      </span>
      <span className="text-light-gray dark:text-dark-gray">@</span>
      <span className="text-light-green dark:text-dark-green">
        {config.ps1_hostname}
      </span>
      <span className="text-light-gray dark:text-dark-gray">:$ {cwd || fsState.currentDirectory} </span>
    </div>
  );
};

export default Ps1;
