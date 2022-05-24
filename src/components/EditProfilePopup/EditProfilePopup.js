import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm";
import { Translation } from '../../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, downloadText, buttonDisabled, setButtonDisabled }) {
  const [name, setName] = useState({});
  const [description, setDescription] = useState({});
  const currentUser = useContext(Translation);

  function handleSubmit(event) {
    event.preventDefault();
    setButtonDisabled(true);
    onUpdateUser(name, description);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleJobChange(event) {
    setDescription(event.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (

    <PopupWithForm
      name="profileEdit"
      openPopup={isOpen}
      closePopup={onClose}
      title="Редактировать профиль"
      buttonText={downloadText ? 'Сохраняем новый текст...' : 'Сохранить'}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonDisabled={buttonDisabled}
    >

      <input type="text" className="popup__text popup__text_type_name" name="name" id="type-name" minLength="2"
        maxLength="40" placeholder="Имя" required value={name || ''} onChange={handleNameChange} />
      <span className="type-name-error popup__error"></span>
      <input type="text" className="popup__text popup__text_type_job" name="job" minLength="2" maxLength="200"
        id="type-job" placeholder="О себе" required value={description || ''} onChange={handleJobChange} />
      <span className="type-job-error  popup__error"></span>
    </PopupWithForm>
  )
}
export default EditProfilePopup;