import { assign, Machine } from 'xstate';
import { FaktasideContext } from '../../../gatsby-utils/createFaktasider';
import { Group } from '../../utils/richTextUtils/richTextTypes';

export interface VeiviserContext {
  side?: FaktasideContext;
  filtrering?: string;
  group?: Group;
}

interface States {
  states: {
    velgSide: {};
    velgFiltrering: {};
    velgOverskrift: {};
    visGruppe: {};
  };
}

type Events =
  | { type: 'CLEAR' | 'TILBAKETILVELGSIDE' | 'TILBAKETILVELGFILTRERING' | 'TILBAKETILVELGOVERSKRIFT' }
  | { type: 'VELGSIDE'; side: FaktasideContext }
  | { type: 'VELGFILTRERING'; filtrering: string }
  | { type: 'VELGOVERSKRIFT'; group: Group };

const initialContext = {
  side: undefined,
  filtrering: undefined,
  group: undefined,
};

export const veiviserMachine = Machine<VeiviserContext, States, Events>({
  id: 'veiviser',
  initial: 'velgSide',
  context: initialContext,
  on: {
    TILBAKETILVELGSIDE: {
      target: 'velgSide',
      actions: assign((ctx, event) => initialContext),
    },
  },
  states: {
    velgSide: {
      entry: assign((ctx) => initialContext),
      on: {
        VELGSIDE: {
          target: 'velgFiltrering',
          actions: assign({
            side: (ctx, event) => event.side,
          }),
        },
      },
    },
    velgFiltrering: {
      entry: assign((ctx) => ({ ...initialContext, side: ctx.side })),
      on: {
        VELGFILTRERING: {
          target: 'velgOverskrift',
          actions: assign({
            filtrering: (ctx, event) => event.filtrering,
          }),
        },
      },
    },
    velgOverskrift: {
      entry: assign((ctx) => ({ ...initialContext, side: ctx.side, filtrering: ctx.filtrering })),
      on: {
        TILBAKETILVELGFILTRERING: 'velgFiltrering',
        VELGOVERSKRIFT: {
          target: 'visGruppe',
          actions: assign({
            group: (ctx, event) => event.group,
          }),
        },
      },
    },
    visGruppe: {
      on: {
        TILBAKETILVELGFILTRERING: 'velgFiltrering',
        TILBAKETILVELGOVERSKRIFT: 'velgOverskrift',
      },
    },
  },
});
