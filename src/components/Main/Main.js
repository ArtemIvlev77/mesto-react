import avatarSwitch from '../../image/pencil.svg';
import React, {useState, useEffect} from 'react';
import api from '../../utils/api.js';
import Card from "../Card/Card.js";

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
        .then((data) => {
          setUserName(data.name);
          setUserDescription(data.about);
          setUserAvatar(data.avatar);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [])

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
            <img src={userAvatar} alt="Аватар" className="profile__avatar" onClick={props.onEditAvatar}/>
          </div>
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__name">{userName}</h1>
              <button type="button" className="profile__edit-btn" onClick={props.onEditProfile}/>
            </div>
            <p className="profile__job">{userDescription}</p>
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