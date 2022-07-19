import React, { useEffect } from "react";

function ImagePopup({ openPopupZoomCard, closePopup }) {
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