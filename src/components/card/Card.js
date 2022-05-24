import React, { useContext } from "react";
import { Translation } from '../../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(Translation);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);



  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  const handleClick = () => {
    onCardClick(card);
  };

  return (
    <li className="gallery__image">
      <img className="gallery__photo" src={card.link} alt={card.name} onClick={handleClick} />
      <button className="gallery__delete" style={isOwn ? { display: "flex" } : { display: "none" }} aria-label="удалить" onClick={handleDeleteClick}></button>
      <div className="gallery__info">
        <h2 className="gallery__text">{card.name}</h2>
        <div className="gallery__likes">
          <button className={`gallery__heart ${isLiked ? 'gallery__heart_active' : ''}`} type="button" aria-label="лайк" onClick={handleLikeClick}></button>
          <span className="gallery__heart-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;