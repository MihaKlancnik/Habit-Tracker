

## 1) Jakobov zakon

Kaj gledati na strani:
- Skladnost z običajnimi UI-vzorci (navigacija, postavitev strani, obnašanje gumbov, ikone).
- Ali so meniji, dogodki in interakcije tam, kjer jih uporabniki običajno iščejo?

Kje je zakon upoštevan (navedi natančne strani/komponente):
- Glavni header (zgornja navigacija) uporablja tipično top-nav z logotipom na levi in kontrolami/desnim menijem (linki Add, Settings, Random). To je standardna postavitev, ki sledi pričakovanjem uporabnikov.
- Na dashboardu (glavni zaslon aplikacije) so pogoste akcije (Add, Export, Sort, Filter) postavljene na vrhu — tudi to je poznan vzorec.

Primer, kjer bi ga lahko upoštevali / predlog za prenovo:
- Dodati lahko krajši opis ali tooltip za manj očitne gumbe (npr. "Random") saj ime brez konteksta ni povsem samoumevno.

---

## 2) Fittov zakon

Kaj gledati na strani:
- Velikosti klikabilnih elementov (gumbi, ikone, povezave) na namizju in mobilnih napravah.
- Razdalje med pogostimi kontrolami (ali so preblizu/ predaleč).
- Posebno preverite mobilno različico.

Smernice velikosti za preverjanje (izberite eno ali več):
- Apple HIG: 44 × 44 pt
- Material Design: 48 × 48 dp
- WCAG (referenčni CSS px): 44 × 44 CSS px
- Nielsen Norman Group: 1 × 1 cm

Kje je zakon upoštevan (navedi elemente):
- Večina gumbov na dashboardu in na karticah navad uporablja razumen padding, kar daje dovolj veliko klikabilno površino na namizju.


Elementi, ki ne izpolnjujejo smernic (navedi in predlagaj spremembo):
- Gumb only done todaj je premajhen

---

## 3) Hickov zakon

Kaj gledati na strani:
- Število možnosti v menijih, kontrolah in seznamih.
- Ali so ikone brez oznak (label) — preveri, ali so ikone pojasnjene z oznakami ali tooltipi.
- Kategorizacija vsebine: ali so kategorije smiselne in ne preveč razdrobljene?

Kje je zakon upoštevan (navedi primere):
- Meniji in kontrolni panel na dashboardu združujejo več kontrol (Add, Search, Only done today, Sort, Export, Mark all, Clear all) v eno vrstico; to je dobro za dostop do pogostih dejanj, vendar lahko vizualno izgleda kot mnogo možnosti.
- Večina ikon ni uporabljena — gumbi so besedilni, kar zmanjšuje potrebo po razlagalnih tooltipih.

Predlogi za zmanjšanje kompleksnosti (gručenje, filtriranje, osnovni/poglobljeni pogledi):
- Združi manj pogostih akcij (Export, Duplicate) v »⋯« meni ali v Settings, da zmanjšate število neposredno vidnih možnosti.

---

## 4) Millerjev zakon

Kaj gledati na strani:
- Dolžina seznamov, število elementov v menijih ali v korakih v procesu (npr. obrazci z več polji).
- Ali bi smiselno gručili elemente v skupine ali razdelili korake?

Kje je zakon upoštevan (navedi primere):
- Obrazci za dodajanje navad (osnovni dodaj, dodaj številčno, dodaj kratko) so kratki (navadno 2 vnosna polja). To spoštuje omejitev delovnega spomina in olajša dokončanje.

Predlogi za gručenje ali razbijanje vsebine:


---

## 5) Postelov zakon (Postelov / robustnosti)


Kaj gledati na strani:
- Kako strogi/omejujoči so vnosi v obrazcih (registracija, prijava, iskanje, dodajanje vsebine).
- Ali so napake pri vnosu jasno prikazane in ali sistem sprejme razumne različice vnosa (npr. permisivno oblikovanje e-mailov, datumov)?

Kje je zakon upoštevan (navedi polja):
- V obrazcih za dodajanje navad so prisotne osnovne validacije in se izpišejo napake (npr. "Name is required", omejitve dolžine). To je konzervativen pristop pri pošiljanju (ne shrani neveljavnega) in jasno obvešča uporabnika.
- Aplikacija uporablja robusten način branja in normalizacije podatkov iz lokalne shrambe, kar prepreči, da bi pokvarjena shranjena vsebina zlomila aplikacijo.

Predlogi za bolj liberalno ali bolj konzervativno obravnavo vhodov:
- Dovolite manj strogo obdelavo vnosov za polja, kjer je mogoče (npr. trim inputa, sprejem številk kot nizov in pretvorba). 

---

## 6) Pravilo vrh-konec (Peak–End rule)

Kaj gledati na strani:
- Izberi dve ključni funkcionalnosti (npr. "dodaj novo navado" in "pregled napredka").
- Zabeleži vse korake uporabniške poti za vsako funkcionalnost.
- Označi, kateri korak predstavlja vrhunec (najbolj intenziven) in kateri konec (zadnji vtis).

Funkcionalnost A: Dodaj novo navado (Add)
- Koraki (številčeno):
  1. Uporabnik klikne "+ Add habit" na dashboardu (glavni zaslon).
  2. Izpolni polja v obrazcu za dodajanje navade (Name, Description).
  3. Klikne Save; aplikacija shrani navado in vrne uporabnika na dashboard.
- Vrh: Potrditev shranjevanja / povratek na dashboard z novo navado v seznamu (vizualni vrhunec).
- Konec: Uporabnik vidi novo navado na dashboardu (končni vtis).
- Komentarji in predlogi za izboljšanje vrha/koncev:
  - Dodati kratko animacijo ali uspešno sporočilo ob uspešnem dodajanju, da je vrhunec bolj izrazit.
  - Trenutni potek takoj preusmeri na dashboard; razmislite o opciji "Add and view" če želite, da uporabnik takoj nastavi podrobnosti.

Funkcionalnost B: Označi navado kot opravljeno danes (Mark today)
- Koraki (številčeno):
  1. Uporabnik na dashboardu klikne gumb "Mark today" na kartici navade ali na strani navade klikne datum v prikazu zadnjih dni.
  2. Notranja logika posodobi stanje in shranjevanje v ozadju; UI takoj spremeni stanje gumba (npr. "Done ✓") ali slog datumske tipke.
  3. Nemudoma se spremeni števec "Done today" na dashboardu zaradi reaktivnega prikaza.
- Vrh: Vizualna potrditev spremembe (gumb se spremeni v "Done ✓" in števec se posodobi).
- Konec: Uporabnik ostane na isti strani z jasno novo stanje (zadnji vtis je potrditev).
- Komentarji in predlogi za izboljšanje:
  - Trenutna sprememba je takojšnja (dobro). Lahko dodate kratko animacijo ali microcopy "Saved" ob kliku, da je vrhunec bolj opazen.

---

## 7) Učinek estetske uporabnosti (Aesthetic–Usability Effect)

Kaj gledati na strani:
- Splošna vizualna kakovost: tipografija, barvna paleta, poravnave, belina (whitespace).
- Ali so komponente vizualno skladne in profesionalne?

Hitri subjektivni pregled (oceni 1–5, 5 = zelo estetsko):
- Ocena: 3
- Najmočnejše strani dizajna:
  - Konsistentna uporaba slogov (npr. enotne kartice, obrobe in zaobljeni koti), kar daje profesionalno podobo.

- Kar bi izboljšal/a (konkretno):
  - Popravi dark mode
  - Prilagodi stran čez celoten zaslon

---

## 8) Von Restorffov učinek (efekt izolacije)

Kaj gledati na strani:
- Ali so ključne akcije ali opozorila dovolj poudarjeni (barva, kontrast, gibanje, velikost)?
- Kako so označene potrditve/brisi/uspeli vnosi — ali izstopajo?

Kje je učinek uporabljen (primeri):
- Gumb Delete na kartici navade ima rdeč odtenek, zaradi česar se jasno loči od ostalih akcij

Predlogi za izboljšanje izpostavitve pomembnih elementov:
- Pri uspešnem dodajanju navade dodajte kratko sporočilo z močnim kontrastom (zelen) 


---

## 9) Teslerjev zakon (zakon ohranjanja kompleksnosti)

Kaj gledati na strani:
- Kje bi lahko avtomatizirali naloge (predloge, polnjenje polj, samodejne nastavitve)?
- Kje je kompleksnost skrita preveč (preveč abstraktne ikone brez razlage)?

Kje je kompleksnost dobro skrita/razkrita (primeri):
- Aplikacija skriva večino kompleksnosti v ozadju (lokalna shramba in notranja normalizacija podatkov), kar pomeni, da uporabnik potrebuje samo nekaj osnovnih dejanj (Add, Mark) — kompleksnost shranjevanja in normalizacije je skrita.

Možnosti za premik kompleksnosti (predlogi):
- Dodajte avtomatske predloge imen (npr. pogosta imena navad) ali predizpolnjevanje datuma.
---

## 10) Dohertyjev prag

Kaj gledati na strani:
- Trenutne hitrosti nalaganja strani (vpišite meritve iz svojega poročila o učinkovitosti).
- Ali uporabljate pristranske tehnike: skeleton screens, blurred images, napredek nalaganja, animacije, indikatorji?


-Stran je zelo zelo hitra