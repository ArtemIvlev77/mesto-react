class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  //запрос на начальные карточки
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._addResult(res));
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._addResult(res));
  }

  editUserInfo(name, about) {
    return fetch(`${this._url}/users/me/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._addResult(res));
  }

  editUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._addResult(res));
  }

  addCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._addResult(res));
  }

  toggleLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => this._addResult(res));
    } else {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => this._addResult(res));
    }
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._addResult(res));
  }

  _addResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-20",
  headers: {
    authorization: "c991fcc7-9f95-4717-b779-f2f9eb8f4dbe",
    "Content-Type": "application/json",
  },
});

export default api;
