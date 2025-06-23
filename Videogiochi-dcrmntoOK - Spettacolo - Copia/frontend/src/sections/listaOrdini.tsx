import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { aggiungiOrdine, clearOrdini } from '../slices/ordiniSlice';
import { decrementaQuantita } from '../slices/videogiochiSlice';
import { RootState } from '../slices/store';
import { Link } from 'react-router-dom';
import '../css/listaOrdini.css';

const ListaOrdini: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const giochi = useSelector((state: RootState) => state.videogiochi.videogiochi);
  const ordini = useSelector((state: RootState) => state.ordini.ordini);

  const [quantitaMap, setQuantitaMap] = useState<Record<number, number>>({});

  const totaleOrdini = ordini.reduce((acc, o) => acc + o.totale, 0);

  return (
    <div className='sfondOrdini'>
      <div className='titolo'>
        <h1>{t('ordersPlaced')}</h1>
      </div>

      <div className='ordini'>
        <div className='testo'>
          <ul>
            {ordini.map((o) => (
              <div className='articolo' key={o.id}>
                <li>
                  <span>
                    {o.dataOrdine} – {t('totalOrders').toLowerCase()} {o.totale.toFixed(2)} €
                  </span>
                  <Link to={`/dettaglio-Ordine/${o.id}`}>
                    {t('viewOrder')}
                  </Link>
                </li>
              </div>
            ))}
          </ul>
        </div>

        <div className='recap'>
          <p>{t('totalOrders')}</p>
          <strong>{totaleOrdini.toFixed(2)} €</strong>
        </div>
      </div>
    </div>
  );
};

export default ListaOrdini;
