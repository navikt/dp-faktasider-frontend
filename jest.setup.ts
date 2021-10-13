import "jest-styled-components";
import { configure } from "@testing-library/react";

configure({
  testIdAttribute: "data-test-id",
});

/*
 * Animasjonen i til react-collapse ser ut til å være for treg til å funke bra i tester, mocker den derfor her til å ha en enkel mount/unmount-logikk.
 * */
jest.mock("react-collapse", () => {
  return {
    UnmountClosed: (props: any) => (props.isOpened ? props.children : null),
    Collapse: (props: any) => (props.isOpened ? props.children : null),
  };
});

jest.mock("next/router", () => {
  return {
    useRouter: () => ({
      locale: "no",
      query: {
        slug: "testside",
      },
    }),
  };
});

jest.mock("react-use/lib/useKeyboardJs", () => () => [false]);
