import { render, within } from "../../../../testUtils/customized-testing-library";
import parseRichText from "../parseRichText";
import BlockContent from "../../../../components/BlockContent/BlockContent";
import React from "react";
import { makeUniqueIdTestData } from "./makeUniqeGroupIDs.testdata";
import { PureInnholdsfortegnelse } from "../../../../components/faktaside/Meny/Innholdsfortegnelse/Innholdsfortegnelse";
import { Group } from "../../Group";

test("makeUniqueGroupIDs lager unike IDer slik at vi kan lage fungerende hash-lenker i appen", () => {
  const parsedRichText = parseRichText(makeUniqueIdTestData);
  const h2Groups: Group[] = parsedRichText.groups();

  const result = render(
    <>
      <PureInnholdsfortegnelse title="Tester unike ID'er" innholdsListe={h2Groups} />
      <BlockContent blocks={parsedRichText.blocks} />
    </>
  );

  const innholdsFortegnelse = result.getByLabelText(/Innholdsfortegnelse/i);
  const hashLenke = within(innholdsFortegnelse).getByText("Duplikat overskrift") as HTMLAnchorElement;
  const hashId = hashLenke.href.split("#")[1];

  const target = result.getAllByTestId(hashId);
  expect(target[0].innerHTML.includes("Innhold 2")).toBe(true);
  expect(target).toHaveLength(1);
});
