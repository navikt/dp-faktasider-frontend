import * as React from "react";
import styled from "styled-components/macro";
import UnderArbeid from "../templates/veiviser/UnderArbeid";
import VelgDetSomPasserBest, { VeiviserValg } from "../templates/veiviser/VelgDetSomPasserBest";
import { veiviserMachine } from "../templates/veiviser/VeiviserStateChart";
import { useMachine } from "@xstate/react";
import getAlleTilpassInnholdValg from "../templates/faktaside/TilpassInnhold/getAlleTilpassInnholdValg";
import { Group, isGroup } from "../utils/richTextUtils/richTextTypes";
import BlockContent from "../components/BlockContent/BlockContent";
import { visBasertPåFiltrering } from "../components/BlockContent/VisFor/VisFor";
import { typografiStyle } from "../templates/faktaside/MainContentStyle";
import VeiviserBrødsmuler from "../templates/veiviser/VeiviserBrødsmuler";
import DevKnapper from "../components/DevKnapper/DevKnapper";
import { useVisForContext } from "../components/BlockContent/VisFor/VisForContext";
import { visBasertPaaVisPaaConfig } from "../components/BlockContent/VisFor/VisPaaSide";
import { isDevelopment } from "../utils/environment";
import { createH2Group } from "../utils/richTextUtils/createGroup";
import { Knapp } from "nav-frontend-knapper";
import { GetStaticProps } from "next";
import { SupportedLanguage } from "../i18n/supportedLanguages";
import fetchAllFaktasider from "../hooks/graphQl/fetchAllFaktasider";
import { FaktasideContext } from "../hooks/graphQl/fetchFaktaside";

const Style = styled.div`
  ${typografiStyle};
  background-color: white;
  padding: 4vmin 0;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: auto;
  padding: 1rem;
  max-width: 60rem;

  button {
    position: sticky;
    top: 4rem;
  }
`;

export const getStaticProps: GetStaticProps = async (context) => {
  const faktasider = await fetchAllFaktasider(context.locale as SupportedLanguage);

  return {
    props: {
      pages: JSON.parse(JSON.stringify(faktasider)),
    },
  };
};

interface Props {
  pages: FaktasideContext[];
}

function Demoapp(props: Props) {
  const visForContest = useVisForContext();

  const [state, send] = useMachine(veiviserMachine, {
    actions: {
      setFiltrering: (ctx) => visForContest.dispatch({ type: "setKey", key: ctx.filtrering! }),
      clearFiltrering: () => visForContest.dispatch({ type: "clear" }),
    },
  });

  const context = state.context;
  // @ts-ignore
  const pages = props.pages;

  const siderValg: VeiviserValg<FaktasideContext>[] = pages.map((page) => ({
    label: page.title || "Mangler tittel",
    id: page.id,
    object: page,
  }));

  const filtreringsValg: VeiviserValg<string>[] = context.side
    ? getAlleTilpassInnholdValg(context.side.innhold).map((valg) => ({
        label: valg,
        id: valg,
        object: valg,
      }))
    : [];

  const overskriftsValg: VeiviserValg<Group>[] = context.side
    ? context.side.innhold
        .filter(isGroup)
        .filter((group: Group) => visBasertPåFiltrering(visForContest, group.blockConfig?.visFor).vis)
        .filter((group: Group) =>
          visBasertPaaVisPaaConfig(state.context.side?.id || "", group.blockConfig?.visPaaSider)
        )
        .filter((group: Group) => isDevelopment() || !group.blockConfig?.erUtkast)
        .map((group) => ({
          label: group.title,
          id: group.blockConfig?.id || "N/A",
          object: group,
        }))
    : [];

  if (context.side?.kortFortalt) {
    overskriftsValg.unshift({
      label: "Kort fortalt",
      id: "kort-fortalt",
      object: createH2Group("Kort fortalt", context.side.kortFortalt),
    });
  }

  if (context.side?.relatertInformasjon) {
    overskriftsValg.push({
      label: "Relatert informasjon",
      id: "relatert-informasjon",
      object: createH2Group("Relatert informasjon", context.side.relatertInformasjon),
    });
  }

  const groupIndex = overskriftsValg.findIndex(
    (valg) => valg.object?.blockConfig?.id === context.group?.blockConfig?.id
  );

  return (
    <Style>
      <UnderArbeid />
      <DevKnapper />
      <VeiviserBrødsmuler context={state.context} send={send} />
      {state.matches("velgSide") && (
        <VelgDetSomPasserBest valg={siderValg} setValg={(side) => send({ type: "VELGSIDE", side })} />
      )}
      {state.matches("velgFiltrering") && (
        <VelgDetSomPasserBest
          valg={filtreringsValg}
          setValg={(filtrering) => send({ type: "VELGFILTRERING", filtrering: filtrering })}
        />
      )}
      {state.matches("velgOverskrift") && (
        <VelgDetSomPasserBest
          valg={overskriftsValg}
          setValg={(group) => send({ type: "VELGOVERSKRIFT", group: group })}
        />
      )}
      {state.matches("visGruppe") && (
        <Content>
          <Knapp
            onClick={() =>
              send({
                type: "VELGOVERSKRIFT",
                group: overskriftsValg[groupIndex - 1]?.object || overskriftsValg[overskriftsValg.length - 1].object,
              })
            }
          >
            Forrige
          </Knapp>
          <BlockContent blocks={state.context.group ? [state.context.group] : []} />
          <Knapp
            onClick={() =>
              send({
                type: "VELGOVERSKRIFT",
                group: overskriftsValg[groupIndex + 1]?.object || overskriftsValg[0].object,
              })
            }
          >
            Neste
          </Knapp>
        </Content>
      )}
    </Style>
  );
}

export default Demoapp;
