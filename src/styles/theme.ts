import { css, keyframes } from 'styled-components/macro';
import { pxToRem } from './utils';

export const fadeIn = keyframes`
    from {
      opacity: 0;
      transform: translateY(2rem) scale(.9);
    }
`;

const colors = {
  navRod: '#C30000',
  navOransje: '#FF9100',
  navLimeGronn: '#A2AD00',
  navGronn: '#06893A',
  navLilla: '#634689',
  navDypBla: '#005B82',
  navBla: '#0067C5',
  navLysBla: '#66CBEC',
  navMorkGra: '#3E3832',
  navGra80: '#59514B',
  navGra60: '#78706A',
  navGra40: '#B7B1A9',
  navGra20: '#C6C2BF',
  navLysGra: '#E9E7E7',
  orangeFocus: '#FFBD66',
  redError: '#BA3A26',
  white: '#FFF',
  pinkErrorBg: '#F3E3E3',
  navBlaLighten80: '#CCE1F3',
  navBlaLighten60: '#99C2E8',
  navDypBlaLighten80: '#CCDEE6',
  navLysBlaLighten80: '#E0F5FB',
  navGronnLighten60: '#9BD0B0',
  navLimeGronnLighten80: '#ECEFCC',
  fokusFarge: '#254b6d',
};

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
    smallScreen: 'max-width: 65rem',
    bigScreen: 'min-width: 65rem',
  },
  focus: css`
    outline: none;
    box-shadow: 0 0 0 ${pxToRem(3)} ${colors.fokusFarge};
  `,
  borderRadius: '.2rem',
  layoutMargin: '2rem',
  fadeInAnimation: css`
    animation: ${fadeIn} 0.5s backwards;
  `,
  border: {
    banner: `0.3rem solid ${colors.navBlaLighten60}`,
  },
};
