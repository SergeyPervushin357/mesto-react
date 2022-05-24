import Header from '../header/Header';
import Footer from '../footer/Footer';
import Main from '../main/Main';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup'
import ImagePopup from '../imagePopup/ImagePopup';
import { useState, useEffect } from "react";
import { Translation } from '../../contexts/CurrentUserContext'
import { api } from '../utils/Api';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup'
import ConfirmDeletePopup from '../ConfirmDeletePopup/ConfirmDeletePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isSelectedCard, setIsSelectedCard] = useState(null);
  const [isСards, setIsCards] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [isUpdateCards, setIsUpdateCards] = useState(false);
  const [isСurrentUser, setIsCurrentUser] = useState({});
  const [isDeleteCard, setIsDeleteCard] = useState({});
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);


  const handleEditAvatarClick = () => {
    setIsButtonDisabled(false)
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsButtonDisabled(false)
    setIsEditProfilePopupOpen(true)
  };

  const handleAddPlaceClick = () => {
    setIsButtonDisabled(false)
    setIsAddPlacePopupOpen(true);
  };

  const handleDeleteCardClick = () => {
    setIsButtonDisabled(false)
    setIsConfirmDeletePopupOpen(true);
  };

  const updateDeleteCard = (card) => {
    setIsButtonDisabled(false)
    setIsDeleteCard(card);
    handleDeleteCardClick();
  };

  const handleCardClick = (card) => {
    setIsSelectedCard({
      isOpened: true,
      name: card.name,
      link: card.link,
    });
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false);
    setIsSelectedCard(null);
    setIsConfirmDeletePopupOpen(false);
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isSelectedCard;

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

  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([Data, cards]) => {
        setIsCurrentUser(Data);
        setIsCards(cards);
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
  }, [isUpdateCards]);

  const handleUpdateUser = (name, about) => {
    setIsDownload(true);
    api
      .editProfile(name, about)
      .then((userData) => {
        setIsCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
      .finally(() => setIsDownload(false))
  }

  const handleEditAvatar = ({ avatar }) => {
    setIsDownload(true);
    api
      .changeAvatar(avatar)
      .then((res) => {
        setIsCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
      .finally(() => setIsDownload(false))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === isСurrentUser._id);

    const changeLikeCardStatus =
      !isLiked
        ? api.addLike(card._id)
        : api.deleteLike(card._id)

    changeLikeCardStatus
      .then((newCard) => {
        setIsCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
  }

  function handleCardDelete(card) {
    setIsDownload(true);
    api
      .deleteCard(card._id)
      .then(() => {
        closeAllPopups();
        setIsCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
      .finally(() => setIsDownload(false))
  }

  const handleAddPlaceSubmit = (name, link) => {
    setIsDownload(true);
    console.log('test')
    api
      .addCard(name, link)
      .then((newCard) => {
        setIsCards([newCard, ...isСards]);
        closeAllPopups();
        setIsUpdateCards(!isUpdateCards)
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
      .finally(() => setIsDownload(false))
  };


  return (
    <Translation.Provider value={isСurrentUser}>

      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        cards={isСards}
        onCardDelete={updateDeleteCard}
        onCardLike={handleCardLike}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        downloadText={isDownload}
        buttonDisabled={isButtonDisabled}
        setButtonDisabled={setIsButtonDisabled}
      />

      <AddPlacePopup
        onAddPlace={handleAddPlaceSubmit}
        isOpen={isAddPlacePopupOpen}
        downloadText={isDownload}
        buttonDisabled={isButtonDisabled}
        setButtonDisabled={setIsButtonDisabled}
      />


      <EditAvatarPopup
        onUpdateAvatar={handleEditAvatar}
        isOpen={isEditAvatarPopupOpen}
        downloadText={isDownload}
        buttonDisabled={isButtonDisabled}
        setButtonDisabled={setIsButtonDisabled}
      />

      <ConfirmDeletePopup
        isOpen={isConfirmDeletePopupOpen}
        card={isDeleteCard}
        isConfirm={handleCardDelete}
        downloadText={isDownload}
        buttonDisabled={isButtonDisabled}
        setButtonDisabled={setIsButtonDisabled}
      />

      <Footer />

      <ImagePopup
        openPopupZoomCard={isSelectedCard}
        closePopup={closeAllPopups} />

    </Translation.Provider>
  );
}

export default App;