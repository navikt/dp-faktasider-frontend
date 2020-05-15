import * as React from 'react';
import { Link } from 'gatsby';
import { useLocale } from '../locales/useLocale';
import { ReactNode } from 'react';

interface Props {
  to: string;
  children: ReactNode;
}

function LocaleLink(props: Props) {
  const locale = useLocale();

  return <Link to={`/${locale}/${props.to}`}>{props.children}</Link>;
}

export default LocaleLink;
