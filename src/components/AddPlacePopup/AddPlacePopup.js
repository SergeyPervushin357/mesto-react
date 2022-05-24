import React, { useState, useEffect } from 'react';
import PopupWithForm from '../popupWithForm/PopupWithForm';

function AddPlacePopup({ isOpen, onAddPlace, downloadText, buttonDisabled, setButtonDisabled }) {
  const [name, setName] = useState({});
  const [link, setLink] = useState("");

  function handleNameChange(event) {
    setName(event.target.value);
  };

  function handleLinkChange(event) {
    setLink(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    setButtonDisabled(true);
    onAddPlace(name, link);
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (

    <PopupWithForm
      name="cardAdd"
      openPopup={isOpen}
      title="Новое место"
      buttonText={downloadText ? "Создаем картинку..." : "Создать"}
      onSubmit={handleSubmit}
      buttonDisabled={buttonDisabled}
    >
      <input type="text" placeholder="Название" className="popup__text popup__text_name" name="name" id="text-name"
        minLength="2" maxLength="30" required value={name} onChange={handleNameChange} />
      <span className="text-name-error popup__error"></span>
      <input type="url" placeholder="Ссылка на картинку" className="popup__text popup__text_type_link" name="link"
        id="type-link" required value={link} onChange={handleLinkChange} />
      <span className="type-link-error  popup__error"></span>
    </PopupWithForm>//
  )
}
export default AddPlacePopup;