import React from "react";

function Card({ card, onCardClick }) {
  const handleClick = () => {
    onCardClick(card);
  };

  return (
    <li className="gallery__image">
    <img className="gallery__photo" src={card.link} alt={card.name} onClick={handleClick}/>
    <button className="gallery__delete" aria-label="удалить"></button>
    <div className="gallery__info">
      <h2 className="gallery__text">{card.name}</h2>
      <div className="gallery__likes">
        <button className="gallery__heart" type="button" aria-label="лайк"></button>
        <span className="gallery__heart-count">{card.likes.length}</span>
      </div>
    </div>
  </li>
  )
}

export default Card;