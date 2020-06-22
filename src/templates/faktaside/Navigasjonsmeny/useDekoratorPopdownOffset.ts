import { useState } from 'react';
import throttle from 'lodash.throttle';
import { useMount } from 'react-use';

export function useDekoratorPopdownOffset() {
  const [offsetTop, setOffsetTop] = useState(0);

  useMount(() => {
    const getOffset = (id: string) => {
      const menuRect = document.getElementById(id)?.getBoundingClientRect();
      return menuRect ? menuRect.height + menuRect.top : 0;
    };

    const handleScroll = () => {
      const offset = Math.max(getOffset('hovedmeny'), getOffset('mobilmeny'));
      setOffsetTop(offset);
    };

    const throttledHandleScroll = throttle(handleScroll, 100);

    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  });

  return offsetTop;
}
