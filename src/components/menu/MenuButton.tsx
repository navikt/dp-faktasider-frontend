import React from "react";
import { Button } from "@navikt/ds-react";
import styles from "./MenuButton.module.scss";

interface Props {
  isOpen: boolean;
  label: string;
  onClick: () => void;
}

export function MenuButton(props: Props) {
  const { isOpen, label, onClick } = props;

  return (
    <Button variant="primary" className={styles["menu-button"]} aria-expanded={isOpen} onClick={onClick}>
      <InnholdIkon isOpen={isOpen} />
      <span className="sr-only">{label}</span>
    </Button>
  );
}

function InnholdIkon(props: { isOpen?: boolean }) {
  if (props.isOpen) {
    return (
      <svg viewBox="0.5 0.5 3 3" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round">
        <path d="M 1.2 1.2 L 2.8 2.8" />
        <path d="M 1.2 2.8 L 2.8 1.2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 17 16">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.8 1.3h1.4v1.4H1.8V1.3zM.5 4V0h4v4h-4zm1.3 3.3h1.4v1.4H1.8V7.3zM.5 10V6h4v4h-4zm2.7 3.3H1.8v1.4h1.4v-1.4zM.5 12v4h4v-4h-4zm16-10.7H5.8v1.4h10.7V1.3zm-10.7 6h10.7v1.4H5.8V7.3zm10.7 6H5.8v1.4h10.7v-1.4z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
