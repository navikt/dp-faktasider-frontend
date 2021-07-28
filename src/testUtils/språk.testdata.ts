import { Block } from "../utils/richTextUtils/richTextTypes";
import { Translations } from "../types/translations";
import { createSanityBlock } from "./createSanityBlock";

export const språktestData: Translations<Block[]> = {
  _type: "localeRichText",
  no: [createSanityBlock("Norsk innhold")],
  en: [createSanityBlock("English content")],
};
