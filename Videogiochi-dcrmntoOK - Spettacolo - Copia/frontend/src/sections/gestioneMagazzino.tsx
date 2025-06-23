import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../slices/store';
import {
  getVideogiochi,
  addVideogioco,
  deleteVideogiocoAndRemoveFromCart,
  updateVideogioco,
  Videogioco,
  NuovoVideogioco
} from '../slices/funzioniAPI';
import '../css/gestioneMagazzino.css';

const GestioneMagazzino: React.FC = () => {
  const [videogiochi, setVideogiochi] = useState<Videogioco[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<NuovoVideogioco>({
    name: '',
    qnt: 0,
    price: 0,
    imgUrl: ''
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    loadVideogiochi();
  }, []);

  const loadVideogiochi = async () => {
    setLoading(true);
    try {
      const data = await getVideogiochi();
      setVideogiochi(data);
    } catch (error) {
      alert('Errore nel caricamento dei videogiochi');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addVideogioco(formData);
      alert('Videogioco aggiunto con successo!');
      setFormData({ name: '', qnt: 0, price: 0, imgUrl: '' });
      setShowForm(false);
      loadVideogiochi();
    } catch (error) {
      alert("Errore nell'aggiunta del videogioco");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Sei sicuro di voler eliminare "${name}"? Verrà rimosso anche dal carrello se presente.`)) {
      setLoading(true);
      try {
        await deleteVideogiocoAndRemoveFromCart(id, dispatch);
        alert('Videogioco eliminato con successo!');
        loadVideogiochi();
      } catch (error) {
        alert("Errore nell'eliminazione del videogioco");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'qnt' || name === 'price' ? Number(value) : value
    }));
  };

  const handleQuantityChange = async (id: string, currentQnt: number, delta: number) => {
    const newQnt = currentQnt + delta;
    if (newQnt < 0) return;

    setLoading(true);
    try {
      await updateVideogioco(id, { qnt: newQnt });
      loadVideogiochi();
    } catch (error) {
      alert("Errore nell'aggiornamento quantità");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gestione-videogiochi">
      <h1>Gestione Videogiochi</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="btn-aggiungi"
        disabled={loading}
      >
        {showForm ? 'Annulla' : 'Aggiungi Videogioco'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-aggiungi">
          <h2>Nuovo Videogioco</h2>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Quantità:</label>
            <input
              type="number"
              name="qnt"
              value={formData.qnt}
              onChange={handleInputChange}
              min="0"
              required
            />
          </div>
          <div>
            <label>Prezzo (€):</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div>
            <label>URL Immagine:</label>
            <input
              type="url"
              name="imgUrl"
              value={formData.imgUrl}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Aggiungendo...' : 'Aggiungi'}
          </button>
        </form>
      )}

      {loading && <p>Caricamento...</p>}

      <div className="lista-videogiochi">
        {videogiochi.length === 0 ? (
          <h2>Nessun videogioco trovato</h2>
        ) : (
          <div className="videogiochi-grid">
            {videogiochi.map(gioco => (
              <div key={gioco.id} className="videogioco-card">
                <img src={gioco.imgUrl} alt={gioco.name} />
                <h3>{gioco.name}</h3>
                <p>Quantità attuale:</p>
                <div className="qnt-controls">
                  <p style={{color: 'black'}}>
                    <span>
                      <button onClick={() => handleQuantityChange(gioco.id, gioco.qnt, -1)} disabled={loading}>-</button>
                    </span>
                      {gioco.qnt}
                    <span>
                      <button onClick={() => handleQuantityChange(gioco.id, gioco.qnt, 1)} disabled={loading}>+</button>
                    </span>
                  </p>
                </div>
                <p>Prezzo: {gioco.price}€</p>
                <button
                  onClick={() => handleDelete(gioco.id, gioco.name)}
                  className="btn-elimina"
                  disabled={loading}
                >
                  Elimina
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GestioneMagazzino;
