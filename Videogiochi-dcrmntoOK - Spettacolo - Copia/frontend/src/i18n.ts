import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Traduzioni inline per debug - sostituiremo con file esterni una volta che funziona
const resources = {
  it: {
    translation: {
      "ordineNonTrovato": "Ordine non trovato",
      "ordineCorrotto": "Ordine corrotto o senza prodotti",
      "dettaglioOrdine": "Dettaglio Ordine #{{id}}",
      "data": "Data",
      "prodottiAcquistati": "Prodotti Acquistati",
      "quantita": "Quantità",
      "totale": "Totale",
      "tornaAllaListaOrdini": "Torna alla Lista Ordini",
      "footerTesto": "Game Store - Tutti i diritti riservati",
      "prezzo": "Prezzo",
      "quantitaRimasta": "Quantità rimasta",
      "pz": "pz",
      "listaGiochi": "Lista Giochi",
      "carrello": "Carrello",
      "listaOrdini": "Lista Ordini",
      "gestioneMagazzino": "Gestione Magazzino",
      "impostazioni": "Impostazioni",
      "erroreCaricamento": "Errore nel caricamento",
      "erroreGenerico": "Errore generico",
      "caricamentoDettagli": "Caricamento dettagli...",
      "giocoNonTrovato": "Gioco non trovato",
      "confermaEliminazione": "Sei sicuro di voler eliminare \"{{gameName}}\"?",
      "eliminazioneSuccesso": "Gioco eliminato con successo!",
      "eliminazioneErrore": "Errore nell'eliminazione del gioco",
      "quantitaDisponibile": "Quantità disponibile",
      "quantitaCarrello": "Quantità nel carrello",
      "aggiungiQuantita": "Aggiungi quantità",
      "rimuoviQuantita": "Rimuovi quantità",
      "quantitaMassima": "Hai raggiunto la quantità massima disponibile",
      "vaiCarrello": "Vai al carrello",
      "eliminaGioco": "Elimina gioco",
      "tornaIndietro": "Torna indietro",
      "scegli_la_lingua": "Scegli la lingua",
      "italiano": "Italiano",
      "inglese": "Inglese",
      "errorLoadingGames": "Errore nel caricamento dei giochi",
      "loadingGames": "Caricamento giochi...",
      "availableGames": "Giochi Disponibili",
      "ordersPlaced": "Ordini Effettuati",
      "totalOrders": "Totale Ordini",
      "viewOrder": "Visualizza Ordine"
    }
  },
  en: {
    translation: {
      "ordineNonTrovato": "Order not found",
      "ordineCorrotto": "Corrupted order or no products",
      "dettaglioOrdine": "Order Details #{{id}}",
      "data": "Date",
      "prodottiAcquistati": "Purchased Products",
      "quantita": "Quantity",
      "totale": "Total",
      "tornaAllaListaOrdini": "Back to Orders List",
      "footerTesto": "Game Store - All rights reserved",
      "prezzo": "Price",
      "quantitaRimasta": "Remaining quantity",
      "pz": "pcs",
      "listaGiochi": "Games List",
      "carrello": "Cart",
      "listaOrdini": "Orders List",
      "gestioneMagazzino": "Warehouse Management",
      "impostazioni": "Settings",
      "erroreCaricamento": "Loading error",
      "erroreGenerico": "Generic error",
      "caricamentoDettagli": "Loading details...",
      "giocoNonTrovato": "Game not found",
      "confermaEliminazione": "Are you sure you want to delete \"{{gameName}}\"?",
      "eliminazioneSuccesso": "Game deleted successfully!",
      "eliminazioneErrore": "Error deleting the game",
      "quantitaDisponibile": "Available quantity",
      "quantitaCarrello": "Quantity in cart",
      "aggiungiQuantita": "Add quantity",
      "rimuoviQuantita": "Remove quantity",
      "quantitaMassima": "You have reached the maximum available quantity",
      "vaiCarrello": "Go to cart",
      "eliminaGioco": "Delete game",
      "tornaIndietro": "Go back",
      "scegli_la_lingua": "Choose language",
      "italiano": "Italian",
      "inglese": "English",
      "errorLoadingGames": "Error loading games",
      "loadingGames": "Loading games...",
      "availableGames": "Available Games",
      "ordersPlaced": "Orders Placed",
      "totalOrders": "Total Orders",
      "viewOrder": "View Order"
    }
  }
};

// Ottieni la lingua salvata o usa 'it' come default
const savedLanguage = localStorage.getItem('i18nextLng') || 'it';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: "it",
    
    interpolation: {
      escapeValue: false,
    },
    
    react: {
      useSuspense: false,
    },
    
    debug: true,
  });

// Salva automaticamente la lingua quando cambia
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
  console.log('Lingua cambiata e salvata:', lng);
});

export default i18n;