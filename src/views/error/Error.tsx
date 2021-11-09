import React from "react";
import { Alert, BodyShort, Detail } from "@navikt/ds-react";
import { SEO } from "../../components/SEO";
import styles from "./Error.module.scss";

export function Error() {
  return (
    <>
      <SEO title={"Teknisk feil"} description="Beklager, det skjedde en teknisk feil." />
      <div className={styles.container}>
        <Alert variant="error">
          <BodyShort>Beklager, det skjedde en teknisk feil.</BodyShort>
          <Detail>
            Feilen blir automatisk rapportert og vi jobber med å løse den så raskt som mulig. Prøv igjen om litt.
          </Detail>
        </Alert>
      </div>
    </>
  );
}
