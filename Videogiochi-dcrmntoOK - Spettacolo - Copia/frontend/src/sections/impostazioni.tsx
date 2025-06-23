import React from "react";
import { useTranslation } from "react-i18next";

const Impostazioni: React.FC = () => {
  const { t, i18n } = useTranslation();

  const cambiaLingua = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nuovaLingua = e.target.value;
    console.log('Cambio lingua a:', nuovaLingua);
    i18n.changeLanguage(nuovaLingua);
  };

  console.log('Lingua attuale:', i18n.language);
  console.log('Test traduzione navbar:', t('listaGiochi'));

  return (
    <div>
      <div className="titolo">
        <h2>{t('scegli_la_lingua')}</h2>
      </div>
      <div className="select">
        <center>
        <select
          value={i18n.language}
          onChange={cambiaLingua}
        >
          <option value="it">{t('italiano')}</option>
          <option value="en">{t('inglese')}</option>
        </select>
        </center>
      </div>
      
      {/* Test traduzioni */}
      <div className="testo">
        <center><p>Lingua attuale: {i18n.language}</p></center>
        {/* <p>Navbar test: {t('listaGiochi')}</p>
        <p>Footer test: {t('footerTesto')}</p> */}
      </div>
    </div>
  );
};

export default Impostazioni;