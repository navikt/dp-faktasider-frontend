import { useRef } from 'react';
import { guid } from 'nav-frontend-js-utils';
import { idFromString } from './idFromString';

function useUniqueId(label: string) {
  return useRef(`${idFromString(label)}-${guid().substr(0, 5)}`).current;
}

export default useUniqueId;
