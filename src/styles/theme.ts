import { css } from "styled-components/macro";
import { pxToRem } from "./utils";

const colors = {
  navRod: "#C30000",
  navOransje: "#FF9100",
  navLimeGronn: "#A2AD00",
  navGronn: "#06893A",
  navLilla: "#634689",
  navDypBla: "#005B82",
  navBla: "#0067C5",
  navLysBla: "#66CBEC",
  navMorkGra: "#3E3832",
  navGra80: "#59514B",
  navGra60: "#78706A",
  navGra40: "#B7B1A9",
  navGra20: "#C6C2BF",
  navLysGra: "#E9E7E7",
  orangeFocus: "#FFBD66",
  redError: "#BA3A26",
  white: "#FFF",
  pinkErrorBg: "#F3E3E3",
  navBlaLighten80: "#CCE1F3",
  navBlaLighten60: "#99C2E8",
  navDypBlaLighten80: "#CCDEE6",
  navLysBlaLighten80: "#E0F5FB",
  navGronnLighten60: "#9BD0B0",
  navLimeGronnLighten80: "#ECEFCC",
  fokusFarge: "#254b6d",
};

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
    bakgrunn: colors.navLysGra,
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
    banner: `0.3rem solid ${colors.navBlaLighten60}`,
  },
};
