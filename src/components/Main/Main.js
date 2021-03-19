import avatarSwitch from '../../image/pencil.svg';
import React, {useState, useEffect, useContext} from 'react';
import api from '../../utils/api.js';
import Card from "../Card/Card.js";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


const Main = (props) => {

  const currentUser = useContext(CurrentUserContext);
  const [cards, setCards] = useState([]);

  

  useEffect(() => {
    api.getInitialCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [])

  const cardList = cards.map((cards) => (
      <Card key={cards._id} card={cards} onCardClick={props.onCardClick}/>
  ));
  return (
      <main className="content">
        <section className="profile page__section">
          <div className="profile__avatar-container">
            <img src={avatarSwitch} className="profile__editAvatar" alt="Смена аватара"/>
            <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" onClick={props.onEditAvatar}/>
          </div>
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" className="profile__edit-btn" onClick={props.onEditProfile}/>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button type="button" className="profile__add-btn" onClick={props.onAddPlace}/>
        </section>
        <section className="page__section">
          <ul className="elements">
          </ul>
        </section>
        <section className="elements">
          {cardList}
        </section>
      </main>
  )
}

export default Main;