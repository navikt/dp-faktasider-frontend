# Dagpenger cms - sanity studio

[Sanity-studio](https://www.sanity.io/studio) / cms-frontend for dagpengerelatert informasjon.

## Starte appen lokalt

```
npm i
npm start
```

Du må logge deg inn i appen med feks github-bruker, du må få tilgang av en administrator for å redigere innhold.

### Deploy av endringer i Sanity Studio

Push på master kjører ikke build & deploy, så for å deploye kodeendringer til [https://dagpenger.sanity.studio](https://dagpenger.sanity.studio) må du deploye slik:

`npm run deploy`

## Publisere innhold

Først må innholdet publiseres i Sanity. Innholdet blir dessverre ikke publisert på nav.no automatisk etter dette, men det jobber vi med. I mellomtiden kan man trigge et manuelt bygg av [faktasider-frontend](https://github.com/navikt/dp-faktasider-frontend) ved å pushe en tom commit `git commit -m "Trigger bygg" --allow-empty` (ikke i dette repoet, men i faktasider-frontend).

## Konsumenter

Innholdet brukes av:

- https://github.com/navikt/dp-faktasider-frontend

## Kontakt

Spørsmål tilknyttet koden kan rettes mot:

- Daniel Winsvold, daniel.winsvold@nav.no
- Knut Magne Riise, knut.magne.riise@nav.no
- Synneva Aasbrenn, synneva.aasbrenn@nav.no

### Internt

Slack: #team-dagpenger, #team-dagpenger-dev
