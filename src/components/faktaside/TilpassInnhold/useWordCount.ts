import { RefObject, useEffect, useState } from "react";
import { useVisForContext } from "../../../components/BlockContent/VisFor/VisForContext";
import { useMount } from "react-use";

export function useWordCount(contentRef: RefObject<HTMLElement>) {
  const { checked, ingenPasserMeg } = useVisForContext().value;
  const [totalWordCount, setTotalWordCount] = useState<number | undefined>(0);
  const [currentWordCount, setCurrentWordCount] = useState<number | undefined>(0);

  useMount(() => {
    setTotalWordCount(getWordCount(contentRef));
  });

  useEffect(() => {
    if (checked.length || ingenPasserMeg) {
      setCurrentWordCount(getWordCount(contentRef));
    }
  }, [checked, contentRef, ingenPasserMeg]);

  const removed = totalWordCount && currentWordCount ? totalWordCount - currentWordCount : undefined;

  return {
    total: totalWordCount,
    current: currentWordCount,
    removed,
  };
}

function getWordCount(ref: RefObject<HTMLElement>) {
  return ref.current?.innerText?.match(/\s+/g)?.length;
}
