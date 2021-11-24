import React from "react";
import { MenuItem } from "../../sanity/groq/menu/parseMenuData";
import { MenuItemInternal } from "./MenuItemInternal";
import { MenuItemExternal } from "./MenuItemExternal";
import styles from "./Menu.module.scss";

interface Props {
  menuItems: MenuItem[];
}

export function MenuItems(props: Props) {
  return (
    <ol className={styles["menu-items"]}>
      {props.menuItems?.map((link, index) => (
        <li key={index}>
          {link._type === "menylenkeIntern" ? <MenuItemInternal link={link} /> : <MenuItemExternal link={link} />}
        </li>
      ))}
    </ol>
  );
}
