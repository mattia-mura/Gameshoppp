import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type GiocoProps = {
  id: string;
  titolo: string;
  prezzo: number;
  immagine: string;
  quantita: number;
};

function Gioco({ id, titolo, prezzo, immagine, quantita }: GiocoProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`videogioco/${id}`);
  };

  return (
    <div className="giocoCard" onClick={handleClick}>
      <img src={immagine} alt={titolo} />
      <h2>{titolo}</h2>
      <p>{t("prezzo")}: {prezzo}€</p>
      <p>{t("quantitaRimasta")}: {quantita} {t("pz")}</p>
    </div>
  );
}

export default Gioco;
