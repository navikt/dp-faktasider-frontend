import { css } from "styled-components/macro";
import { pxToRem } from "./utils";
import { navFrontend } from "./navFrontend";

export const colors = navFrontend;

const focus = css`
  outline: none;
  box-shadow: 0 0 0 ${pxToRem(3)} ${colors.fokusFarge};
`;

const borderRadius = ".2rem";

export const focusOnRelativeParent = css`
  &:focus-within {
    position: static;
    box-shadow: none;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      pointer-events: none;
      ${focus};
      transition: 0.1s;
      border-radius: ${borderRadius};
    }
  }
`;

export const mediaBreakpoint = 1080;

export const theme = {
  colors: {
    ...colors,
    bakgrunn: "#f1f1f1",
    lenke: colors.navBla,
  },
  visuallyHidden: css`
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
  `,
  media: {
    smallScreen: `max-width: ${mediaBreakpoint}px`,
    bigScreen: `min-width: ${mediaBreakpoint}px`,
  },
  focus: focus,
  focusOnRelativeParent: focusOnRelativeParent,
  borderRadius: borderRadius,
  layoutMargin: "4vmin",
  layoutPadding: "1.5rem",
  border: {
    banner: `0.3rem solid ${colors.navDypBlaLighten40}`,
  },
};
