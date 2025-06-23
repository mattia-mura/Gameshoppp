import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Gioco from '../components/gioco';
import '../css/giochi.css';

type GiocoType = {
  id: string;
  name: string;
  imgUrl: string;
  price: number;
  qnt: number;
};

function ListaGiochi() {
  const { t } = useTranslation();

  const [giochi, setGiochi] = useState<GiocoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:4321/videogiochi")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore nel caricamento giochi");
        }
        return res.json();
      })
      .then((data) => {
        setGiochi(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore:", err);
        setErrore(t("errorLoadingGames"));
        setLoading(false);
      });
  }, [t]);

  if (loading) {
    return <div className="titoloGiochi"><h2>{t("loadingGames")}</h2></div>;
  }

  if (errore) {
    return <div className="titoloGiochi"><h2>{errore}</h2></div>;
  }

  return (
    <>
      <div className='titoloGiochi'>
        <h1>{t("availableGames")}</h1>
      </div>
      <div className="containerGiochi">
        {giochi.map((g) => (
          <Gioco
            key={g.id}
            id={g.id}
            titolo={g.name}
            prezzo={g.price}
            immagine={g.imgUrl}
            quantita={g.qnt}
          />
        ))}
      </div>
    </>
  );
}

export default ListaGiochi;
