import React, { createContext, ReactNode, useContext, useReducer } from 'react';

type ActionNames = 'utkast';

const initial = {
  value: {
    visUtkast: true,
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
    default:
      return state;
  }
}

export const DevContextProvider = (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initial.value);

  return <DevContext.Provider value={{ value: state, toggle: dispatch }}>{props.children}</DevContext.Provider>;
};
