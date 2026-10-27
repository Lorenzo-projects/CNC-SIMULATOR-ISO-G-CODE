# Simulatore CNC ISO – G-Code (fresa e tornio)

Simulatore web di macchina CNC con programmazione ISO/G-code, pensato per la didattica. Funziona interamente nel browser: HTML, CSS e JavaScript puro, senza dipendenze né installazione.

Si usa aprendo `index.html`.

## Funzioni principali

- **Due modalità**: fresa (piano XY) e tornio (piano XZ, X = diametro).
- **Editor G-code** con numeri di riga, evidenziazione degli errori e rinumerazione dei blocchi N.
- **Simulazione grafica** con Run, Pausa, Step, Stop e Reset, velocità regolabile, zoom e spostamento della vista.
- **Asportazione del materiale** in tempo reale e **controllo delle interferenze** (rapido nel materiale, mandrino fermo in presa, urto contro le ganasce, fuori corsa).
- **Zero macchina, zero pezzo e grezzo indipendenti**: il grezzo non deve avere per forza la lunghezza finale. Il simulatore controlla i conflitti con ganasce e corsa.
- **Correggi intelligente**: corregge gli errori comuni, spiega il motivo di ogni correzione e annulla quelle che non migliorano il programma.
- **Guida ai codici ISO** integrata (G, M, X, Z, F, S, T, ...).
- **Programmi di esempio** per fresa e tornio, compreso l'*ESEMPIO SCOLASTICO* e un esercizio da correggere.
- **Salvataggio automatico** nel browser, con apertura e salvataggio di file.

## Convenzioni supportate

- Commenti dopo `;` e tra parentesi `( )`.
- Virgola decimale (`99,5`).
- Utensile nel formato `T01` (non `T0101`).
- Tornio: G96/G97, G94/G95, G18, G50, G90/G91, G0–G3, M3/M4/M5, M8/M9, M0, M30.

### Ribaltare il pezzo (tornio)

Non esiste un codice ISO per questo: si ferma la macchina con `M0` e si scrive nel commento cosa fare. Se il commento contiene *ribalta, capovolgi, ruota, gira, rovescia* seguito da *pezzo*, il simulatore ribalta il pezzo nelle ganasce.

```gcode
N50 M0 ; RIBALTA PEZZO
N60 G96 S400 M03
```

`M0` spegne mandrino e refrigerante, quindi dopo il ribaltamento serve `M3` oppure premere `Riprendi` manualmente.

## Struttura del progetto

| File | Contenuto |
|------|-----------|
| `index.html` | Struttura dell'interfaccia |
| `style.css` | Stile e layout |
| `app.js` | Parser, simulazione, controlli, Correggi, guida ed esempi |

## Avvio

Apri il sito https://lorenzo-projects.github.io/CNC-SIMULATOR-ISO-G-CODE/ e lavora.

---

## 📜 License

[MIT License](./LICENSE)

---

## 👤 Created by

* **Discord:** .lorenzo_.
* **Instagram:** [llorenzo\_exe](https://www.instagram.com/llorenzo.exe/)
* **Twitch:** [llorenzo\_exe](https://twitch.tv/llorenzo_exe)
