import React, { useContext } from "react";
import Card from "../card/Card";
import TranslationContext from '../../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards }) {
  const { avatar, name, about } = useContext(TranslationContext);
  return (
    <div className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__image" onClick={onEditAvatar}>
            <img className="profile__avatar" src={avatar} alt="аватар" /></div>
          <div className="profile__text">
            <div className="profile__name">
              <h1 className="profile__title">{name}</h1>
              <button type="button" className="profile__open" onClick={onEditProfile}></button>
            </div>
            <p className="profile__subtitle">{about}</p>
          </div>
        </div>
        <button type="button" className="profile__button" onClick={onAddPlace}></button>
      </section>
      <section className="gallery">
        <ul className="gallery__list">
          {cards.map(card => {
            return (
              <Card
                key={card._id}
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