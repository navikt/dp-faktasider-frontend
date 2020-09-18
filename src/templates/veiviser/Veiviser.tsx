import * as React from 'react';
import { PageProps } from 'gatsby';
import { FaktasideContext } from '../../../gatsby-utils/createFaktasider';
import styled from 'styled-components/macro';
import UnderArbeid from './UnderArbeid';
import VelgDetSomPasserBest, { VeiviserValg } from './VelgDetSomPasserBest';
import { veiviserMachine } from './VeiviserStateChart';
import { useMachine } from '@xstate/react';
import getAlleFiltreringsValgForInnhold from '../faktaside/Filtrering/getAlleFiltreringsValgForInnhold';
import { Group, isGroup } from '../../utils/richTextUtils/richTextTypes';
import BlockContent from '../../components/BlockContent/BlockContent';
import { visBasertPåFiltrering } from '../../components/BlockContent/VisFor/VisFor';
import { typografiStyle } from '../faktaside/MainContentStyle';
import VeiviserBrødsmuler from './VeiviserBrødsmuler';
import DevKnapper from '../../components/DevKnapper/DevKnapper';
import { useVisForContext } from '../../components/BlockContent/VisFor/VisForContext';
import { visBasertPaaVisPaaConfig } from '../../components/BlockContent/VisFor/VisPaaSide';
import { isDevelopment } from '../../utils/environment';
import { getFiltreringsvalgLabel } from '../faktaside/Filtrering/getFiltreringsLabel';

export interface VeiviserProps extends PageProps<{}, { pages: FaktasideContext[] }> {
  errors: any;
}

const Style = styled.div`
  ${typografiStyle};
  background-color: white;
  padding: 4vmin 0;
`;

const Content = styled.div`
  max-width: 40rem;
  margin: auto;
`;

function Veiviser(props: VeiviserProps) {
  const visForContest = useVisForContext();

  const [state, send] = useMachine(veiviserMachine, {
    actions: {
      setFiltrering: (ctx) => visForContest.dispatch({ type: 'setKey', key: ctx.filtrering! }),
      clearFiltrering: () => visForContest.dispatch({ type: 'clear' }),
    },
  });

  const context = state.context;
  const pages = props.pageContext.pages;

  const siderValg: VeiviserValg<FaktasideContext>[] = pages.map((page) => ({
    label: page.title || 'Mangler tittel',
    id: page.id,
    object: page,
  }));

  const filtreringsValg: VeiviserValg<string>[] = context.side
    ? getAlleFiltreringsValgForInnhold(context.side.innhold).map((valg) => ({
        label: getFiltreringsvalgLabel(valg),
        id: valg,
        object: valg,
      }))
    : [];

  const overskriftsValg: VeiviserValg<Group>[] = context.side
    ? context.side.innhold
        .filter(isGroup)
        .filter((group: Group) => visBasertPåFiltrering(visForContest, group.blockConfig?.visFor).vis)
        .filter((group: Group) =>
          visBasertPaaVisPaaConfig(state.context.side?.id || '', group.blockConfig?.visPaaSider)
        )
        .filter((group: Group) => isDevelopment() || !group.blockConfig?.erUtkast)
        .map((group) => ({
          label: group.title,
          id: group.blockConfig?.id || 'N/A',
          object: group,
        }))
    : [];

  return (
    <Style>
      <UnderArbeid />
      <DevKnapper />
      <VeiviserBrødsmuler context={state.context} send={send} />
      {state.matches('velgSide') && (
        <VelgDetSomPasserBest valg={siderValg} setValg={(side) => send({ type: 'VELGSIDE', side })} />
      )}
      {state.matches('velgFiltrering') && (
        <VelgDetSomPasserBest
          valg={filtreringsValg}
          setValg={(filtrering) => send({ type: 'VELGFILTRERING', filtrering: filtrering })}
        />
      )}
      {state.matches('velgOverskrift') && (
        <VelgDetSomPasserBest
          valg={overskriftsValg}
          setValg={(group) => send({ type: 'VELGOVERSKRIFT', group: group })}
        />
      )}
      {state.matches('visGruppe') && (
        <Content>
          <BlockContent blocks={state.context.group ? [state.context.group] : []} />
        </Content>
      )}
    </Style>
  );
}

export default Veiviser;
