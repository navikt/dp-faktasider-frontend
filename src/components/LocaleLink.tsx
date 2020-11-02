import * as React from "react";
import { Link } from "gatsby";
import { ReactNode } from "react";
import { useLocale } from "../i18n/LocaleContext";

interface Props {
  to: string;
  children: ReactNode;
  className: string;
  activeStyle: { color: string };
}

function LocaleLink(props: Props) {
  const { to, ...rest } = props;
  const locale = useLocale();

  return <Link {...rest} to={`/${locale}/${props.to}`} />;
}

export default LocaleLink;
