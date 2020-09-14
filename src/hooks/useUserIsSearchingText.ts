import useKeyboardJs from 'react-use/lib/useKeyboardJs';
import { useEffect } from 'react';
import { loggSøkITekst } from '../utils/logging';

function useUserIsSearchingText() {
  const [userIsSearchingText] = useKeyboardJs(['ctrl + f', 'command + f']);

  useEffect(() => {
    userIsSearchingText && loggSøkITekst();
  }, [userIsSearchingText]);

  return userIsSearchingText;
}

export default useUserIsSearchingText;
