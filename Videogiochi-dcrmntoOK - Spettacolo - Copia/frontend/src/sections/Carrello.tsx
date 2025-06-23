import i18n from "i18next";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../slices/store';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from '../slices/cartSlice';
import { aggiungiOrdine } from '../slices/ordiniSlice';
import {
  decrementaQuantita,
  changeQuantitaServer,
} from '../slices/videogiochiSlice';
import { useNavigate } from 'react-router-dom';
import freccetta from '../assets/arrow_back.png';
import piu from '../assets/add.png';
import meno from '../assets/remove.png';
import cestino from '../assets/delete.png';
import '../css/carrello.css';

const Carrello: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [loadingQty, setLoadingQty] = useState<string | null>(null);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { videogiochi, isLoading } = useSelector(
    (state: RootState) => state.videogiochi
  );
  const ordiniLoading = useSelector((state: RootState) => state.ordini.loading);

  useEffect(() => {
    cartItems.forEach(item => {
      const game = videogiochi.find(g => g.id === item.id);
      if (!game) {
        alert(t("cart.alertNotAvailable", { name: item.nome }));
        dispatch(removeFromCart(item.id));
      } else if (game.qntMax === 0) {
        alert(t("cart.alertOutOfStock", { name: item.nome }));
        dispatch(removeFromCart(item.id));
      } else if (item.quantity > game.qntMax) {
        alert(t("cart.alertReducedStock", { name: item.nome, stock: game.qntMax }));
        while (item.quantity > game.qntMax) {
          dispatch(decrementQuantity(item.id));
        }
      }
    });
  }, [videogiochi, cartItems, dispatch, t]);

  const totale = cartItems.reduce(
    (sum, item) => sum + item.prezzo * item.quantity,
    0
  );

  const handleChangeQty = async (
    id: string,
    delta: number,
    isIncrement: boolean
  ) => {
    const gioco = videogiochi.find((g) => g.id === id);
    if (!gioco) return;
    const newQnt = gioco.qntMax - delta;
    if (newQnt < 0) return;

    setLoadingQty(id);
    dispatch(decrementaQuantita({ id, quantity: delta }));

    try {
      await dispatch(changeQuantitaServer({ id, nuovaQuantita: newQnt })).unwrap();
    } catch (err) {
      console.error(t("cart.errorUpdateQty"), err);
    }

    if (isIncrement) {
      dispatch(incrementQuantity(id));
    } else {
      dispatch(decrementQuantity(id));
    }

    setLoadingQty(null);
  };

  const handleCreateOrder = async () => {
    if (totale === 0) {
      alert(t("cart.emptyCart"));
      return;
    }
    if (videogiochi.length === 0) {
      alert(t("cart.gamesNotLoaded"));
      return;
    }

    setIsProcessingOrder(true);

    try {
      const orderItems = cartItems.map((item) => ({
        id: Number(item.id),
        name: item.nome,
        price: item.prezzo,
        quantity: item.quantity,
        qntmax: item.qntMax,
      }));

      await dispatch(
        aggiungiOrdine({
          id: Date.now(),
          dataOrdine: new Date().toLocaleString(),
          prodotti: orderItems,
          totale,
        })
      ).unwrap();

      for (const item of cartItems) {
        const game = videogiochi.find((g) => g.id === item.id);
        if (game) {
          const newQnt = Math.max(game.qntMax - item.quantity, 0);
          dispatch(decrementaQuantita({ id: item.id, quantity: item.quantity }));
          await dispatch(
            changeQuantitaServer({ id: item.id, nuovaQuantita: newQnt })
          ).unwrap();
        }
      }

      alert(t("cart.orderCreated"));
      dispatch(clearCart());
    } catch (error) {
      console.error(t("cart.errorCreateOrder"), error);
      alert(t("cart.errorOrder"));
    } finally {
      setIsProcessingOrder(false);
    }
  };

  return (
    <div className="carrelloPage">
      <div className="carrelloTitolo">
        <h1>{t("cart.title")}</h1>
      </div>
      <div className="sfondoCarrello">
        <div className="freccetta" onClick={() => navigate(-1)}>
          <img src={freccetta} alt="Indietro" />
        </div>

        {cartItems.length === 0 ? (
          <div className="carrelloVuoto">
            <p>{t("cart.emptyCartText")}</p>
            <button
              onClick={() => navigate('/')}
              className="vai-shopping-btn"
            >
              {t("cart.goShopping")}
            </button>
          </div>
        ) : (
          <div className="cardContainer">
            {cartItems.map((item) => {
              const game = videogiochi.find(g => g.id === item.id);
              const available = game ? game.qntMax : 0;
              return (
                <div key={item.id} className="carrelloCard">
                  <img src={item.imgUrl} alt={item.nome} />
                  <h3>{item.nome}</h3>
                  <p>{t("cart.price")}: {item.prezzo}€</p>
                  <p>{t("cart.available")}: {available}</p>
                  <div className="quantitaControls">
                    <button
                      disabled={loadingQty === item.id || item.quantity <= 0}
                      onClick={() => handleChangeQty(item.id, 1, false)}
                    >
                      <img src={meno} alt="meno" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      disabled={
                        loadingQty === item.id ||
                        item.quantity >= available
                      }
                      onClick={() => handleChangeQty(item.id, 1, true)}
                    >
                      <img src={piu} alt="più" />
                    </button>
                  </div>
                  <div className="rimuoviBtn">
                    <button onClick={() => dispatch(removeFromCart(item.id))}>
                      <img src={cestino} alt="cancella" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="totale">
        <h2>{t("cart.total")}: {totale.toFixed(2)}€</h2>
        <button
          disabled={
            totale === 0 ||
            isProcessingOrder ||
            isLoading ||
            ordiniLoading ||
            videogiochi.length === 0
          }
          onClick={handleCreateOrder}
        >
          {isProcessingOrder
            ? t("cart.creatingOrder")
            : isLoading
            ? t("cart.loadingGames")
            : t("cart.createOrder")}
        </button>
        {cartItems.length > 0 && (
          <button onClick={() => navigate('/listaOrdini')}>
            📋 {t("cart.viewOrders")}
          </button>
        )}
      </div>
    </div>
  );
};

export default Carrello;
