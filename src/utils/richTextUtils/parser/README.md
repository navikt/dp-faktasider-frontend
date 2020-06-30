# Parser for å parse rich-text fra sanity

## Bakgrunn

I sanity kan vi lage avanserte datastrukturer for å få strukturert innholdet akkurat slik vi ønsker det, men etter mye testing og arbeid i innholdsteamet fant vi ut at vi ønsket å gjøre innholdredigeringen så lettvint og word-lik som mulig. Det gir bra fokus på innhold, uten at man må læres opp i cusom-lagde løsninger. Det betyr også at alle som har jobbet i word greier å redigere innhold på sidene våre.

Men det betyr at vi fraskirver oss muligheten til å sende mer komplekse data-strukturer rett fra sanity.

Bla ønsker vi å strukturere innholdet vårt i bolker. Disse bolkene skal både styles og puttes i `<section>` / `<article>` etc. Dette kunne vi løst ved å putte innholdet i objeketer i sanity, men da ville redigeringsopplevelsen blitt mer tungvindt. Derfor valgte vi å flytte en del av ansvaret for å strukturere innholdet over til frontenden vår. Dette er stortsett bra, for det betyr at vi løser denne kompleksiteten en gang i koden istedenfor hver gang man redigerer innhold.

## Hva gjør parseren?

- [parseRichText](./parseRichText.ts)

Parseren består av flere underparsere som alle implementerer typen:

```typescript
type RichTextParser = (blocks: Block[]) => Block[];
```

Dvs at alle parsere tar imot sanity-blokker og returnerer sanity-blokker, men kan endre på strukturen og innholdet i de enkelte blokkene.

En vanlig oppgave for parseren er å mappe over blokkene for å utlede data som legges i et `blockConfig`-objekt på de enkelte blokkene til senere bruk i appen, feks:

```typescript
const blockConfig = {
  ...currentConfig,
  id: makeUniqeId(getGroupTitle(block)),
};
```

Rekkefølgen på parserene er viktig, da flere parsere er avhengig av arbeid fra foregående parsere.

#### Parseren består av:

- [flattenH2Versions](./flattenH2Versions.ts)
- [makeUniqeGroupIDs](./makeUniqeGroupIDs.ts)
- [groupParser](./groupParser.ts)
