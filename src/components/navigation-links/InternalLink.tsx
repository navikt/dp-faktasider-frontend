import React from "react";
import Link from "next/link";
import { BodyShort } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { Draft } from "../BlockContent/draft/Draft";
import { MenylenkeInternParsed } from "../../sanity/groq/menu/parseMenuData";

interface Props {
  link: MenylenkeInternParsed;
}

export function InternalLink(props: Props) {
  const { t } = useTranslation("global");
  const langAttribute = !props.link.tilgjengeligPåValgtSpråk ? props.link.språk : undefined;

  return (
    <Link href={props.link.path} locale={langAttribute}>
      <a>
        <BodyShort className="navds-link">{props.link.tittel}</BodyShort>
        {!props.link.tilgjengeligPåValgtSpråk && (
          <Draft>
            <p>
              {t("kunTilgjengeligPå")} {t(props.link.språk)}{" "}
            </p>
          </Draft>
        )}
        <p lang={langAttribute}>{props.link.nokkelordBeskrivelse || props.link.beskrivelse}</p>
      </a>
    </Link>
  );
}
