import DefaultLayout from './src/utils/wrapPageElement';
import { GatsbyBrowser } from 'gatsby';

export const shouldUpdateScroll: GatsbyBrowser['shouldUpdateScroll'] = (props) => {
  return !props.routerProps.location.hash;
};

export const wrapPageElement = DefaultLayout;
