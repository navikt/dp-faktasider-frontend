import { useState } from 'react';
import { useMount } from 'react-use';

export function useDekoratorPopdownOffset() {
  const [offsetTop, setOffsetTop] = useState(0);

  useMount(() => {
    const handleScroll = () => {
      const menuRect = document.getElementById('hovedmeny')?.getBoundingClientRect();
      const offset = menuRect ? menuRect.height + menuRect.top : 0;
      setOffsetTop(Math.max(offset, 0));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return offsetTop;
}
