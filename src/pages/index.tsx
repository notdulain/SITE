import Head from 'next/head';
import React from 'react';
import config from '../../config.json';
import { Input } from '../components/input';
import { useHistory } from '../components/history/hook';
import { History } from '../components/history/History';
import { banner } from '../utils/bin';
import {
  getDefaultUsername,
  getStoredUsername,
  hasStoredUsername,
  sanitizeUsername,
  saveUsername,
} from '../utils/terminalProfile';
import { InitialBootSequence, EnvironmentSetup } from '../components/BootSequence';

interface IndexPageProps {
  inputRef: React.MutableRefObject<HTMLInputElement>;
}

const IndexPage: React.FC<IndexPageProps> = ({ inputRef }) => {
  const containerRef = React.useRef(null);
  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const {
    history,
    command,
    lastCommandIndex,
    setCommand,
    setHistory,
    clearHistory,
    setLastCommandIndex,
  } = useHistory([]);
  
  const [username, setUsername] = React.useState(getDefaultUsername());
  const [nameInput, setNameInput] = React.useState('');
  const [hasLoadedProfile, setHasLoadedProfile] = React.useState(false);
  const [loginStep, setLoginStep] = React.useState<0 | 1 | 2 | 3>(0);

  const init = React.useCallback(() => setHistory(banner()), []);

  React.useEffect(() => {
    init();
  }, [init]);

  React.useEffect(() => {
    const storedUsername = getStoredUsername();
    const shouldPromptForName = !hasStoredUsername();

    setUsername(storedUsername);
    setLoginStep(shouldPromptForName ? 0 : 3);
    setHasLoadedProfile(true);
  }, []);

  React.useEffect(() => {
    if (loginStep === 1) {
      nameInputRef.current?.focus();
    }
  }, [loginStep]);

  React.useEffect(() => {
    if (loginStep === 3 && inputRef.current) {
      inputRef.current.scrollIntoView();
      inputRef.current.focus({ preventScroll: true });
    }
  }, [history, inputRef, loginStep]);

  const onSubmitName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextUsername = saveUsername(nameInput);

    if (!nextUsername) {
      return;
    }

    setUsername(nextUsername);
    setNameInput(nextUsername);
    setLoginStep(2);
  };

  if (!hasLoadedProfile) {
    return (
      <div className="bg-light-background dark:bg-dark-background w-full h-full"></div>
    );
  }

  if (loginStep === 0) {
    return (
      <>
        <Head>
          <title>{config.title}</title>
        </Head>
        <div className="p-8 h-full bg-light-background dark:bg-dark-background flex flex-col justify-end">
          <InitialBootSequence onComplete={() => setLoginStep(1)} />
        </div>
      </>
    );
  }

  if (loginStep === 1) {
    return (
      <>
        <Head>
          <title>{config.title}</title>
        </Head>
        <div className="p-4 md:p-8 overflow-hidden h-full flex items-center justify-center bg-light-background dark:bg-dark-background">
          <div className="relative p-1 bg-gradient-to-r from-light-green to-light-yellow dark:from-dark-green dark:to-dark-yellow animate-pulse w-full max-w-xl shadow-[0_0_40px_rgba(80,250,123,0.3)]">
            <form
              className="w-full bg-light-background dark:bg-dark-background p-8 md:p-12 relative overflow-hidden"
              onSubmit={onSubmitName}
            >
              <div 
                className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
                style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #50fa7b 2px, #50fa7b 4px)' }}
              ></div>
              
              <div className="text-light-green dark:text-dark-green mb-4 text-xs md:text-sm tracking-widest uppercase font-mono drop-shadow-[0_0_5px_rgba(80,250,123,0.5)]">
                System Interface
              </div>
              <h1 className="text-light-yellow dark:text-dark-yellow text-2xl md:text-4xl mb-6 font-bold tracking-tight drop-shadow-[0_0_10px_rgba(241,250,140,0.8)]">
                IDENTIFY PROTOCOL
              </h1>

              <div className="flex flex-col relative z-10">
                <label
                  htmlFor="terminal-name"
                  className="block text-light-gray dark:text-dark-gray mb-2 font-mono text-sm uppercase tracking-wider"
                >
                  Enter Identity Alias
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-light-green dark:text-dark-green font-bold animate-pulse">{'>'}</span>
                  <input
                    ref={nameInputRef}
                    id="terminal-name"
                    type="text"
                    value={nameInput}
                    onChange={(event) =>
                      setNameInput(sanitizeUsername(event.target.value))
                    }
                    className="w-full bg-light-background dark:bg-dark-background border-2 border-light-green dark:border-dark-green pl-10 pr-4 py-4 text-light-green dark:text-dark-green focus:outline-none focus:shadow-[0_0_15px_rgba(80,250,123,0.6)] transition-all font-mono text-lg"
                    placeholder="[ USERNAME ]"
                    autoComplete="off"
                    maxLength={24}
                  />
                </div>
              </div>

              <div className="mt-10 relative z-10 flex justify-end">
                <button
                  type="submit"
                  className="group relative border-2 border-light-yellow dark:border-dark-yellow px-8 py-3 text-light-yellow dark:text-dark-yellow font-bold uppercase tracking-widest overflow-hidden disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(241,250,140,0.6)] transition-all bg-light-background dark:bg-dark-background"
                  disabled={!sanitizeUsername(nameInput)}
                >
                  <span className="relative z-10 group-hover:text-light-background dark:group-hover:text-dark-background transition-colors duration-300">Initialize</span>
                  <div className="absolute top-0 left-0 w-full h-full bg-light-yellow dark:bg-dark-yellow -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0 ease-in-out"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }

  if (loginStep === 2) {
    return (
      <>
        <Head>
          <title>{config.title}</title>
        </Head>
        <div className="p-8 h-full bg-light-background dark:bg-dark-background flex flex-col justify-center items-center">
          <EnvironmentSetup username={username} onComplete={() => setLoginStep(3)} />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{config.title}</title>
      </Head>

      <div className="p-8 overflow-hidden h-full border-2 rounded border-light-yellow dark:border-dark-yellow">
        <div ref={containerRef} className="overflow-y-auto h-full pr-1">
          <History history={history} username={username} />

          <Input
            inputRef={inputRef}
            containerRef={containerRef}
            command={command}
            history={history}
            username={username}
            lastCommandIndex={lastCommandIndex}
            setCommand={setCommand}
            setHistory={setHistory}
            setLastCommandIndex={setLastCommandIndex}
            clearHistory={clearHistory}
          />
        </div>
      </div>
    </>
  );
};

export default IndexPage;
