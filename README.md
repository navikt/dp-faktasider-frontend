# Produktområde arbeid - infosider

Monorepo med [nextjs-frontend](src) og [sanity-cms](sanity/README.md) for infosider rettet mot arbeidsledige og permitterte på www.nav.no/arbeid/. Inhhold kan redigeres på https://dagpenger.sanity.studio/.

## Utvikle lokalt

```
npm i
npm run dev
```

### Optional

Opprett filen `.env.development` i root-folderet med innholdet (Trengs ikke, men lar deg jobbe mot et development-datasett):

```
NEXT_PUBLIC_SANITY_DATASET="development"
```

#### Live oppdatering

Det funker ca sånn her:

- [Start Sanity Studio opp lokalt](sanity/README.md)
- Når du har startet opp sanity og åpnet det på localhost blir du bedt om å logge inn i sanity. Det blir da satt en autentiseringscookie på localhost-domenet.
- Denne cookien funker også fra nextjs-frontenden og sørger automatisk for at du kan lese drafts fra sanity vha nextjs (dette sørger `usePreviewSubscription` for).

### Scripts

- `npm run docker` bygger appen i en dockercontainer på samme måte som i pipeline, hoster appen på [localhost:3000/arbeid]().

## Oversettelser

### Innhold fra Sanity

Det meste av innholdet som kommer fra sanity vil ha språkversjoner. Da starter typen til sanity-elementet med 'locale'. Feks:

```js
const content = {
  mySting: {
    _type: "localeString",
    en: "English",
    no: "Norwegian",
  },
};
```

Det finnes en [utilityfunksjon](src/i18n/localizeSanityContent.ts) hentet fra Sanity-docs som leter gjennom et javascriptobjekt etter properties som starter med 'locale' for så å velge rikitg språk. Alt innhold fra sanity kjøres gjennom denne for å lette håndtering av språk.

```js
console.log(content.myString); // "{_type: 'localeString', en: 'English', no: 'Norwegian'}"

const lang = "no";
const localizedContent = localizeSanityContent(content, lang);

console.log(localizedContent.myString); // "Norwegian"
```

### Lokale oversettelser, i18next

Det finnes også innhold som ikke ligger i sanity, f.eks [custom lagde react-komponenter](src/components/HvorMyeKalkulator/DagpengerKalkulator.tsx), og 404-siden. I disse komponentene [ligger tekst og oversettelser i koden](src/locales) ved hjelp av [i18next-biblioteket](src/i18n/i18nextConfig.tsx).

Sanity oversettelser og i18next oversettelser er i utgangpunktet ikke knyttet sammen på noe vis og fungerer uavhengig hver for seg.

## Tester

Mange av de automatiske testene har testdata du man kan få visualisert dersom du går til `localhost:3000/arbeid/testdata`.

## Deploy av nye tekster fra sanity

> NB! Dette funker ikke for øyeblikket, appen må bygges på nytt for å få ut nye tekster. Dette skal løse seg om vi får ordnet med web-proxy eller kommer oss ut på gcp, jobber med saken

Nextjs sjekker med jevne mellomrom for nytt innhold fra sanity som automatisk vil gå ut i prod. Se `revalidate` i `getStaticProps`-metodene for hvor hyppig intervallet er (2 minutter i dag).

## Kontakt

Spørsmål tilknyttet koden kan rettes mot:

- Daniel Winsvold, daniel.winsvold@nav.no
- Knut Magne Riise, knut.magne.riise@nav.no
- Synneva Aasbrenn, synneva.aasbrenn@nav.no

### Internt

Slack: #område-arbeid-innhold, #område-arbeid, #team-dagpenger, #team-dagpenger-dev
