import React, { useEffect, useRef, useState } from "react";
import { MenuItems } from "./MenuItems";
import { useFaktasideContext } from "../../views/faktaside/FaktaSideContext";
import { Heading } from "@navikt/ds-react";
import { TestId } from "../../utils/test-ids";
import styles from "./Menu.module.scss";
import { useClickAway, useLocation } from "react-use";
import { loggMeny } from "../../utils/logging";
import cx from "classnames";
import { MenuButton } from "./MenuButton";

export function Menu() {
  const location = useLocation();
  const { menuData, domainTitle } = useFaktasideContext();
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => setShowMenu(false));

  useEffect(() => {
    showMenu && loggMeny("Åpne mobilmeny");
  }, [showMenu]);

  useEffect(() => {
    setShowMenu(false);
  }, [location.hash]);

  return (
    <>
      <nav className={styles["desktop-menu"]} data-test-id={TestId.DESKTOP_NAVIGATION}>
        <span className="sr-only">Sideoversikt</span>
        <Heading level={"2"} size={"large"}>
          {domainTitle}
        </Heading>
        <MenuItems menuItems={menuData} />
      </nav>

      <nav className={styles["mobile-menu"]} data-test-id={TestId.MOBILE_NAVIGATION}>
        <div className={styles.container} ref={ref}>
          <MenuButton label="Sideoversikt" onClick={() => setShowMenu((prevState) => !prevState)} isOpen={showMenu} />

          <div className={cx(styles.content, { [styles["content--open"]]: showMenu })}>
            <span className="sr-only">Sideoversikt</span>
            <Heading level={"2"} size={"large"}>
              {domainTitle}
            </Heading>
            <MenuItems menuItems={menuData} />
          </div>
        </div>
      </nav>
    </>
  );
}
