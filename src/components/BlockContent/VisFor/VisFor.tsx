import * as React from 'react';
import { ReactNode } from 'react';
import { useVisForContext, VisForContextI } from './VisForContext';
import VisForDebug from './VisForDebug';
import { VisForConfig } from '../../../utils/richTextUtils/richTextTypes';

interface Props {
  children: ReactNode;
  visForConfig?: VisForConfig;
  inline?: boolean;
}

export function getVisForSituasjonerFromConfig(visForConfig: VisForConfig | undefined) {
  return visForConfig
    ? Object.entries(visForConfig)
        .filter((it) => it[1] === true)
        .map((it) => it[0])
    : [];
}

export function visBasertPåFiltrering(visForContext: VisForContextI, visForConfig?: VisForConfig) {
  const visFor = getVisForSituasjonerFromConfig(visForConfig);

  const ingenPasserMeg = visForContext.value.ingenPasserMeg;
  const ingenFiltreringForElement = !visForConfig;
  const brukerHarIkkeValgtFilter = visForContext.value.checked.length === 0 && !ingenPasserMeg;
  const valgtIFiltrering = visForContext.value.checked.some((it) => visFor.includes(it));
  const filtreringPasserIkkeMeg = ingenPasserMeg && ingenFiltreringForElement;
  const vis = ingenFiltreringForElement || brukerHarIkkeValgtFilter || valgtIFiltrering || filtreringPasserIkkeMeg;

  return { visFor, vis };
}

function VisFor(props: Props) {
  const visForContext = useVisForContext();

  if (props.visForConfig === undefined) {
    return <>{props.children}</>;
  }

  const { visFor, vis } = visBasertPåFiltrering(visForContext, props.visForConfig);

  if (vis) {
    return <VisForDebug visFor={visFor} as={props.inline ? 'span' : undefined} children={props.children} />;
  }

  return null;
}

export default VisFor;
