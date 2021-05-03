import { idFromString } from "../idFromString";
import { Group, GroupTypes } from "./richTextTypes";
import { RichText } from "./RichText";

export function createH2Group(title: string, richText: RichText, style?: GroupTypes): Group {
  return {
    title: title,
    richText: richText,
    _type: "group",
    style: style || "h2",
    blockConfig: {
      id: idFromString(title),
    },
  };
}
