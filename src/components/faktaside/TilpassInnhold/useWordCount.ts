import { RefObject, useEffect, useState } from "react";
import { useVisForContext } from "../../BlockContent/VisFor/VisForContext";
import { useFaktasideContext } from "../FaktaSideContext";

export function useWordCount(contentRef: RefObject<HTMLElement>) {
  const { checked, ingenPasserMeg } = useVisForContext().value;
  const [totalWordCount, setTotalWordCount] = useState<number>(0);
  const [currentWordCount, setCurrentWordCount] = useState<number>(0);
  const { id } = useFaktasideContext();

  useEffect(() => {
    setTotalWordCount(getWordCount(contentRef));
  }, [id]);

  useEffect(() => {
    if (checked.length || ingenPasserMeg) {
      setCurrentWordCount(getWordCount(contentRef));
    }
  }, [checked, contentRef, ingenPasserMeg]);

  const removed = totalWordCount - currentWordCount;

  return {
    total: totalWordCount,
    current: currentWordCount,
    removed,
  };
}

function getWordCount(ref: RefObject<HTMLElement>) {
  return ref.current?.innerText?.match(/\s+/g)?.length ?? NaN;
}
