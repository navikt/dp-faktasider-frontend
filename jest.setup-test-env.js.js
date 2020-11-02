import "jest-styled-components";
import { mockMetadata } from "./src/hooks/graphQl/mockMetadata";

/*
 * Animasjonen i til react-collapse ser ut til å være for treg til å funke bra i tester, mocker den derfor her til å ha en enkel mount/unmount-logikk.
 * */
jest.mock("react-collapse", () => {
  return {
    UnmountClosed: (props) => (props.isOpened ? props.children : null),
    Collapse: (props) => (props.isOpened ? props.children : null),
  };
});

jest.mock("./src/hooks/graphQl/useMetadata", () => () => mockMetadata);

jest.mock("./src/hooks/graphQl/useProjectData", () => () => ({ title: "Testtittel" }));

jest.mock("./src/hooks/graphQl/useFaktasiderMenuData", () => () =>
  require("./src/hooks/graphQl/mockFaktasiderMenuData").mockFaktasiderMenuData
);
