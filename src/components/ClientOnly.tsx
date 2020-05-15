import React, { ReactNode, useState } from 'react';
import { useMount } from 'react-use';

interface Props {
  children: ReactNode;
}

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);

  useMount(() => {
    setHasMounted(true);
  });

  return hasMounted;
}

// For å forhindre rehydration-problemer (https://joshwcomeau.com/react/the-perils-of-rehydration/)
function ClientOnly(props: Props) {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  return props.children;
}

export default ClientOnly;
