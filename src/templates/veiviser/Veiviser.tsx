import * as React from 'react';
import { useEffect } from 'react';
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
import { usePrevious } from 'react-use';
import { visBasertPaaVisPaaConfig } from '../../components/BlockContent/VisFor/VisPaaSide';
import { useFlip } from 'react-easy-flip';

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
  const [state, send] = useMachine(veiviserMachine);
  const context = state.context;
  const visForContest = useVisForContext();
  useFlip('flip-toplevel');

  const pages = props.pageContext.pages;

  const pagesValg: VeiviserValg<FaktasideContext>[] = pages.map((page) => ({
    label: page.title || 'Mangler tittel',
    id: page.id,
    object: page,
  }));

  const filtreringsValg: VeiviserValg<string>[] = context.side
    ? getAlleFiltreringsValgForInnhold(context.side.innhold).map((valg) => ({
        label: valg,
        id: valg,
        object: valg,
      }))
    : [];

  const overskrifter: VeiviserValg<Group>[] = context.side
    ? context.side.innhold
        .filter(isGroup)
        .filter((group: Group) => visBasertPåFiltrering(visForContest, group.blockConfig?.visFor).vis)
        .filter((group: Group) =>
          visBasertPaaVisPaaConfig(state.context.side?.id || '', group.blockConfig?.visPaaSider)
        )
        .map((group) => ({
          label: group.title,
          id: group.blockConfig?.id || 'N/A',
          object: group,
        }))
    : [];

  const prevState = usePrevious(state);
  useEffect(() => {
    // TODO put sideeffekter inn i statemachine, bug her filtrering blir bare nullstilt når man går helt tilbake til velg side/toppnivå. Løses no
    state.matches('velgSide') && !prevState?.matches('velgSide') && visForContest.dispatch({ type: 'clear' });
  }, [state, prevState, visForContest]);

  useEffect(() => {
    // TODO put sideeffekter inn i statemachine
    state.matches('velgFiltrering') && filtreringsValg.length === 0 && send({ type: 'VELGFILTRERING', filtrering: '' });
  }, [filtreringsValg.length, send, state]);

  useEffect(() => {
    // TODO put sideeffekter inn i statemachine
    if (state.matches('velgOverskrift') && !prevState?.matches('velgOverskrift')) {
      visForContest.dispatch(
        state.context.filtrering ? { type: 'setKey', key: state.context.filtrering } : { type: 'clear' }
      );
    }
  }, [state, visForContest, prevState]);

  return (
    <Style>
      <UnderArbeid />
      <DevKnapper />
      <VeiviserBrødsmuler context={state.context} send={send} />
      {state.matches('velgSide') && (
        <VelgDetSomPasserBest valg={pagesValg} setValg={(side) => send({ type: 'VELGSIDE', side })} />
      )}
      {state.matches('velgFiltrering') && (
        <VelgDetSomPasserBest
          valg={filtreringsValg}
          setValg={(filtrering) => send({ type: 'VELGFILTRERING', filtrering: filtrering })}
        />
      )}
      {state.matches('velgOverskrift') && (
        <VelgDetSomPasserBest valg={overskrifter} setValg={(group) => send({ type: 'VELGOVERSKRIFT', group: group })} />
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
