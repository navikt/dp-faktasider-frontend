# Dagpenger faktasider

Gatsby-frontend for dagpengerelaterte faktasider på www.nav.no/arbeid/. Inhhold kan redigeres på https://dagpenger.sanity.studio/.

## Utvikle lokalt

```
npm i
npm start
```

### Optional

Opprett filen `.env.development` i root-folderet med innholdet:

```
# SECRET - DO NOT COMMIT TO GIT
# SANITY_READ_TOKEN="MITT_HEMMELIGE_TOKEN"

# DATASET="development"
```

#### Live oppdatering

Kommenter ut `SANITY_READ_TOKEN="MITT_HEMMELIGE_TOKEN"` og opprett token på https://manage.sanity.io/projects/rt6o382n:

`Settings -> API -> Add new token (velg "Read" og skriv hvem du er så vi har oversikt over tokens)`

> NB! Ikke commit token til git

#### Development-datasett

Kommenter ut `DATASET="development"` og du kan jobbe mot et test-datasett fra sanity (anbefales dersom du ønsker å lage custom innhold i sanity under utvikling).

### Scripts

- `npm run seHvordanDetBlirIProd` lager et bygg og hoster lokalt på [localhost:9000/arbeid]() (Hvis du går til [localhost:9000]() får du bare `Cannot GET /`, husk å legge til `/arbeid`). Dette blir prodlikt mtp innhold og statiske filer.
- `npm run docker` bygger appen i en dockercontainer på samme måte som i pipeline, hoser appen på [localhost/arbeid]().

### Sanity Studio-repo

Innholdet hentes fra sanity https://github.com/navikt/dp-sanity-cms.

## Oversettelser

### Innhold fra Sanity

Det meste av innholdet som kommer fra sanity vil ha språkversjoner. Da starter typen til sanity-elementet med 'locale'. Feks:

```js
const content = {
  mySting: {
    _type: 'localeString',
    en: 'English',
    no: 'Norwegian',
  },
};
```

Det finnes en [utilityfunksjon](src/i18n/localizeSanityContent.ts) hentet fra Sanity-docs som leter gjennom et javascriptobjekt etter properties som starter med 'locale' for så å velge rikitg språk. Alt innhold fra sanity kjøres gjennom denne for å lette håndtering av språk.

```js
console.log(content.myString); // "{_type: 'localeString', en: 'English', no: 'Norwegian'}"

const lang = 'no';
const localizedContent = localizeSanityContent(content, lang);

console.log(localizedContent.myString); // "Norwegian"
```

### Lokale oversettelser, i18next

Det finnes også innhold som ikke ligger i sanity, f.eks [custom lagde react-komponenter](src/components/HvorMyeKalkulator/DagpengerKalkulator.tsx), og 404-siden. I disse komponentene [ligger tekst og oversettelser i koden](src/locales) ved hjelp av [i18next-biblioteket](src/i18n/i18nextConfig.tsx).

Sanity oversettelser og i18next oversettelser er i utgangpunktet ikke knyttet sammen på noe vis og fungerer uavhengig hver for seg.

## Tester

Mange av de automatiske testene har testdata du man kan få visualisert dersom du går til `localhost:8000/testdata`. Appen må kjøre i development-mode.

## Kontakt

Spørsmål tilknyttet koden kan rettes mot:

- Daniel Winsvold, daniel.winsvold@nav.no
- Knut Magne Riise, knut.magne.riise@nav.no
- Synneva Aasbrenn, synneva.aasbrenn@nav.no

### Internt

Slack: #team-dagpenger, #team-dagpenger-dev
