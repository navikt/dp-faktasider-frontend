import * as React from "react";
import { Block } from "../utils/richTextUtils/richTextTypes";
import { faktaSideMockQueryData } from "./faktaSideMockQueryData";
import FaktaSide from "../components/faktaside/Faktaside";
import { FaktasideQueryData } from "../sanity/groq/faktaside/faktasideQuery";
import { translated } from "./createSanityBlock";
import { mockMenuData } from "../sanity/groq/menu/mockMenuData";
import { MenuQueryData } from "../sanity/groq/menu/menuQuery";

type Props = {
  partialFaktaside?: Partial<FaktasideQueryData["faktaside"]>;
  partialOppsett?: Partial<FaktasideQueryData["oppsett"]>;
  innhold?: Block[];
  partialMeny?: Partial<MenuQueryData>;
};

function TestFaktaside(props: Props) {
  const faktaSide = { ...faktaSideMockQueryData.faktaside, ...props.partialFaktaside };
  const oppsett = { ...faktaSideMockQueryData.oppsett, ...props.partialOppsett };

  const faktasideData: FaktasideQueryData = {
    faktaside: {
      ...faktaSide,
      innhold: props.innhold ? translated(props.innhold) : faktaSide.innhold,
    },
    oppsett,
  };

  const menuData: MenuQueryData = {
    sider: props.partialMeny?.sider || [
      {
        title: faktaSide.title,
        slug: faktaSide.slug,
        beskrivelse: faktaSide.beskrivelse,
        id: faktaSide.id,
        nokkelordBeskrivelse: translated("Noen nøkkelord"),
        visSprakversjon: faktaSide.visSprakversjon,
      },
      ...mockMenuData.sider!,
    ],
    lenker: props.partialMeny?.lenker || mockMenuData.lenker,
  };

  return <FaktaSide rawMenuData={menuData} rawFaktasideData={faktasideData} />;
}

export default TestFaktaside;
