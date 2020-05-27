import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useLocation, usePrevious, usePreviousDistinct } from 'react-use';

const initialValue = {
  valg: [] as string[],
  checked: [] as string[],
  add: (key: string): void => undefined,
  toggle: (key: string): void => undefined,
};

export const VisForContext = createContext(initialValue);

export const useVisFor = () => useContext(VisForContext);

export const VisForContextProvider = (props: { children: ReactNode }) => {
  const [valg, setValg] = useState(initialValue.valg);
  const [checked, setChecked] = useState(initialValue.valg);
  const location = useLocation();

  const add = (key: string) => {
    if (!checked.includes(key)) {
      setValg((s) => [...s, key]);
    }
  };

  const toggle = (key: string) => {
    if (!checked.includes(key)) {
      setChecked((s) => [...s, key]);
    } else {
      setChecked((s) => s.filter((it) => it !== key));
    }
  };

  const clear = () => {
    setChecked([]);
    setValg([]);
  };

  const path = location.pathname;
  const prevPath = usePrevious(path);
  useEffect(() => {
    if (prevPath && prevPath !== path) {
      clear();
    }
  }, [path]);

  return <VisForContext.Provider value={{ valg, checked, add, toggle }}>{props.children}</VisForContext.Provider>;
};
