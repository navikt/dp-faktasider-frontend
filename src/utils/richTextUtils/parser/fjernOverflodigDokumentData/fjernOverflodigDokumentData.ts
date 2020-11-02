/*
 * visForAnnotationDeltTekst resolver hele faktasider, men vi trenger egentlig bare et enkelt felt: id.
 * Det blir veldig mye overflødig data og store pagedata.json for bruker
 * fjernOverflodigDokumentData skal derfor fjerne overflødig data og kun ta vare på dokument-id
 * */

function fjernOverflodigDokumentData(value: any) {
  if (Array.isArray(value)) {
    return value.map((v) => fjernOverflodigDokumentData(v));
  } else if (value && typeof value == 'object') {
    return Object.keys(value).reduce((acc, key) => {
      return {
        ...acc,
        [key]:
          key === 'visPaaSider'
            ? value.visPaaSider.map((it) => ({ id: it.id }))
            : fjernOverflodigDokumentData(value[key]),
      };
    }, {});
  }

  return value;
}

export default fjernOverflodigDokumentData;
