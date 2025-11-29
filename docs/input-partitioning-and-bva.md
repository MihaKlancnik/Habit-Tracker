# Particioniranje vhodnih podatkov in analiza mejnih vrednosti (Ekvivalenčne kategorije + BVA)

Namen tega dokumenta je opisati pravila za vnos, razdelitev vhodnih podatkov na ekvivalenčne kategorije (equivalence partitions) in analizo mejnih vrednosti (boundary value analysis) za vse uporabniške primere v aplikaciji, ki zahtevajo vnos.

Datoteka pokriva naslednje forme/use-case v aplikaciji:
- `Add` (originalni obrazec): polji
  - `name` (obvezno, string)
  - `description` (opcijsko, string)
- `Add numeric` (`/add-number`): polji
  - `name` (obvezno, string)
  - `target` (obvezno, integer)
- `Add short` (`/add-short`): polji
  - `name` (obvezno, string)
  - `shortNote` (obvezno, string, max 50)
- `Edit habit` (`/habit/[id]` edit mode): polji
  - `draftName` (obvezno, string)
  - `draftDesc` (opcijsko, string)

Opombe in predpostavke
- Privzete omejitve uvedene v kodi: name max 100 znakov, description max 200 znakov, shortNote max 50, target integer v intervalu [1,99].
- Če specifikacije niso definirane drugje, so spodnje predpostavke smiselne in uporabljene v testih.
- Pri številskih poljih pomeni "neveljavno": vrednosti, ki niso cela števila, so negativne, ali ne zadostijo mejam.

Struktura dokumenta za vsako polje:
1. Pravila za vnos (validnosti)
2. Ekvivalenčne kategorije (veljavne / neveljavne skupine)
3. Analiza mejnih vrednosti (kanonična BVA)
4. Končni seznam testnih primerov (vhod, pričakovani rezultat)


alkjsdb
asdaew
asdsa

aaa
--------------------------------------------------------------------------------

## 1) `name` (vsi obrazci)

Pravila za vnos
- Obvezno polje (ne sme biti prazno ali samo presledki).
- Maksimalna dolžina: 100 znakov.
- Priporočeno: trim (lead/trail whitespace odstranjen) pred shranjevanjem.

Ekvivalenčne kategorije
- Veljavne:
  - V1: Non-empty kratko ime (npr. "Drink water")
  - V2: Ime natanko 100 znakov
  - V3: Ime z vmesnimi presledki (npr. "  Jog  ", po trim -> "Jog")
- Neveljavne:
  - N1: Prazno ali samo presledki
  - N2: Dolžina > 100 znakov

BVA (mejne vrednosti)
- Preveri dolžino: 0, 1, 99, 100, 101

Testni primeri (`name`)
- T1: "" (prazno) → pričakovano: napaka "Name is required" (ne shrani)
- T2: "A" → pričakovano: sprejeto
- T3: 99-znakovno ime → pričakovano: sprejeto
- T4: 100-znakovno ime → pričakovano: sprejeto
- T5: 101-znakovno ime → pričakovano: napaka "Name must be at most 100 characters"
- T6: "   Foo   " → pričakovano: sprejeto z imenom "Foo"

--------------------------------------------------------------------------------

## 2) `description` / `draftDesc` (optional)

Pravila
- Opcijsko polje.
- Če prisotno, naj ne presega 200 znakov.

Ekvivalenčne kategorije
- Veljavne:
  - V1: Prazno (ni navedeno)
  - V2: Kratek opis (<200)
  - V3: Natanko 200 znakov
- Neveljavne:
  - N1: >200 znakov

BVA
- Dolžina: 0, 1, 199, 200, 201

Testni primeri (`description`/`draftDesc`)
- D1: "" (prazno) → sprejeto
- D2: 1-znakovni opis → sprejeto
- D3: 199-znakovni opis → sprejeto
- D4: 200-znakovni opis → sprejeto
- D5: 201-znakovni opis → napaka "Description must be at most 200 characters"

--------------------------------------------------------------------------------

## 3) `target` (Add numeric)

Pravila za vnos
- Obvezno polje.
- Mora biti celo število (integer).
- Veljavne vrednosti v aplikaciji: 1 .. 99 (vključujoče). (Zahteve: "smaller than 100" in > 0.)

Ekvivalenčne kategorije
- Veljavne:
  - V1: Celo pozitivno število znotraj obsega (npr. 1, 10, 99)
- Neveljavne:
  - N1: Manj kot 1 (0)
  - N2: Manj kot 0 (negativna števila)
  - N3: 100 ali več
  - N4: Decimalne vrednosti (npr. 2.5)
  - N5: Non-numeric (npr. "abc")
  - N6: Prazen/ni vnešeno

BVA (mejne vrednosti)
- Testirati vrednosti: 0, 1, 2, 98, 99, 100

Testni primeri (`target`)
- T1: (prazno) → napaka "Target is required"
- T2: 0 → napaka "Target must be greater than 0"
- T3: 1 → sprejeto
- T4: 2 → sprejeto
- T5: 98 → sprejeto
- T6: 99 → sprejeto
- T7: 100 → napaka "Target must be smaller than 100"
- T8: -5 → napaka (negativno neveljavno)
- T9: 2.5 → napaka "Target must be an integer"
- T10: "abc" → napaka (non-numeric)

--------------------------------------------------------------------------------

## 4) `shortNote` (Add short)

Pravila
- Obvezno polje.
- Maksimalna dolžina: 50 znakov.

Ekvivalenčne kategorije
- Veljavne:
  - V1: Kratek ne-prazen niz (1..50 znakov)
  - V2: Natanko 50 znakov
- Neveljavne:
  - N1: Prazno
  - N2: >50 znakov

BVA
- Dolžina: 0, 1, 49, 50, 51

Testni primeri (`shortNote`)
- S1: "" (prazno) → napaka "Short note is required"
- S2: 1-znakovni note → sprejeto
- S3: 49-znakovni note → sprejeto
- S4: 50-znakovni note → sprejeto
- S5: 51-znakovni note → napaka "Short note must be at most 50 characters"

--------------------------------------------------------------------------------

## 5) Splošni primeri napak tipa/format

- Non-ASCII znaki: zagotoviti, da so sprejeti (UTF-8) — test z diakritiko (npr. "Preberi 10 strani").
- Prekomerna dolžina inputa: aplikacija ne sme sesuti se (robustnost); pričakovano: prikaz uporabne napake in ne shrani.
- XSS / HTML: vnos lahko vsebuje <, >; priporočeno: escapanje pri prikazu (to je UI naloga), test z "<script>" in potrditi, da se ne izvrši.

--------------------------------------------------------------------------------

## 6) Predlog testnega niza (sintetično)

Za vsak input polje spodaj ponujamo končni seznam test primerov, zapis za ročno izvajanje ali kot podlaga za avtomatizacijo (Cypress / Playwright / unit tests).

- Add (original): testiraj kombinacije:
  1. name=""; description="" → napaka (name required)
  2. name=100-char; description=200-char → sprejeto
  3. name=101-char; description="ok" → napaka (name too long)
  4. name="Ok"; description=201-char → napaka (description too long)

- Add numeric:
  1. name=""; target=10 → napaka (name required)
  2. name="Foo"; target= (empty) → napaka (target required)
  3. name="Foo"; target=0 → napaka
  4. name="Foo"; target=1 → sprejeto
  5. name="Foo"; target=99 → sprejeto
  6. name="Foo"; target=100 → napaka
  7. name="Foo"; target=2.5 → napaka
  8. name="Foo"; target="abc" → napaka

- Add short:
  1. name=""; shortNote="ok" → napaka (name required)
  2. name="X"; shortNote="" → napaka (short note required)
  3. name="X"; shortNote=50-char → sprejeto
  4. name="X"; shortNote=51-char → napaka

- Edit habit (save):
  1. draftName="" → napaka
  2. draftName=100-char; draftDesc=200-char → sprejeto
  3. draftName=101-char → napaka

--------------------------------------------------------------------------------

## 7) Pričakovani rezultati in kriteriji sprejemanja

- Za vsak pozitiven primer: nova navada se shrani v `habits` store (localStorage), uporabnik je preusmerjen nazaj na dashboard (/), nova navada je vidna na seznamu.
- Za vsak negativen primer: obrazec prikaže primerno sporočilo o napaki (inline) in ne shrani navade.
- Napake morajo biti jasne (npr. "Name is required", "Target must be an integer", "Short note must be at most 50 characters").


