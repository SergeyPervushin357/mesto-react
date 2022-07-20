import React, { useContext } from "react";
import TranslationContext from '../../contexts/CurrentUserContext';

function Card({ card, onCardClick }) {
  const { name, link, likes, owner } = card;
  const user = useContext(TranslationContext);
  const isOwn = owner._id === user._id;
  const isLiked = likes.some(i => i._id === user._id);
  const handleClick = () => onCardClick(card);
  return (
    <li className="gallery__image">
    <img className="gallery__photo" src={link} alt={name} onClick={handleClick}/>
    <button
      className='gallery__delete'
      style={isOwn ? { visibility: "visible" } : { visibility: "hidden" }}
      aria-label="удалить"
    ></button>
    <div className="gallery__info">
      <h2 className="gallery__text">{name}</h2>
      <div className="gallery__likes">
        <button className={`gallery__heart ${isLiked ? 'gallery__heart_active' : ''}`} type="button" aria-label="лайк"></button>
        <span className="gallery__heart-count">{likes.length}</span>
      </div>
    </div>
  </li>
  )
}

export default Card;