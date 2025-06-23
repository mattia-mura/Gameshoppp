import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../slices/store';
import { updateCartQuantities } from "../slices/cartSlice"; // esempio di action normale

export const useCartSync = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    if (cartItems.length === 0) return;

    const syncWithServer = async () => {
      try {
        const response = await fetch('http://localhost:4321/videogiochi');
        const videogiochi = await response.json();
        
        const availabilityData = videogiochi.map((game: any) => ({
          id: game.id,
          availableQuantity: game.qnt
        }));
        
        dispatch(updateCartQuantities(availabilityData)); // azione normale
      } catch (error) {
        console.error('Errore sincronizzazione carrello:', error);
      }
    };

    syncWithServer();

    const interval = setInterval(syncWithServer, 30 * 1000);
    return () => clearInterval(interval);
  }, [cartItems.length, dispatch]);

  // Funzione per sincronizzazione manuale
  const syncManually = async () => {
    try {
      const response = await fetch('http://localhost:4321/videogiochi');
      const videogiochi = await response.json();
      
      const availabilityData = videogiochi.map((game: any) => ({
        id: game.id,
        availableQuantity: game.qnt
      }));
      
      dispatch(updateCartQuantities(availabilityData));
      return true;
    } catch (error) {
      console.error('Errore sincronizzazione manuale:', error);
      return false;
    }
  };

  return { syncManually };
};
