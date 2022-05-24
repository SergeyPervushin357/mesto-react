import React from 'react';
import PopupWithForm from '../popupWithForm/PopupWithForm';

function ConfirmDeletePopup({ isOpen, isConfirm, card, downloadText, setButtonDisabled, ButtonDisabled }) {

  function handleSubmit(event) {
    event.preventDefault();
    setButtonDisabled(true);
    isConfirm(card);
  }
  return (
    <PopupWithForm
      name="deleteConfirm"
      title="Вы уверены?"
      buttonText={downloadText ? "Удаление картинки..." : "Да"}
      openPopup={isOpen}
      onSubmit={handleSubmit}
      ButtonDisabled={ButtonDisabled}
    >
    </PopupWithForm>
  )
}
export default ConfirmDeletePopup;