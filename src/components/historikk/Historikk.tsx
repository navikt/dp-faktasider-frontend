import { Accordion, Button } from "@navikt/ds-react";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";
import localizeSanityContent from "../../i18n/localizeSanityContent";
import { HistorikkProps } from "../../pages/historikk/[...slug]";
import { formaterDato, formaterTilTallDato } from "../../utils/formaterDato";
import useUniqueId from "../../utils/useUniqueId";
import useBreadcrumbs from "../faktaside/useBreadcrumbs";
import { DokumentRekonstruksjon } from "./DokumentRekonstruksjon";
import HistorikkContextProvider from "./HistorikkContext";
import HistorikkHeader from "./HistorikkHeader";
import LangInfo from "./LangInfo";
import HistoirkkWatermark from "./Watermark";
import { HistoriskDokument } from "./api/historikkFetcher";

const StyledMain = styled.main`
  max-width: 70rem;
  margin: auto;
  background-color: white;
  padding: 5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  --content-max-width: 50rem;

  .popover__content-inner {
    max-width: 40ch;
  }

  > * {
    width: var(--content-max-width);
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const RådataEkspanderbartPanel = styled(Accordion)`
  .navds-accordion__content {
    background-color: #efefef;
  }
`;

const StyledPre = styled.pre`
  font-size: 0.65rem;
  white-space: break-spaces;
  word-break: break-word;
`;

export function Historikk(props: HistorikkProps) {
  const localizedDoc: HistoriskDokument | undefined = localizeSanityContent(props.response?.documents[0], "no");
  const infoId = useUniqueId("info");
  const documentTitle = getTitle(localizedDoc);
  const [openRådata, setOpenRådata] = useState(true);

  const loggingInfo = {
    nåværendeTittel: props.nåværendeSidetittel,
    timestamp: formaterDato(localizedDoc?._updatedAt || ""),
  };

  useEffect(() => {
    const finnesAnchorLink = !!document.querySelector('a[href^="#"]');
    if (finnesAnchorLink) {
      // Gjør noe hvis det finnes anchor-link
      console.log("Anchor link finnes på siden");
    }
  }, []);

  useEffect(() => {
    const finnesAnchorLink = !!document.querySelector('a[href^="#"]');
    if (finnesAnchorLink) {
      // Gjør noe hvis det finnes anchor-link
      console.log("Anchor link finnes på siden");
    }
  }, []);

  useBreadcrumbs(props.domeneTittel, [
    { tittel: "Historikk", path: "historikk" },
    { tittel: documentTitle, path: `historikk/${localizedDoc?._id}/${localizedDoc?._updatedAt}` },
  ]);

  useEffect(() => {
    const anchors = Array.from(document.querySelectorAll('a[href^="#"]'));
    anchors.forEach((a) => {
      const href = a.getAttribute("href") || "";
      const anchorPath = href.startsWith("#") ? href.slice(1) : "";
      if (anchorPath) {
        // Lag et nytt <span>-element med ønsket klasse og tekst
        const span = document.createElement("span");
        span.className = "anchor-hash";
        span.textContent = `#${anchorPath} (ankerlenke)`;
        // Bytt ut <a> med <span> i DOM
        a.parentNode?.replaceChild(span, a);
      }
    });
  }, []);

  useEffect(() => {
    const iframes = Array.from(document.querySelectorAll("iframe"));
    iframes.forEach((iframe) => {
      iframe.style.display = "none"; // Skjul iframe
      const src = iframe.getAttribute("src");

      if (src) {
        // Sjekk om <p> allerede finnes rett etter iframe
        const next = iframe.nextElementSibling;
        if (!(next && next.tagName === "P" && next.textContent === "Lenke til video")) {
          const p = document.createElement("p");
          p.textContent = "Lenke til video";
          p.style.display = "inline"; // Gjør inline hvis ønskelig
          p.style.marginRight = "5px"; // <-- Legg til margin right
          iframe.parentNode?.insertBefore(p, iframe.nextSibling);
        }

        // Sjekk om <a> allerede finnes etter <p>
        const afterP = iframe.nextElementSibling?.nextElementSibling;
        if (!(afterP && afterP.tagName === "A" && afterP.getAttribute("href") === src)) {
          const a = document.createElement("a");
          a.href = src;
          a.textContent = src;
          a.target = "_blank";
          a.style.display = "inline";
          iframe.parentNode?.insertBefore(a, iframe.nextElementSibling?.nextSibling || null);
        }
      }
    });
  }, []);

  function lagreSomPdf() {
    if (typeof window !== "undefined") {
      const element = document.querySelector(".printable");
      if (element instanceof HTMLElement && localizedDoc) {
        const timeStamp = formaterTilTallDato(localizedDoc._updatedAt).replace(/:/g, "-");
        const tittel = localizedDoc.title.replace(/\?/g, "");
        import("html2pdf.js").then((html2pdf) => {
          html2pdf.default().from(element).save(`${timeStamp} - ${tittel}.pdf`);
        });
      }
    }
  }

  return (
    <HistorikkContextProvider
      requestTimestamp={props.request.time}
      hjelpeTekster={props.hjelpeTekster}
      isHistorikk={true}
      loggingInfo={loggingInfo}
    >
      <HistoirkkWatermark />
      <Head>
        <meta name="robots" content="none" />
        <title>{props.hjelpeTekster?.title} | www.nav.no </title>
      </Head>
      <Button className="save-as-pdf-button" onClick={() => lagreSomPdf()}>
        Lagrer side som PDF
      </Button>
      <StyledMain className="printable">
        <HistorikkHeader document={localizedDoc} revisions={props.revisions} title={documentTitle} />
        <DokumentRekonstruksjon dokument={localizedDoc} lesMerLenkeId={infoId} />

        <LangInfo infoId={infoId} />

        <RådataEkspanderbartPanel>
          <Accordion.Item open={openRådata}>
            <Accordion.Header
              onClick={() => {
                setOpenRådata(!openRådata);
              }}
            >
              Rådata
            </Accordion.Header>
            <Accordion.Content>
              <StyledPre>{JSON.stringify(props.response)}</StyledPre>
            </Accordion.Content>
          </Accordion.Item>
        </RådataEkspanderbartPanel>
      </StyledMain>
    </HistorikkContextProvider>
  );
}

function getTitle(dokument?: HistoriskDokument) {
  switch (dokument?._type) {
    case "deltTekst":
      return dokument.title;
    case "faktaSide":
      return dokument.title;
    default:
      return "Kunne ikke finne tittel";
  }
}
