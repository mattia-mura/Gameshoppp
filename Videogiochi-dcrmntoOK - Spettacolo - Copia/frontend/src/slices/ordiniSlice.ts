import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Prodotto {
  id: number;
  name: string;
  price: number;
  quantity: number;
  qntmax: number;
}

interface Ordine {
  id: number;
  dataOrdine: string;
  prodotti: Prodotto[];
  totale: number;
}

interface OrdiniState {
  ordini: Ordine[];
  loading: boolean;
  error?: string;
}

const initialState: OrdiniState = {
  ordini: [],
  loading: false,
  error: undefined,
};

export const aggiungiOrdine = createAsyncThunk(
  'ordini/aggiungiOrdine',
  async (ordine: Ordine) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return ordine;
  }
);

const ordiniSlice = createSlice({
  name: 'ordini',
  initialState,
  reducers: {
    clearOrdini(state) {
      state.ordini = [];
      state.error = undefined;
      state.loading = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(aggiungiOrdine.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(aggiungiOrdine.fulfilled, (state, action: PayloadAction<Ordine>) => {
        state.ordini.push(action.payload);
        state.loading = false;
      })
      .addCase(aggiungiOrdine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearOrdini } = ordiniSlice.actions;
export default ordiniSlice.reducer;
