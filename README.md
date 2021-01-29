# Dagpenger faktasider

Nextjs-frontend for dagpengerelaterte faktasider på www.nav.no/arbeid/. Inhhold kan redigeres på https://dagpenger.sanity.studio/.

## Utvikle lokalt

```
npm i
npm start
```

### Optional

Opprett filen `.env.development` i root-folderet med innholdet:

```
NEXT_PUBLIC_SANITY_PROJECT_ID="rt6o382n"
NEXT_PUBLIC_SANITY_DATASET="development"
```

#### Live oppdatering / SANITY_READ_TOKEN

Jeg tror det funker ca sånn her:

Start opp sanity studio lokalt og logg inn i prosjektet. Det blir da satt en autentiseringscookie på localhost. Denne cookien funker også fra frontenden og sørger automatisk for at du kan lese drafts fra sanity vha nextjs (dette sørger `usePreviewSubscription` for).

### Scripts

- `npm run docker` bygger appen i en dockercontainer på samme måte som i pipeline, hoser appen på [localhost/arbeid]().

### Sanity Studio-repo

Innholdet hentes fra sanity https://github.com/navikt/dp-sanity-cms.

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

Mange av de automatiske testene har testdata du man kan få visualisert dersom du går til `localhost:8000/testdata`. Appen må kjøre i development-mode.

## Deploy av nye tekster fra sanity

For at endringer i sanity skal bli publisert på nav.no/arbeid må appen bygges og deployes på nytt. Dette er fordi Gatsby bygger statiske sider buildtime. Du kan feks trigge bygg ved å pushe en tom commit slik:

```
git commit -m "Trigger bygg" --allow-empty
git push
```

Det har blitt forsøkt å trigge automatisk bygg fra sanity når man endrer tekster der, men vi ga opp fordi webhookapi’et trenger autentisering, og det var vanskelig å se hvordan vi får til det uten å legge inn for mye tokens/hemligheter. Kontakt Giao for mer innformasjon. Siden det tar oss lite tid å trigge bygg manuelt har vi ikke valgt å prioritere dette.

## Kontakt

Spørsmål tilknyttet koden kan rettes mot:

- Daniel Winsvold, daniel.winsvold@nav.no
- Knut Magne Riise, knut.magne.riise@nav.no
- Synneva Aasbrenn, synneva.aasbrenn@nav.no

### Internt

Slack: #team-dagpenger, #team-dagpenger-dev
