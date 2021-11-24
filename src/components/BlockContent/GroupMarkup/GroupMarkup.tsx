import React from "react";
import { Draft } from "../draft/Draft";
import H2Section from "../../Section/H2Section";
import H3Section from "../../Section/H3Section";
import H4Section from "../../Section/H4Section";
import VisFor from "../VisFor/VisFor";
import VisPaaSide from "../VisFor/VisPaaSide";
import { SanityContent } from "../../sanity-content/SanityContent";
import GroupMenu from "./GroupMenu";
import { Group, GroupTypes, isGroup } from "../../../utils/richTextUtils/parser/groupParser/groupParser";
import { ContentSection } from "../../content-section/ContentSection";

interface Props {
  node: Group;
}

function getHeadingLevel(groupType: GroupTypes) {
  switch (groupType) {
    case "h2":
      return "2";
    case "h3":
      return "3";
    case "h4":
      return "4";
    default:
      throw Error(`Ukjent gruppe: ${groupType}`);
  }
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

export function GroupMarkup(props: Props) {
  const { visPaaSider, visFor, id, erUtkast, nobackground, meny } = props.node.blockConfig;
  const { title, children } = props.node;
  const Section = getComponent(props.node.style);
  const menyGrupper = meny ? children.filter(isGroup) : undefined;

  nobackground && console.log(nobackground);
  nobackground && console.log(props.node);

  return (
    <VisPaaSide visPaaSider={visPaaSider}>
      <Draft isDraft={erUtkast}>
        <VisFor visForConfig={visFor}>
          <ContentSection id={id} title={title} headingLevel={getHeadingLevel(props.node.style)}>
            {menyGrupper && <GroupMenu title={title} underGrupper={menyGrupper} />}
            <SanityContent blocks={children} />
            {nobackground && <div>*************************</div>}
          </ContentSection>
          {/*<Section title={title} id={id || "N/A"} {...(nobackground ? nobackground : undefined)}>*/}
          {/*  {menyGrupper && <GroupMenu title={title} underGrupper={menyGrupper} />}*/}
          {/*  <SanityContent blocks={children} />*/}
          {/*</Section>*/}
        </VisFor>
      </Draft>
    </VisPaaSide>
  );
}
