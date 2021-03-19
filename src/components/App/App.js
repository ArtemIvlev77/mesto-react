import React, {useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header';
import ImagePopup from "../ImagePopup/ImagePopup.js";
import Main from '../Main/Main.js';
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import api from '../../utils/api.js';


function App() {
  const [currentUser, setCurrentUser] = useState({});


  useEffect(() => { 
    
    api.getUserInfo()
        .then((data) => {
              setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [])


  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);

  function handleCardClick(card) {
    setSelectedCard({
      name: card.name,
      link: card.link
    })
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  return (
  <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <div className="page__container">
            <Header/>
            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
            />
            <Footer/>
            <PopupWithForm type="profileEditor" title="Редактировать профиль" isOpen={isEditProfilePopupOpen}
                           onClose={closeAllPopups}>
                <input name="name" id="profile-name" type="text"
                       className="popup__text popup__text_valid popup__name-input"
                       required minLength="2" maxLength="40"/>
                <span id="profile-name-error" className="popup__error"/>
                <input name="job" id="profile-job" type="text"
                       className="popup__text popup__text_valid popup__job-input"
                       required minLength="2" maxLength="200"/>
                <span id="profile-job-error" className="popup__error"/>
                <button type="submit" className="popup__save-btn profileEditor-saveBtn">Сохранить</button>
            </PopupWithForm>

            <PopupWithForm type="newElement" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                <input name="name" id="new-element-name" type="text"
                       className="popup__text popup__text_valid popup__element-title" placeholder="Название" required
                       minLength="2"
                       maxLength="30"/>
                <span id="new-element-name-error" className="popup__error"/>
                <input name="link" id="url-element" type="url"
                       className="popup__text popup__text_valid popup__element-link"
                       placeholder="Ссылка на картинку" required/>
                <span id="url-element-error" className="popup__error"/>
                <button type="submit" className="popup__save-btn newElement-saveBtn">Сохранить</button>
            </PopupWithForm>
            <PopupWithForm type="popupSubmit" title="Вы уверены?" onClose={closeAllPopups}>
                <input name="save-button" type="submit" value="Да" className="popup__save-btn"/>
            </PopupWithForm>
            <PopupWithForm type="popupEditAvatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen}
                           onClose={closeAllPopups}>
                <input name="avatar" id="URL" type="url" className="popup__text popup__text_valid popupAvatarUrl"
                       placeholder="Ссылка на аватар"
                       required/>
                <span id="URL-error" className="popup__error"/>
                <button type="submit" className="popup__save-btn editAvatar-saveBtn">Сохранить</button>
            </PopupWithForm>
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          </div>
        </div>
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
