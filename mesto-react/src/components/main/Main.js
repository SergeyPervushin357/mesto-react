import React, { useState, useEffect } from "react";
import { api } from '../utils/Api';
import Card from "../card/Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([data, cardList]) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
        const usersCard = cardList.map(card => {
          return {
            name: card.name,
            link: card.link,
            likes: card.likes,
            cardId: card._id,
          };
        });
        setCards(usersCard);
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
  }, [])

  return (
    <div className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__image" onClick={onEditAvatar}>
            <img className="profile__avatar" src={userAvatar} alt="аватар" /></div>
          <div className="profile__text">
            <div className="profile__name">
              <h1 className="profile__title">{userName}</h1>
              <button type="button" className="profile__open" onClick={onEditProfile}></button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button type="button" className="profile__button" onClick={onAddPlace}></button>
      </section>
      <section className="gallery">
        <ul className="gallery__list">
          {cards.map(card => {
            return (
              <Card
                key={card.cardId}
                card={card}
                onCardClick={onCardClick}
              />
            );
          })}
        </ul>
      </section>
    </div>
  )
}

export default Main;