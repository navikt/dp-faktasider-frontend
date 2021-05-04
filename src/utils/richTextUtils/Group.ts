import { Block, BlockConfigFromParser, ParsedSanityBlock } from "./richTextTypes";
import { getTextFromSanityBlock } from "./getTextFromSanityBlock";
import { RichText } from "./RichText";
import allChildrenMarkedWith, { getCommonVisForConfig } from "./allChildrenMarkedWith";

export type GroupTypes = "h2" | "h3" | "h4";

export class Group implements ParsedSanityBlock {
  public readonly style: GroupTypes;
  public readonly title: string;
  public readonly _type = "group";
  public readonly richText = new RichText();
  public readonly id: string;
  public blockConfig: BlockConfigFromParser;

  constructor(block: ParsedSanityBlock, title?: string) {
    this.style = block.style as GroupTypes;
    this.title = title || getTextFromSanityBlock(block);
    this.blockConfig = createBlockConfig(block);
    this.id = this.blockConfig.id || 'N/A';
  }

  public addBlock(block: Block) {
    this.richText.addBlock(block);
  }

  get children() {
    return this.richText.children;
  }

  static isGroup(candidate: Block): candidate is Group {
    return candidate._type === 'group';
  }
}

function createBlockConfig(block: ParsedSanityBlock): BlockConfigFromParser {
  const currentConfig = block?.blockConfig;
  const commonVisForConfig = getCommonVisForConfig(block);

  return {
    ...currentConfig,
    erUtkast: allChildrenMarkedWith(block, "utkast"),
    visFor: commonVisForConfig?.visFor,
    visPaaSider: commonVisForConfig?.visPaa,
  };
}