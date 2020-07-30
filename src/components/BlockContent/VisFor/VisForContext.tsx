import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import { useLocation, usePrevious } from 'react-use';
import { loggTilpassInnhold } from '../../../utils/logging';

type Actions =
  | { type: 'addKey'; key: string }
  | { type: 'toggle'; key: string }
  | { type: 'clear' }
  | { type: 'toggleIngenPasser' };

const initial = {
  value: {
    valg: [] as string[],
    checked: [] as string[],
    ingenPasserMeg: false,
  },
  dispatch: (action: Actions): void => undefined,
};

export type VisForContextI = typeof initial;

export const VisForContext = createContext(initial);

export const useVisForContext = () => useContext<VisForContextI>(VisForContext);

function reducer(state: typeof initial.value, action: Actions) {
  switch (action.type) {
    case 'addKey':
      if (!state.valg.includes(action.key)) {
        return {
          ...state,
          valg: [...state.valg, action.key],
        };
      } else {
        return state;
      }
    case 'toggle':
      if (!state.checked.includes(action.key)) {
        loggTilpassInnhold(action.key);
        return {
          ...state,
          ingenPasserMeg: false,
          checked: [...state.checked, action.key],
        };
      } else {
        return {
          ...state,
          checked: state.checked.filter((key) => key !== action.key),
        };
      }
    case 'toggleIngenPasser':
      return {
        ...state,
        checked: [],
        ingenPasserMeg: !state.ingenPasserMeg,
      };
    case 'clear':
      return initial.value;
    default:
      return state;
  }
}

export const VisForContextProvider = (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initial.value);
  const location = useLocation();

  const path = location.pathname;
  const prevPath = usePrevious(path);
  useEffect(() => {
    if (prevPath && prevPath !== path) {
      dispatch({ type: 'clear' });
    }
  }, [path, prevPath]);

  return <VisForContext.Provider value={{ value: state, dispatch }}>{props.children}</VisForContext.Provider>;
};
