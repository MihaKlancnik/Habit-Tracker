# 🧠 Habit Tracker

Preprosta spletna aplikacija za spremljanje vsakodnevnih navad, razvita v okviru študijskega projekta.

---

## 📘 Namen projekta
Habit Tracker omogoča uporabniku, da:
- dodaja in ureja svoje navade,
- označi, ali je nalogo opravil danes,
- spremlja svoj niz zaporednih dni (streak),
- pregleduje podrobnosti posamezne navade za zadnjih 14 dni,
- izvozi podatke v CSV datoteko,
- podvoji ali izbriše obstoječe navade,
- počisti vse podatke iz lokalne shrambe.

Aplikacija deluje popolnoma v brskalniku in shranjuje podatke v **localStorage**, zato ne potrebuje strežnika ali baze podatkov.

---

## ⚙️ Tehnologije
- **Frontend framework:** [SvelteKit](https://kit.svelte.dev/)
- **Jezik:** TypeScript
- **Stiliranje:** Tailwind CSS v4 + plugins (forms, typography)
- **Orodje za gradnjo:** Vite
- **Shramba podatkov:** LocalStorage
- **Gostovanje:** [Vercel](https://vercel.com/)
- **Nadzor verzij:** Git + GitHub

---

## 📂 Struktura projekta
web/
│
├─ src/
│ ├─ lib/
│ │ ├─ components/ # Svelte komponente (npr. HabitCard)
│ │ ├─ stores/ # Svelte shrambe (habits.ts, theme.ts)
│ │ └─ csv.ts # Funkcije za izvoz CSV
│ ├─ routes/
│ │ ├─ +layout.svelte # Glavna postavitev
│ │ ├─ +page.svelte # Nadzorna plošča (Dashboard)
│ │ ├─ add/+page.svelte # Obrazec za dodajanje (A)
│ │ ├─ add-b/+page.svelte # Obrazec za dodajanje (B)
│ │ ├─ habit/[id]/+page.svelte # Podrobnosti posamezne navade
│ │ └─ settings/+page.svelte # Nastavitve in brisanje podatkov
│ ├─ app.css # Uvoz Tailwind CSS
│ └─ app.html # Glavna HTML predloga
│
├─ tailwind.config.ts # Tailwind konfiguracija
├─ postcss.config.cjs # PostCSS konfiguracija
├─ package.json # NPM konfiguracija in skripte
├─ tsconfig.json # TypeScript konfiguracija
└─ svelte.config.js # SvelteKit konfiguracija


---

## 🧩 Namestitev v lokalno okolje

🧩 Namestitev v lokalno okolje

Namesti Node.js

Prenesi z uradne strani: https://nodejs.org

Po namestitvi preveri, da deluje pravilno:

node -v
npm -v


Če vidiš številke verzij (npr. v20.12.0 in 10.5.0), je vse v redu.

Kloniraj repozitorij iz GitHub-a
Odpri ukazno vrstico (PowerShell ali Terminal) in izvedi:

git clone https://github.com/<tvoje-uporabnisko-ime>/Habit-Tracker.git
cd Habit-Tracker/web


🔹 Opomba: mapa web vsebuje izvorno kodo aplikacije.

Namesti vse odvisnosti projekta
V mapi web zaženi:

npm install


Ta ukaz bo namestil vse potrebne pakete (SvelteKit, TailwindCSS, ipd.).

Zaženi aplikacijo v razvojnem načinu

npm run dev


Če je vse pravilno nameščeno, boš v terminalu videl izpis, podoben temu:

Local:   http://localhost:5173


➡️ Odpri povezavo http://localhost:5173
 v brskalniku.