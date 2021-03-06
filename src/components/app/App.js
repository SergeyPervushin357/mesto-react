import Header from '../header/Header';
import Footer from '../footer/Footer';
import Main from '../main/Main';
import PopupWithForm from '../popupWithForm/PopupWithForm';
import ImagePopup from '../imagePopup/ImagePopup';
import TranslationContext from '../../contexts/CurrentUserContext';
import { useState, useEffect } from "react";
import { api } from '../utils/Api';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState({});
  const [isCards, setIsCards] = useState([]);

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

  const isOpen = isEditAvatarPopupOpen
  || isEditProfilePopupOpen || isAddPlacePopupOpen
  || selectedCard;

  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([user, cards]) => {
        setIsCurrentUser(user);
        setIsCards(cards);
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
  }, [])

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return;
    function handleOverley(e) {
      if (e.target.classList.contains('popup_open') || e.target.classList.contains('popup__closed')) {
        closeAllPopups();
      }
    }
    document.addEventListener("mousedown", handleOverley);
    return () => document.removeEventListener("mousedown", handleOverley)
  }, [isOpen]);

  return (
    <TranslationContext.Provider value={isCurrentUser}>

      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        cards={isCards}
      />

      <Footer />

      <PopupWithForm
        name="profileEdit"
        openPopup={isEditProfilePopupOpen}
        closePopup={closeAllPopups}
        title="?????????????????????????? ??????????????"
        buttonText="??????????????????"
      >
        <input type="text" className="popup__text popup__text_type_name" name="name" id="type-name" minLength="2"
          maxLength="40" placeholder="??????" required />
        <span className="type-name-error popup__error"></span>
        <input type="text" className="popup__text popup__text_type_job" name="job" minLength="2" maxLength="200"
          id="type-job" placeholder="?? ????????" required />
        <span className="type-job-error  popup__error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="cardAdd"
        openPopup={isAddPlacePopupOpen}
        closePopup={closeAllPopups}
        title="?????????? ??????????"
        buttonText="??????????????"
      >
        <input type="text" placeholder="????????????????" className="popup__text popup__text_name" name="name" id="text-name"
          minLength="2" maxLength="30" required />
        <span className="text-name-error popup__error"></span>
        <input type="url" placeholder="???????????? ???? ????????????????" className="popup__text popup__text_type_link" name="link"
          id="type-link" required />
        <span className="type-link-error  popup__error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="avatarEdit"
        openPopup={isEditAvatarPopupOpen}
        closePopup={closeAllPopups}
        title="???????????????? ????????????"
        buttonText="??????????????????"
      >
        <input className="popup__text" type="url" placeholder="???????????? ???? ????????????????" name="linkAvatar" id="type-linkAvatar"
          required />
        <span className="type-linkAvatar-error popup__error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="deleteConfirm"
        title="???? ???????????????"
        buttonText="????"
      >
      </PopupWithForm>

      <ImagePopup
        openPopupZoomCard={selectedCard}
        closePopup={closeAllPopups}
      />

    </TranslationContext.Provider>
  );
}

export default App;
