import React, { useEffect } from "react";

function ImagePopup({ card, closePopup }) {
  useEffect(() => {
    if (!card) return;

    function handlEsc(e) {
      if (e.key === "Escape") {
        closePopup();
      }
    }
    document.addEventListener("keydown", handlEsc);
    return () => document.removeEventListener("keydown", handlEsc)
  }, [card]);

  useEffect(() => {
    if (!card) return;

    function handleOverley(e) {
      if (e.target.classList.contains('popup_open') || e.target.classList.contains('popup__closed')) {
        closePopup();
      }
    }
    document.addEventListener("click", handleOverley);
    return () => document.removeEventListener("click", handleOverley)
  }, [card]);

  return (
    <div className={`popup popup_viewing ${card && "popup_open"}`} >
      <div className="popup__photo">
        <button className="popup__closed popup__closed_img" type="button" onClick={closePopup}></button>
        <img className="popup__image" src={card && card.link} alt={card && card.name} />
        <p className="popup__caption">{card && card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;