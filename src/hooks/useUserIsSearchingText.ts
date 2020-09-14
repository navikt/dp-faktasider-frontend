import useKeyboardJs from 'react-use/lib/useKeyboardJs';

function useUserIsSearchingText() {
  const [userIsSearchingText] = useKeyboardJs(['ctrl + f', 'command + f']);
  return userIsSearchingText;
}

export default useUserIsSearchingText;
