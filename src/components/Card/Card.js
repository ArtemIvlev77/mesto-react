function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return(
      <li className="element">
    <img className="element__image-btn element__image"
         src={props.card.link}
         alt={props.card.name}
         onClick={handleClick}
    />
        <button className="element__remove-btn"/>
        <div className="element__description">
          <h3 className="element__title">{props.card.name}</h3>
          <div className="element__like-container">
            <button className="element__like-btn"/>
            <div className="element__like-count">
              {props.card.likes.length}
            </div>
          </div>
        </div>
      </li>
  )
}

export default Card;