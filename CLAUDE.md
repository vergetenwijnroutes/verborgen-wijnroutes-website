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
- Ontwerprichting: redactioneel — boutique travel × wijn & gastronomie × reis-/wijnmagazine × persoonlijke reisnotities × mediterrane/Balkan-sfeer. Exacte kleuren, typografie, fotografie en animaties worden nog samen bepaald.
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
- Publieke pagina's:
  - `/`
  - `/wijnroutes/` en `/wijnroutes/[slug]/` (nu: `tirana` actief, `lefkas` binnenkort, `split` binnenkort)
  - `/inspiratie/` en `/inspiratie/[slug]/`
  - `/mijn-verhaal/`
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
- Geen vaste vertrekdata, geen "Boek nu". CTA's in de richting van "Ontdek Tirana", "Bekijk de wijnroute", "Start jouw wijnreis", "Vraag jouw wijnreis aan".
- Het aanvraagformulier is het **bestaande Google Form** (Google Forms → Google Sheets → n8n blijft leidend). Geen eigen formulier bouwen, geen vragen wijzigen.
  - Schone link (zonder `utm_source=chatgpt.com` / `ouid`): `https://docs.google.com/forms/d/e/1FAIpQLScY1gTmNCSi786n6iRpODb1UhbMeaeZk7QUMHH05STc2PkpSA/viewform`
  - **Geen aparte `/aanvragen/`-pagina.** De aanvraag is geen hoofdonderdeel van de site; de wijnroutes zijn het hart. CTA's op homepage, routepagina's en waar relevant inspiratieartikelen linken direct naar het Google Form.
  - De aanvraag wordt op de site zelf mooi aangekondigd via een terugkerend aanvraagblok (persoonlijke noot van Stijn + "wat gebeurt er na je aanvraag" + knop).

## Nog open

- Contactopties naast het formulier (WhatsApp, e-mail, kennismakingsgesprek).
- Interesselijst/nieuwsbrief voor binnenkort-routes.
- Juridisch: pakketreizen / SGR of vergelijkbare garantieregeling.
- Welke bestaande teksten hergebruikt worden.
