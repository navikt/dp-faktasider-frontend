import { recursivlyReplacePropertyInDeepObject } from "../../../recursivlyReplacePropertyInDeepObject";

/*
 * visForAnnotationDeltTekst resolver hele faktasider, men vi trenger egentlig bare et enkelt felt: id.
 * Det blir veldig mye overflødig data og store pagedata.json for bruker
 * fjernOverflodigDokumentData skal derfor fjerne overflødig data og kun ta vare på dokument-id
 * */
function fjernOverflodigDokumentData(data: any) {
  return recursivlyReplacePropertyInDeepObject(data, "visPaaSider", (value) => value.map((it) => ({ id: it.id })));
}

export default fjernOverflodigDokumentData;
