import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { isDevelopment } from '../../utils/environment';

type ActionNames = 'utkast' | 'filtrering';

const initial = {
  value: {
    visUtkast: isDevelopment(),
    visFiltrering: isDevelopment(),
  },
  toggle: (toggle: ActionNames): void => undefined,
};

const DevContext = createContext<typeof initial>(initial);

export const useDevContext = () => useContext(DevContext);

function reducer(state: typeof initial.value, action: ActionNames) {
  switch (action) {
    case 'utkast':
      return {
        ...state,
        visUtkast: !state.visUtkast,
      };
    case 'filtrering':
      return {
        ...state,
        visFiltrering: !state.visFiltrering,
      };
    default:
      return state;
  }
}

export const DevContextProvider = (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initial.value);

  return <DevContext.Provider value={{ value: state, toggle: dispatch }}>{props.children}</DevContext.Provider>;
};
