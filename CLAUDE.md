# Verborgen Wijnroutes — publieke website

Projectcontext voor Claude Code. Dit bestand legt de afspraken vast die met Stijn (oprichter) zijn gemaakt. Lees dit voordat je iets bouwt of wijzigt.

## Werkwijze

- **Eerst bespreken, dan bouwen.** Stijn bepaalt het tempo. Bouw geen pagina's, componenten of content tot daar expliciet om gevraagd wordt.
- Communicatie met Stijn in het Nederlands.
- Geen generieke template- of "AI-website"-uitstraling. Elk ontwerp- en tekstbesluit moet persoonlijk en onderscheidend zijn.

## Merk

- Hoofdmerk: **Verborgen Wijnroutes**. Stijn is het gezicht en de stem, maar de site is geen persoonlijke portfolio.
- Toon: persoonlijk, veel vanuit "ik". Kernverhaal: Stijn is die ene vriend die er al is geweest, de wijn heeft geproefd, de mensen kent en je helpt er een mooie reis van te maken.
- Gevoel: premium, warm, authentiek, avontuurlijk, persoonlijk. Niet elitair, geen cliché-luxe, geen standaard wijnwebsite.
- Ontwerprichting (gekozen): **"Het Reisblad"** — redactioneel, als een onafhankelijk reis- en wijnblad. Spaarzaam aangevuld met elementen uit "De Kronkelweg": de kronkelende rode lijn uit het logo, getekende kaarten, een handgeschreven accent voor Stijns notities, eventueel kleine routelabels. Nooit scrapbook of journal-template.
  - Kleuren: krantenpapier `#F4F0E8`, drukinkt `#1E1C19`, Kallmet-rood `#8E2B22` (enige accent), potloodgrijs `#8A857C`, olijfgrijs `#5C5F48`. Tokens staan in `src/styles/global.css`.
  - Typografie: Newsreader (koppen en lopende tekst), IBM Plex Mono (labels, datelines, bijschriften), Caveat als tijdelijke vervanger voor Stijns eigen handschrift. Zelf gehost via Fontsource (geen Google Fonts-verzoeken).
  - Foto's altijd met bijschrift (Fig. n), nooit tekst over een foto, geen afgeronde hoeken.
  - Animatie subtiel: fade-in, rode lijn die zich tekent, hover op routes; alles uit bij `prefers-reduced-motion`.
- Het design-concept van het reisconcept-project (`docs/design-concept.md` in `verborgen-wijnroutes-reisconcept`) is inspiratie voor de merkwereld, **niet** één-op-één overnemen.
- Logo: bestaat (lijntekening in cirkel: wijngaardheuvels, kronkelende weg, cipres, druivenblad; groen op crème). Origineel bestand in hoge resolutie/vector nog aan te leveren.
- Beeld: eigen fotografie heeft voorkeur boven stock. AI-visuals zijn toegestaan voor illustraties (bijv. kaarten), niet als nep-"echte" foto's van plekken. Alleen beeld gebruiken waarvan de licentie/toestemming duidelijk is.

## Taal

- Uitsluitend Nederlands, ook in de toekomst. Geen i18n, geen `/nl/`-prefix, geen hreflang.
- `lang="nl"`, `og:locale` `nl_NL`, datums en bedragen in Nederlandse notatie.
- SEO gericht op Nederlandse zoekers (bijv. "wijnreis Albanië").

## Architectuur

- Framework: **Astro** (statisch, SEO-vriendelijk, content collections met schema-validatie). Hosting: **Vercel**.
- URL's altijd met trailing slash.
- Sitemap (vastgesteld):
  ```
  /
  ├── /wijnroutes/            overzicht — het hart van de site
  │   ├── /tirana/            actief
  │   ├── /kreta/             binnenkort (was Lefkas)
  │   └── /split/             binnenkort
  ├── /inspiratie/
  │   └── /[artikel]/
  └── /mijn-verhaal/
  Footer-only: /privacy/ (verwerking Google Form-gegevens; inhoud later), 404-pagina.
  ```
- Navigatie: logo · Wijnroutes · Inspiratie · Mijn verhaal · knop "Vraag jouw wijnreis aan" (→ Google Form).
- Footer: routes, Inspiratie, Mijn verhaal, contact (e-mail + Instagram, geen WhatsApp), Privacy.
- Paginaopbouw per pagina is besproken en vastgesteld (zie gespreksverslag); kern: elke pagina stuurt naar een wijnroute, de routepagina is de plek van de aanvraag.
- Routepagina toont de *smaak* van een route, niet het *plan*: geen volledige dagplanning, geen klantprijzen.
- Content als bestanden in de repo, **geen CMS**. Eén template voor routes, één voor inspiratieartikelen; nieuwe content verschijnt automatisch in overzichten, sitemap en koppelingen.
- Route-status: `actief` | `binnenkort` | `gearchiveerd`. Status bepaalt CTA en zichtbaarheid; gearchiveerde routes blijven bereikbaar of krijgen een redirect (nooit zomaar 404). Maximaal ~5 routes tegelijk.

## /reis/ — bestaand systeem, NIET aanraken

- Persoonlijke klantreisconcepten draaien in de aparte repository `vergetenwijnroutes/verborgen-wijnroutes-reisconcept` (eigen Vercel-project). Workflow: n8n → JSON → GitHub → Vercel.
- Dat project wordt **niet** verhuisd, aangepast of opnieuw gebouwd.
- Integratie (later, optie B): deze site wordt eigenaar van het domein en stuurt via rewrites door naar het reisconcept-project:
  - `/reis/*`, `/data/*`, `/images/*` → reisconcept-deployment
- Deze paden zijn dus **gereserveerd**: de publieke site gebruikt ze nooit voor eigen pagina's of assets.
- Voor de doorgestuurde paden: `X-Robots-Tag: noindex` via headers, niet in sitemap, niet in navigatie. Niet blokkeren in `robots.txt` (dan ziet Google de noindex niet).

## Domein

- `verborgenwijnroutes.nl` (geregistreerd via Google) is nog nergens aan gekoppeld. Pas koppelen als de nieuwe site klaar en getest is (inclusief `/reis/ed-ohrid/` via de rewrites).

## Aanvragen

- Klantreis: interesse in bestemming → routepagina → aanvraag → persoonlijk reisconcept op `/reis/[klant-slug]/`.
- Geen vaste vertrekdata, geen "Boek nu".
- CTA per route-status (alle naar hetzelfde Google Form, bestemming vooraf ingevuld via een Google Forms prefill-link `entry.<id>=<bestemming>`):
  - actief (Tirana): "Vraag jouw wijnreis aan"
  - binnenkort (Kreta, Split): "Laat me weten dat je interesse hebt"
- Overige CTA's: homepage/overzicht "Ontdek de wijnroutes" / "Ontdek [route]"; artikelen "Bekijk de wijnroute"; Mijn verhaal eindigt bij de routes.
- Voorbeeld-reisconcept op routepagina's: klein blok met 2–3 screenshots + uitleg ("Geen standaardprogramma. Na je aanvraag stel ik op basis van jullie wensen een persoonlijk reisconcept samen.") + link "Bekijk een voorbeeld van een persoonlijk reisconcept". Gebruik een fictief/geanonimiseerd voorbeeld, nooit een echte klant (geen namen, prijzen of herkenbare gasten).
- Het aanvraagformulier is het **bestaande Google Form** (Google Forms → Google Sheets → n8n blijft leidend). Geen eigen formulier bouwen, geen vragen wijzigen.
  - Schone link (zonder `utm_source=chatgpt.com` / `ouid`): `https://docs.google.com/forms/d/e/1FAIpQLScY1gTmNCSi786n6iRpODb1UhbMeaeZk7QUMHH05STc2PkpSA/viewform`
  - **Geen aparte `/aanvragen/`-pagina.** De aanvraag is geen hoofdonderdeel van de site; de wijnroutes zijn het hart. CTA's op homepage, routepagina's en waar relevant inspiratieartikelen linken direct naar het Google Form.
  - De aanvraag wordt op de site zelf mooi aangekondigd via een terugkerend aanvraagblok (persoonlijke noot van Stijn + "wat gebeurt er na je aanvraag" + knop).

## Status

- Homepage (`/`) is af en goedgekeurd door Stijn. Volgende pagina's worden pas gebouwd als hij daarom vraagt.
- Routes staan in `content/wijnroutes/*.md` (schema in `src/content.config.ts`); homepage en routepagina lezen daaruit.
- `/wijnroutes/tirana/` gebouwd (template `src/pages/wijnroutes/[slug].astro`, genereert nu alleen `actief`-routes). Goedgekeurd door Stijn. Les: bij feedback op 'desktop' eerst vragen welk deel precies bedoeld is; niet op eigen initiatief goedgekeurde secties omgooien.
- Lefkas is vervangen door Kreta. `/wijnroutes/kreta/` gebouwd als binnenkort-pagina (geen foto's op binnenkort-routes, op verzoek van Stijn). Binnenkort-pagina's worden alleen gegenereerd als het bestand een `lead` heeft.
- `/wijnroutes/split/` gebouwd als binnenkort-pagina (Stijns verhaal: vriendenvakantie, wijnproeverij bij Marin's Family Farm, waar het voor hem begon; Marin leidt de proeverij zelf).
- Nog te bouwen: `/wijnroutes/` (overzicht).
- Tirana-content: Stijn wil niet alles weggeven. Alleen Tufa Winery en wijnbar Vena bij naam; overige plekken vaag omschrijven ("namen en adressen in je reisconcept"). Geen vaste route: Tirana + ± 1 uur rijden. Niet pushen op september; het hele jaar kan (zomer 35–40 °C).

## Nog open

- Juridisch: Stijn verkoopt een reisconcept (€ 250, advies); optioneel zet hij voor € 100 boekingsfee alles klaar en maakt hij afspraken namens de klant (staat subtiel vermeld bij het voorbeeld-reisconcept), maar de klant betaalt de aanbieders altijd zelf. Waarschijnlijk geen pakketreisorganisator, maar de boekservice is het grijze gebied: kort laten checken (SGR/ANVR/jurist). Tot die tijd op de site nooit 'boek bij ons', 'pakket' of totaalprijzen; wel 'reisconcept' en 'aanvragen'.
- Welke bestaande teksten hergebruikt worden.
- Prefill bestemmingsvraag: veld `entry.1648549759`, Tirana = `Tirana, Albanië (live)`, Kreta = `Kreta, Griekenland (komt eraan)`, Split = `Split, Kroatië (komt eraan)` (in `src/config/site.ts`, helper `aanvraagLink(route)`). Wijzigt Stijn een antwoordoptie in het formulier, dan hier ook aanpassen.

## Beeldmateriaal (inventaris)

- Eigen foto's (staand, telefoon, documentair): proeflokaal met cortenstalen bank (hero-kandidaat home/Tirana), wijntanks, flessenkast, pasta met rode wijn, Albanese tafel met ARBËRI-kurk, wijnbar Vena (interieur + straatkant), hapjes, en Stijn op straat in Tirana onder de linten (hero Mijn verhaal; origineel in hoge resolutie nodig).
- Niet gebruiken: champagnekast (Franse luxe, merklogo's), mortadella (supermarktlogo's).
- Ontbreekt: landschap/wijngaarden, liggende foto's, video. Kreta en Split: geen beeld → illustratie en tekst. Opvullen via partnerfoto's (met toestemming) en AI-illustratie in één consistente stijl.
- Toestemming nodig voor herkenbare personen.
- Homepage-opening: carrousel (scroll-snap, geen library) met proeflokaal, wijnbar Vena (straatkant-foto; de mooiere interieurfoto van Vena is nog niet als bestand aangeleverd) en de Albanese tafel.
- Voorbeeld-reisconcept op de homepage: op verzoek van Stijn drie screenshots uit een echt reisconcept (route Ohrid & Albanië, Çobo Winery, prijsindicatie), zonder klantnaam. Bewust gekozen: de prijsindicaties van partners zijn daarmee publiek zichtbaar.
- Mobile-first: Stijn wil alles primair voor mobiele bezoekers ingericht hebben.
