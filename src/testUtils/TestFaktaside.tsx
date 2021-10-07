import * as React from "react";
import { Block } from "../utils/richTextUtils/richTextTypes";
import { faktaSideMockQueryData } from "./faktaSideMockQueryData";
import FaktaSide from "../components/faktaside/Faktaside";
import { FaktasideQueryData, IFaktaside } from "../sanity/groq/faktaside/faktasideQuery";
import { translated } from "./createSanityBlock";
import { mockMenuData } from "../sanity/groq/menu/mockMenuData";
import { MenuQueryData } from "../sanity/groq/menu/menuQuery";

type Props = {
  partialFaktaside?: Partial<IFaktaside>;
  partialOppsett?: Partial<FaktasideQueryData["oppsett"]>;
  innhold?: Block[];
  partialMeny?: Partial<MenuQueryData>;
};

function TestFaktaside(props: Props) {
  // @ts-ignore -- av en eller annen grunn stoler ikke IDE på at faktasidemockquerydata er komplett
  const faktaSide: IFaktaside = { ...faktaSideMockQueryData.faktaside, ...props.partialFaktaside };
  const oppsett = { ...faktaSideMockQueryData.oppsett, ...props.partialOppsett };

  const faktasideData: FaktasideQueryData = {
    ...faktaSideMockQueryData,
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

  return <FaktaSide menuQueryData={menuData} faktasideQueryData={faktasideData} />;
}

export default TestFaktaside;
