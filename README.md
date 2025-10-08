# 🧠 Habit Tracker

Preprosta spletna aplikacija za spremljanje vsakodnevnih navad, razvita v okviru študijskega projekta.

---

## 📘 Kaj omogoča
- Dodajanje novih navad (obrazec A in B)
- Označevanje opravljenega za današnji datum
- Spremljanje niza zaporednih dni (streak)
- Pregled za zadnjih 14 dni pri posamezni navadi
- Urejanje navade (ime in opis) na strani s podrobnostmi
- Podvajanje in brisanje navad (z možnostjo kratkega »Undo«)
- Izvoz podatkov v CSV datoteko
- Počisti vse podatke (localStorage)
- Bulk akcije na Dashboardu: »Mark all today« in »Clear all today«
- Random habit: gumb »Random (R)« v glavi, skoči na naključno navado
- Pomoč z bližnjicami: »Shortcuts (?)«

Aplikacija deluje popolnoma v brskalniku in shranjuje podatke v **localStorage**, zato ne potrebuje strežnika ali baze.

---

## ⌨️ Bližnjice na tipkovnici
- A — odpri dodajanje navade
- R — odpri naključno navado
- ? — prikaži/skrij pomoč z bližnjicami

---

## ⚙️ Tehnologije
- [SvelteKit](https://kit.svelte.dev/) (TypeScript)
- Tailwind CSS v4 + plugins (forms, typography)
- Vite (dev strežnik in build)
- LocalStorage za podatke
- GitHub za verzioniranje (možno gostovanje preko Vercel)

---

## 📂 Struktura projekta

```
web/
├─ src/
│  ├─ lib/
│  │  ├─ components/              # Svelte komponente (npr. HabitCard)
│  │  ├─ stores/                  # Svelte shrambe (habits.ts, theme.ts)
│  │  └─ csv.ts                   # Funkcije za izvoz CSV
│  ├─ routes/
│  │  ├─ +layout.svelte           # Glava/navigacija in glavni layout
│  │  ├─ +page.svelte             # Dashboard
│  │  ├─ add/+page.svelte         # Obrazec za dodajanje (A)
│  │  ├─ add-b/+page.svelte       # Alternativni obrazec (B)
│  │  ├─ habit/[id]/+page.svelte  # Podrobnosti navade (14 dni, edit)
│  │  └─ settings/+page.svelte    # Nastavitve (brisanje vseh podatkov)
│  ├─ app.css                     # TailwindCSS
│  └─ app.html                    # HTML predloga (aplicira dark class ob zagonu)
├─ tailwind.config.ts             # Tailwind konfiguracija (darkMode: 'class')
├─ package.json                   # Skripte in odvisnosti
├─ svelte.config.js               # SvelteKit konfiguracija
├─ tsconfig.json                  # TypeScript konfiguracija
└─ README.md                      # Ta dokument
```

---

## 🧩 Namestitev in zagon (Windows)

1) Namesti Node.js
- Prenesi z: https://nodejs.org
- Preveri namestitev:

```powershell
node -v
npm -v
```

2) Koda

```powershell
git clone https://github.com/<tvoje-uporabnisko-ime>/Habit-Tracker.git
cd Habit-Tracker/web
```

3) Namesti odvisnosti

```powershell
npm install
```

4) Zagon v razvojnem načinu

V PowerShell so lahko skripti blokirani. Če ukaz `npm run dev` ne deluje, uporabi varianto prek cmd:

```powershell
cmd /c npm run dev
```

Nato odpri:

```
http://localhost:5173
```

---

## 🏗️ Build in predogled produkcije

```powershell
cmd /c npm run build
cmd /c npm run preview
```

---

## 📤 Izvoz CSV

- Na Dashboardu klikni »Export CSV«.
- CSV vsebuje: id, name, description, createdAt, completions (datumi ločeni s podpičji).
- Opomba: če imaš zelo stare zapise brez seznama `completions`, posodobi na zadnjo verzijo (aplikacija že ščiti te primere).

---

## 🧹 Brisanje podatkov

- V »Settings« lahko pobrišeš vse podatke (localStorage).
- Dejanja, kot je brisanje posamezne navade, prikazujejo kratko možnost »Undo«.

---

## 🧪 Znane posebnosti / odpravljanje težav
- PowerShell lahko blokira izvajanje skriptov (`ExecutionPolicy`). V tem primeru uporabi ukaze prek `cmd /c` (glej zgoraj) ali zaženi terminal kot skrbnik ter spremeni politiko le, če razumeš posledice.
- Če pride do 500 napake ob nalaganju, preveri, da v datotekah ni »merge conflict« markerjev (<<<<<<<, =======, >>>>>>>) in da je localStorage veljaven (v »Settings« lahko počistiš vse).

---

## 📄 Licenca
Projekt je namenjen študijskemu namenu; licenca po dogovoru avtorja.