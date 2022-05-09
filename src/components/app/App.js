import Header from '../header/Header';
import Footer from '../footer/Footer';
import Main from '../main/Main';
import PopupWithForm from '../popupWithForm/PopupWithForm';
import ImagePopup from '../imagePopup/ImagePopup';
import { useState } from "react";


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard({
      isOpened: true,
      name: card.name,
      link: card.link,
    });
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
<>
      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        name="profileEdit"
        openPopup={isEditProfilePopupOpen}
        closePopup={closeAllPopups}
        title="Редактировать профиль"
        buttonText="Сохранить"
      >
        <input type="text" className="popup__text popup__text_type_name" name="name" id="type-name" minLength="2"
          maxLength="40" placeholder="Имя" required/>
        <span className="type-name-error popup__error"></span>
        <input type="text" className="popup__text popup__text_type_job" name="job" minLength="2" maxLength="200"
          id="type-job" placeholder="О себе" required/>
        <span className="type-job-error  popup__error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="cardAdd"
        openPopup={isAddPlacePopupOpen}
        closePopup={closeAllPopups}
        title="Новое место"
        buttonText="Создать"
      >
        <input type="text" placeholder="Название" className="popup__text popup__text_name" name="name" id="text-name"
          minLength="2" maxLength="30" required/>
        <span className="text-name-error popup__error"></span>
        <input type="url" placeholder="Ссылка на картинку" className="popup__text popup__text_type_link" name="link"
          id="type-link" required/>
        <span className="type-link-error  popup__error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="avatarEdit"
        openPopup={isEditAvatarPopupOpen}
        closePopup={closeAllPopups}
        title="Обновить аватар"
        buttonText="Сохранить"
      >
        <input className="popup__text" type="url" placeholder="Ссылка на картинку" name="linkAvatar" id="type-linkAvatar"
          required/>
        <span className="type-linkAvatar-error popup__error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="deleteConfirm"
        title="Вы уверены?"
        buttonText="Да"
      >
      </PopupWithForm>

      <ImagePopup
        openPopupZoomCard={selectedCard}
        closePopup={closeAllPopups}/>
        </>
  );
}

export default App;
