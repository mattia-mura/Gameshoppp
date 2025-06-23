import { useTranslation } from "react-i18next";
import "../css/Footer.css";
import React from "react";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer style={{ textAlign: "center", padding: "1rem", background: "#eee", marginTop: "2rem" }}>
      <p>© 2025 {t("footerTesto")}</p>
    </footer>
  );
}

export default Footer;
