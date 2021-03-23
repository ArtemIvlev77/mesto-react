import { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ImagePopup from "../ImagePopup/ImagePopup";
import Main from "../Main/Main";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import api from "../../utils/api";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import Card from "../Card/Card";
import AddNewElementPopup from "../AddNewElementPopup/AddNewElementPopup";

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
  const [isAddNewElementPopupOpen, setAddNewElementPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [value, setValue] = useState({
    submit: "Сохранить",
    confirm: "Да",
  });

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddNewElementPopupOpen(true);
  }

  function closeAllPopups() {
    setAddNewElementPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
  }

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

  function handleAddNewElementSubmit({ name, link }) {
    setValue({ ...value, submit: "Сохраняю данные..." });
    api
      .addNewElement(name, link)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((err) => console.log(err))
      .then(() => {
        closeAllPopups();
        setValue({ ...value, submit: "Сохранить" });
      });
  }

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

            <AddNewElementPopup
              onClose={closeAllPopups}
              isOpen={isAddNewElementPopupOpen}
              onAddNewElement={handleAddNewElementSubmit}
            />
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
