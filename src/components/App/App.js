import { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ImagePopup from "../ImagePopup/ImagePopup";
import Main from "../Main/Main";
import api from "../../utils/api";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import Card from "../Card/Card";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";

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
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
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
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
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
    api
      .deleteCard(card._id, isOwn)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
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

  function handleAddPlaceSubmit({ name, link }) {
    setValue({ ...value, submit: "Сохраняю данные..." });
    api
      .addPlace(name, link)
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
            />
            <Footer />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              value={value.submit}
              onUpdateUser={handleUpdateUser}
            />

            <AddPlacePopup
              onClose={closeAllPopups}
              isOpen={isAddPlacePopupOpen}
              onAddPlacePopup={handleAddPlaceSubmit}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              value={value.submit}
              onUpdateAvatar={handleAvatarUpdate}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />

            <ConfirmPopup
              isOpen={isConfirmPopupOpen}
              onClose={closeAllPopups}
              value={value.confirm}
            />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
