import { Block, BlockConfigFromParser, MarkDef } from "./richTextTypes";
import getPropertyRecursivlyFromDeepObject from "../getPropertyRecursivlyFromDeepObject";
import { getUniqueStrings } from "../../components/BlockContent/VisFor/VisFor";
import { Group } from "./Group";

export class RichText {
  constructor(private readonly richText: Block[] = []) {}

  private alleMarkDefs = () => getPropertyRecursivlyFromDeepObject<MarkDef>(this.richText, "markDefs");
  private alleVisForMarkDefs = () => this.alleMarkDefs().filter((markDef) => markDef._type === "visForAnnotation");

  public tilpassInnholdValg(): string[] {
    const visForMarkDefsSomErIBruk = fjernMarkDefsSomIkkeErIBruk(this.alleVisForMarkDefs(), this.richText);
    const situasjonerFraMarkDefs = visForMarkDefsSomErIBruk.flatMap((it) => it.visFor?.situasjoner || []);

    const alleBlockConfigs = getPropertyRecursivlyFromDeepObject<BlockConfigFromParser>(this.richText, "blockConfig");
    const situasjonerFraBlockConfig = alleBlockConfigs.flatMap((it) => it.visFor?.situasjoner || []);

    return getUniqueStrings([...situasjonerFraMarkDefs, ...situasjonerFraBlockConfig]).sort();
  }

  public groups = () => this.richText.filter(Group.isGroup)

  get blocks() {
   return this.richText;
  }

  public addBlock(block: Block) {
    this.richText.push(block);
  }

  get children() {
    return this.blocks;
  }
}

function fjernMarkDefsSomIkkeErIBruk(markDefs: MarkDef[], altInnhold: Block[]) {
  const alleMarks = getPropertyRecursivlyFromDeepObject<string>(altInnhold, "marks");
  return markDefs.filter((markDef) => alleMarks.includes(markDef._key));
}