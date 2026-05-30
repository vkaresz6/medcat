# MedCAT – AI-powered CAT Tool (Next Generation)

## Projekt célja
Az eredeti FireSync AI CAT Tool újraírása modern stack-kel, ugyanazokkal a funkciókkal + orvosi/gyógyszerészeti specializáció.

## Tech Stack (döntés)
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes (nincs külön Cloud Functions)
- **Adatbázis**: Supabase (PostgreSQL + Auth + Storage)
- **AI**: Gemini API (gemini-2.5-flash, API key: env változóban)
- **Deploy**: Vercel
- **Repo**: /mnt/c/AI_Agents/MedCAT/

## Eredeti app elemzés

### Modulok (mind megmarad):
1. **Auth** – login/signup (Firebase Auth → Supabase Auth)
2. **Projects** – projekt lista, létrehozás, csapatkezelés, státusz
3. **Translation Editor** – fő szerkesztő:
   - Szegmens lista (source/target párok)
   - AI fordítás per szegmens + batch
   - TM (Translation Memory) találatok
   - Termbase kiemelés
   - QA badge-ek (untranslated/draft/translated/proofread)
   - AI chat asszisztens
   - Értékelés (0-100 quality score)
   - Batch pre-translate
   - Semantic search
4. **Linguistic Analysis** – mélyebb szegmenselemzés
5. **Statistics** – projekt statisztikák, haladás
6. **QA Check** – whitespace, untranslated, missing terms detektálás
7. **Translation Memory** – TM dashboard, keresés, import/export
8. **Termbase** – terminológiai adatbázis
9. **Role Management** – csapat szerepkörök (Owner/Leader/Proofreader/Translator)
10. **MT Hub** – gépi fordítás hub
11. **Inbox** – feladatok, értesítések
12. **Developer** – admin/tesztelő panel

### AI funkciók (mind megmarad + bővítés):
- Szöveg szegmentálás
- Fordítás (per-szegmens + batch, cache-el)
- Fordítás értékelés (0-100 score, structured output)
- Minőségi pontszámok
- Nyelvészeti elemzés
- Projekt kontextus
- AI chat
- Szódefiníció + szinonimák
- Terminológia detektálás
- Fejlett terminológia keresés
- Gyakorló projekt generálás
- Prediktív előfordítás
- Dokumentum párosítás (alignment)

### Kiegészítések (nem volt az eredetiben):
- **Medical/Pharma glossary**: beépített orvosi/gyógyszerészeti szótár (Karcsi igény)
- **XLIFF 1.2/2.0 import/export**: iparági standard formátum
- **TMX import/export**: Translation Memory eXchange
- **Dark/light mode**: UX fejlesztés
- **Keyboard shortcuts**: professzionális CAT tool elvárás
- **Progress dashboard**: vizuális haladás tracker
- **AI confidence score**: mennyire biztos a fordítás

## Adatbázis séma (Victor feladata)
Táblák: users, projects, project_members, segments, translation_memories, tm_entries, termbase_entries, evaluations

## Feladatok és felelősök

### Fázis 1 – Alap (1-2 nap)
- Victor: DB séma + Supabase beállítás
- Sophia: UI komponens könyvtár + design system
- backend-dev: Supabase client + auth API
- frontend-dev: Next.js projekt scaffold + routing

### Fázis 2 – Core (2-3 nap)
- frontend-dev: Editor, Projects, TM, Termbase oldalak
- backend-dev: AI API routes (Gemini integráció)
- Ethan: Gemini prompt engineering + structured output

### Fázis 3 – Advanced (1-2 nap)
- frontend-dev: Statistics, QA, Linguistic Analysis
- Elena: E2E tesztek
- Sarah: Vercel deploy pipeline

### Fázis 4 – Medical specialization
- Ethan: Medical glossary AI
- Bálint: Terminológia validálás
- Dr. Charlotte: EN szövegek ellenőrzése

## Gemini API Key
AIzaSyD6-wl75oRxMNqrxJyvv7WDq1joGhTLS3s
(env változóba: GEMINI_API_KEY)
