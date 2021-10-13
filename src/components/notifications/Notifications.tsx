import React from "react";
import { SanityBlock } from "../../utils/richTextUtils/richTextTypes";
import { SanityContent } from "../sanity-content/SanityContent";
import { withErrorBoundary } from "../withErrorBoundary";
import { Alert, Label } from "@navikt/ds-react";
import styles from "./Notifications.module.scss";

export interface Notification {
  title?: string;
  innhold?: SanityBlock[];
  visPaaForside?: boolean;
  visPaaFaktaSider?: string[];
}

interface Props {
  notifications: Notification[];
}

function NotificationsComponent(props: Props) {
  return (
    <article className={styles.container}>
      <h2 className="sr-only">Notifikasjoner</h2>
      {props.notifications.map((notification, i) => (
        <Alert variant="info" key={i}>
          {notification.title && (
            <Label className={styles.label} size="m">
              {notification.title}
            </Label>
          )}

          {notification.innhold && <SanityContent blocks={notification.innhold} />}
        </Alert>
      ))}
    </article>
  );
}

export const Notifications = withErrorBoundary(NotificationsComponent, "Notifications");
