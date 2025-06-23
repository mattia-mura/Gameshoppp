import { useTranslation } from "react-i18next";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../slices/store";
import { clearOrdini } from "../slices/ordiniSlice";
import "../css/dettaglioOrdine.css";

const DettaglioOrdine: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ordine = useSelector((state: RootState) =>
    state.ordini.ordini.find((o) => o.id.toString() === id)
  );

  if (!ordine) {
    return <p>{t("ordineNonTrovato")}</p>;
  }

  if (!ordine.prodotti || !ordine.prodotti.length) {
    alert(t("ordineCorrotto"));
    dispatch(clearOrdini());
    navigate("/listaOrdini");
    return null;
  }

  return (
    <div className="box1">
      <div className="box2">
        <h2>{t("dettaglioOrdine", { id: ordine.id })}</h2>
        <p>{t("data")}: {ordine.dataOrdine}</p>
        <h3>{t("prodottiAcquistati")}</h3>
        <ul>
          {ordine.prodotti.map((prodotto) => (
            <li key={prodotto.id}>
              {prodotto.name} - {t("quantita")}: {prodotto.quantity} - €{(prodotto.price * prodotto.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <h3>{t("totale")}: €{ordine.totale.toFixed(2)}</h3>
      </div>
      <Link to="/listaOrdini">{t("tornaAllaListaOrdini")}</Link>
    </div>
  );
};

export default DettaglioOrdine;
