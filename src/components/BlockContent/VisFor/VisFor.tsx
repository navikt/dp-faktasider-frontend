import * as React from "react";
import { ReactNode } from "react";
import { useVisForContext, VisForContextI } from "./VisForContext";
import VisForDebug from "./VisForDebug";
import { VisForConfig } from "../../../utils/richTextUtils/richTextTypes";
import { useFaktasideContext } from "../../faktaside/FaktaSideContext";

interface Props {
  children: ReactNode;
  visForConfig?: VisForConfig;
  inline?: boolean;
}

export function getUniqueStrings(strings?: string[]) {
  return Array.from(new Set(strings));
}

export type VisForSituasjon = { _id: string; name: string };

export function getSituasjonerFromVisForConfig(
  visForConfig: VisForConfig | undefined,
  konverteringstabell?: VisForSituasjon[]
): string[] {
  console.log(konverteringstabell, visForConfig);
  return [
    ...getUniqueStrings(visForConfig?.situasjoner),
    ...getUniqueStrings(
      visForConfig?.visForSituasjoner
        ?.map((ref) => ref._ref)
        .map((id) => konverteringstabell?.find((it) => it._id === id)?.name || "ukjent situasjon")
    ),
  ];
}

export function visBasertPåFiltrering(
  visForContext: VisForContextI,
  visForConfig?: VisForConfig,
  konverteringstabell?: VisForSituasjon[]
) {
  const relevanteSituasjoner = getSituasjonerFromVisForConfig(visForConfig, konverteringstabell);
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
  const konverteringstabell = useFaktasideContext().situasjonsvalg;

  if (props.visForConfig === undefined) {
    return <>{props.children}</>;
  }

  const { situasjoner, vis, omvendtFiltrering } = visBasertPåFiltrering(
    visForContext,
    props.visForConfig,
    konverteringstabell
  );

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
