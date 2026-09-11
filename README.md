# fuehrerscheintausch.de – Domain-Projekt & Vercel-Export

**fuehrerscheintausch.de** ist ein hochmodernes, rechtssicheres und conversion-optimiertes Single-Topic-Portal für den gesetzlichen Führerschein-Pflichtumtausch in Deutschland (Stufenplan nach Anlage 8e zu § 24a Abs. 2 FeV).

---

## 📋 Domain-Steckbrief

| Attribut | Details |
| :--- | :--- |
| **Domain** | `fuehrerscheintausch.de` |
| **Branche / Nische** | Behördenservice, Führerscheinrecht, Pflichtumtausch, KFZ / Mobilität |
| **Suchintention** | Informational & Transaktional („Fristenrechner“, „Welche Unterlagen brauche ich?“, „Gebühren“) |
| **Modus** | Multi-Provider & Nischen-Ratgeber mit interaktiven Berechnungs- und Checklisten-Tools |
| **Zielgruppe** | Alle Führerscheininhaber in Deutschland (insb. Inhaber von Papierführerscheinen und unbefristeten Scheckkarten vor 2013) |
| **Tech-Stack** | React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite |
| **Design-System** | Warmes Alabaster / Slate (`#f8fafc`), Amber (`#f59e0b`), Tech Emerald (`#10b981`), Deep Slate (`#0f172a`), WCAG AAA |
| **DSGVO / Privacy** | 100 % Zero-CDN, System-Font-Stack (keine Google Fonts CDNs), keine Third-Party-Tracker |
| **Rechtliche Konformität** | Impressum nach § 5 DDG & § 18 MStV (Jens Kathe, Kassel), striktes Verbot unbefugter Superlative, Partnerlinks mit `*` |

---

## 🚀 Features & Content-Architektur

1. **Interaktiver Fristen-Rechner**:
   - Unterscheidung zwischen Papierführerschein (bis 1998 -> Geburtsjahr) und Scheckkarte (1999–2013 -> Ausstellungsjahr).
   - Sofortige Fristanzeige mit Dringlichkeits-Badges (Abgelaufen, Aktuell 2026, Zukunft bis 2033).
2. **Vollständige Fristen-Matrix (Anlage 8e FeV)**:
   - Übersicht aller Friststufen für Papier- und Scheckkartenführerscheine.
3. **Interaktive Unterlagen-Checkliste**:
   - Vorbereitung des Behördentermins mit Live-Fortschrittsbalken und Druckfunktion.
4. **Kosten- & Gebühren-Rechner (Modellrechnung)**:
   - Behördengebühr, Foto, Direktversand der Bundesdruckerei, Express-Fertigung.
5. **4-Schritte-Ablauf & Nischen-FAQ**:
   - 8 fundierte Rechts- und Praxisfragen (Besitzstandswahrung, Bußgelder, Karteikartenabschrift).
6. **Rechtliche Unterseiten**:
   - `/impressum`: Rechtssicher nach § 5 DDG & § 18 MStV.
   - `/datenschutz`: DSGVO-konforme Datenschutzerklärung mit Zero-CDN-Dokumentation.

---

## 🛠️ Lokale Entwicklung & Build

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktions-Build erstellen
npm run build
```

---

## 🌐 Vercel Deployment

Das Projekt ist vollständig vorbereitet für den Vercel-Export (`vercel.json` mit SPA-Rewrites enthalten).

```bash
# Temporäre Preview bereitstellen
vercel deploy --temporary

# Produktions-Deployment
vercel --prod
```
