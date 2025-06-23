import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import ListaGiochi from './sections/listaGiochi';
import Impostazioni from './sections/Impostazioni';
import Carrello from './sections/Carrello';
import ListaOrdini from './sections/listaOrdini';
import GestioneMagazzino from './sections/gestioneMagazzino';
import PaginaDettaglio from './components/paginaDettaglio';
import DettaglioOrdine from './components/dettaglioOrdine';
import store from "./slices/store";
import { Provider } from "react-redux";
import './index.css';

// Importa i18n per inizializzazione
import './i18n';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ListaGiochi /> },
      { path: "carrello", element: <Carrello /> },
      { path: "listaOrdini", element: <ListaOrdini /> },
      { path: "impostazioni", element: <Impostazioni /> },
      { path: "gestioneMagazzino", element: <GestioneMagazzino /> },
      { path: "videogioco/:id", element: <PaginaDettaglio /> },
      { path: "dettaglio-ordine/:id", element: <DettaglioOrdine /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
