import { useTranslation } from "react-i18next";
import React from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="navbar" style={{ display: "flex", alignItems: "center", gap: "2rem", padding: "1rem", background: "#eee" }}>
      <img src={logo} alt="Logo" style={{ height: "40px" }} />
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none", margin: 0, padding: 0 }}>
        <li><Link to="/">{t("listaGiochi")}</Link></li>
        <li><Link to="/carrello">{t("carrello")}</Link></li>
        <li><Link to="/listaOrdini">{t("listaOrdini")}</Link></li>
        <li><Link to="/gestioneMagazzino">{t("gestioneMagazzino")}</Link></li>
        <li><Link to="/impostazioni">{t("impostazioni")}</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
