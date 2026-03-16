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
  const [requiresLogin, setRequiresLogin] = React.useState(false);

  const init = React.useCallback(() => setHistory(banner()), []);

  React.useEffect(() => {
    init();
  }, [init]);

  React.useEffect(() => {
    const storedUsername = getStoredUsername();
    const shouldPromptForName = !hasStoredUsername();

    setUsername(storedUsername);
    setRequiresLogin(shouldPromptForName);
    setHasLoadedProfile(true);
  }, []);

  React.useEffect(() => {
    if (requiresLogin) {
      nameInputRef.current?.focus();
    }
  }, [requiresLogin]);

  React.useEffect(() => {
    if (!requiresLogin && inputRef.current) {
      inputRef.current.scrollIntoView();
      inputRef.current.focus({ preventScroll: true });
    }
  }, [history, inputRef, requiresLogin]);

  const onSubmitName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextUsername = saveUsername(nameInput);

    if (!nextUsername) {
      return;
    }

    setUsername(nextUsername);
    setNameInput(nextUsername);
    setRequiresLogin(false);
  };

  if (!hasLoadedProfile) {
    return (
      <>
        <Head>
          <title>{config.title}</title>
        </Head>

        <div className="p-8 overflow-hidden h-full border-2 rounded border-light-yellow dark:border-dark-yellow flex items-center justify-center">
          <div className="text-light-green dark:text-dark-green">
            Booting terminal session...
          </div>
        </div>
      </>
    );
  }

  if (requiresLogin) {
    return (
      <>
        <Head>
          <title>{config.title}</title>
        </Head>

        <div className="p-8 overflow-hidden h-full border-2 rounded border-light-yellow dark:border-dark-yellow flex items-center justify-center">
          <form
            className="w-full max-w-lg border border-light-gray dark:border-dark-gray bg-light-background dark:bg-dark-background p-6 md:p-8"
            onSubmit={onSubmitName}
          >
            <div className="text-light-gray dark:text-dark-gray mb-2">
              login
            </div>
            <h1 className="text-light-yellow dark:text-dark-yellow text-xl md:text-2xl mb-3">
              What should I call you?
            </h1>

            <label
              htmlFor="terminal-name"
              className="block text-light-green dark:text-dark-green mb-2"
            >
              username
            </label>
            <input
              ref={nameInputRef}
              id="terminal-name"
              type="text"
              value={nameInput}
              onChange={(event) =>
                setNameInput(sanitizeUsername(event.target.value))
              }
              className="w-full bg-transparent border border-light-yellow dark:border-dark-yellow px-3 py-2 mb-4 focus:outline-none"
              placeholder="Enter your name"
              autoComplete="off"
              maxLength={24}
            />

            <button
              type="submit"
              className="border border-light-green dark:border-dark-green px-4 py-2 text-light-green dark:text-dark-green disabled:opacity-50"
              disabled={!sanitizeUsername(nameInput)}
            >
              Start session
            </button>
          </form>
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
        <div ref={containerRef} className="overflow-y-auto h-full">
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
