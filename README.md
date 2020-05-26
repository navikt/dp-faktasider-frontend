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

## Kontakt

Spørsmål tilknyttet koden kan rettes mot:

- Daniel Winsvold, daniel.winsvold@nav.no
- Knut Magne Riise, knut.magne.riise@nav.no
- Synneva Aasbrenn, synneva.aasbrenn@nav.no

### Internt

Slack: #team-dagpenger, #team-dagpenger-dev
