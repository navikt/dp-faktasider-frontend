# Dagpenger faktasider

Gatsby-frontend for dagpengerelaterte faktasider. Innholdet hentes fra sanity https://github.com/navikt/dp-sanity-cms.

## Utvikle lokalt

```
npm i
npm start
```

### Live oppdatering av innhold fra Sanity

Opprett filen `.env.development` i root-folderet med innholdet:

```
# SECRET - DO NOT COMMIT TO GIT
SANITY_READ_TOKEN="MITT_HEMMELIGE_TOKEN"
```

Token kan du opprette på https://manage.sanity.io/projects/rt6o382n

Settings -> API -> Add new token (velg "Read" og skriv hvem du er så vi har oversikt over tokens)

> NB! Ikke commit token til git

## Node-versjon

Pga bruk av optional chaning (`.?`) i .js-filer må du kjøre på node 14.x eller nyere.

```
nvm use 14
```

## Kontakt

Spørsmål tilknyttet koden kan rettes mot:

- Daniel Winsvold, daniel.winsvold@nav.no
- Knut Magne Riise, knut.magne.riise@nav.no
- Synneva Aasbrenn, synneva.aasbrenn@nav.no

### Internt

Slack: #team-dagpenger, #team-dagpenger-dev
