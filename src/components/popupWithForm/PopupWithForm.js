import React, { useEffect } from "react";

function PopupWithForm({ name, openPopup, closePopup, title, buttonText, children }) {
  useEffect(() => {
    if (!openPopup) return;

    function handleEsc(e) {
      if (e.key === "Escape") {
        closePopup();
      }
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc)
  }, [openPopup]);

  useEffect(() => {
    if (!openPopup) return;

    function handleOverley(e) {
      if (e.target.classList.contains('popup_open') || e.target.classList.contains('popup__closed')) {
        closePopup();
      }
    }
    document.addEventListener("click", handleOverley);
    return () => document.removeEventListener("click", handleOverley)
  }, [openPopup]);

  return (
    <div className={`popup popup_${name} ${openPopup && "popup_open"}`}>
      <div className="popup__block">
        <button className="popup__closed popup__closed_add" type="button" onClick={closePopup}></button>
        <h3 className="popup__title">{title}</h3>
        <form className={`popup__form popup__form_${name}`} name="addCard" action="#" method="get" noValidate>
          {children}
          <button className="popup__save popup__save_add" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;