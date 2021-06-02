import * as React from "react";
import { ReactNode } from "react";
import { FaLightbulb } from "react-icons/fa";
import InlinePreview from "../../../components/InlinePreview";
import { useFaktasider } from "../../../utils/useFaktasider";

export const InlineVisForIkon = FaLightbulb;
const visForColor = "#80f8";
const skjulForColor = "#f048";

type VisFor = {
  skjulFor?: boolean;
  situasjoner?: string[];
};
type VisPaa = { _ref: string }[];

function getVisForLabel(visFor: VisFor): string {
  if (!visFor?.situasjoner?.length) {
    return "";
  }

  return (visFor.skjulFor ? "Skjules for " : "Vises for ") + visFor.situasjoner.join(" & ");
}

interface Props {
  visPaaSider?: VisPaa;
  visFor: VisFor;
  children: ReactNode;
  _type: "visForAnnotation";
}

function useVisPåSiderLabel(visPåSiderConfig?: VisPaa) {
  const { data: faktasider } = useFaktasider();
  if (!visPåSiderConfig?.length || !faktasider) {
    return "";
  }

  const siderTekstenVisesPå = visPåSiderConfig.map((it) => faktasider.find((side) => side._id === it._ref));
  return "Vises på " + siderTekstenVisesPå.map((side) => side?.slug || "").join(" & ");
}

export function InlineVisForPreview(props: Props) {
  const visPaaSideLabel = useVisPåSiderLabel(props.visPaaSider);
  const visForSituasjonLabel = getVisForLabel(props.visFor);
  const label = visForSituasjonLabel + visPaaSideLabel || "Ingen situasjoner valgt";
  const color = props.visFor?.skjulFor ? skjulForColor : visForColor;

  return (
    <InlinePreview label={label} color={color}>
      {props.children}
    </InlinePreview>
  );
}
