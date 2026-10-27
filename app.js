/* ======================= DATI: tooltip, guida, esempi ======================= */
const DICT={N:"Numero di blocco: ogni riga è un blocco, la macchina ne esegue uno alla volta.",M00:"Arresto programmato: la macchina si ferma finché premi Run. Mandrino e refrigerante si spengono. In tornio, se nel commento scrivi RIBALTA / CAPOVOLGI / RUOTA / GIRA PEZZO, il pezzo viene ribaltato.",M02:"Fine programma.",M04:"Avvio mandrino in senso antiorario.",M06:"Cambio utensile (indicato prima con T). Ferma il mandrino con M5. Sul tornio il cambio avviene già con T.",M08:"Refrigerante ON.",M09:"Refrigerante OFF.",G92:"Con X Y Z: preset del zero pezzo nella posizione attuale. Con S: limite giri massimi.",G50:"Limite giri massimi del mandrino (G50 S...), utile con G96.",G04:"Tempo di sosta (non influenza il percorso).",G07:"Tornio: le quote X sono diametri (default).",G08:"Tornio: le quote X sono raggi.",G94:"Avanzamento F in mm/min.",G95:"Avanzamento F in mm/giro (velocità = F x giri mandrino).",G98:"Tornio: avanzamento F in mm/min (come G94).",G99:"Tornio: avanzamento F in mm/giro (come G95).",G96:"Velocità di taglio costante: S in m/min (giri calcolati dal diametro: utensile in fresa, pezzo in tornio).",G97:"S in giri/min costanti.",G00:"Posizionamento rapido: spostamento veloce senza asportare materiale.",G01:"Interpolazione lineare a velocità di lavoro F.",G02:"Interpolazione circolare oraria (CW). Centro con I,J (fresa) o I,K (tornio) oppure raggio R.",G03:"Interpolazione circolare antioraria (CCW). Centro con I,J (fresa) o I,K (tornio) oppure raggio R.",G90:"Quote assolute: le coordinate sono riferite allo zero pezzo.",G91:"Quote incrementali: le coordinate sono distanze dalla posizione attuale.",G17:"Piano di lavoro XY (fresa, default).",G18:"Piano XZ (tornio, default in modalità tornio).",G19:"Piano YZ (non simulato).",G21:"Unità in millimetri.",M03:"Avvio mandrino in senso orario.",M05:"Arresto mandrino.",M30:"Fine programma.",F:"Avanzamento in mm/min (o mm/giro con G95/G99).",S:"Velocità del mandrino in giri/min (o m/min con G96).",T:"Numero utensile (tornio: T01 = utensile 1).",P:"Parametro (tempo di sosta con G4).",X:"Coordinata asse X (tornio: diametro con G7, raggio con G8).",Y:"Coordinata asse Y (solo fresa).",Z:"Coordinata asse Z. Fresa: profondità (negativa = dentro il pezzo). Tornio: asse del mandrino, Z0 = zero pezzo, negativa = verso il mandrino.",I:"Fresa: distanza X dal punto di partenza al centro dell'arco. Tornio: distanza in X (raggio) dal punto di partenza al centro.",J:"Distanza Y dal punto di partenza al centro dell'arco (solo fresa).",K:"Tornio: distanza in Z dal punto di partenza al centro dell'arco.",R:"Raggio dell'arco (positivo = arco corto, negativo = arco lungo)."};
// m: 'mt' fresa e tornio, 'm' solo fresa, 't' solo tornio
const GUIDE=[
{t:'1. Struttura del programma',o:1,i:[
 {c:'N',n:'Numero di blocco',m:'mt',s:'N10 ...',d:'Ogni riga è un blocco e inizia con N seguito da un numero crescente (10, 20, 30...). La macchina esegue un blocco alla volta, dall\'alto in basso.',e:'N10 G90 G21'},
 {c:'; ( )',n:'Commenti',m:'mt',s:'; testo   oppure   (testo)',d:'Tutto ciò che segue il punto e virgola, o sta tra parentesi, viene ignorato dalla macchina: serve solo a te.',e:'N20 G0 X10 ; rapido sul punto di partenza'},
 {c:'Riga tipo',n:'Ordine consigliato di un blocco',m:'mt',s:'N G X Y Z I J K R F S T M',d:'Più codici nello stesso blocco sono ammessi, purché di gruppi diversi (un solo movimento G0-G3, un solo comando mandrino, un solo G90/G91...). Ogni lettera va seguita da un numero (usa lo zero 0, non la lettera O).',e:'N50 G1 X40 Z-20 F0.2 M8'},
 {c:'M30',n:'Fine programma',m:'mt',s:'M30',d:'Ultima riga del programma: ferma mandrino e refrigerante. Le righe dopo M30 sono ignorate.',e:'N200 M30'}]},
{t:'2. Movimenti',o:1,i:[
 {c:'G0 / G00',n:'Rapido',m:'mt',s:'G0 X.. Y.. Z..   (tornio: G0 X.. Z..)',d:'Posizionamento alla massima velocità, senza asportare materiale. Non entrare mai nel materiale in rapido: è un\'interferenza.',e:'N40 G0 X-10 Y5 Z5'},
 {c:'G1 / G01',n:'Interpolazione lineare',m:'mt',s:'G1 X.. Y.. Z.. F..',d:'Movimento in linea retta alla velocità di lavoro F. È modale: resta attivo finché non cambi movimento, quindi puoi scrivere solo le coordinate che cambiano.',e:'N50 G1 Z-1 F150'},
 {c:'G2 / G02',n:'Arco orario (CW)',m:'mt',s:'Fresa: G2 X.. Y.. I.. J..   Tornio: G2 X.. Z.. I.. K..',d:'I,J (fresa) o I,K (tornio) sono le distanze dal punto di partenza al centro dell\'arco. In alternativa si dà il raggio R (positivo = arco corto, negativo = arco lungo). In tornio I è un raggio, anche con X in diametro.',e:'N80 G2 X-30 Y0 R30'},
 {c:'G3 / G03',n:'Arco antiorario (CCW)',m:'mt',s:'Come G2',d:'Come G2 ma in senso antiorario. Per un cerchio completo usa I,J (con R non si può).',e:'N60 G3 X30 Y0 I0 J30'},
 {c:'G4 / G04',n:'Sosta',m:'mt',s:'G4 P.. (secondi)',d:'Pausa programmata; non cambia il percorso.',e:'N90 G4 P1'}]},
{t:'3. Quote e zeri',o:1,i:[
 {c:'G90',n:'Quote assolute',m:'mt',s:'G90',d:'Le coordinate sono riferite allo zero pezzo (default).',e:'N10 G90'},
 {c:'G91',n:'Quote incrementali',m:'mt',s:'G91',d:'Le coordinate sono distanze dalla posizione attuale. Torna ad assoluto con G90.',e:'N110 G91 G0 Z5'},
 {c:'G92 / G50',n:'Preset zero pezzo',m:'mt',s:'G92 X.. Y.. Z..   (tornio: G92 X.. Z..)',d:'Dichiara che la posizione attuale ha le coordinate indicate: sposta lo zero pezzo senza muovere la macchina. Con S imposta il limite giri.',e:'N15 G92 X0 Z0'},
 {c:'G7',n:'X in diametro',m:'t',s:'G7',d:'In tornio le quote X sono diametri (default). La macchina si muove di metà valore sul raggio.',e:'N10 G7'},
 {c:'G8',n:'X in raggio',m:'t',s:'G8',d:'In tornio le quote X sono raggi.',e:'N10 G8'},
 {c:'X Y Z',n:'Assi',m:'m',s:'X.. Y.. Z..',d:'In fresa X e Y sono sul piano, Z è la profondità: negativa = dentro il pezzo.',e:'G1 X40 Y20 Z-2'},
 {c:'X Z',n:'Assi del tornio',m:'t',s:'X.. Z..',d:'Z è l\'asse del mandrino (Z0 = zero pezzo, negativa verso il mandrino), X è il diametro. Y non si usa.',e:'G1 X30 Z-25'},
 {c:'I J K',n:'Centro arco',m:'mt',s:'I.. J.. (fresa)  I.. K.. (tornio)',d:'Distanze dal punto di partenza al centro dell\'arco: I lungo X, J lungo Y, K lungo Z.',e:'G2 X46 Z-35 I5 K0'},
 {c:'R',n:'Raggio arco',m:'mt',s:'R..',d:'Alternativa a I,J/K. Positivo = arco < 180°, negativo = arco > 180°. Non usarlo insieme a I,J,K.',e:'G3 X0 Y30 R30'}]},
{t:'4. Piano e unità',i:[
 {c:'G17',n:'Piano XY',m:'m',s:'G17',d:'Piano di lavoro della fresa (default).',e:'N10 G90 G17 G21'},
 {c:'G18',n:'Piano XZ',m:'t',s:'G18',d:'Piano di lavoro del tornio.',e:'N10 G90 G18 G21'},
 {c:'G19',n:'Piano YZ',m:'mt',s:'G19',d:'Non simulato.',e:''},
 {c:'G21',n:'Millimetri',m:'mt',s:'G21',d:'Unità in millimetri.',e:'N10 G21'}]},
{t:'5. Avanzamento e velocità',o:1,i:[
 {c:'F',n:'Avanzamento',m:'mt',s:'F..',d:'Velocità di lavoro: mm/min con G94/G98, mm/giro con G95/G99. Obbligatoria per G1/G2/G3. È modale.',e:'G1 X50 F200'},
 {c:'S',n:'Velocità mandrino',m:'mt',s:'S..',d:'Giri/min con G97, metri/min con G96. Obbligatoria con M3/M4.',e:'G97 S1200 M3'},
 {c:'G94 / G98',n:'F in mm/min',m:'mt',s:'G94  (tornio anche G98)',d:'L\'avanzamento è la distanza percorsa in un minuto.',e:'G94 F300'},
 {c:'G95 / G99',n:'F in mm/giro',m:'mt',s:'G95  (tornio anche G99)',d:'L\'avanzamento è per giro del mandrino: velocità = F × giri. Richiede mandrino acceso con S.',e:'G95 F0.2'},
 {c:'G96',n:'Velocità di taglio costante',m:'mt',s:'G96 S..(m/min)',d:'I giri si adattano al diametro per mantenere costante la velocità sul tagliente. Si limita con G50 S.. In tornio usa il diametro del pezzo, in fresa quello dell\'utensile.',e:'G50 S2500 / G96 S180 M3'},
 {c:'G97',n:'Giri costanti',m:'mt',s:'G97 S..(giri/min)',d:'I giri/min restano fissi.',e:'G97 S1500 M3'}]},
{t:'6. Mandrino, utensile, refrigerante',o:1,i:[
 {c:'M3',n:'Mandrino orario',m:'mt',s:'M3 S..',d:'Accende il mandrino in senso orario. Senza mandrino acceso non si può lavorare.',e:'N30 G97 S1200 M3'},
 {c:'M4',n:'Mandrino antiorario',m:'mt',s:'M4 S..',d:'Accende il mandrino in senso antiorario.',e:'N30 M4 S800'},
 {c:'M5',n:'Stop mandrino',m:'mt',s:'M5',d:'Ferma il mandrino. Da dare prima di cambiare utensile e a fine lavoro.',e:'N180 M5'},
 {c:'T',n:'Utensile',m:'mt',s:'Fresa: T1 M6   Tornio: T01',d:'In fresa T sceglie l\'utensile e M6 lo monta (diametri nella tabella utensili). In tornio T01 = utensile 1 (due cifre, senza correttore): il cambio è immediato.',e:'T2 M6'},
 {c:'M6',n:'Cambio utensile',m:'m',s:'T.. M6',d:'Monta l\'utensile indicato con T. Spegni prima il mandrino con M5.',e:'N20 T1 M6'},
 {c:'M8',n:'Refrigerante ON',m:'mt',s:'M8',d:'Accende il refrigerante.',e:'N30 M3 M8'},
 {c:'M9',n:'Refrigerante OFF',m:'mt',s:'M9',d:'Spegne il refrigerante.',e:'N110 M9 M5'}]},
{t:'7. Controllo del programma',i:[
 {c:'M0',n:'Arresto programmato',m:'mt',s:'M0',d:'La macchina si ferma finché premi Run. Mandrino e refrigerante si spengono.',e:'N90 M0'},
 {c:'M0 + commento',n:'Ribaltare il pezzo (tornio)',m:'t',s:'M0 ; RIBALTA PEZZO',d:'Non è un codice ISO: come in officina, si ferma la macchina con M0 e si scrive nel commento cosa deve fare l\'operatore. Se il commento contiene RIBALTA, CAPOVOLGI, RUOTA, GIRA o ROVESCIA (con PEZZO), il simulatore ribalta il pezzo nelle ganasce. Dopo l\'M0 riaccendi il mandrino con M3.',e:'N50 M0 ; CAPOVOLGERE PEZZO'},
 {c:'M30 / M2',n:'Fine programma',m:'mt',s:'M30',d:'Termina il programma.',e:'N200 M30'}]},
{t:'8. Errori e interferenze che il simulatore segnala',i:[
 {c:'Sintassi',n:'Errori nel blocco',m:'mt',s:'',d:'Mancano N, F o S, lettera O al posto dello zero, due movimenti nella stessa riga, centro arco mancante o incoerente (raggio iniziale diverso dal finale).',e:''},
 {c:'Interferenze',n:'Urti',m:'mt',s:'',d:'G0 dentro il materiale, utensile in presa a mandrino fermo, fuori corsa macchina, utensile sotto il piano macchina (fresa), utensile contro le ganasce (tornio).',e:''},
 {c:'Correggi',n:'Correzione automatica',m:'mt',s:'',d:'Il pulsante Correggi sistema da solo ciò che è sicuro (numerazione, F/S/M3 mancanti, G0 nel pezzo, codici incompatibili, archi, limiti di corsa) e ti dice cosa resta da fare a mano. Puoi sempre annullare.',e:''}]},
{t:'9. Tasti rapidi',i:[
 {c:'F5',n:'Run',m:'mt',s:'',d:'Avvia o riprende (anche Ctrl+Invio).',e:''},
 {c:'F6',n:'Pausa / Riprendi',m:'mt',s:'',d:'',e:''},
 {c:'F10',n:'Step',m:'mt',s:'',d:'Un blocco alla volta.',e:''},
 {c:'Esc',n:'Stop',m:'mt',s:'',d:'Ferma e torna al primo blocco (chiude anche guida e impostazioni).',e:''}]}
];
const H="N10 G90 G17 G21 G94 ; assoluto, piano XY, mm, avanzamento mm/min\n";
const MILLD={mx0:0,mx1:400,my0:0,my1:300};
const EX={
"Spianatura base":{w:100,h:60,d:10,sz:20,px:100,py:100,zc:0,code:`(SPIANATURA BASE - grezzo 100x60, fresa D10, zero pezzo angolo basso-sx)
${H}N20 T1 M6 ; chiamo e monto l'utensile 1
N30 G97 S1200 M3 ; giri fissi 1200, mandrino orario
N40 G0 X-10 Y5 Z5 ; rapido fuori dal pezzo
N50 G1 Z-1 F150 ; penetro di 1 mm
N60 G1 X110 F300 ; passata 1
N70 G1 Y15 ; passo laterale (G1 modale)
N80 G1 X-10 ; passata 2
N90 G1 Y25
N100 G1 X110 ; passata 3
N110 G1 Y35
N120 G1 X-10 ; passata 4
N130 G1 Y45
N140 G1 X110 ; passata 5
N150 G1 Y55
N160 G1 X-10 ; passata 6
N170 G0 Z5 ; risalita rapida
N180 M5 ; mandrino fermo
N190 M30 ; fine programma`},
"Grezzo piu' grande dello zero pezzo":{w:110,h:70,d:10,sz:20,px:120,py:100,zc:0,gx:-5,gy:-5,gz:2,code:`(SPIANATURA - zero pezzo sull'angolo del pezzo FINITO 100x60)
(il grezzo e' 110x70: sporge 5 mm a sinistra/sotto ed e' alto 2 mm oltre Z0)
${H}N20 T1 M6
N30 G97 S1200 M3
N40 G0 X-15 Y0 Z5 ; fuori dal grezzo
N50 G1 Z0 F150 ; scendo a Z0: tolgo i 2 mm di sovrametallo
N60 G1 X115 F300 ; passata 1
N70 G1 Y10
N80 G1 X-15 ; passata 2
N90 G1 Y20
N100 G1 X115
N110 G1 Y30
N120 G1 X-15
N130 G1 Y40
N140 G1 X115
N150 G1 Y50
N160 G1 X-15
N170 G1 Y60
N180 G1 X115 ; ultima passata
N190 G0 Z5
N200 M5
N210 M30`},
"Circonferenza/Arco":{w:100,h:100,d:6,sz:20,px:200,py:150,zc:4,code:`(CERCHIO E ARCHI - zero pezzo al CENTRO, raggio 30)
${H}N20 T1 M6
N30 G97 S2000 M3 M8 ; mandrino ON + refrigerante ON
N40 G0 X0 Y-30 Z5 ; partenza sotto il centro
N50 G1 Z-1 F100 ; penetrazione
N60 G3 X30 Y0 I0 J30 F250 ; quarto antiorario, centro = start+(I,J)
N70 G3 X0 Y30 I-30 J0 ; secondo quarto antiorario
N80 G2 X-30 Y0 R30 ; arco orario con raggio R
N90 G3 X0 Y-30 I30 J0 ; chiudo il percorso
N100 G0 Z5
N110 M9 M5 ; spengo refrigerante e mandrino
N120 M30`},
"Scanalatura rettangolare":{w:80,h:50,d:8,sz:20,px:100,py:100,zc:0,code:`(SCANALATURA 60x20 - fresa D8, G95 mm/giro e G91)
N10 G90 G17 G21
N20 T2 M6
N30 G97 S1500 M3
N40 G0 X10 Y15 Z5 ; angolo basso-sx del contorno
N50 G95 F0.05 ; avanzamento in mm/giro: 0,05 x 1500 = 75 mm/min
N60 G1 Z-2 ; profondita' 2 mm
N70 G1 X70 F0.15 ; lato inferiore
N80 Y35 ; lato destro
N90 X10 ; lato superiore
N100 Y15 ; lato sinistro
N110 G91 G0 Z5 ; incrementale: sale di 5 rispetto a ora
N120 G90 G0 X0 Y0 ; assoluto, rientro
N130 M5
N140 M30`},
"Esercizio: interferenze (usa Correggi)":{w:60,h:40,d:6,sz:20,px:100,py:100,zc:0,code:`(ESERCIZIO - interferenze e dimenticanze volute: premi Correggi)
${H}N20 T1 M6
N30 G97 S1000 M3
N40 G0 X-10 Y10 Z5
N50 G1 Z-2 F100
N60 G0 X70 ; ERRORE: rapido dentro il materiale
N70 G1 Y30 F200
N80 M5
N90 G1 X-10 ; ERRORE: mandrino fermo in presa
N100 M30`},
"Sfacciatura e cilindratura":{mode:'lathe',ld:40,ll:60,lp:2,lz:150,lcf:112,lz0:0,lz1:300,lmx:200,code:`(TORNIO - sfacciatura e cilindratura, grezzo D40 L60 che sporge 2 mm oltre lo zero pezzo)
N10 G90 G18 G21 G95 G7 ; assoluto, piano XZ, mm, mm/giro, X in diametro
N20 G50 S2500 ; limite giri massimi
N30 T01 ; utensile 1
N40 G96 S180 M3 ; velocita' di taglio costante 180 m/min
N50 G0 X44 Z2 ; avvicinamento (fuori dal grezzo)
N60 G1 Z0 F0.2 ; tocco la faccia finita
N70 G1 X-1 F0.15 ; sfacciatura fino al centro
N80 G0 X38 Z2 ; passata 1: D38
N90 G1 Z-35 F0.25 ; cilindratura lunga 35 (le ganasce iniziano a Z-38)
N100 G1 X42 ; stacco radiale
N110 G0 Z2 ; rientro rapido
N120 G0 X34 ; passata 2: D34
N130 G1 Z-35 F0.2
N140 G1 X42
N150 G0 X44 Z2 ; allontanamento
N160 M5 ; mandrino fermo
N170 M30 ; fine programma`},
"Profilo con smusso e raccordo":{mode:'lathe',ld:50,ll:80,lp:3,lz:150,lcf:93,lz0:0,lz1:300,lmx:200,code:`(TORNIO - profilo finito con smusso 3x45 e raccordo R5; grezzo D50 L80, sporge 3 mm)
N10 G90 G18 G21 G95 G7
N20 G50 S2000
N30 T02 ; utensile 2
N40 G97 S1200 M3 M8 ; giri fissi + refrigerante
N50 G0 X54 Z3
N60 G1 Z0 F0.2
N70 G1 X-1 ; sfacciatura
N80 G0 X30 Z2 ; avvicinamento al profilo
N90 G1 Z0 F0.15 ; inizio profilo
N100 G1 X36 Z-3 ; smusso 3x45 (D36)
N110 G1 Z-30 ; cilindro D36
N120 G2 X46 Z-35 I5 K0 ; raccordo R5 (centro: I = raggio X, K = Z)
N130 G1 X52 ; spallamento
N140 G0 Z3 ; rientro
N150 M9 M5
N160 M30`},
"Zero pezzo e corsa spostati":{mode:'lathe',ld:40,ll:50,lp:1,lz:180,lcf:146,lz0:-50,lz1:350,lmx:220,code:`(TORNIO - zero pezzo a Z180, corsa macchina da -50 a 350, grezzo D40 L50 sporge 1 mm)
N10 G90 G18 G21 G95 G7
N20 G50 S2500
N30 T03
N40 G96 S160 M3
N50 G0 X44 Z2
N60 G1 Z0 F0.2
N70 G1 X-1 F0.15 ; sfacciatura
N80 G0 X30 Z2
N90 G1 Z-30 F0.25 ; cilindro D30 lungo 30
N100 G1 X36 ; spallamento
N110 G0 Z2
N120 G0 X26 ; seconda passata per lo smusso
N130 G1 Z0 F0.15
N140 G1 X30 Z-2 ; smusso 2x45
N150 G0 X44 Z2
N160 M5
N170 M30`},
"ESEMPIO SCOLASTICO":{mode:'lathe',ld:20,ll:100,lp:100,lz:0,lcf:30,lz0:0,lz1:300,lmx:200,code:`(ESEMPIO PRATICO DIAMETRO 20 - L INIZIALE 100 MM - L FINALE 99)
N00 T03 ; UTENSILE INTESTATORE
N10 G96 S400 M03
N20 G0 X24 Z99,5
N30 G1 X-1 Z99,5 G94 F15
N40 G0 X100 Z300
N50 M0 ; CAPOVOLGERE PEZZO
N60 G96 S400 M03
N70 G00 X24 Z99
N80 G01 X-1 Z99 G94 F15
N90 G00 X100 Z300
N100 M0`},
"Esercizio: Interferenze e dimenticanze (usa Correggi)":{mode:'lathe',ld:40,ll:60,lp:2,lz:150,lcf:112,lz0:0,lz1:300,lmx:200,code:`(ESERCIZIO - interferenze e dimenticanze volute: premi Correggi)
N10 G90 G18 G21 G95 G7
N20 T01
N30 G96 S180 M3
N40 G0 X44 Z2
N50 G1 Z0 F0.2
N60 G1 X-1 F0.15 ; sfacciatura
N70 G0 X30 Z2
N80 G0 Z-20 ; ERRORE: rapido dentro il materiale
N90 G1 Z-30 F0.25 ; cilindratura
N100 G1 X42
N110 G0 Z2
N120 M5
N130 G0 X26
N140 G1 Z-25 F0.2 ; ERRORE: mandrino fermo in presa
N150 G1 X42
N160 G0 X44 Z2
N170 M30`}};
Object.values(EX).forEach(e=>e.mode=e.mode||'mill');

/* ======================= STATO ======================= */
const $=id=>document.getElementById(id),cv=$('cv'),c=cv.getContext('2d'),code=$('code'),HL=$('HL'),gut=$('gut');
const DZ=.1;
let MODE='mill',PROF=null,items=[],errs=[],idx=0,prog=0,run=false,stepM=false,pos={x:0,y:0,z:50},snap={f:0,s:0,t:0,sp:0,cl:0,fm:94,cs:97,rpm:0,ox:0,oy:0,dia:true,abs:true},curLine=-1,V={s:5,ox:60,oy:300},dpr=1,errL=new Set(),colL=new Set(),fixL=new Set(),crash=null,setupIss=[],backup=null;
const TD=t=>{const m={};($('tt').value||'').split(/[,;]/).forEach(p=>{const[a,b]=p.split(':');if(+a&&+b)m[+a]=+b});return m[t]||+$('td').value||6};
const SX=x=>V.ox+x*V.s,SY=y=>V.oy-y*V.s;
const num=(id,d)=>{const v=parseFloat($(id).value);return isFinite(v)?v:d};
function con(m,k,ln){const d=document.createElement('div');d.className=k||'i';d.textContent=m;if(ln!=null){d.dataset.l=ln;d.title='Vai alla riga';d.style.cursor='pointer'}$('con').appendChild(d);$('con').scrollTop=1e9}
const FLIPRE=/(ribalt|capovolg|ruot|gir|rovesc|inver|flip|turn)\w*\s+(il\s+|del\s+|el\s+)?(pezzo|particolare|grezzo)/i;
function cmt(raw){let o='',d=0;for(const ch of raw){if(d){if(ch==')')d=0;else o+=ch;continue}if(ch=='('){d=1;o+=' '}else if(ch==';'){o+=' '+raw.slice(raw.indexOf(';')+1);break}}return o}
function strip(raw){let o='',d=0;for(const ch of raw){if(d){if(ch==')')d=0;continue}if(ch=='(')d=1;else if(ch==';')break;else o+=ch}return o}

/* ======================= GEOMETRIA (zero pezzo, zero macchina e grezzo sono indipendenti) ======================= */
function setup(){
 if(MODE=='lathe'){
  const D=Math.max(1,num('ld',40)),L=Math.max(1,num('ll',60)),ext=num('lp',0),pz=num('lz',0),za=num('lz0',0),zb=num('lz1',300),MX=Math.max(10,num('lmx',200)),cf=num('lcf',0),R=D/2,zmax=pz+ext,zmin=zmax-L,lo=Math.min(za,zb),hi=Math.max(za,zb);
  return{lathe:true,PX:pz,PY:0,D,R,L,MX,zmin,zmax,N:Math.min(2e5,Math.round(L/DZ)+1),cf,cz0:cf-60,cz1:cf,cr:Math.max(R+15,40),T:0,top:0,st:{x:zmin,y:-R,w:L,h:D},lim:{x:lo,y:-MX/2,w:hi-lo,h:MX},start:{x:hi,y:MX/2}}}
 const W=Math.max(1,num('sw',100)),Hh=Math.max(1,num('sh',60)),cn=(k,w,h)=>[[0,0],[-w,0],[0,-h],[-w,-h],[-w/2,-h/2]][k],PX=num('px',0),PY=num('py',0),a=cn(+$('zc').value,W,Hh),xa=Math.min(num('mx0',0),num('mx1',400)),xb=Math.max(num('mx0',0),num('mx1',400)),ya=Math.min(num('my0',0),num('my1',300)),yb=Math.max(num('my0',0),num('my1',300));
 return{lathe:false,PX,PY,T:Math.max(1,num('sz',20)),top:num('gz',0),st:{x:PX+num('gx',0)+a[0],y:PY+num('gy',0)+a[1],w:W,h:Hh},lim:{x:xa,y:ya,w:xb-xa,h:yb-ya},start:{x:0,y:0}}}
// Controllo dei conflitti tra grezzo, zeri, ganasce e corsa
function checkSetup(S){const o=[],e=t=>o.push({l:'e',t}),w=t=>o.push({l:'w',t}),l=S.lim,inX=(a,b)=>a>=l.x-1e-6&&b<=l.x+l.w+1e-6;
 if(S.lathe){
  if(num('lz0',0)==num('lz1',300))e('Corsa Z nulla: Z min e Z max coincidono.');
  if(!inX(S.PX,S.PX))e(`Lo zero pezzo (Z${S.PX}) è fuori dalla corsa Z (${l.x}...${l.x+l.w}).`);
  if(!inX(S.zmin,S.zmax))e(`Il grezzo (Z ${+S.zmin.toFixed(2)}...${+S.zmax.toFixed(2)}) esce dalla corsa Z della macchina.`);
  if(!inX(S.cf,S.cf))w(`La faccia delle ganasce (Z${S.cf}) è fuori dalla corsa Z.`);
  if(S.D>S.MX)e(`Il diametro del grezzo (Ø${S.D}) supera la corsa X (Ø${S.MX}).`);
  const pr=S.cf-S.zmin;
  if(pr<=0)e('Il grezzo non entra nelle ganasce: spostalo o sposta la faccia delle ganasce.');
  else if(S.cf>S.zmax)e('Le ganasce arrivano oltre la fine del grezzo: non resta materiale da lavorare.');
  else{if(pr<Math.min(10,S.L/3))w(`Presa nelle ganasce molto corta (${+pr.toFixed(1)} mm): il pezzo non è trattenuto bene.`);const fr=S.zmax-S.cf;if(fr>4*S.D)w(`Sbalzo di ${+fr.toFixed(1)} mm (> 4 x Ø): servirebbe la contropunta.`)}
  if(S.zmax<S.PX)w('Il grezzo non arriva a Z0: manca il materiale da sfacciare e si lavora in aria.');
  if(0<l.x||0>l.x+l.w)w('Lo zero macchina (Z0) è fuori dalla corsa.');
 }else{
  const st=S.st;
  if(num('mx0',0)==num('mx1',400)||num('my0',0)==num('my1',300))e('Corsa nulla: min e max coincidono.');
  if(S.PX<l.x||S.PX>l.x+l.w||S.PY<l.y||S.PY>l.y+l.h)e(`Lo zero pezzo (X${S.PX} Y${S.PY}) è fuori dalla corsa macchina.`);
  if(st.x<l.x||st.x+st.w>l.x+l.w||st.y<l.y||st.y+st.h>l.y+l.h)e('Il grezzo esce dalla corsa macchina.');
  if(0<l.x||0>l.x+l.w||0<l.y||0>l.y+l.h)w('Lo zero macchina (0,0) è fuori dalla corsa: la macchina parte da un punto irraggiungibile.');
  if(S.top>0)w(`Il grezzo sporge ${S.top} mm sopra Z0: la fresa tocca il materiale già sotto Z${S.top}.`);
  if(S.top-S.T>0)w('Tutto il grezzo è sopra Z0: con quote negative non si lavora il pezzo da Z0 in giù.');
  if(+$('td').value<=0)e('Diametro utensile standard non valido.');
 }
 return o}
// ribaltamento: il materiale rimasto viene specchiato e la nuova estremità libera va a destra (zmax)
function flipProf(P){const n=P.length;let a=0,b=n-1;while(a<n&&P[a]<=1)a++;while(b>=0&&P[b]<=1)b--;if(b<a)return;const t=P.slice(a,b+1);P.fill(0);for(let k=0;k<t.length;k++)P[n-1-k]=t[k]}
function initProf(S){return new Float32Array(S.N).fill(S.R)}
function initSnap(S){S=S||setup();return{f:0,s:0,t:0,sp:0,cl:0,fm:S.lathe?95:94,cs:97,rpm:0,ox:S.PX,oy:S.PY,dia:true,abs:true}}
const isRad=g=>g.k==1&&Math.abs(g.x1-g.x0)<1e-9&&Math.abs(g.y1)<Math.abs(g.y0)-1e-9;
// la sfacciatura (moto solo in X) toglie lo strato a destra della punta (max 6 mm)
function lpt(P,S,x,y,rad){const k=Math.round((x-S.zmin)/DZ),a=Math.abs(y),n=rad?60:0;for(let m=0;m<=n;m++){const q=k+m;if(q>=0&&q<P.length&&a<P[q])P[q]=a}}
function carveSeg(P,S,g,t0,t1){if(g.k==0||t1<=t0)return;const n=Math.max(1,Math.ceil((t1-t0)*g.len/.05)),rad=isRad(g);for(let j=0;j<=n;j++){const p=at(g,t0+(t1-t0)*j/n);lpt(P,S,p.x,p.y,rad)}}
function collide(g,sp,S){const n=Math.min(400,Math.ceil(g.len/.5)+1),r=(g.d||TD())/2,s=S.st,l=S.lim;
 for(let j=0;j<=n;j++){const p=at(g,j/n),inS=p.x+r>s.x&&p.x-r<s.x+s.w&&p.y+r>s.y&&p.y-r<s.y+s.h;let m=null;
  if(p.x<l.x||p.x>l.x+l.w||p.y<l.y||p.y>l.y+l.h)m='Fuori corsa macchina (oltre l\'area di lavoro)';
  else if(p.z<S.top-S.T)m='Utensile contro il piano macchina (Z sotto lo spessore del grezzo)';
  else if(inS&&p.z<S.top){if(g.k==0){if(!(Math.hypot(g.x1-g.x0,g.y1-g.y0)<1e-6&&g.z1>=g.z0))m='G00 rapido dentro il materiale: urto utensile/pezzo (usa G1 per scendere)'}else if(!sp)m='Mandrino fermo: utensile in presa nel pezzo'}
  if(m){g.colT=j/n;return m}}
 return null}
function collideL(g,sp,S,P){const n=Math.ceil(g.len/.05)+1,l=S.lim,rad=isRad(g);
 for(let j=0;j<=n;j++){const p=at(g,j/n),a=Math.abs(p.y);let m=null;
  if(p.x<l.x-1e-6||p.x>l.x+l.w+1e-6||2*a>S.MX+1e-6)m='Fuori corsa macchina (oltre l\'area di lavoro)';
  else if(p.x>S.cz0&&p.x<S.cz1&&a<S.cr)m='Utensile contro il mandrino (ganasce)';
  else{const k=Math.round((p.x-S.zmin)/DZ);if(k>=0&&k<P.length&&a<P[k]-.02){if(g.k==0)m='G00 rapido dentro il materiale: urto utensile/pezzo (usa G1)';else if(!sp)m='Mandrino fermo: utensile in presa nel pezzo'}}
  if(m){g.colT=j/n;return m}
  if(g.k>0&&sp)lpt(P,S,p.x,p.y,rad)}
 return null}

/* ======================= PARSER ======================= */
function parse(src){
 const S=setup(),lathe=S.lathe,P=lathe?initProf(S):null,L=src.split('\n'),its=[],er=[],wr=[],cols=[];
 let m=null,abs=true,dia=true,ox=S.PX,oy=S.PY,cx=S.start.x-ox,cy=S.start.y-oy,cz=lathe?0:50,f=0,s=0,sp=0,cl=0,fm=lathe?95:94,cs=97,mx=0,ta=0,pend=null,lastN=-1,end=false,endSeen=false,tail=0;
 const err=(i,x,d)=>er.push({i,x,d}),warn=(i,x)=>wr.push({i,x});
 L.forEach((raw,i)=>{
  if(end){if(!tail&&strip(raw).trim()){warn(i,'Righe dopo M30: vengono ignorate');tail=1}return}
  let txt=strip(raw).toUpperCase().replace(/(\d),(\d)/g,'$1.$2').trim();
  if(lathe&&FLIPRE.test(cmt(raw)))txt=txt.replace(/M(?!\s*[-+]?[\d.])/g,'M0');
  if(!txt)return;
  const re=/([A-Z])\s*([-+]?(?:\d+\.?\d*|\.\d+))/g,rest=txt.replace(re,'').trim();
  if(rest){err(i,`Sintassi non valida: "${rest}" (dopo ogni lettera serve un numero; usa lo zero 0, non la lettera O)`);return}
  const w={},gs=[],ms=[],tk=[];let mm,bad=false;
  while((mm=re.exec(txt))){const k=mm[1],v=parseFloat(mm[2]);tk.push(k);
   if(k=='G')gs.push(v);else if(k=='M')ms.push(v);
   else if('XYZIJKRFSTNP'.includes(k)){if(k in w){err(i,`${k} ripetuto nello stesso blocco`);bad=true}w[k]=v}
   else{err(i,`Lettera non supportata: ${k}. Ammesse: N G M X Y Z I J K R F S T P`);bad=true}}
  if(lathe&&('Y' in w||'J' in w)){err(i,'Y e J non si usano in tornio: lavora con X e Z (centro arco con I,K)');bad=true}
  if(!lathe&&'K' in w){err(i,'K (centro arco in Z) si usa solo in tornio: in fresa usa I,J o R');bad=true}
  if(tk[0]!='N')err(i,'Il blocco deve iniziare con il numero di blocco (es. N10)');
  else if(!Number.isInteger(w.N)||w.N<0)err(i,'Numero di blocco N non valido (intero positivo)');
  else{if(w.N<=lastN)err(i,`N${w.N} non crescente (blocco precedente N${lastN})`);lastN=w.N}
  if(bad)return;
  const gm=gs.filter(g=>g>=0&&g<=3),c=(a,b)=>gs.filter(g=>g==a||g==b).length>1,mS=ms.filter(k=>k>=3&&k<=5);
  if(gm.length>1)err(i,'Due movimenti (G0-G3) nello stesso blocco');
  if(c(90,91))err(i,'G90 e G91 insieme');if(c(94,95))err(i,'G94 e G95 insieme');if(c(96,97))err(i,'G96 e G97 insieme');if(c(7,8))err(i,'G7 e G8 insieme');
  if(mS.length>1)err(i,'Più comandi mandrino (M3/M4/M5) nello stesso blocco');if(ms.includes(8)&&ms.includes(9))err(i,'M8 e M9 insieme');
  let ex=null,isEnd=false,stop=false,g92=false,g4=false;
  for(const g of gs){
   if(g>=0&&g<=3&&Number.isInteger(g)){ex=g;m=g}
   else if(g==21);
   else if(g==17)lathe?err(i,'G17 (piano XY) non si usa in tornio: il piano è XZ (G18)'):0;
   else if(g==18)lathe?0:err(i,'G18 non simulato in fresa: il piano è XY (G17). Per il piano XZ passa alla modalità Tornio');
   else if(g==19)err(i,'G19 non simulato');
   else if(g==4)g4=true;
   else if(g==7&&lathe)dia=true;else if(g==8&&lathe)dia=false;
   else if(g==90)abs=true;else if(g==91)abs=false;else if(g==94||g==95)fm=g;else if(lathe&&(g==98||g==99))fm=g==98?94:95;else if(g==96||g==97)cs=g;else if(g==92||g==50)g92=true;
   else err(i,`Codice G non supportato: G${g}. Supportati: G0-G4, ${lathe?'G7, G8, G18, G50, G90, G91, G92, G94-G99':'G17, G21, G90, G91, G92, G94-G97'}`)}
  if('F' in w)f=w.F;if('S' in w&&!g92)s=w.S;
  if('T' in w){if(lathe){ta=w.T>=100?Math.floor(w.T/100):w.T}else pend=w.T}
  for(const k of ms){
   if(k==3)sp=1;else if(k==4)sp=-1;else if(k==5)sp=0;else if(k==8)cl=1;else if(k==9)cl=0;   else if(k==0){stop=true;sp=0;cl=0}
   else if(k==6){if(lathe);else if(pend===null)err(i,"M6 senza T: indica prima l'utensile (es. T1 M6)");else{ta=pend;if(sp)warn(i,'Cambio utensile con mandrino acceso: usa M5 prima di M6')}}
   else if(k==30||k==2){isEnd=true;sp=0;cl=0}
   else err(i,`Codice M non supportato: M${k}. Supportati: M0, M3, M4, M5, M6, M8, M9, M30`)}
  if((mS[0]==3||mS[0]==4)&&!s)err(i,'M3/M4 senza velocità S');
  let fl=false;if(lathe&&stop&&ms.includes(0)&&FLIPRE.test(cmt(raw))){flipProf(P);fl=true}
  const hk=lathe?'Z':'X',vk=lathe?'X':'Y',fx=lathe&&dia?.5:1;
  if(g92){
   if('S' in w)mx=w.S;
   const hasH=hk in w,hasV=vk in w,hasZ=!lathe&&'Z' in w;
   if(hasH||hasV){const mxp=cx+ox,myp=cy+oy;if(hasH)cx=w[hk];if(hasV)cy=w[vk]*fx;ox=mxp-cx;oy=myp-cy}
   if(hasZ)cz=w.Z;
   if(!hasH&&!hasV&&!hasZ&&!('S' in w))err(i,'G92/G50 senza X/Z (preset zero) né S (limite giri)')}
  const dmm=lathe?Math.max(2*Math.abs(cy),1):TD(ta),rpm=cs==96?Math.min(mx||(lathe?4000:1e9),1000*s/(Math.PI*dmm)):s;
  const ax=!g92&&!g4&&('X' in w||'Z' in w||(!lathe&&'Y' in w));let seg=null;
  if(ex!==null&&!ax)err(i,`Manca il valore ${lathe?'X/Z':'X/Y/Z'} per G${ex}`);
  else if(ax){
   if(m===null)err(i,'Movimento senza G0/G1/G2/G3 attivo');
   else{
    const hv=lathe?w.Z:w.X,vv=lathe?(w.X===undefined?undefined:w.X*fx):w.Y;
    const nx=abs?(hv??cx):cx+(hv||0),ny=abs?(vv??cy):cy+(vv||0),nz=lathe?0:(abs?(w.Z??cz):cz+(w.Z||0));
    seg={k:m,x0:cx,y0:cy,z0:cz,x1:nx,y1:ny,z1:nz};let ok=true;
    if(m>=1&&!f){err(i,`Manca avanzamento F per G${m}`);ok=false}
    else if(m>=1&&fm==95&&(!sp||!rpm)){err(i,'G95/G99 (mm/giro) richiede mandrino acceso (M3/M4) con S');ok=false}
    if(m>=2&&ok){
     const io=lathe?w.K:w.I,jo=lathe?w.I:w.J,hasC=lathe?('K' in w||'I' in w):('I' in w||'J' in w);
     if('R' in w&&hasC){err(i,`Usa ${lathe?'I,K':'I,J'} oppure R, non entrambi`);ok=false}
     const cw=m==2,dx=nx-cx,dy=ny-cy,d=Math.hypot(dx,dy);let ccx,ccy;
     if(!ok);
     else if('R' in w){
      if(d<1e-9){err(i,`Arco con R tra punti coincidenti: usa ${lathe?'I,K':'I,J'} per il cerchio completo`);ok=false}
      else{const q=w.R*w.R-d*d/4;
       if(q<-1e-6){err(i,`Raggio R${w.R} troppo piccolo per la corda di ${d.toFixed(3)} mm`,{R:w.R,d});ok=false}
       else{const h=Math.sqrt(Math.max(q,0)),k=(w.R>0?1:-1)*h/d,n=cw?[dy,-dx]:[-dy,dx];ccx=(cx+nx)/2+k*n[0];ccy=(cy+ny)/2+k*n[1]}}}
     else if(hasC){ccx=cx+(io||0);ccy=cy+(jo||0)}
     else{err(i,`Manca il centro (${lathe?'I,K':'I,J'}) o il raggio R per G${m}`);ok=false}
     if(ok){const r=Math.hypot(cx-ccx,cy-ccy),r2=Math.hypot(nx-ccx,ny-ccy);
      if(r<1e-9){err(i,'Raggio arco nullo');ok=false}
      else{const a0=Math.atan2(cy-ccy,cx-ccx),a1=Math.atan2(ny-ccy,nx-ccx);let dd=a1-a0;
       if(cw){if(dd>=-1e-9)dd-=2*Math.PI}else{if(dd<=1e-9)dd+=2*Math.PI}
       if(Math.abs(r-r2)>0.01){err(i,`Arco non valido: raggio iniziale ${r.toFixed(3)} diverso da finale ${r2.toFixed(3)} (controlla ${lathe?'I,K':'I,J'})`,{r,sg:Math.abs(dd)>Math.PI?-1:1});ok=false}
       else{Object.assign(seg,{cx:ccx,cy:ccy,r,a0,dd});seg.len=Math.hypot(Math.abs(dd)*r,nz-cz)}}}}
    else if(ok)seg.len=Math.hypot(nx-cx,ny-cy,nz-cz);
    if(!ok)seg=null;
    else{seg.fv=m==0?2400:fm==95?f*rpm:f;cx=nx;cy=ny;cz=nz;
     seg.x0+=ox;seg.x1+=ox;seg.y0+=oy;seg.y1+=oy;if(m>=2){seg.cx+=ox;seg.cy+=oy}
     seg.d=lathe?0:TD(ta);seg.col=lathe?collideL(seg,sp,S,P):collide(seg,sp,S);if(seg.col)cols.push({i,x:seg.col})}}}
  const desc=[...gs.map(g=>DICT['G'+String(g).padStart(2,'0')]),...ms.map(k=>DICT['M'+String(k).padStart(2,'0')])].filter(Boolean).join(' ');
  its.push({i,seg,end:isEnd,stop,flip:fl,N:w.N,desc,snap:{f,s,t:ta,sp,cl,fm,cs,rpm:rpm>1e8?0:rpm,ox,oy,dia,abs}});
  if(isEnd){end=true;endSeen=true}
 });
 if(its.length&&!endSeen)warn(L.length-1,'Il programma non termina con M30');
 return{its,er,wr,col:cols}}

/* ======================= CORREGGI INTELLIGENTE ======================= */
const maskL=l=>{const c=[];return[l.replace(/\([^)]*\)|;.*$/g,x=>{c.push(x);return'\u0001'+(c.length-1)+'\u0001'}),c]};
const unmask=(s,c)=>s.replace(/\u0001(\d+)\u0001/g,(_,k)=>c[k]);
const editL=(l,fn)=>{const[m,c]=maskL(l);return unmask(fn(m),c)};
const W=(L,fl)=>new RegExp('(?<![A-Za-z])'+L+'\\s*[-+]?(?:\\d+\\.?\\d*|\\.\\d+)',fl||'gi');
const TK=(L,n,fl)=>new RegExp('(?<![A-Za-z])'+L+'\\s*0*'+n+'(?![\\d.])',fl||'gi');
const hasW=(l,L)=>W(L,'i').test(maskL(l)[0]);
const valW=(l,L)=>{const m=maskL(l)[0].match(W(L,'i'));return m?parseFloat(m[0].slice(1)):null};
const fmtN=v=>String(+(+v).toFixed(3));
const setW=(l,L,v)=>editL(l,s=>s.replace(W(L),L+fmtN(v)));
const addTok=(l,t)=>editL(l,s=>s.replace(/\s*((?:\u0001\d+\u0001\s*)*)$/,(x,cc)=>' '+t+(cc?' '+cc.trim():'')));
const keepLast=(l,L,nums)=>editL(l,s=>{const re=new RegExp('(?<![A-Za-z])'+L+'\\s*0*('+nums.join('|')+')(?![\\d.])','gi'),all=[...s.matchAll(re)];if(all.length<2)return s;const keep=all[all.length-1].index;return s.replace(re,(x,g,off)=>off===keep?x:'').replace(/ {2,}/g,' ')});
function renumber(L){let n=10;for(let i=0;i<L.length;i++){const t=L[i].trim();if(!t||/^[(;]/.test(t))continue;L[i]='N'+n+' '+t.replace(/^N\s*[-+]?[\d.]+\s*/i,'');n+=10}}
const ADV=[[/Manca il centro/,'aggiungi il centro dell\'arco (I,J in fresa; I,K in tornio) oppure il raggio R'],[/Manca il valore/,'aggiungi le coordinate al blocco'],[/non supportato|non supportata/,'sostituisci il codice con uno della Guida ISO'],[/Fuori corsa/,'cambia le quote, sposta lo zero pezzo o allarga la corsa nelle Impostazioni'],[/ganasce/,'ferma l\'utensile prima delle ganasce o sposta ganasce/grezzo dalle Impostazioni'],[/Arco con R tra punti coincidenti/,'per un cerchio completo usa I,J (o I,K)'],[/Raggio arco nullo/,'il centro coincide con il punto di partenza: controlla I,J/K'],[/G92\/G50 senza/,'aggiungi X/Z oppure S']];
const WHY=[[/^Mandrino fermo/,'Se il mandrino è fermo l\'utensile non può tagliare: serve M3 (o M4) con S prima di G1/G2/G3.'],[/^G00 rapido dentro/,'G0 è la corsa rapida: nel materiale si deve lavorare con G1 e avanzamento F.'],[/^Manca avanzamento F/,'G1/G2/G3 hanno bisogno di F (mm/min con G94, mm/giro con G95).'],[/^M3\/M4 senza velocit/,'Dopo M3/M4 va indicata la velocità S del mandrino.'],[/^G95/,'Con G95 l\'avanzamento è per giro: il mandrino deve girare.'],[/^Raggio R/,'Il raggio non può essere minore di metà della distanza tra punto iniziale e finale.'],[/^Arco non valido/,'Il centro (I,J/K) deve essere equidistante da partenza e arrivo.'],[/^Fuori corsa/,'La quota supera i limiti della macchina.'],[/^Utensile contro/,'L\'utensile urterebbe una parte della macchina.'],[/^Y e J/,'Il tornio lavora sul piano XZ: Y non esiste e il centro arco usa I,K.'],[/^K \(centro/,'La fresa lavora sul piano XY: il centro arco usa I,J.'],[/G17 \(piano XY\)/,'Il tornio lavora sul piano XZ (G18).'],[/non termina con M30/,'M30 chiude il programma e riporta al primo blocco.'],[/Il blocco deve iniziare|non crescente|Numero di blocco/,'I blocchi vanno numerati in ordine crescente.'],[/^Cambio utensile con mandrino/,'Prima del cambio utensile il mandrino va fermato con M5.'],[/Sintassi non valida/,'Dopo ogni lettera serve un numero (zero, non la lettera O).'],[/ ripetuto/,'Una lettera può comparire una sola volta per blocco.']];
function fixOne(p,L,r,S){
 const i=p.i,x=p.x,l=L[i],lathe=S.lathe,it=r.its.find(t=>t.i==i),sn=it&&it.snap;let m;
 const set=(n,d)=>{if(n==null||n===l)return null;L[i]=n;return d};
 if(/Sintassi non valida/.test(x)){
  let n=editL(l,s=>s.replace(/(?<=[\d.])O|O(?=\d)/gi,'0'));if(n!==l)return set(n,'Lettera O sostituita con lo zero');
  n=editL(l,s=>s.replace(/[^A-Za-z0-9.,+\-\s\u0001]/g,''));if(n!==l)return set(n,'Rimossi caratteri non validi');
  return set('; '+l.trim(),'Riga non riconosciuta trasformata in commento')}
 if(m=x.match(/^([A-Z]) ripetuto/)){const n=editL(l,s=>s.replace(W(m[1],'i'),'').replace(/ {2,}/g,' '));return set(n,`${m[1]} duplicato rimosso (tenuta l'ultima occorrenza)`)}
 if(/^Y e J non si usano/.test(x)){const n=editL(l,s=>{s=hasW(s,'K')?s.replace(W('J'),''):s.replace(W('J'),q=>'K'+q.slice(1));return s.replace(W('Y'),'')});return set(n,'Tornio: J convertito in K e Y rimosso')}
 if(/^K \(centro arco/.test(x)){const n=editL(l,s=>hasW(s,'J')?s.replace(W('K'),''):s.replace(W('K'),q=>'J'+q.slice(1)));return set(n,'Fresa: K convertito in J')}
 if(/G17 \(piano XY\) non si usa/.test(x))return set(editL(l,s=>s.replace(TK('G',17),'G18')),'G17 sostituito con G18 (piano XZ del tornio)');
 if(/^G18 non simulato in fresa/.test(x))return set(editL(l,s=>s.replace(TK('G',18),'G17')),'G18 sostituito con G17 (piano XY della fresa)');
 if(/^G19 non simulato/.test(x))return set(editL(l,s=>s.replace(TK('G',19),'')),'G19 rimosso');
 if(/Il blocco deve iniziare|Numero di blocco N non valido|non crescente/.test(x)){if(r.fixedN)return null;r.fixedN=1;renumber(L);return'Blocchi rinumerati (10, 20, 30...)'}
 if(/^Due movimenti/.test(x))return set(keepLast(l,'G',[0,1,2,3]),'Due movimenti nello stesso blocco: tenuto l\'ultimo');
 if(/^G90 e G91/.test(x))return set(keepLast(l,'G',[90,91]),'G90/G91 insieme: tenuto l\'ultimo');
 if(/^G94 e G95/.test(x))return set(keepLast(l,'G',[94,95]),'G94/G95 insieme: tenuto l\'ultimo');
 if(/^G96 e G97/.test(x))return set(keepLast(l,'G',[96,97]),'G96/G97 insieme: tenuto l\'ultimo');
 if(/^G7 e G8/.test(x))return set(keepLast(l,'G',[7,8]),'G7/G8 insieme: tenuto l\'ultimo');
 if(/^Più comandi mandrino/.test(x))return set(keepLast(l,'M',[3,4,5]),'Più comandi mandrino: tenuto l\'ultimo');
 if(/^M8 e M9/.test(x))return set(keepLast(l,'M',[8,9]),'M8/M9 insieme: tenuto l\'ultimo');
 if(/^M6 senza T/.test(x))return set(editL(l,s=>s.replace(/(?<![A-Za-z])M\s*0*6(?![\d.])/i,'T1 M6')),'Aggiunto T1 prima di M6');
 if(/^M3\/M4 senza velocità/.test(x)){const v=lathe?(sn&&sn.cs==96?150:800):(sn&&sn.cs==96?80:1000);return set(addTok(l,'S'+v),`Aggiunta velocità S${v}`)}
 if(/^Manca avanzamento F/.test(x)){const g95=sn&&sn.fm==95,v=lathe?(g95?0.2:150):(g95?0.1:100);return set(addTok(l,'F'+v),`Aggiunto avanzamento F${v}${g95?' mm/giro':' mm/min'}`)}
 if(/^G95\/G99 \(mm\/giro\) richiede/.test(x)){let t=[];if(sn&&!sn.sp)t.push('M3');if(sn&&!sn.s)t.push('S'+(lathe?800:1000));if(!t.length)return null;return set(addTok(l,t.join(' ')),`Aggiunto ${t.join(' ')} (serve il mandrino per G95)`)}
 if(/^Movimento senza G0/.test(x)){const g=hasW(l,'F')?'G1':'G0',n=editL(l,s=>/^\s*N\s*[-+]?[\d.]+/i.test(s)?s.replace(/^(\s*N\s*[-+]?[\d.]+)/i,'$1 '+g):null);return n==null?null:set(n,`Aggiunto ${g} al primo movimento`)}
 if(m=x.match(/^Raggio R(-?[\d.]+) troppo piccolo per la corda di ([\d.]+)/)){const v=(parseFloat(m[1])<0?-1:1)*Math.ceil(parseFloat(m[2])/2*1000)/1000;return set(setW(l,'R',v),`Raggio portato a R${fmtN(v)} (metà della corda)`)}
 if(/non entrambi/.test(x))return set(editL(l,s=>s.replace(W('R'),'')),'Rimosso R: tenuto il centro dell\'arco');
 if(/^Arco non valido: raggio iniziale/.test(x)&&p.d){const n=addTok(editL(l,s=>s.replace(W('I'),'').replace(W('J'),'').replace(W('K'),'').replace(/ {2,}/g,' ')),'R'+fmtN(p.d.sg*p.d.r));return set(n,'Centro incoerente sostituito con il raggio R del punto di partenza')}
 if(/^Cambio utensile con mandrino acceso/.test(x))return set(editL(l,s=>s.replace(/(?<![A-Za-z])M\s*0*6(?![\d.])/i,'M5 M6')),'Aggiunto M5 prima di M6');
 if(/non termina con M30/.test(x)){while(L.length&&!L[L.length-1].trim())L.pop();let n=0;L.forEach(t=>{const q=t.match(/^\s*N\s*(\d+)/i);if(q)n=Math.max(n,+q[1])});L.push('N'+(n+10)+' M30');return'Aggiunto M30 finale'}
 // interferenze
 if(/^G00 rapido dentro il materiale/.test(x))return set(editL(l,s=>s.replace(TK('G',0),'G1')),'G0 sostituito con G1: non si entra nel materiale in rapido');
 if(/^Mandrino fermo/.test(x)){
  const a=r.its,ci=a.findIndex(t=>t.i==i);let j=ci;while(j>0&&a[j-1].snap.sp==0)j--;
  let tg=a[ci];for(let k=j;k<=ci;k++){const t=a[k];if(t.seg&&!/(?<![A-Za-z])M\s*0*[345](?![\d.])/i.test(maskL(L[t.i])[0])){tg=t;break}}
  const tk=['M3'];if(!a[ci].snap.s)tk.push('S'+(lathe?800:1000));const n=addTok(L[tg.i],tk.join(' '));if(n===L[tg.i])return null;L[tg.i]=n;return`Aggiunto ${tk.join(' ')} prima della lavorazione (riga ${tg.i+1})`}
 if(/^Utensile contro il mandrino/.test(x)){
  if(!sn||!sn.abs||!hasW(l,'Z'))return null;const zl=S.cz1+2-sn.ox,z=valW(l,'Z');if(z>=zl)return null;return set(setW(l,'Z',zl),`Z limitato a ${fmtN(zl)} per fermarsi prima delle ganasce`)}
 if(/^Utensile contro il piano macchina/.test(x)){
  if(!sn||!sn.abs||!hasW(l,'Z'))return null;const zl=S.top-S.T+.5,z=valW(l,'Z');if(z>=zl)return null;return set(setW(l,'Z',zl),`Z limitato a ${fmtN(zl)} (sopra il piano macchina)`)}
 if(/^Fuori corsa macchina/.test(x)){
  if(!sn||!sn.abs)return null;const lm=S.lim,e=.001,rg=[];
  if(lathe){rg.push(['Z',lm.x-sn.ox+e,lm.x+lm.w-sn.ox-e]);const k=sn.dia===false?1:.5;rg.push(['X',(-S.MX/2-sn.oy)/k+e,(S.MX/2-sn.oy)/k-e])}
  else{rg.push(['X',lm.x-sn.ox+e,lm.x+lm.w-sn.ox-e],['Y',lm.y-sn.oy+e,lm.y+lm.h-sn.oy-e])}
  let n=l;const ch=[];for(const[a,lo,hi]of rg){const v=valW(n,a);if(v==null)continue;const nv=Math.min(hi,Math.max(lo,v));if(nv!==v){n=setW(n,a,nv);ch.push(a+fmtN(nv))}}
  return ch.length?set(n,'Quote riportate dentro la corsa macchina: '+ch.join(' ')):null}
 return null}
function smartFix(){
 const orig=code.value,L=orig.split('\n'),log=[],skip=new Set(),cnt={},S=setup();let fixedN=0;
 if(S.lathe)L.forEach((t,k)=>{const n=editL(t,s=>s.replace(/(?<![A-Za-z])T\s*(\d{1,2})\d{2}(?![\d.])/gi,'T$1'));if(n!==t){L[k]=n;log.push({i:k,d:'Utensile scritto come T'+(t.match(/T\s*(\d+)/i)||[0,''])[1]+' ridotto a T'+(n.match(/T\s*(\d+)/i)||[0,''])[1],why:[0,'Sul tornio dell\'aula si scrive solo T01, T02... (senza la correzione 01 finale).'],before:t,after:n})}});
 if(setupIss.some(t=>t.l=='e'))con('Attenzione: le Impostazioni hanno conflitti: correggili prima di fidarti della simulazione.','w');
 for(let pass=0;pass<80;pass++){
  const r=parse(L.join('\n'));r.fixedN=fixedN;
  const probs=[...r.er,...r.col,...r.wr].filter(p=>!skip.has(p.i+'|'+p.x));let did=false;
  const score=q=>q.er.length*3+q.col.length*2+q.wr.length;
  for(const p of probs){const key=p.i+'|'+p.x;cnt[key]=(cnt[key]||0)+1;if(cnt[key]>2){skip.add(key);continue}
   const snapL=L.slice(),before=L[p.i],d=fixOne(p,L,r,S);fixedN=r.fixedN||fixedN;
   if(d){
    // la correzione deve migliorare il programma, altrimenti viene annullata
    if(score(parse(L.join('\n')))>score(r)){L.length=0;L.push(...snapL);skip.add(key);continue}
    log.push({i:p.i,d,why:WHY.find(q=>q[0].test(p.x)),before,after:L[p.i]});did=true;break}
   skip.add(key)}
  if(!did)break}
 const nt=L.join('\n');
 if(nt!==orig){backup=orig;code.value=nt;const a=orig.split('\n');fixL=new Set();L.forEach((t,k)=>{if(a[k]!==t)fixL.add(k)});$('un').hidden=false}
 reparse();
 const rem=[...errs.map(e=>({i:e.i,x:e.x})),...colRef.map(e=>({i:e.i,x:'INTERFERENZA - '+e.x}))];
 con('--- Correggi ---','i');
 if(!log.length)con('Nessuna correzione automatica necessaria.','o');
 else{const seen=new Set();log.forEach(g=>{const k=g.d;if(seen.has(k)&&/Blocchi rinumerati/.test(k))return;seen.add(k);con(`Riga ${g.i+1}: ${g.d}`+(g.why?' - '+g.why[1]:'')+(g.before!=null&&g.before.trim()!=g.after.trim()?`  [${g.before.trim()}  =>  ${g.after.trim()}]`:''),'o',g.i)})}
 if(rem.length){con(`Restano ${rem.length} problemi da sistemare a mano:`,'w');rem.forEach(e=>{const a=ADV.find(q=>q[0].test(e.x));con(`Riga ${e.i+1}: ${e.x}${a?' -> '+a[1]:''}`,'e',e.i)})}
 else con(log.length?'Programma corretto: nessun errore né interferenza.':'Il programma è già a posto.','o')}
let colRef=[];

/* ======================= EDITOR ======================= */
function hlLine(l){return l.replace(/(\([^)]*\)?|;.*)|([A-Za-z])(\s*[-+]?\d*\.?\d*)|([\s\S])/g,(a,cm,k,n,o)=>{
 const e=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
 if(cm)return`<span class="cm">${e(cm)}</span>`;
 if(k){const u=k.toUpperCase(),cl=u=='G'?'g':u=='M'?'m':'XYZ'.includes(u)?'ax':'IJKR'.includes(u)?'ij':'FST'.includes(u)?'fs':'n';return`<span class="${cl}">${k}${e(n)}</span>`}
 return e(o)})}
const lcls=i=>(i==curLine?'cur ':'')+(errL.has(i)?'er':colL.has(i)?'co':fixL.has(i)?'fx':'');
function render(){
 const L=code.value.split('\n');
 HL.innerHTML=L.map((l,i)=>`<div class="${lcls(i)}">${hlLine(l)||' '}</div>`).join('');
 gut.firstChild.outerHTML=`<div>${L.map((l,i)=>`<div class="${lcls(i)}">${i+1}</div>`).join('')}</div>`;
 sync()}
function sync(){HL.style.transform=`translate(${-code.scrollLeft}px,${-code.scrollTop}px)`;gut.firstChild.style.transform=`translateY(${-code.scrollTop}px)`}
code.addEventListener('scroll',sync);
code.addEventListener('input',()=>{fixL=new Set();reparse()});['keyup','click'].forEach(v=>code.addEventListener(v,sbar));
code.addEventListener('keydown',e=>{if(e.key=='Tab'){e.preventDefault();document.execCommand('insertText',false,'  ')}});
const tip=$('tip'),cw0=(()=>{c.font=getComputedStyle(code).font;return c.measureText('M').width})();
code.addEventListener('mousemove',e=>{
 const r=code.getBoundingClientRect(),li=Math.floor((e.clientY-r.top-8+code.scrollTop)/20),col=Math.floor((e.clientX-r.left-8+code.scrollLeft)/cw0),ln=code.value.split('\n')[li];
 let txt=null;
 if(ln!==undefined){const re=/([A-Za-z])\s*[-+]?\d*\.?\d*/g;let m;const cmt=ln.search(/[;(]/);
  while((m=re.exec(ln))){if(col>=m.index&&col<m.index+m[0].length&&(cmt<0||m.index<cmt)){
   const k=m[1].toUpperCase(),n=parseFloat(m[0].slice(1));
   txt=(k=='G'||k=='M')?DICT[k+String(n).padStart(2,'0')]:DICT[k];break}}}
 if(txt){tip.textContent=txt;tip.style.display='block';tip.style.left=Math.min(e.clientX+14,innerWidth-300)+'px';tip.style.top=e.clientY+16+'px'}else tip.style.display='none'});
code.addEventListener('mouseleave',()=>tip.style.display='none');

/* ======================= SIMULAZIONE ======================= */
function reparse(){
 setupIss=checkSetup(setup());
 const r=parse(code.value);items=r.its;errs=r.er;colRef=r.col;errL=new Set(errs.map(e=>e.i));colL=new Set(r.col.map(e=>e.i));
 $('con').innerHTML='';
 setupIss.forEach(t=>con('Impostazioni: '+t.t,t.l=='e'?'e':'w'));
 errs.forEach(e=>con(`Riga ${e.i+1}: ${e.x}`,'e',e.i));
 r.wr.forEach(e=>con(`Riga ${e.i+1}: attenzione - ${e.x}`,'w',e.i));r.col.forEach(e=>con(`Riga ${e.i+1}: INTERFERENZA - ${e.x}`,'e',e.i));if(!errs.length)con('Sintassi OK'+(r.col.length?' ma ci sono interferenze: la simulazione si fermerà. Prova Correggi.':'. Premi Run o Step.'),'o');
 renderChk();resetSim();updBtn();sbar();save();if(!errs.length&&items.length)con(analyze(),'i')}
function renderChk(){const e=setupIss.filter(t=>t.l=='e').length,w=setupIss.length-e;
 $('chk').innerHTML=setupIss.length?setupIss.map(t=>`<div class="${t.l}">${t.t}</div>`).join(''):'<div class="ok">Nessun conflitto tra grezzo, zeri, ganasce e corsa.</div>';
 const b=$('badge');b.hidden=!setupIss.length;b.textContent=setupIss.length;b.className='badge'+(e?'':' w')}
function analyze(){let tw=0,tr=0,t=0,zm=0;const tl=new Set();items.forEach(it=>{const g=it.seg;if(it.snap.t)tl.add('T'+it.snap.t);if(!g||!g.len)return;if(g.k==0)tr+=g.len;else tw+=g.len;t+=g.len/g.fv;zm=Math.min(zm,g.z0,g.z1)});const mill=MODE=='mill';return`Analisi: ${items.length} blocchi, lavoro ${tw.toFixed(0)} mm, rapidi ${tr.toFixed(0)} mm, tempo stimato ${Math.floor(t)}:${String(Math.round(t%1*60)).padStart(2,'0')} min${mill?', Z minima '+zm:''}${tl.size?', utensili '+[...tl].join(' '):''}${mill&&zm>=setup().top&&tw>0?'. ATTENZIONE: Z non scende mai sotto la superficie del grezzo, nessuna asportazione':''}`}
const setupErr=()=>setupIss.some(t=>t.l=='e');
function updBtn(){$('run').disabled=!!errs.length||setupErr();$('step').disabled=$('run').disabled}
function resetSim(){run=false;idx=0;prog=0;const S=setup();pos={x:S.start.x,y:S.start.y,z:S.lathe?0:50};PROF=S.lathe?initProf(S):null;snap=initSnap(S);crash=null;curLine=-1;items.forEach(i=>i.started=false);render();mon()}
function mon(){
 const lat=MODE=='lathe',k=snap.dia===false?1:2,it=items[Math.min(idx,items.length-1)],on=snap.sp!=0,rpm=Math.round(snap.rpm||0);
 if(lat){$('l1').innerHTML='X '+(k==2?'&Oslash;':'R');$('d1').textContent=((pos.y-snap.oy)*k).toFixed(3);$('m1').textContent='macchina '+(pos.y*2).toFixed(2)+' (Ø)';$('d3').textContent=(pos.x-snap.ox).toFixed(3);$('m3').textContent='macchina '+pos.x.toFixed(2)}
 else{$('l1').textContent='X';$('d1').textContent=(pos.x-snap.ox).toFixed(3);$('m1').textContent='macchina '+pos.x.toFixed(2);$('d2').textContent=(pos.y-snap.oy).toFixed(3);$('m2').textContent='macchina '+pos.y.toFixed(2);$('d3').textContent=pos.z.toFixed(3);$('m3').textContent=''}
 const st=crash?'INTERFERENZA':run?'In esecuzione':idx>=items.length&&idx>0?'Finito':'Fermo';
 $('chips').innerHTML=`<span>Blocco <b>${curLine>=0&&it?'N'+it.N:'-'}</b></span><span>T <b>${snap.t}</b></span><span>F <b>${snap.f}${snap.fm==95?' mm/giro':' mm/min'}</b></span><span>S <b>${rpm}${snap.cs==96?' (G96)':''}</b></span><span>Refrig. <b>${snap.cl?'ON':'off'}</b></span><span>Stato <b style="color:${crash?'var(--rd)':run?'var(--gr)':'var(--ye)'}">${st}</b></span>`;
 $('spin').className=on?(snap.sp>0?'on cw':'on ccw'):'off';
 $('spt').textContent=on?(snap.sp>0?'MANDRINO ON - ORARIO (M3)':'MANDRINO ON - ANTIORARIO (M4)'):'MANDRINO FERMO (M5)';
 $('sps').textContent=on?rpm+' giri/min'+(snap.cs==96?'  ('+snap.s+' m/min)':''):(snap.s?'S'+snap.s+' impostato':'0 giri/min');
 ui()}
function setLine(i){if(i!==curLine){curLine=i;render();const y=i*20;if(y<code.scrollTop||y>code.scrollTop+code.clientHeight-30){code.scrollTop=Math.max(0,y-code.clientHeight/2);sync()}}}
function adv(dt){
 let gd=0;const S=PROF?setup():null;
 while(run&&dt>0&&gd++<1000){
  if(idx>=items.length){run=false;break}
  const it=items[idx],g=it.seg;
  if(!it.started){it.started=true;snap=it.snap;setLine(it.i);con('N'+it.N+': '+(it.desc||'blocco senza codici G/M'),'i',it.i)}
  if(!g||g.len<1e-9){if(g)pos=at(g,1);done(it);if(stepM)run=false;continue}
  const lim=g.col?g.colT*g.len:g.len,v=g.fv/60*8*(+$('spd').value),need=(lim-prog)/v,p0=prog;let fin=false;
  if(need>dt){prog+=v*dt;dt=0;pos=at(g,prog/g.len)}
  else{dt-=need;prog=lim;pos=at(g,prog/g.len);fin=true}
  if(PROF&&snap.sp)carveSeg(PROF,S,g,p0/g.len,prog/g.len);
  if(fin){
   if(g.col){crash=g.col;run=false;con('INTERFERENZA riga '+(it.i+1)+': '+g.col+'. Premi Reset.','e',it.i)}
   else{done(it);if(stepM)run=false}}}
 mon()}
function done(it){idx++;prog=0;if(it.flip&&PROF)flipProf(PROF);
 if(it.end){idx=items.length;run=false;con('M30: fine programma.','o')}
 else if(it.stop){run=false;con((it.flip?'M0: pezzo ribaltato. ':'M0: arresto programmato. ')+'Mandrino e refrigerante spenti: premi Run per continuare.','o')}}
function at(g,t){return g.k<2?{x:g.x0+(g.x1-g.x0)*t,y:g.y0+(g.y1-g.y0)*t,z:g.z0+(g.z1-g.z0)*t}:{x:g.cx+g.r*Math.cos(g.a0+g.dd*t),y:g.cy+g.r*Math.sin(g.a0+g.dd*t),z:g.z0+(g.z1-g.z0)*t}}
function tan(g,t){if(g.k<2){const dx=g.x1-g.x0,dy=g.y1-g.y0,d=Math.hypot(dx,dy)||1;return[dx/d,dy/d]}const a=g.a0+g.dd*t,s=g.dd>0?1:-1;return[-Math.sin(a)*s,Math.cos(a)*s]}
function startRun(step){
 if(crash){con('Interferenza: premi Reset per ripartire.','e');return}
 if(errs.length){con('Impossibile eseguire: correggi gli errori di sintassi (prova Correggi).','e');return}
 if(setupErr()){con('Impossibile eseguire: ci sono conflitti nelle Impostazioni (grezzo, zeri, ganasce o corsa).','e');openDrawer(1);return}
 if(idx>=items.length){resetSim()}
 stepM=step;run=true;mon()}

/* ======================= DISEGNO ======================= */
function path(g,t){c.beginPath();if(g.k<2){c.moveTo(SX(g.x0),SY(g.y0));c.lineTo(SX(g.x0+(g.x1-g.x0)*t),SY(g.y0+(g.y1-g.y0)*t))}else c.arc(SX(g.cx),SY(g.cy),g.r*V.s,-g.a0,-(g.a0+g.dd*t),g.dd>0);c.stroke()}
function arrow(x,y,tx,ty,col,sz){const px=SX(x),py=SY(y),a=Math.atan2(-ty,tx);c.fillStyle=col;c.beginPath();c.moveTo(px+Math.cos(a)*sz,py+Math.sin(a)*sz);c.lineTo(px+Math.cos(a+2.5)*sz,py+Math.sin(a+2.5)*sz);c.lineTo(px+Math.cos(a-2.5)*sz,py+Math.sin(a-2.5)*sz);c.closePath();c.fill()}
const COL=k=>k==0?'#8b98a9':k==1?'#3b9cff':'#19d3c5';
function seg(g,t,alpha){c.globalAlpha=alpha;c.strokeStyle=COL(g.k);c.lineWidth=g.k==0?1.2:2;c.setLineDash(g.k==0?[6,5]:[]);path(g,t);c.setLineDash([]);c.globalAlpha=1}
function drawLathe(Z){
 c.fillStyle='#2a313c';c.strokeStyle='#4b5667';c.lineWidth=1;const cw=(Z.cz1-Z.cz0)*V.s,ch=2*Z.cr*V.s;c.fillRect(SX(Z.cz0),SY(Z.cr),cw,ch);
 c.save();c.beginPath();c.rect(SX(Z.cz0),SY(Z.cr),cw,ch);c.clip();c.strokeStyle='rgba(139,152,169,.12)';c.lineWidth=1;for(let hx=-ch;hx<cw;hx+=12){c.beginPath();c.moveTo(SX(Z.cz0)+hx,SY(Z.cr)+ch);c.lineTo(SX(Z.cz0)+hx+ch,SY(Z.cr));c.stroke()}c.restore();
 c.strokeStyle='#6b7787';c.lineWidth=2;c.strokeRect(SX(Z.cz0),SY(Z.cr),cw,ch);
 c.font='700 12px Segoe UI,sans-serif';c.textAlign='center';c.fillStyle='#b4c2d4';const lx=SX(Z.cz0)+Math.max(0,Math.min(cw,(Math.max(Z.zmin,Z.cf-30)-Z.cz0)*V.s))/2,ty=SY(Z.cr)+ch*0.3;c.fillText('MANDRINO',lx,ty);c.fillText('(corpo)',lx,ty+14);c.textAlign='left';
 c.setLineDash([6,4]);c.strokeStyle='#5b6676';c.strokeRect(SX(Z.zmin),SY(Z.R),(Z.zmax-Z.zmin)*V.s,2*Z.R*V.s);c.setLineDash([]);
 if(PROF){const n=PROF.length,step=Math.max(1,Math.floor(1/(V.s*DZ))),ks=[];for(let k=0;k<n;k+=step)ks.push(k);if(ks[ks.length-1]!=n-1)ks.push(n-1);
  c.beginPath();ks.forEach((k,j)=>{const x=SX(Z.zmin+k*DZ),y=SY(PROF[k]);j?c.lineTo(x,y):c.moveTo(x,y)});for(let j=ks.length-1;j>=0;j--)c.lineTo(SX(Z.zmin+ks[j]*DZ),SY(-PROF[ks[j]]));c.closePath();c.fillStyle='#3a4452';c.fill();c.strokeStyle='#8a97a8';c.lineWidth=1.5;c.stroke()}
 const j0=Math.max(Z.zmin,Z.cf-30),jw=Z.cf-j0;if(jw>0){c.fillStyle='#2f6fb0';c.strokeStyle='#8cc4ff';c.lineWidth=1.5;[1,-1].forEach(sg=>{c.fillRect(SX(j0),SY(sg>0?Z.R+10:-Z.R),jw*V.s,10*V.s);c.strokeRect(SX(j0),SY(sg>0?Z.R+10:-Z.R),jw*V.s,10*V.s)});
  c.font='700 11px Segoe UI,sans-serif';c.fillStyle='#fff';c.textAlign='center';c.textBaseline='middle';c.fillText('GANASCE',SX(j0)+jw*V.s/2,SY(Z.R+10)+5*V.s);c.fillText('GANASCE',SX(j0)+jw*V.s/2,SY(-Z.R)+5*V.s);c.textAlign='left';c.textBaseline='alphabetic'}
 c.setLineDash([14,4,3,4]);c.strokeStyle='#6b7787';c.lineWidth=1;c.beginPath();c.moveTo(0,SY(0));c.lineTo(cv.width/dpr,SY(0));c.stroke();c.setLineDash([])}
function drawLatheTool(){
 const px=SX(pos.x),py=SY(pos.y),pts=[[0,0],[16,-8],[24,-8],[70,-8],[70,-34],[24,-34],[9,-14]];
 c.fillStyle=crash?'rgba(255,60,60,.55)':'rgba(255,210,74,.3)';c.strokeStyle=crash?'#ff3b3b':snap.sp?'#ffd24a':'#aaa';c.lineWidth=2;c.beginPath();pts.forEach((q,j)=>j?c.lineTo(px+q[0],py+q[1]):c.moveTo(px+q[0],py+q[1]));c.closePath();c.fill();c.stroke();
 c.beginPath();c.moveTo(px-6,py);c.lineTo(px+6,py);c.moveTo(px,py-6);c.lineTo(px,py+6);c.stroke()}
function draw(){
 const w=cv.width/dpr,h=cv.height/dpr;c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,w,h);
 const lathe=MODE=='lathe',m=[1,2,5,10,20,50,100,200,500,1000].find(v=>v*V.s>=12)||1000,x0=-V.ox/V.s,x1=(w-V.ox)/V.s,y0=(V.oy-h)/V.s,y1=V.oy/V.s;
 c.font='10px Consolas,monospace';c.textBaseline='top';c.lineWidth=1;
 for(let x=Math.floor(x0/m)*m;x<=x1;x+=m){const mj=Math.round(x/m)%5==0;c.strokeStyle=mj?'#2e3744':'#1b212a';c.beginPath();c.moveTo(Math.round(SX(x))+.5,0);c.lineTo(Math.round(SX(x))+.5,h);c.stroke();if(mj){c.fillStyle='#6b7787';c.fillText(+x.toFixed(3),SX(x)+3,h-13)}}
 for(let y=Math.floor(y0/m)*m;y<=y1;y+=m){const mj=Math.round(y/m)%5==0;c.strokeStyle=mj?'#2e3744':'#1b212a';c.beginPath();c.moveTo(0,Math.round(SY(y))+.5);c.lineTo(w,Math.round(SY(y))+.5);c.stroke();if(mj){c.fillStyle='#6b7787';c.fillText(+(lathe?2*y:y).toFixed(3),3,SY(y)+2)}}
 c.lineWidth=2;c.strokeStyle='#d9534f';c.beginPath();c.moveTo(0,SY(0));c.lineTo(w,SY(0));c.stroke();c.strokeStyle='#5cb85c';c.beginPath();c.moveTo(SX(0),0);c.lineTo(SX(0),h);c.stroke();
 c.fillStyle='#d9534f';c.fillText(lathe?'Z':'X',w-14,SY(0)+4);c.fillStyle='#5cb85c';c.fillText(lathe?'X':'Y',SX(0)+5,4);
 const Z=setup(),st=Z.st,lm=Z.lim;c.setLineDash([8,6]);c.strokeStyle='#7a4a4a';c.lineWidth=1;c.strokeRect(SX(lm.x),SY(lm.y+lm.h),lm.w*V.s,lm.h*V.s);c.setLineDash([]);
 if(lathe)drawLathe(Z);else{c.fillStyle='#3a4452';c.fillRect(SX(st.x),SY(st.y+st.h),st.w*V.s,st.h*V.s);c.strokeStyle='#8a97a8';c.strokeRect(SX(st.x),SY(st.y+st.h),st.w*V.s,st.h*V.s)}
 const mk=(x,y,l,col)=>{c.strokeStyle=col;c.fillStyle=col;c.lineWidth=2;c.beginPath();c.arc(SX(x),SY(y),7,0,7);c.stroke();c.fillText(l,SX(x)+10,SY(y)-14)};mk(0,0,'Zero macchina','#ff5d5d');mk(Z.PX,Z.PY,'Zero pezzo','#ffd24a');
 const cur=idx<items.length?items[idx].seg:null,ct=cur&&cur.len?prog/cur.len:0;
 if(!lathe){
  c.save();c.beginPath();c.rect(SX(st.x),SY(st.y+st.h),st.w*V.s,st.h*V.s);c.clip();c.lineCap='round';c.lineJoin='round';c.strokeStyle='#161b22';
  const cut=(g,t)=>{if(g.k>0&&(g.z0+g.z1)/2<Z.top){c.lineWidth=g.d*V.s;path(g,t)}};
  for(let i=0;i<idx&&i<items.length;i++)if(items[i].seg)cut(items[i].seg,1);if(cur&&ct>0)cut(cur,ct);
  c.restore();c.lineCap='butt'}
 items.forEach(it=>{const g=it.seg;if(g){seg(g,1,.3);if(g.k>=2){const a=g.a0+g.dd/2,tg=tan(g,.5);arrow(g.cx+g.r*Math.cos(a),g.cy+g.r*Math.sin(a),tg[0],tg[1],COL(g.k),6)}}});
 for(let i=0;i<idx&&i<items.length;i++)if(items[i].seg)seg(items[i].seg,1,1);
 if(cur&&ct>0)seg(cur,ct,1);
 if(lathe){drawLatheTool();return}
 const px=SX(pos.x),py=SY(pos.y),r=Math.max(TD(snap.t)/2*V.s,4);
 c.fillStyle=crash?'rgba(255,60,60,.5)':'rgba(255,210,74,.22)';c.strokeStyle=crash?'#ff3b3b':snap.sp?'#ffd24a':'#aaa';c.lineWidth=2;c.setLineDash(snap.sp?[]:[3,3]);c.beginPath();c.arc(px,py,r,0,7);c.fill();c.stroke();c.setLineDash([]);
 c.beginPath();c.moveTo(px-r-5,py);c.lineTo(px+r+5,py);c.moveTo(px,py-r-5);c.lineTo(px,py+r+5);c.stroke();
 if(cur&&run){const tg=tan(cur,ct);arrow(pos.x+tg[0]*(r/V.s+6/V.s),pos.y+tg[1]*(r/V.s+6/V.s),tg[0],tg[1],'#ffd24a',8)}}
let last=0;function loop(ts){const dt=Math.min((ts-last)/1000,.1);last=ts;if(run)adv(dt);draw();requestAnimationFrame(loop)}
function fit(){const w=cv.width/dpr,h=cv.height/dpr,Z=setup(),pad=60;
 if(Z.lathe){const x0=Math.min(Z.cz0,Z.zmin),x1=Math.max(Z.zmax,Z.cz1)+10,zm=(x0+x1)/2;V.s=Math.max(.5,Math.min((w-pad*2)/(x1-x0),(h-pad*2)/(2*Z.cr)));V.ox=w/2-zm*V.s;V.oy=h/2;return}
 const st=Z.st;V.s=Math.max(.5,Math.min((w-pad*2)/st.w,(h-pad*2)/st.h));V.ox=w/2-(st.x+st.w/2)*V.s;V.oy=h/2+(st.y+st.h/2)*V.s}
let first=true;let rz=0;new ResizeObserver(()=>{cancelAnimationFrame(rz);rz=requestAnimationFrame(()=>{dpr=devicePixelRatio||1;const b=cv.parentElement.getBoundingClientRect();if(!b.width||!b.height)return;cv.width=Math.round(b.width*dpr);cv.height=Math.round(b.height*dpr);if(first){fit();first=false}})}).observe(cv.parentElement);
cv.addEventListener('wheel',e=>{e.preventDefault();const r=cv.getBoundingClientRect(),mx=e.clientX-r.left,my=e.clientY-r.top,wx=(mx-V.ox)/V.s,wy=(V.oy-my)/V.s,f=e.deltaY<0?1.15:1/1.15;V.s=Math.max(.3,Math.min(400,V.s*f));V.ox=mx-wx*V.s;V.oy=my+wy*V.s},{passive:false});
let drag=null;cv.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY};cv.setPointerCapture(e.pointerId);cv.style.cursor='grabbing'});
cv.addEventListener('pointermove',e=>{if(drag){V.ox+=e.clientX-drag.x;V.oy+=e.clientY-drag.y;drag={x:e.clientX,y:e.clientY}}});
cv.addEventListener('pointerup',()=>{drag=null;cv.style.cursor='grab'});

/* ======================= UI ======================= */
const MILL_IDS=['tt','sw','sh','td','sz','px','py','zc','mx0','mx1','my0','my1','gx','gy','gz'],LATHE_IDS=['ld','ll','lp','lcf','lz','lz0','lz1','lmx'],IDS=[...MILL_IDS,...LATHE_IDS];
function setMode(m){MODE=m;document.body.classList.toggle('lathe',m=='lathe');document.querySelectorAll('.seg button[data-m]').forEach(b=>b.classList.toggle('on',b.dataset.m==m));
 $('sub').textContent=m=='lathe'?'Tornio G-Code \u00b7 piano XZ (X = diametro)':'Fresatura G-Code \u00b7 piano XY';
 $('ex').innerHTML=Object.keys(EX).filter(k=>EX[k].mode==m).map(k=>`<option>${k}</option>`).join('');
 $('cur').textContent=m=='lathe'?'Z -  X -':'X -  Y -';
 if(m=='lathe'&&document.querySelector('.tabs .on[data-t=ut]'))tab('pz');
 buildGuide()}
function load(n){const e=EX[n];setMode(e.mode);$('ex').value=n;code.value=e.code;fixL=new Set();backup=null;$('un').hidden=true;
 if(e.mode=='mill'){$('sw').value=e.w;$('sh').value=e.h;$('td').value=e.d;$('tt').value=e.tt||'1:'+e.d+', 2:'+e.d;$('sz').value=e.sz;$('px').value=e.px;$('py').value=e.py;$('zc').value=e.zc;$('gx').value=e.gx||0;$('gy').value=e.gy||0;$('gz').value=e.gz||0;Object.keys(MILLD).forEach(k=>$(k).value=e[k]??MILLD[k])}
 else LATHE_IDS.forEach(i=>$(i).value=e[i]);
 reparse();fit()}
$('ex').onchange=e=>load(e.target.value);
document.querySelectorAll('.seg button[data-m]').forEach(b=>b.onclick=()=>{if(b.dataset.m!=MODE)load(Object.keys(EX).find(k=>EX[k].mode==b.dataset.m))});
$('run').onclick=()=>startRun(false);
$('pause').onclick=()=>{run=false;mon()};
$('stop').onclick=()=>{resetSim();con('Simulazione fermata: ritorno al primo blocco.','i')};
$('step').onclick=()=>startRun(true);
$('reset').onclick=()=>{reparse();fit()};
$('fit').onclick=fit;
$('spd').oninput=e=>$('spdv').textContent=(+e.target.value).toFixed(1)+'x';
IDS.forEach(i=>$(i).onchange=()=>{reparse();if(['sw','sh','zc','px','py','gx','gy','ld','ll','lp','lz','lcf','lz0','lz1'].includes(i))fit()});
// preset: sposta la corsa in modo che lo zero macchina cada nel punto scelto
$('mcp').onchange=e=>{const k=e.target.value;if(k==='')return;const w=Math.abs(num('mx1',400)-num('mx0',0)),h=Math.abs(num('my1',300)-num('my0',0)),a=[[0,w,0,h],[-w,0,0,h],[0,w,-h,0],[-w,0,-h,0],[-w/2,w/2,-h/2,h/2]][+k];['mx0','mx1','my0','my1'].forEach((id,j)=>$(id).value=a[j]);e.target.value='';reparse();fit()};
$('lmp').onchange=e=>{const k=e.target.value;if(k==='')return;const w=Math.abs(num('lz1',300)-num('lz0',0)),a=[[0,w],[-w,0],[-w/2,w/2]][+k];$('lz0').value=a[0];$('lz1').value=a[1];e.target.value='';reparse();fit()};
cv.ondblclick=e=>{const r=cv.getBoundingClientRect(),x=Math.round((e.clientX-r.left-V.ox)/V.s),y=Math.round((V.oy-e.clientY+r.top)/V.s);if(MODE=='lathe')$('lz').value=x;else{$('px').value=x;$('py').value=y}reparse()};
function openDrawer(on){$('drawer').parentElement.classList.toggle('dr',on===undefined?!$('drawer').parentElement.classList.contains('dr'):!!on)}
$('setb').onclick=()=>openDrawer();$('dclose').onclick=()=>openDrawer(0);
function tab(t){document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t==t));document.querySelectorAll('.tp').forEach(p=>p.hidden=p.dataset.t!=t)}
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>tab(b.dataset.t));
/* guida ISO */
let gf='all';
function buildGuide(){const q=($('gq').value||'').toLowerCase().trim();let n=0;
 const html=GUIDE.map(s=>{const rows=s.i.filter(r=>(gf=='all'||r.m=='mt'||r.m==gf)&&(!q||(r.c+' '+r.n+' '+r.s+' '+r.d+' '+r.e).toLowerCase().includes(q)));if(!rows.length)return'';n+=rows.length;
  return`<details ${s.o||q?'open':''}><summary>${s.t}<small>${rows.length} voci</small></summary><table class="gt">${rows.map(r=>`<tr><td>${r.c}</td><td><span class="nm">${r.n}</span><span class="tg ${r.m=='mt'?'':r.m}">${r.m=='mt'?'FRESA + TORNIO':r.m=='m'?'FRESA':'TORNIO'}</span>${r.s?`<div><code>${r.s.replace(/</g,'&lt;')}</code></div>`:''}${r.d?`<div class="ds">${r.d}</div>`:''}${r.e?`<div><code>${r.e}</code></div>`:''}</td></tr>`).join('')}</table></details>`}).join('');
 $('gb').innerHTML=html||'<div class="gnote">Nessun risultato.</div>'}
$('gq').oninput=buildGuide;
document.querySelectorAll('#gm button').forEach(b=>b.onclick=()=>{gf=b.dataset.f;document.querySelectorAll('#gm button').forEach(x=>x.classList.toggle('on',x==b));buildGuide()});
$('leg').onclick=()=>{$('modal').classList.add('on');$('gq').focus()};
$('cl').onclick=()=>$('modal').classList.remove('on');
$('modal').onclick=e=>{if(e.target.id=='modal')$('modal').classList.remove('on')};
function save(){try{const o={code:code.value,mode:MODE};IDS.forEach(i=>o[i]=$(i).value);localStorage.setItem('cncsim3',JSON.stringify(o))}catch(_){}}
function sbar(){const t=code.value.slice(0,code.selectionStart).split('\n');$('sb').textContent=`Riga ${t.length}, Col ${t[t.length-1].length+1}  \u00b7  ${items.length} blocchi  \u00b7  ${errs.length} errori  \u00b7  ${colL.size} interferenze`;$('sb').style.color=errs.length?'var(--rd)':colL.size?'var(--or)':'var(--gr)'}
function ui(){const g=items[idx],f=g&&g.seg&&g.seg.len?prog/g.seg.len:0,e=!!errs.length||setupErr();$('pb').style.width=(items.length?Math.min(100,100*(idx+f)/items.length):0)+'%';$('run').disabled=e||run;$('step').disabled=e||run;$('pause').disabled=!run;$('stop').disabled=!run&&!idx&&!crash;$('run').innerHTML=idx>0&&idx<items.length&&!run&&!crash?'&#9654; Riprendi':'&#9654; Run'}
function goto(l){const ls=code.value.split('\n');let p=0;for(let i=0;i<l;i++)p+=ls[i].length+1;code.focus();code.setSelectionRange(p,p+ls[l].length);code.scrollTop=Math.max(0,l*20-code.clientHeight/2);sync();sbar()}
$('con').onclick=e=>{const l=e.target.dataset.l;if(l!=null)goto(+l)};
$('cc').onclick=()=>$('con').innerHTML='';
$('op').onclick=()=>$('fo').click();
$('fo').onchange=e=>{const f=e.target.files[0];if(f)f.text().then(t=>{code.value=t;fixL=new Set();reparse();e.target.value=''})};
$('sv').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([code.value],{type:'text/plain'}));a.download='programma.nc';a.click();URL.revokeObjectURL(a.href)};
$('an').onclick=()=>{const L=code.value.split('\n');renumber(L);code.value=L.join('\n');reparse();con('Blocchi rinumerati di 10 in 10.','o')};
$('fx').onclick=smartFix;
$('un').onclick=()=>{if(backup==null)return;code.value=backup;backup=null;fixL=new Set();$('un').hidden=true;reparse();con('Correzione annullata: programma ripristinato.','o')};
const zoom=f=>{const w=cv.width/dpr,h=cv.height/dpr,wx=(w/2-V.ox)/V.s,wy=(V.oy-h/2)/V.s;V.s=Math.max(.3,Math.min(400,V.s*f));V.ox=w/2-wx*V.s;V.oy=h/2+wy*V.s};
$('zi').onclick=()=>zoom(1.3);$('zo').onclick=()=>zoom(1/1.3);
cv.addEventListener('mousemove',e=>{const r=cv.getBoundingClientRect(),x=(e.clientX-r.left-V.ox)/V.s-snap.ox,y=(V.oy-e.clientY+r.top)/V.s-snap.oy;$('cur').textContent=MODE=='lathe'?'Z '+x.toFixed(2)+'  X '+(y*(snap.dia===false?1:2)).toFixed(2)+' (pezzo)':'X '+x.toFixed(2)+'  Y '+y.toFixed(2)+' (pezzo)'});
const spl=$('spl'),mn=document.querySelector('main');
spl.onpointerdown=e=>{spl.setPointerCapture(e.pointerId);spl.onpointermove=ev=>{const b=mn.getBoundingClientRect();mn.style.setProperty('--ew',Math.max(300,Math.min(b.width-360,ev.clientX-b.left))+'px')}};
spl.onpointerup=()=>spl.onpointermove=null;
addEventListener('keydown',e=>{const k=e.key;
 if(k=='F5'||(e.ctrlKey&&k=='Enter')){e.preventDefault();if(!$('run').disabled)startRun(false)}
 else if(k=='F6'){e.preventDefault();run?$('pause').click():$('run').disabled||startRun(false)}
 else if(k=='F10'){e.preventDefault();if(!$('step').disabled)startRun(true)}
 else if(k=='Escape'){if($('modal').classList.contains('on'))$('cl').click();else if($('drawer').parentElement.classList.contains('dr'))openDrawer(0);else if(!$('stop').disabled)$('stop').click()}});
let saved=null;try{saved=JSON.parse(localStorage.getItem('cncsim3'))}catch(_){}
load('Spianatura base');
if(saved&&saved.code){setMode(saved.mode=='lathe'?'lathe':'mill');IDS.forEach(i=>{if(saved[i]!=null)$(i).value=saved[i]});code.value=saved.code;reparse();fit()}
requestAnimationFrame(loop);
