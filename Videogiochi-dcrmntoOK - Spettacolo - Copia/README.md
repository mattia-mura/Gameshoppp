# Esercizio: Simulazione di Negozio di Videogiochi

## Obiettivo

Creare un sito web con **React** e **TypeScript** per simulare la gestione di un negozio di videogiochi.

## Menu e Pagine

Il sito deve includere un menu di navigazione (laterale o in alto) con le seguenti sezioni:

1. **Lista Videogiochi**
2. **Carrello**
3. **Lista Ordini**
4. **Gestione Magazzino**
5. **Impostazioni**

### 1. Lista Videogiochi

- Mostra l'elenco dei videogiochi disponibili, con le seguenti informazioni:
  - Nome del videogioco
  - Quantità disponibile
  - Prezzo
  - Immagine
- Permetti agli utenti di aggiungere uno o più videogiochi al carrello.

#### Pagina Dettaglio Videogioco

- Visualizza i dettagli di un singolo videogioco, includendo tutte le informazioni sopra menzionate.

### 2. Carrello

- Visualizza gli elementi aggiunti al carrello.
- Mostra il costo totale degli articoli nel carrello.
- Permetti agli utenti di confermare l'ordine:
  - La conferma dell'ordine riduce la quantità disponibile del videogioco nel magazzino.

### 3. Lista Ordini

- Mostra la lista degli ordini effettuati, includendo solo la data dell'ordine.
- Permetti di accedere alla pagina di dettaglio di ogni ordine.

#### Pagina Dettaglio Ordine

- Mostra le informazioni dettagliate dell'ordine:
  - Elenco dei videogiochi acquistati e le rispettive quantità.
  - Costo totale dell'ordine.

### 4. Gestione Magazzino

- Visualizza i videogiochi presenti in magazzino e le loro quantità.
- Permetti di:
  - Modificare le quantità di un videogioco.
  - Aggiungere un nuovo videogioco.
  - Eliminare un videogioco.

> **Nota:** Essendo un esercizio di test, non gestire le conseguenze dell'eliminazione di un videogioco.
> Se un videogioco eliminato era presente nei dettagli di un ordine, mostra "Videogioco non più disponibile" e non visualizzare il prezzo.

### 5. Impostazioni

- Include una selezione per cambiare la lingua del sito.

## Entità del Database

Non è previsto un vero database. L'esercizio simula un database SQL tramite liste gestite dal server API.

### 1. Videogiochi

- Lista di videogiochi, con le seguenti proprietà:
  - `id`: Identificatore del videogioco
  - `name`: Nome del videogioco
  - `qnt`: Quantità disponibile
  - `price`: Prezzo del videogioco
  - `imgUrl`: Url immagine videogioco

### 2. Ordini

- Lista di ordini, con le seguenti proprietà:
  - `id`: Identificatore dell'ordine
  - `date`: Data dell'ordine (ISO string)

### 3. OrdiniVideogiochi

- Lista di correlazioni tra ordini e videogiochi (relazione molti-a-molti), con le seguenti proprietà:
  - `id`: Identificatore della correlazione
  - `idVideogioco`: Identificatore del videogioco
  - `idOrdine`: Identificatore dell'ordine
  - `qnt`: Quantità acquistata

## API

Per esplorare le API disponibili:

1. Importa il file `./Postman.json` su Postman.
2. Troverai esempi di utilizzo per tutte le API disponibili nell'esercizio.

## Requisiti Tecnici

- **React Routing**: Utilizza React Routing per la gestione delle pagine. Cerca come implementare la pagina di dettaglio.
- **Lingue**: Utilizza **i18n** per la gestione delle lingue del sito.
- **Custom Hook**: Crea Custom Hook dedicati per gestire le chiamate API (un Hook per ogni API).
- **Redux**: Utilizza **React Redux** per la gestione dello stato dei dati ricevuti. Riduci al minimo le chiamate API:
  - Aggiorna lo store Redux dopo le chiamate `POST`, `PATCH` o `DELETE` senza effettuare una nuova chiamata `GET`, se possibile.
- **Server API**: Esegui il comando `node .\server.js` per avviare il server node.
