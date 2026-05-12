# GemmPen Video - Drehplan

## Was du brauchst

- Kamera/Handy auf Stativ fuer Sprechteile (gutes Licht, ruhiger Hintergrund)
- Bildschirmaufnahme-Tool fuer App-Screenshots (z.B. QuickTime Screen Recording auf dem Mac)
- Eine echte handgeschriebene Klausur zum Zeigen
- GemmPen App offen: https://gemmpen.vercel.app

---

## Teil 1: Bildschirmaufnahmen (App)

Nimm diese ZUERST auf, bevor du dich selbst filmst. Dann weisst du genau, wie lang jeder Clip ist, und kannst deinen Sprechtext darauf abstimmen.

| # | Was aufnehmen | Wo in der App | Dauer | Zum Skript-Abschnitt |
|---|--------------|---------------|-------|---------------------|
| S1 | Upload-Flow: Klausurfoto hochladen, Transkript erscheint | Upload-Seite | 5-8s | "All you need to do is upload..." |
| S2 | Class Overview: langsam ueber die Schueler-Liste scrollen | /class | 3-5s | "...and Gemma 4 does the rest" |
| S3 | Review Screen: ein Schueler, Feedback-Cards sichtbar, kurz Highlight-Tooltip hovern | /review/[id] | 5-8s | "The fine-tuned model scores..." |
| S4 | Side-by-side: Base Model Output links, Fine-tuned rechts (gleicher Schueler) | Muss vorbereitet werden - zwei Textbloecke nebeneinander (Keynote/Canva/Screenshot) | 6-10s | "After training, the model cited..." |
| S5 | Exercises Screen: individuelle Uebungen eines Schuelers zeigen | /exercises/[id] | 5-8s | "practice exercises built from their own mistakes" |
| S6 | Configure Screen: Rubric-Preset-Auswahl, kurz durchklicken | /configure | 3-5s | "I tried it for Economics..." |
| S7 | Review Screen: Feedback-Card editieren, Text aendern, Fortschrittsbalken sichtbar | /review/[id] | 6-10s | "A teacher just reviews the feedback..." |

### Hinweise zu den Bildschirmaufnahmen

- Mausbewegungen langsam und gezielt, nicht hektisch
- Browser-Tabs und Bookmarks vorher aufraeumen (nichts Persoenliches sichtbar)
- Nur den App-Bereich aufnehmen, nicht den ganzen Desktop
- Jede Aufnahme 2-3 Sekunden laenger als noetig - Puffer fuer den Schnitt

---

## Teil 2: Side-by-side vorbereiten (S4)

Das ist der wichtigste Screenshot. Vorbereitung:

1. Nimm einen echten Schueler-Output aus der App (Fine-tuned Feedback)
2. Nimm einen Base Model Output fuer denselben Schueler (aus dem Eval-Ordner oder generiere einen)
3. Setze beide nebeneinander in Keynote, Canva, oder einfach zwei Browserfenster
4. Links: "Base Gemma 4" als Label, rechts: "Fine-tuned GemmPen"
5. Der Unterschied muss auf den ersten Blick sichtbar sein (Laenge, Zitate, Ton)

---

## Teil 3: Kamera-Aufnahmen (du sprichst)

Nimm alles in EINEM Setup auf (gleicher Ort, gleiches Licht). Du musst nicht alles in einem Take schaffen - schneide spaeter zusammen.

| # | Was du sagst | Tipp |
|---|-------------|------|
| K1 | Zeile 9-11: "I teach English and Economics..." bis "So I built GemmPen." | Direkt in die Kamera. Ruhig, selbstbewusst. Der letzte Satz ("So I built GemmPen.") braucht eine kurze Pause danach. |
| K2 | Zeile 15-16: "All you need to do is upload..." bis "...never leaves the classroom." | Kannst du als Voiceover ueber S1-S3 legen. Wenn du willst, auch direkt in die Kamera. |
| K3 | Zeile 19: "Gemma 4 is incredibly capable..." bis "...transcribed and graded by me." | In die Kamera. Hier wechselst du von "was das Tool macht" zu "wie ich es gebaut habe." |
| K4 | Zeile 23-27: "After training..." bis "...at the push of a button." | Voiceover ueber S4 (Side-by-side) und S5 (Exercises). Die Pause vor Zeile 27 ist wichtig - lass die atmen. |
| K5 | Zeile 31: "Then I tried it for Economics..." | Voiceover ueber S6 (Configure Screen). Kurz. |
| K6 | Zeile 35: "The one thing no rubric can capture..." bis "...Even without any technical background." | Voiceover ueber S7 (Review Screen, Feedback editieren). |
| K7 | Zeile 39-43: "I always knew..." bis "That is GemmPen." | Direkt in die Kamera. Das ist der Schluss - lass dir Zeit, schau in die Linse. |

---

## Schnitt-Reihenfolge

```
[K1] Du sprichst in die Kamera (Intro + "So I built GemmPen.")
  |
[S1] App: Upload-Flow (Voiceover K2 oder Stille mit Musik)
[S2] App: Class Overview
[S3] App: Review Screen mit Tooltips
  |
[K3] Du sprichst in die Kamera ("Gemma 4 is incredibly capable...")
  |
[S4] Side-by-side Base vs. Fine-tuned (Voiceover K4)
[S5] App: Exercises Screen (Voiceover K4 weiter)
  |
[S6] App: Configure Screen (Voiceover K5 - Economics)
  |
[S7] App: Review Screen, Feedback editieren (Voiceover K6)
  |
[K7] Du sprichst in die Kamera (Schluss)
  |
[URL einblenden: gemmpen.vercel.app]
```

---

## Checkliste fuer morgen

Vorbereitung (abends/morgens):
- [ ] Side-by-side Bild vorbereiten (S4)
- [ ] Browser aufraeumen (nur GemmPen-Tab)
- [ ] Skript 3x laut durchlesen
- [ ] Kamera-Position testen (Licht, Winkel, Ton)

Aufnahme-Reihenfolge:
- [ ] Zuerst: alle Bildschirmaufnahmen (S1-S7)
- [ ] Dann: alle Kamera-Takes (K1, K3, K7 - die wo du in die Kamera sprichst)
- [ ] Zum Schluss: Voiceover-Takes (K2, K4, K5, K6 - die ueber App-Screens laufen)

Beim Schnitt:
- [ ] Zusammensetzen nach der Schnitt-Reihenfolge oben
- [ ] URL am Ende 3-4 Sekunden stehen lassen
- [ ] Gesamtlaenge pruefen: Ziel unter 3 Minuten
