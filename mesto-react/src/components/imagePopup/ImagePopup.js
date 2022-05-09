import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_viewing ${card && "popup_open"}`} >
      <div className="popup__photo">
        <button className="popup__closed popup__closed_img" type="button" onClick={onClose}></button>
        <img className="popup__image" src={card && card.link} alt={card && card.name} />
        <p className="popup__caption">{card && card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;