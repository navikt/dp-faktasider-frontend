import * as React from 'react';
import { ReactNode } from 'react';
import LightBulb from 'react-icons/lib/fa/lightbulb-o';
import InlinePreview from './InlinePreview';

export const InlineVisForIkon = LightBulb;
const visForColor = '#80f8';
const skjulForColor = '#f048';

type VisFor = { [name: string]: boolean };

function getVisForLabel(visFor: VisFor): string {
  if (!visFor) {
    return '';
  }

  const skjulFor = visFor.skjulFor;
  const visForSituasjoner = Object.keys(visFor)
    .filter((key) => visFor[key] === true)
    .filter((key) => key !== 'skjulFor');

  if (!visForSituasjoner.length) return '';

  return (skjulFor ? 'Skjules for ' : 'Vises for ') + visForSituasjoner.join(' & ');
}

interface Props {
  visPaaSider: any[];
  visFor: VisFor;
  children: ReactNode;
}

export function InlineVisForPreview(props: Props) {
  const visForSide = props.visPaaSider?.length ? 'Vises på utvalgte sider. ' : '';
  const label = getVisForLabel(props.visFor);
  return (
    <InlinePreview label={visForSide + label} color={props.visFor?.skjulFor ? skjulForColor : visForColor}>
      {props.children}
    </InlinePreview>
  );
}
