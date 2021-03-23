import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Footer from "../Footer/Footer.js";
import Header from "../Header/Header";
import ImagePopup from "../ImagePopup/ImagePopup.js";
import Main from "../Main/Main.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import api from "../../utils/api.js";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import Card from "../Card/Card.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [value, setValue] = useState({
    submit: "Сохранить",
    confirm: "Да",
  });

  function handleCardClick(card) {
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.toggleLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  };

  const handleCardDelete = (card) => {
    const isOwn = card.owner._id === currentUser._id;
    api.deleteCard(isOwn).then((newCards) => {
      setCards((state) => state.filter((c) => c._id !== newCards._id));
    });
  };

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
  }

  useEffect(() => {
    const handleCloseOnEsc = (event) => {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    };
    const handleCloseOnOverlay = (event) => {
      const popupIsOpened = document.querySelector(".popup_is-opened");
      if (event.target === popupIsOpened) {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", handleCloseOnEsc);
    document.addEventListener("mousedown", handleCloseOnOverlay);

    return () => {
      document.removeEventListener("keydown", handleCloseOnEsc);
      document.removeEventListener("mousedown", handleCloseOnOverlay);
    };
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cardList = cards.map((cards) => (
    <Card
      key={cards._id}
      card={cards}
      onCardClick={handleCardClick}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDelete}
    />
  ));

  function handleUpdateUser({ name, about }) {
    setValue({ ...value, submit: "Сохраняю данные..." });
    api
      .editUserInfo(name, about)
      .then(() => setCurrentUser({ ...currentUser, name: name, about: about }))
      .catch((err) => console.log(err))
      .then(() => {
        closeAllPopups();
        setValue({ ...value, submit: "Сохранить" });
      });
  }

  function handleAvatarUpdate({ avatar }) {
    setValue({ ...value, submit: "Сохраняю данные..." });
    api
      .editUserAvatar(avatar)
      .then(() => setCurrentUser({ ...currentUser, avatar: avatar }))
      .catch((err) => console.log(err))
      .then(() => {
        closeAllPopups();
        setValue({ ...value, submit: "Сохранить" });
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <div className="page__container">
            <Header />
            <Main
              cards={cardList}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Footer />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              value={value.submit}
              onUpdateUser={handleUpdateUser}
            />

            <PopupWithForm
              type="newElement"
              title="Новое место"
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
            >
              <input
                name="name"
                id="new-element-name"
                type="text"
                className="popup__text popup__text_valid popup__element-title"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
              />
              <span id="new-element-name-error" className="popup__error" />
              <input
                name="link"
                id="url-element"
                type="url"
                className="popup__text popup__text_valid popup__element-link"
                placeholder="Ссылка на картинку"
                required
              />
              <span id="url-element-error" className="popup__error" />
              <button
                type="submit"
                className="popup__save-btn newElement-saveBtn"
              >
                Сохранить
              </button>
            </PopupWithForm>
            <PopupWithForm
              type="popupSubmit"
              title="Вы уверены?"
              onClose={closeAllPopups}
            >
              <input
                name="save-button"
                type="submit"
                value="Да"
                className="popup__save-btn"
              />
            </PopupWithForm>
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              value={value.submit}
              onUpdateAvatar={handleAvatarUpdate}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
