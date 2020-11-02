import { idFromString } from "../idFromString";
import { Block, Group, GroupTypes } from "./richTextTypes";

export function createH2Group(title: string, children: Block[], style?: GroupTypes): Group {
  return {
    title: title,
    children: children,
    _type: "group",
    style: style || "h2",
    blockConfig: {
      id: idFromString(title),
    },
  };
}
