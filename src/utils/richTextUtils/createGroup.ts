import { idFromString } from "../idFromString";
import { RichText } from "./RichText";
import { Group, GroupTypes } from "./Group";

export function createGroup(title: string, richText: RichText, style: GroupTypes = 'h2'): Group {
  return new Group({
    _type: 'group',
    blockConfig: {
      id: idFromString(title),
    },
  }, title);
}
