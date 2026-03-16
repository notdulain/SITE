import React, { useState, useEffect } from 'react';

export const InitialBootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const bootMessages = [
    'Initializing kernel v9.0.4...',
    'Mounting localized filesystems... [OK]',
    'Loading user protocols...',
    'Establishing secure mainframe uplink...',
    'Bypassing visual security grids... [OK]',
    'Accessing neural interface...',
    'Connection established. Entering login matrix.'
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootMessages.length) {
        setLines((prev) => [...prev, bootMessages[currentLine]]);
        currentLine++;
      }
      
      if (currentLine >= bootMessages.length) {
        clearInterval(interval);
        setTimeout(onComplete, 800); // Wait a bit before transitioning
      }
    }, 150); // extremely fast sci-fi typing speed

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="w-full max-w-3xl font-mono text-sm md:text-base">
      {lines.map((line, idx) => (
        <div key={idx} className="mb-1 text-light-green dark:text-dark-green opacity-90">
          {'> '}{line}
        </div>
      ))}
      <div className="mt-2 text-light-gray dark:text-dark-gray animate-pulse">_</div>
    </div>
  );
};

export const EnvironmentSetup: React.FC<{ username: string, onComplete: () => void }> = ({ username, onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const setupMessages = [
      `Authenticating highly classified entity: ${username}...`,
      'Allocating 128TB of quantum memory...',
      `Decrypting profile payload for [${username}]...`,
      'Assembling grid topology...',
      'Injecting custom UNIX constraints...',
    ];

    let currentLine = 0;
    const lineInterval = setInterval(() => {
      if (currentLine < setupMessages.length) {
        setLines((prev) => [...prev, setupMessages[currentLine]]);
        currentLine++;
      }
    }, 400);

    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 12) + 2; 
      if (currentProgress > 100) currentProgress = 100;
      setProgress(currentProgress);
      
      if (currentProgress === 100) {
        clearInterval(lineInterval);
        clearInterval(progressInterval);
        setLines((prev) => [...prev, '> ACCESS GRANTED. WELCOME TO THE GRID.']);
        setTimeout(onComplete, 1200);
      }
    }, 120);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
    };
  }, [username, onComplete]);

  const progressBar = () => {
    const totalBars = 30;
    const filledBars = Math.floor((progress / 100) * totalBars);
    const emptyBars = Math.max(0, totalBars - filledBars);
    return `[${'='.repeat(filledBars)}${filledBars > 0 && filledBars < totalBars ? '>' : ''}${' '.repeat(Math.max(0, emptyBars - (filledBars > 0 && filledBars < totalBars ? 1 : 0)))}] ${progress}%`;
  };

  return (
    <div className="w-full max-w-3xl font-mono text-sm md:text-base h-full flex flex-col justify-end">
      {lines.map((line, idx) => (
        <div key={idx} className={`mb-2 ${line.includes('GRANTED') ? 'text-light-yellow dark:text-dark-yellow font-bold text-lg drop-shadow-[0_0_8px_rgba(241,250,140,0.8)]' : 'text-light-green dark:text-dark-green'} opacity-90`}>
          {line.startsWith('>') ? '' : '> '}{line}
        </div>
      ))}
      <div className="mt-6 mb-8 text-light-blue dark:text-dark-blue font-bold tracking-widest whitespace-pre drop-shadow-[0_0_8px_rgba(139,233,253,0.6)]">
        {progress < 100 ? progressBar() : `[==============================] 100%`}
      </div>
    </div>
  );
};
