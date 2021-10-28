# Produktområde arbeid - infosider

Monorepo med [nextjs-frontend](src) og [sanity-cms](sanity/README.md) for infosider rettet mot arbeidsledige og permitterte på www.nav.no/arbeid/. Inhhold kan redigeres på www.nav.no/arbeid/cms.

## Utvikle lokalt

```
npm i
npm run dev
```

### Optional oppsett

#### Live oppdatering av data fra Sanity

Det funker ca sånn her:

- [Start Sanity Studio opp lokalt](sanity/README.md)
- Når du har startet opp Sanity Studio og åpnet det på localhost blir du bedt om å logge inn i Sanity. Når du har logget inn blir det satt en autentiseringscookie på localhost-domenet i nettleseren din.
- Nå skal liveoppdateringer funke i nextjs-frontenden på localhost (dette sørger `usePreviewSubscription` for, den gjør autentiserte kall fra klienten mot Sanity vha cookien du satt i forrige steg).

#### Env-variabler

Opprett filen `.env.development` i root-folderet med innholdet:

```
# SECRET - DO NOT COMMIT TO GIT

SANITY_READ_TOKEN="ditt hemmelige token her"
NEXT_PUBLIC_SANITY_DATASET="development"
```

Trengs hvis du vil besøke sidene under `/historikk` som må gjøre autentiserte kall mot Sanity eller jobbe mot et development-datasett.

[Sanity-token kan du lage her](https://www.sanity.io/organizations/ojSsHMQGf/project/rt6o382n/settings#tokens). Du trenger bare et token med `Viewer`-rettighet.

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

Nextjs sjekker med jevne mellomrom for nytt innhold fra sanity som automatisk vil gå ut i prod. Se `revalidate` i `getStaticProps`-metodene for hvor hyppig intervallet er (2 minutter i dag).

## Kontakt

Spørsmål tilknyttet koden kan rettes mot:

- Sindre Sægrov, sindre.segrov@nav.no
- Knut Magne Riise, knut.magne.riise@nav.no
- Synneva Aasbrenn, synneva.aasbrenn@nav.no

### Internt

Slack: #område-arbeid-innhold, #område-arbeid, #team-dagpenger, #team-dagpenger-dev
