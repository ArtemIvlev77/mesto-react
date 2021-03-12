import Header from '../Header/Header';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';

function App() {
  return (
    <div className="App">
     <div className="page">
    <div className="page__container">
      <Header/>
      <Main/>
      <Footer/>
      <div className="popup profileEditor">
        <div className="popup__container">
          <button type="button" className="popup__closeBtn profileEditor-closeBtn"></button>
          <h2 className="popup__title">Редактировать профиль</h2>
          <form className="popup__form profileEditor-form" noValidate>
            <input name="name" id="profile-name" type="text" className="popup__text popup__text_valid popup__name-input"
              required minLength="2" maxLength="40"/>
            <span id="profile-name-error" className="popup__error"></span>
            <input name="job" id="profile-job" type="text" className="popup__text popup__text_valid popup__job-input"
              required minLength="2" maxLength="200"/>
            <span id="profile-job-error" className="popup__error"></span>
            <button type="submit" className="popup__save-btn profileEditor-saveBtn">Сохранить</button>
          </form>
        </div>
      </div>
    </div>

    <div className="popup newElement">
      <div className="popup__container">
        <button type="button" className="popup__closeBtn newElement-closeBtn"></button>
        <h2 className="popup__title">Новое место</h2>
        <form className="popup__form newElement-form" noValidate>
          <input name="name" id="new-element-name" type="text"
            className="popup__text popup__text_valid popup__element-title" placeholder="Название" required minLength="2"
            maxLength="30"/>
          <span id="new-element-name-error" className="popup__error"></span>
          <input name="link" id="url-element" type="url" className="popup__text popup__text_valid popup__element-link"
            placeholder="Ссылка на картинку" required/>
          <span id="url-element-error" className="popup__error"></span>
          <button type="submit" className="popup__save-btn newElement-saveBtn">Сохранить</button>
        </form>
      </div>
    </div>
    <div className="popup elementPreview">
      <div className="popup__container popup__image-preview-container">
        <button type="button" className="popup__closeBtn elementPreview-closeBtn"></button>
        <img src=" " alt=" " className="popup__image-preview"/>
        <h3 className="popup__text popup__title popup__title_image-preview "></h3>
      </div>
    </div>

    <div className="popup popupSubmit">
      <div className="popup__container">
      <form name="delete-confirm" className="popup__form" noValidate>
        <h2 className="popup__title">Вы уверены?</h2>
        <input name="save-button" type="submit" value="Да" className="popup__save-btn"/>
        <button type="button" className="popup__closeBtn"></button>
      </form>
    </div>
  </div>

    <div className="popup popupEditAvatar">
      <div className="popup__container">
        <button type="button" className="popup__closeBtn editAvatarPopup-closeBtn"></button>
        <h2 className="popup__title">Обновить аватар</h2>
        <form name="editAvatar" className="popup__form" noValidate>
          <input name="avatar" id="URL" type="url"  className="popup__text popup__text_valid popupAvatarUrl" placeholder="Ссылка на аватар"
            required/>
          <span id="URL-error" className="popup__error"></span>
          <button type="submit" className="popup__save-btn editAvatar-saveBtn">Сохранить</button>
        </form>
      </div>
    </div>

    <template className="template">
      <li className="element">
        <button type="button" className="element__image-btn"><img src=" " alt=" " className="element__image"/></button>
        <button className="element__remove-btn"></button>
        <div className="element__discription">
          <h3 className="element__title"></h3>
          <div className="element__like-container">
            <button className="element__like-btn"></button>
            <div className="element__like-count"></div>
          </div>
        </div>
      </li>
    </template>
    </div>
    </div>
  );
}

export default App;
