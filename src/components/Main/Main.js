import React from 'react';
import avatarSwitch from '../../image/pencil.svg';


function Main() {
  function handleEditAvatarClick() {
    document.querySelector('.popupEditAvatar').classList.add('popup_is-opened');
  }

  function handleEditProfileClick() {document.querySelector('.profileEditor').classList.add('popup_is-opened');
  }

  function handleAddPlaceClick(){document.querySelector('.newElement').classList.add('popup_is-opened');
  }
  return(
    <main className="content">
        <section className="profile page__section">
          <div className="profile__avatar-container">
            <img src={avatarSwitch} className="profile__editAvatar" alt="Смена аватара" />
            <img src='#' alt="Аватар" className="profile__avatar" onClick={handleEditAvatarClick}/>
          </div>
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__name">Жак Ив Кусто </h1> <button type="button" className="profile__edit-btn" onClick={handleEditProfileClick}/>
            </div>
            <p className="profile__job">Исследователь океана </p>
          </div>
          <button type="button" className="profile__add-btn" onClick={handleAddPlaceClick}></button>
        </section>
        <section className="page__section">
          <ul className="elements">
          </ul>
        </section>
      </main>
  )
}

export default Main;