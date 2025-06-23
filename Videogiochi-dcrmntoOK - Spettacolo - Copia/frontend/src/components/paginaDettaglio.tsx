import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/paginaDettaglio.css';
import freccetta from '../assets/arrow_back.png';
import carrello from '../assets/shopping_cart.png';
import cestino from '../assets/delete.png';
import piu from '../assets/add.png';
import meno from '../assets/remove.png';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../slices/store';
import { addToCart, incrementQuantity, decrementQuantity } from '../slices/cartSlice';
import { deleteVideogiocoAndRemoveFromCart } from '../slices/funzioniAPI';






const PaginaDettaglio: React.FC = () => {

  const { t } = useTranslation();

  const { id } = useParams();

  const [gioco, setGioco] = useState<GiocoType | null>(null);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();



  const cartItem = useSelector((state: RootState) =>

    state.cart.items.find(item => item.id === id)

  );



  useEffect(() => {

    const fetchGioco = async () => {

      try {

        const res = await fetch("http://localhost:4321/videogiochi");

        if (!res.ok) {

          throw new Error(t("erroreCaricamento"));

        }

        const data: GiocoType[] = await res.json();

        const giocoSelezionato = data.find((g) => g.id === id);

        setGioco(giocoSelezionato || null);

      } catch (err) {

        console.error(t("erroreGenerico"), err);

        setGioco(null);

      } finally {

        setLoading(false);

      }

    };



    fetchGioco();

  }, [id, t]);



  if (loading) {

    return <div className="sfondoDettaglio">{t("caricamentoDettagli")}</div>;

  }



  if (!gioco) {

    return <div className="sfondoDettaglio">{t("giocoNonTrovato")}</div>;

  }



  const handleDeleteFromDetail = async (gameId: string, gameName: string) => {

    if (window.confirm(t("confermaEliminazione", { gameName }))) {

      try {

        await deleteVideogiocoAndRemoveFromCart(gameId, dispatch);

        alert(t("eliminazioneSuccesso"));

        navigate(-1);

      } catch (error) {

        alert(t("eliminazioneErrore"));

      }

    }

  };



  const handleAggiungi = () => {

    if (!cartItem) {

      dispatch(addToCart({

        id: gioco.id,

        nome: gioco.name,

        prezzo: gioco.price,

        imgUrl: gioco.imgUrl,

        quantity: 1,

        qntMax: gioco.qnt,

      }));

    } else {

      if (cartItem.quantity < cartItem.qntMax) {

        dispatch(incrementQuantity(gioco.id));

      }

    }

  };



  const handleRimuovi = () => {

    if (cartItem && cartItem.quantity > 0) {

      dispatch(decrementQuantity(gioco.id));

    }

  };



  const quantity = cartItem ? cartItem.quantity : 0;



  return (

    <div className="sfondoDettaglio">

      <div className="containerDettaglio">

        <div className='freccetta' onClick={() => navigate(-1)}>

          <img src={freccetta} alt={t("tornaIndietro")} />

        </div>



        <div className="img">

          <img src={gioco.imgUrl} alt={gioco.name} />

        </div>



        <div className='miniContainer'>

          <div className='titulo'>

            <h1>{gioco.name}</h1>

          </div>

          <div className="dati">

            <p>{t("prezzo")}: {gioco.price}€</p>

            <p>{t("quantitaDisponibile")}: {gioco.qnt} pz.</p>

            <p>Id: {gioco.id}</p>

          </div>

          <div className='qntCarrello'>

            <div className='tit'>

              <h3>{t("quantitaCarrello")}:</h3>

            </div>

            <div 

              className={`piu ${quantity >= gioco.qnt ? 'disabled' : ''}`} 

              onClick={handleAggiungi}

              style={{ 

                opacity: quantity >= gioco.qnt ? 0.5 : 1,

                cursor: quantity >= gioco.qnt ? 'not-allowed' : 'pointer'

              }}

            >

              <center><img src={piu} alt={t("aggiungiQuantita")} /></center>

            </div>

            <div className='counter'>

              <center><h3>{quantity}</h3></center>

            </div>

            <div className="meno" onClick={handleRimuovi}>

              <center><img src={meno} alt={t("rimuoviQuantita")} /></center>

            </div>

            {quantity >= gioco.qnt && (

              <div className="avviso-limite">

                <p>⚠️ {t("quantitaMassima")}</p>

              </div>

            )}

          </div>

        </div>



        <div className='carrello' onClick={() => navigate("/carrello")}>

          <img src={carrello} alt={t("vaiCarrello")} />

        </div>



        <div className='cestino' onClick={() => handleDeleteFromDetail(gioco.id, gioco.name)}>

          <img src={cestino} alt={t("eliminaGioco")} />

        </div>



      </div>

    </div>

  );

};



export default PaginaDettaglio;