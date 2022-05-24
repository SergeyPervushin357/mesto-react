import React, { useRef, useEffect } from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm";

function EditAvatarPopup({ isOpen, onUpdateAvatar, downloadText, buttonDisabled, setButtonDisabled }) {

  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    setButtonDisabled(true);
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatarEdit"
      title="Обновить аватар"
      buttonText={downloadText ? "Загружаем аватар..." : "Загрузить"}
      openPopup={isOpen}
      onSubmit={handleSubmit}
      buttonDisabled={buttonDisabled}
    >
      <input className="popup__text" type="url" placeholder="Ссылка на картинку" name="linkAvatar" id="type-linkAvatar"
        required ref={avatarRef} />
      <span className="type-linkAvatar-error popup__error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;