import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Videogioco {
  qnt: number;
  id: string;
  nome: string;
  prezzo: number;
  qntMax: number;
  quantity: number;
  imgUrl?: string;
}

interface VideogiochiState {
  videogiochi: Videogioco[];
  isLoading: boolean;
}

const initialState: VideogiochiState = {
  videogiochi: [],
  isLoading: false,
};

export const fetchVideogiochi = createAsyncThunk(
  "videogiochi/fetchVideogiochi",
  async () => {
    const res = await fetch("http://localhost:4321/videogiochi");
    if (!res.ok) throw new Error("Errore fetch videogiochi");
    return (await res.json()) as Videogioco[];
  }
);

export const changeQuantitaServer = createAsyncThunk(
  "videogiochi/changeQuantitaServer",
  async ({ id, nuovaQuantita }: { id: string; nuovaQuantita: number }) => {
    const res = await fetch(`http://localhost:4321/videogiochi/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qnt: nuovaQuantita }),
    });
    if (!res.ok) throw new Error("Errore update quantità");
    return await res.json();
  }
);

const videogiochiSlice = createSlice({
  name: "videogiochi",
  initialState,
  reducers: {
    decrementaQuantita: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      console.log("Videogiochi disponibili:", JSON.parse(JSON.stringify(state.videogiochi)));
      console.log("Richiesta decremento per id:", action.payload.id);

      const gioco = state.videogiochi.find((g) => g.id === action.payload.id);
      console.log("Gioco trovato:", gioco);

      if (gioco) {
        const nuovaQnt = Math.max(gioco.qntMax - action.payload.quantity, 0);
        console.log(
          `Decremento ${action.payload.quantity} da ${gioco.nome} (prima: ${gioco.qntMax}, dopo: ${nuovaQnt})`
        );
        gioco.qntMax = nuovaQnt;
      } else {
        console.warn(`Gioco con id ${action.payload.id} non trovato`);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideogiochi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVideogiochi.fulfilled, (state, action) => {
        state.videogiochi = action.payload.map((v) => ({
          id: v.id,
          nome: v.nome ?? v.name ?? "Senza nome",
          prezzo: v.prezzo ?? v.price ?? 0,
          imgUrl: v.imgUrl,
          qntMax: v.qnt,
          quantity: 0,
          qnt: v.qnt,
        }));
        state.isLoading = false;
        console.log("Videogiochi caricati:", state.videogiochi);
      })
      .addCase(fetchVideogiochi.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(changeQuantitaServer.fulfilled, (state, action) => {
        const { id, qnt } = action.payload.gioco;
        const gioco = state.videogiochi.find((g) => g.id === id);
        if (gioco) {
          gioco.qntMax = qnt;
          console.log(`Quantità aggiornata da server per ${gioco.nome}: ${qnt}`);
        }
      });
  },
});

export const { decrementaQuantita } = videogiochiSlice.actions;
export default videogiochiSlice.reducer;
