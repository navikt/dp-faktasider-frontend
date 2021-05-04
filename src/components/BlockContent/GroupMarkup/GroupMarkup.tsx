import * as React from "react";
import Utkast from "../utkast/Utkast";
import H2Section from "./H2Section";
import H3Section from "./H3Section";
import H4Section from "./H4Section";
import VisFor from "../VisFor/VisFor";
import VisPaaSide from "../VisFor/VisPaaSide";
import withErrorBoundary from "../../withErrorBoundary";
import { Group, GroupTypes } from "../../../utils/richTextUtils/Group";
import BlockContent from "../BlockContent";
import H2GroupMenu from "./H2GroupMenu";

interface Props {
  node: Group;
}

function getSectionMarkup(groupType: GroupTypes) {
  switch (groupType) {
    case "h2":
      return H2Section;
    case "h3":
      return H3Section;
    case "h4":
      return H4Section;
    default:
      throw Error(`Ukjent gruppe: ${groupType}`);
  }
}

function GroupMarkup(props: Props) {
  const { visPaaSider, visFor, id, erUtkast, noBackground, meny } = props.node.blockConfig;
  const {title, richText } = props.node;
  const Section = getSectionMarkup(props.node.style)
  const menyGrupper = meny ? richText.groups() : undefined;

  return (
    <VisPaaSide visPaaSider={visPaaSider}>
      <Utkast erUtkast={erUtkast}>
        <VisFor visForConfig={visFor}>
          <Section title={title} id={id || 'N/A'} noBackground={noBackground}>
            {menyGrupper && <H2GroupMenu title={title} underGrupper={menyGrupper} />}
            <BlockContent blocks={richText.blocks} />
          </Section>
        </VisFor>
      </Utkast>
    </VisPaaSide>
  );
}

export default withErrorBoundary(GroupMarkup, "GroupMarkup");
