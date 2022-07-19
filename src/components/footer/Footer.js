import React from "react";

function Footer() {
  return (
    <div className="footer">
      <p className="footer__copyright">© {new Date().toLocaleDateString()} Первушин Сергей</p>
    </div>
  )
}
export default Footer;