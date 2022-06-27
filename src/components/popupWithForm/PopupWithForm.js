import React, { useEffect } from "react";

function PopupWithForm({ name, openPopup, closePopup, title, buttonText, children }) {
  return (
    <div className={`popup popup_${name} ${openPopup && "popup_open"}`}>
      <div className="popup__block">
        <button className="popup__closed popup__closed_add" type="button" onClick={closePopup}></button>
        <h3 className="popup__title">{title}</h3>
        <form className={`popup__form popup__form_${name}`} action="#">
          {children}
          <button className="popup__save popup__save_add" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;