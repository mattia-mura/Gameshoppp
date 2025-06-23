import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import ordiniReducer from './ordiniSlice';
import videogiochiReducer from './videogiochiSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    ordini: ordiniReducer,
    videogiochi: videogiochiReducer,
  },
  // redux toolkit abilita thunk di default, quindi a meno che tu non l'abbia rimosso, dovrebbe andar bene
  // ma se usi store.createStore manualmente devi aggiungerlo
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
