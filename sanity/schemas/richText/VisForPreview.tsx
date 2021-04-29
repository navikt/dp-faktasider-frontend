import * as React from "react";
import { ReactNode } from "react";
import { FaLightbulb } from "react-icons/fa";
import InlinePreview from "../../components/InlinePreview";

export const InlineVisForIkon = FaLightbulb;
const visForColor = "#80f8";
const skjulForColor = "#f048";

type VisFor = {
  skjulFor?: boolean;
  situasjoner?: string[];
};

function getVisForLabel(visFor: VisFor): string {
  if (!visFor?.situasjoner?.length) {
    return "";
  }

  return (visFor.skjulFor ? "Skjules for " : "Vises for ") + visFor.situasjoner.join(" & ");
}

interface Props {
  visPaaSider: any[];
  visFor: VisFor;
  children: ReactNode;
  _type: "visForAnnotation";
}

export function InlineVisForPreview(props: Props) {
  const visPaaSideLabel = props.visPaaSider?.length ? "Vises på utvalgte sider." : "";
  const visForSituasjonLabel = getVisForLabel(props.visFor);
  const label = visForSituasjonLabel + visPaaSideLabel || "Ingen situasjoner valgt";
  const color = props.visFor?.skjulFor ? skjulForColor : visForColor;

  return (
    <InlinePreview label={label} color={color}>
      {props.children}
    </InlinePreview>
  );
}
