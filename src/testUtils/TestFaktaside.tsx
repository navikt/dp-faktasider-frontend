import * as React from "react";
import { Block } from "../utils/richTextUtils/richTextTypes";
import { faktaSideMockQueryData } from "./faktaSideMockQueryData";
import FaktaSide from "../components/faktaside/Faktaside";
import { FaktasideQueryData } from "../sanity/groq/faktaside/faktasideQuery";
import { translated } from "./createSanityBlock";
import { mockMenuData } from "../sanity/groq/menu/mockMenuData";
import { parseMenuData } from "../sanity/groq/menu/parseMenuData";
import { parseFaktasideData } from "../sanity/groq/faktaside/parseFaktasideData";
import { MenuQueryData } from "../sanity/groq/menu/menuQuery";

type Props = {
  partialFaktaside?: Partial<FaktasideQueryData["faktaside"]>;
  innhold?: Block[];
  partialMeny?: Partial<MenuQueryData>;
};

function TestFaktaside(props: Props) {
  const faktaSide = { ...faktaSideMockQueryData.faktaside, ...props.partialFaktaside };
  const oppsett = { ...faktaSideMockQueryData.oppsett };

  const context: FaktasideQueryData = {
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
      ...mockMenuData.sider,
    ],
    lenker: props.partialMeny?.lenker || mockMenuData.lenker,
  };

  const parsedMenudata = parseMenuData(menuData, "no");
  const parsedFaktasidedata = parseFaktasideData(context, "no");

  return <FaktaSide menuData={parsedMenudata} {...parsedFaktasidedata} />;
}

export default TestFaktaside;
