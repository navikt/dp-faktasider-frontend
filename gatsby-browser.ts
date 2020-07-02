import DefaultLayout from './src/utils/wrapPageElement';
import { GatsbyBrowser } from 'gatsby';
import { anchorScroll } from './gatsby-utils/anchorScroll';

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = (props) => {
  anchorScroll(props.location);
  return true;
};

export const shouldUpdateScroll: GatsbyBrowser['shouldUpdateScroll'] = (props) => {
  anchorScroll(props.routerProps.location);
  return true;
};

export const wrapPageElement = DefaultLayout;
