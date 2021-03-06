import { assign, createMachine, MachineConfig } from "xstate";
import { Group } from "../../utils/richTextUtils/richTextTypes";
import getAlleTilpassInnholdValg from "../../components/faktaside/TilpassInnhold/getAlleTilpassInnholdValg";
import { FaktasideParsedData } from "../../sanity/groq/faktaside/parseFaktasideData";

export interface VeiviserContext {
  side?: FaktasideParsedData;
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
  | { type: "CLEAR" | "TILBAKETILVELGSIDE" | "TILBAKETILVELGFILTRERING" | "TILBAKETILVELGOVERSKRIFT" }
  | { type: "VELGSIDE"; side: FaktasideParsedData }
  | { type: "VELGFILTRERING"; filtrering: string }
  | { type: "VELGOVERSKRIFT"; group: Group };

const initialContext = {
  side: undefined,
  filtrering: undefined,
  group: undefined,
};

const machineConfig: MachineConfig<VeiviserContext, States, Events> = {
  id: "veiviser",
  initial: "velgSide",
  context: initialContext,
  on: {
    TILBAKETILVELGSIDE: {
      target: "velgSide",
      actions: assign((ctx, event) => initialContext),
    },
  },
  states: {
    velgSide: {
      entry: [assign((ctx) => initialContext), "clearFiltrering"],
      on: {
        VELGSIDE: {
          target: "velgFiltrering",
          actions: assign({
            side: (ctx, event) => event.side,
          }),
        },
      },
    },
    velgFiltrering: {
      entry: [assign((ctx) => ({ ...initialContext, side: ctx.side })), "clearFiltrering"],
      on: {
        "": {
          cond: "ingenFiltreringsvalg",
          target: "velgOverskrift",
        },
        VELGFILTRERING: {
          target: "velgOverskrift",
          actions: [
            assign({
              filtrering: (ctx, event) => event.filtrering,
            }),
            "setFiltrering",
          ],
        },
      },
    },
    velgOverskrift: {
      entry: assign((ctx) => ({ ...initialContext, side: ctx.side, filtrering: ctx.filtrering })),
      on: {
        TILBAKETILVELGFILTRERING: "velgFiltrering",
        VELGOVERSKRIFT: {
          target: "visGruppe",
          actions: assign({
            group: (ctx, event) => event.group,
          }),
        },
      },
    },
    visGruppe: {
      on: {
        TILBAKETILVELGFILTRERING: "velgFiltrering",
        TILBAKETILVELGOVERSKRIFT: "velgOverskrift",
        VELGOVERSKRIFT: {
          actions: assign({
            group: (ctx, event) => event.group,
          }),
        },
      },
    },
  },
};

export const veiviserMachine = createMachine(machineConfig, {
  guards: {
    ingenFiltreringsvalg: (ctx) => getAlleTilpassInnholdValg(ctx.side!.innhold).length === 0,
  },
});
