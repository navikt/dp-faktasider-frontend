import React, { PropsWithChildren } from "react";
import { useDevContext } from "../../DevKnapper/DevContext";
import styles from "./Draft.module.scss";

interface Props {
  inline?: boolean;
  isDraft?: boolean;
}

export function Draft(props: PropsWithChildren<Props>) {
  const devContext = useDevContext();
  const show = props.isDraft !== undefined && !props.isDraft;
  const showAsDraft = devContext.value.visUtkast;

  if (show) {
    return <>{props.children}</>;
  }

  if (showAsDraft) {
    return (
      <>
        {props.inline && (
          <span className={styles.container} title="Dette vises ikke i prod">
            {props.children}
          </span>
        )}

        {!props.inline && (
          <div className={styles.container} title="Dette vises ikke i prod">
            <div className={styles.label}>Utkast</div>
            {props.children}
          </div>
        )}
      </>
    );
  }

  return null;
}
