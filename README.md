# Dagpenger faktasider
 
Gatsby-frontend for dagpengerelaterte faktasider på www.nav.no/arbeid/dagpenger. Inhhold kan redigeres på https://dagpenger.sanity.studio/.

## Utvikle lokalt
 
```
npm i
npm start
```

### Sanity Studio-repo

Innholdet hentes fra sanity https://github.com/navikt/dp-sanity-cms.

### Live oppdatering av innhold fra Sanity

Opprett filen `.env.development` i root-folderet med innholdet:

```
# SECRET - DO NOT COMMIT TO GIT
SANITY_READ_TOKEN="MITT_HEMMELIGE_TOKEN"
```

Token kan du opprette på https://manage.sanity.io/projects/rt6o382n

Settings -> API -> Add new token (velg "Read" og skriv hvem du er så vi har oversikt over tokens)

> NB! Ikke commit token til git

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

Det finnes også innhold som ikke ligger i sanity, f.eks [custom lagde react-komponenter](src/components/HvorMyeKalkulator/DagpengerKalkulator.tsx), og 404-siden. I disse komponentene [ligger tekst og oversettelser i koden](src/locales) ved hjelp av [i18next-biblioteket](src/i18n/i18nextConfig.js).

Sanity oversettelser og i18next oversettelser er i utgangpunktet ikke knyttet sammen på noe vis og fungerer uavhengig hver for seg.

## Kontakt

Spørsmål tilknyttet koden kan rettes mot:

- Daniel Winsvold, daniel.winsvold@nav.no
- Knut Magne Riise, knut.magne.riise@nav.no
- Synneva Aasbrenn, synneva.aasbrenn@nav.no

### Internt

Slack: #team-dagpenger, #team-dagpenger-dev
