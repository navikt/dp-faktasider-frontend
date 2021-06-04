import { Revision } from "../../components/historikk/api/revisionsFetcher";
import { HistorikkResponse } from "../../components/historikk/api/historikkFetcher";
import { SanityBlock } from "../../utils/richTextUtils/richTextTypes";

export interface HistorikkHjelpeTekster {
  title: string;
  kortInfo: string;
  langInfo: SanityBlock[];
  deltTekstForklaring: SanityBlock[];
}

export interface HistorikkProps {
  revisions: Revision[];
  response: HistorikkResponse | null;
  request: {
    id: string;
    time: string | null;
  };
  hjelpeTekster?: HistorikkHjelpeTekster;
  domeneTittel: string;
}

export default function () {
  return <div>Nothing here ... 🤷‍♀️</div>;
}
