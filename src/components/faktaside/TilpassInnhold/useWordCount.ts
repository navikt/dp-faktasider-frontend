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
  }, [contentRef, id]);

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
  const whitespaces = ref.current?.innerText?.trim().match(/\s+/g)?.length;
  if (whitespaces === undefined) return NaN;
  //plusser på en da siste ord ikke har whitespace
  else return whitespaces + 1;
}
