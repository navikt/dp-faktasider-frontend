import { Block, ParsedSanityBlock } from "../../richTextTypes";
import { RichTextParser } from "../parseRichText";

// H2's come in different versions from sanity (h2, h2-m-meny, h2-no-background etc). These should all be treated equally by the group-parser.
// Therefore this parser converts all h2-XXX versions to plain 'h2', and stores the custom properties of the different versions in a config-object for later use.
export const flattenH2Versions: RichTextParser = (blocks: Block[]) =>
  blocks.map((block) => {
    const currentConfig = (block as ParsedSanityBlock)?.blockConfig;
    switch (block.style) {
      case "h2-no-background":
        return {
          ...block,
          style: "h2",
          blockConfig: {
            ...currentConfig,
            nobackground: true,
          },
        };
      case "h2-m-meny":
        return {
          ...block,
          style: "h2",
          blockConfig: {
            ...currentConfig,
            meny: true,
          },
        };
      default:
        return block;
    }
  });
