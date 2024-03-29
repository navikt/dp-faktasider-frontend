import React from "react";
import { Alert, Label } from "@navikt/ds-react";
import { SanityBlock } from "../../utils/richTextUtils/richTextTypes";
import { SanityContent } from "../sanity-content/SanityContent";
import styles from "./Notifications.module.scss";

export interface Notification {
  _id: string;
  title?: string;
  innhold?: SanityBlock[];
  visPaaForside?: boolean;
  visPaaFaktaSider?: string[];
}

interface Props {
  notifications: Notification[];
}

export function Notifications(props: Props) {
  return (
    <article className={styles.container}>
      <h2 className="sr-only">Notifikasjoner</h2>
      {props.notifications.map((notification) => (
        <Alert variant="info" key={notification._id}>
          {notification.title && (
            <Label className={styles.label} size="medium">
              {notification.title}
            </Label>
          )}

          {notification.innhold && <SanityContent blocks={notification.innhold} />}
        </Alert>
      ))}
    </article>
  );
}
