import React, { useEffect } from "react";

function ImagePopup({ openPopupZoomCard, closePopup }) {
  useEffect(() => {
    if (!openPopupZoomCard) return;

    function handlEsc(e) {
      if (e.key === "Escape") {
        closePopup();
      }
    }
    document.addEventListener("keydown", handlEsc);
    return () => document.removeEventListener("keydown", handlEsc)
  }, [openPopupZoomCard]);

  useEffect(() => {
    if (!openPopupZoomCard) return;

    function handleOverley(e) {
      if (e.target.classList.contains('popup_open') || e.target.classList.contains('popup__closed')) {
        closePopup();
      }
    }
    document.addEventListener("click", handleOverley);
    return () => document.removeEventListener("click", handleOverley)
  }, [openPopupZoomCard]);

  return (
    <div className={`popup popup_viewing ${openPopupZoomCard && "popup_open"}`} >
      <div className="popup__photo">
        <button className="popup__closed popup__closed_img" type="button" onClick={closePopup}></button>
        <img className="popup__image" src={openPopupZoomCard && openPopupZoomCard.link} alt={openPopupZoomCard && openPopupZoomCard.name} />
        <p className="popup__caption">{openPopupZoomCard && openPopupZoomCard.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;