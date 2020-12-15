import * as React from "react";
import { ReactNode } from "react";
import { useVisForContext, VisForContextI } from "./VisForContext";
import VisForDebug from "./VisForDebug";
import { VisForConfig } from "../../../utils/richTextUtils/richTextTypes";

interface Props {
  children: ReactNode;
  visForConfig?: VisForConfig;
  inline?: boolean;
}

export function getUniqueStrings(strings?: string[]) {
  return Array.from(new Set(strings));
}

export function getSituasjonerFromVisForConfig(visForConfig: VisForConfig | undefined): string[] {
  return getUniqueStrings(visForConfig?.situasjoner);
}

export function visBasertPåFiltrering(visForContext: VisForContextI, visForConfig?: VisForConfig) {
  const relevanteSituasjoner = getSituasjonerFromVisForConfig(visForConfig);
  const omvendtFiltrering = !!visForConfig?.skjulFor;
  const valgtFiltrering = visForContext.value.checked;
  const ingenPasserMeg = visForContext.value.ingenPasserMeg;
  const ingenFiltreringForElement = !visForConfig;

  const brukerHarIkkeValgtFilter = valgtFiltrering.length === 0 && !ingenPasserMeg;
  const relevanteSituasjonerMatcherNoenFilteringsvalg = valgtFiltrering.some((valg) =>
    relevanteSituasjoner.includes(valg)
  );
  const relevanteSituasjonerMatcherAlleFiltreringsvalg = valgtFiltrering.every((valg) =>
    relevanteSituasjoner.includes(valg)
  );
  const skjul = omvendtFiltrering && !ingenPasserMeg && relevanteSituasjonerMatcherAlleFiltreringsvalg;

  const vis =
    ingenFiltreringForElement ||
    brukerHarIkkeValgtFilter ||
    (omvendtFiltrering ? !skjul : relevanteSituasjonerMatcherNoenFilteringsvalg);

  return { vis, situasjoner: relevanteSituasjoner, omvendtFiltrering };
}

function VisFor(props: Props) {
  const visForContext = useVisForContext();

  if (props.visForConfig === undefined) {
    return <>{props.children}</>;
  }

  const { situasjoner, vis, omvendtFiltrering } = visBasertPåFiltrering(visForContext, props.visForConfig);

  if (vis) {
    return (
      <VisForDebug
        situasjoner={situasjoner}
        omvendtFiltrering={omvendtFiltrering}
        as={props.inline ? "span" : undefined}
        children={props.children}
      />
    );
  }

  return null;
}

export default VisFor;
