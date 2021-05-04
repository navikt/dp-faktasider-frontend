import * as React from "react";
import Utkast from "../utkast/Utkast";
import H2Section from "../../Section/H2Section";
import H3Section from "../../Section/H3Section";
import H4Section from "../../Section/H4Section";
import VisFor from "../VisFor/VisFor";
import VisPaaSide from "../VisFor/VisPaaSide";
import withErrorBoundary from "../../withErrorBoundary";
import BlockContent from "../BlockContent";
import GroupMenu from "./GroupMenu";
import { Group, GroupTypes, isGroup } from "../../../utils/richTextUtils/parser/groupParser/groupParser";

interface Props {
  node: Group;
}

function getComponent(groupType: GroupTypes) {
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
  const {title, children } = props.node;
  const Section = getComponent(props.node.style)
  const menyGrupper = meny ? children.filter(isGroup) : undefined;

  return (
    <VisPaaSide visPaaSider={visPaaSider}>
      <Utkast erUtkast={erUtkast}>
        <VisFor visForConfig={visFor}>
          <Section title={title} id={id || 'N/A'} noBackground={noBackground}>
            {menyGrupper && <GroupMenu title={title} underGrupper={menyGrupper} />}
            <BlockContent blocks={children} />
          </Section>
        </VisFor>
      </Utkast>
    </VisPaaSide>
  );
}

export default withErrorBoundary(GroupMarkup, "GroupMarkup");
