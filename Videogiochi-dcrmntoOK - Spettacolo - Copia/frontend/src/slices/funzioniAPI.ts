// funzioniAPI.ts
const API_BASE_URL = 'http://localhost:4321';

export interface Videogioco {
  id: string;
  name: string;
  qnt: number;
  price: number;
  imgUrl: string;
}

export interface NuovoVideogioco {
  name: string;
  qnt: number;
  price: number;
  imgUrl: string;
}

// Funzione per ottenere tutti i videogiochi
export const getVideogiochi = async (): Promise<Videogioco[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/videogiochi`);
    if (!response.ok) {
      throw new Error('Errore nel recupero dei videogiochi');
    }
    return await response.json();
  } catch (error) {
    console.error('Errore:', error);
    throw error;
  }
};

import { AppDispatch } from "./store";
import { clearCart } from "./cartSlice";

export const syncCartWithServer = async (dispatch: AppDispatch) => {
  try {
    const res = await fetch("http://localhost:4321/cart", { method: "GET" });
    const data = await res.json();
    // esempio di log o azione sul carrello
    console.log("Carrello sincronizzato:", data);
  } catch (err) {
    console.error("Errore nella sync del carrello", err);
  }
};

// Funzione per aggiungere un videogioco
export const addVideogioco = async (videogioco: NuovoVideogioco): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/videogiochi`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(videogioco),
    });
    
    if (!response.ok) {
      throw new Error('Errore nell\'aggiunta del videogioco');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Errore:', error);
    throw error;
  }
};

// Funzione per eliminare un videogioco
export const deleteVideogioco = async (id: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/videogiochi/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Errore nell\'eliminazione del videogioco');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Errore:', error);
    throw error;
  }
};

// Funzione per eliminare un videogioco e rimuoverlo anche dal carrello
export const deleteVideogiocoAndRemoveFromCart = async (
  id: string, 
  dispatch: any
): Promise<any> => {
  try {
    // Prima elimina dal database
    const result = await deleteVideogioco(id);
    
    // Poi rimuovi dal carrello Redux
    const cartSlice = await import('./cartSlice');
    dispatch(cartSlice.removeFromCart(id));
    
    return result;
  } catch (error) {
    console.error('Errore:', error);
    throw error;
  }
};

// Funzione per aggiornare un videogioco
export const updateVideogioco = async (id: string, update: Partial<NuovoVideogioco>): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/videogiochi/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    });
    
    if (!response.ok) {
      throw new Error('Errore nell\'aggiornamento del videogioco');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Errore:', error);
    throw error;
  }
};