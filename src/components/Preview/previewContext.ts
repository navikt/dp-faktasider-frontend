import { createReducerContext } from "react-use";

const initState = {
  previewMode: false,
  showDrafts: false,
  dataset: "N/A",
};

type State = typeof initState;
type Action = Partial<State>;

function reducer(state: State, action: Action) {
  return {
    ...state,
    ...action,
  };
}

const [useContext, Provider] = createReducerContext(reducer, initState);

export const PreviewContextProvider = Provider;
export const usePreviewContext = useContext;
