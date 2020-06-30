import { useState } from 'react';
import throttle from 'lodash.throttle';
import { useMount } from 'react-use';

export function useDekoratorPopdownOffset() {
  const [offsetTop, setOffsetTop] = useState(0);

  useMount(() => {
    const handleScroll = () => {
      const menuRect = document.querySelector(`[aria-label="Hovedmeny"]`)?.getBoundingClientRect();
      const offset = menuRect ? menuRect.height + menuRect.top : 0;
      setOffsetTop(Math.max(offset, 0));
    };

    const throttledHandleScroll = throttle(handleScroll, 100);

    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  });

  return offsetTop;
}
